export const prerender = false;

import type { APIRoute } from "astro";
import Stripe from "stripe";
import { getStripe } from "../../lib/stripe";
import {
  REG_FEE_PENCE,
  calculatePlan,
  courseNames,
  courseTotalIncVatPence,
  validateFirstPaymentDate,
} from "../../lib/pricing";
import { createInstallmentSubscription } from "../../lib/createInstallmentSubscription";
import { COURSES } from "../../data/courses";

/**
 * Monthly card subscription — new model:
 *   1) Validate inputs + first_payment_date (today+5 to today+30 calendar days)
 *   2) Find/create Stripe Customer, attach card payment method
 *   3) Charge £20 registration fee via PaymentIntent (immediate)
 *   4) If 3DS required → return client_secret + stash params; client posts to
 *      /api/checkout-subscription-confirm after 3DS challenge succeeds
 *   5) Else → createInstallmentSubscription (12 monthly card charges from
 *      customer-picked date) and insertOrder. Webhook handles ongoing collection.
 */

export const POST: APIRoute = async ({ request }) => {
  const json = (await request.json()) as {
    payment_method_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    course_ids?: string[];
    first_payment_date?: string;
  };

  const {
    payment_method_id,
    first_name,
    last_name,
    email,
    phone,
    course_ids,
    first_payment_date,
  } = json;

  if (!payment_method_id || !first_name || !last_name || !email || !phone || !course_ids?.length || !first_payment_date) {
    return jsonError(400, "Missing required fields. Please include first installment date.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return jsonError(400, "Invalid email address");
  // Normalise email so case differences don't fragment Stripe customers
  const emailLower = email.toLowerCase().trim();
  if (first_name.length < 2 || first_name.length > 100 || last_name.length < 2 || last_name.length > 100) {
    return jsonError(400, "Name must be between 2 and 100 characters");
  }
  const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
  if (!phoneRegex.test(phone)) return jsonError(400, "Please enter a valid phone number");

  const dateCheck = validateFirstPaymentDate(first_payment_date, "card");
  if (!dateCheck.ok) return jsonError(400, dateCheck.reason);

  // Validate courses
  for (const id of course_ids) {
    const course = COURSES[id];
    if (!course) return jsonError(400, `Invalid course: ${id}`);
    if (course.isEnquiryOnly) return jsonError(400, "Some courses require enquiry only and cannot be purchased online.");
  }

  // Compute total and plan
  const totalIncVatPence = courseTotalIncVatPence(course_ids);
  if (totalIncVatPence <= REG_FEE_PENCE) return jsonError(400, "Cart total is too low for monthly plan.");
  const plan = calculatePlan(totalIncVatPence);
  const customerName = `${first_name} ${last_name}`;
  const courseNamesArr = courseNames(course_ids);
  const courseNamesStr = courseNamesArr.join(", ");
  const productName = courseNamesArr.length === 1 ? courseNamesArr[0] : `Course Bundle — ${courseNamesStr}`;

  if (!import.meta.env.STRIPE_SECRET_KEY) return jsonError(500, "Payment service not configured");

  const stripe = getStripe();

  try {
    // Find or create customer
    const found = await stripe.customers.list({ email: emailLower, limit: 1 });
    let customer = found.data[0];
    if (!customer) {
      customer = await stripe.customers.create(
        {
          email: emailLower,
          name: customerName,
          phone,
          metadata: { source: "integer-training-website" },
        },
        { idempotencyKey: `cust-${emailLower}` },
      );
    }

    // Attach payment method (ignore if already attached)
    try {
      await stripe.paymentMethods.attach(payment_method_id, { customer: customer.id });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (!msg.includes("already")) throw err;
    }
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: payment_method_id },
    });

    // Order number
    const orderNumber = generateOrderNumber();
    const termsAcceptedAt = new Date().toISOString();

    // Stripe metadata shared by PI, sub, and order
    const metadata = {
      order_number: orderNumber,
      customer_name: customerName,
      customer_email: email,
      customer_phone: phone,
      course_ids: course_ids.join(","),
      courses: courseNamesStr,
      payment_type: "monthly",
      payment_method: "card",
      first_payment_date,
      installment_pence: String(plan.installmentPence),
      reg_fee_pence: String(plan.regFeePence),
      terms_accepted: termsAcceptedAt,
    };

    // Charge the registration fee
    const regFeePI = await stripe.paymentIntents.create(
      {
        amount: REG_FEE_PENCE,
        currency: "gbp",
        customer: customer.id,
        payment_method: payment_method_id,
        payment_method_types: ["card"],
        confirmation_method: "manual",
        confirm: true,
        metadata: {
          ...metadata,
          purpose: "registration_fee",
          course_total_inc_vat_pence: String(totalIncVatPence),
        },
      },
      { idempotencyKey: await stableHashSha256(`reg-${email}-${course_ids.sort().join(",")}-${payment_method_id}`) },
    );

    if (regFeePI.status === "requires_action" && regFeePI.next_action?.type === "use_stripe_sdk") {
      // 3DS — return everything client needs to call /api/checkout-subscription-confirm
      return jsonOK({
        requires_action: true,
        payment_intent_client_secret: regFeePI.client_secret,
        flow: "card_reg_fee",
        order_number: orderNumber,
        customer_id: customer.id,
        payment_method_id,
        first_payment_date,
      });
    }

    if (regFeePI.status !== "succeeded") {
      return jsonError(400, "Registration fee could not be charged. Please try a different card.");
    }

    // Create the installment subscription
    const subscription = await createInstallmentSubscription({
      stripe,
      customerId: customer.id,
      paymentMethodId: payment_method_id,
      productName,
      installmentPence: plan.installmentPence,
      firstPaymentDate: dateCheck.date,
      paymentMethodType: "card",
      orderNumber,
      metadata,
    });

    // Insert order
    const { insertOrder, paymentReceivedButDbFailedResponse } = await import("../../lib/orders");
    try {
      await insertOrder({
        orderNumber,
        customerName,
        customerEmail: email,
        customerPhone: phone,
        courses: courseNamesStr,
        courseIds: course_ids.join(","),
        total: totalIncVatPence / 100,
        registrationFee: REG_FEE_PENCE / 100,
        monthlyAmount: plan.installmentPence / 100,
        subscriptionMonths: 12,
        firstPaymentDate: first_payment_date,
        status: "subscription_active",
        subscriptionStatus: "active",
        paymentType: "monthly",
        paymentMethod: "card",
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        stripePaymentId: regFeePI.id,
        termsAcceptedAt,
      });
    } catch {
      return paymentReceivedButDbFailedResponse(orderNumber);
    }

    // Send confirmation email — non-critical
    void sendConfirmationEmail({
      to: email,
      firstName: first_name,
      orderNumber,
      courseNames: courseNamesStr,
      installmentPence: plan.installmentPence,
      firstPaymentDate: first_payment_date,
    });

    return jsonOK({ success: true, order_number: orderNumber });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return jsonError(400, mapStripeError(err));
    }
    console.error("[CHECKOUT-SUB] Unexpected error:", err);
    return jsonError(500, "An unexpected error occurred. Please try again or call us on 0121 690 9563 for assistance.");
  }
};

// =====================================================================
// Helpers
// =====================================================================

function jsonOK(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { "Content-Type": "application/json" } });
}

function generateOrderNumber(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `INT-${yy}${mm}${dd}-${rand}`;
}

async function stableHashSha256(source: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc.encode(source));
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

function mapStripeError(err: Stripe.errors.StripeError): string {
  const code = (err.decline_code as string) || err.code || "";
  const messages: Record<string, string> = {
    card_declined: "Your card was declined. Please try a different card or contact your bank.",
    expired_card: "Your card has expired. Please use a different card.",
    incorrect_cvc: "The security code (CVC) is incorrect. Please check and try again.",
    insufficient_funds: "Insufficient funds on your card. Please try a different payment method.",
    processing_error: "There was an issue processing your card. Please try again in a moment.",
    incorrect_number: "The card number is incorrect. Please check and try again.",
  };
  return messages[code] || err.message || "Payment failed. Please try again or call us on 0121 690 9563 for assistance.";
}

async function sendConfirmationEmail(p: {
  to: string;
  firstName: string;
  orderNumber: string;
  courseNames: string;
  installmentPence: number;
  firstPaymentDate: string;
}): Promise<void> {
  const resendKey = import.meta.env.RESEND_API_KEY;
  if (!resendKey) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Integer Training <noreply@integertraining.com>",
        to: [p.to],
        subject: `Order Confirmation — ${p.orderNumber}`,
        html: `<h2>Thank you for your order!</h2>
          <p>Hi ${escapeHtml(p.firstName)},</p>
          <p>Your order <strong>${escapeHtml(p.orderNumber)}</strong> is confirmed.</p>
          <p><strong>Today:</strong> £20.00 registration fee charged to your card.</p>
          <p><strong>First installment:</strong> £${(p.installmentPence / 100).toFixed(2)} on ${escapeHtml(p.firstPaymentDate)}.</p>
          <p><strong>Schedule:</strong> 12 monthly card payments of £${(p.installmentPence / 100).toFixed(2)}.</p>
          <p><strong>Courses:</strong> ${escapeHtml(p.courseNames)}</p>
          <p>Our team will be in touch within 24 hours with your course access details.</p>
          <p>Any questions: info@integertraining.com or 0121 690 9563.</p>`,
      }),
    });
  } catch (err) {
    console.error("[EMAIL] Confirmation send failed:", err);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
