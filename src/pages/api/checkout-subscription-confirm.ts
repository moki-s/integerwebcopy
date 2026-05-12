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

/**
 * 3DS confirm — completes the card-monthly flow after the customer cleared the
 * 3D Secure challenge for the £20 registration-fee PaymentIntent.
 *
 * Browser POSTs the stashed parameters back here. We verify the PI succeeded
 * and that it really is the reg fee, then build the installment subscription
 * (idempotent on order_number) and insert the order row.
 */

export const POST: APIRoute = async ({ request }) => {
  const json = (await request.json()) as {
    payment_intent_id?: string;
    order_number?: string;
    customer_id?: string;
    payment_method_id?: string;
    first_payment_date?: string;
    course_ids?: string[];
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
  };

  const {
    payment_intent_id,
    order_number,
    first_payment_date,
    course_ids,
    customer_name,
    customer_email,
    customer_phone,
  } = json;

  // We deliberately DO NOT take customer_id / payment_method_id from the request body —
  // they are read from the verified PaymentIntent below to prevent a stranger from
  // attaching someone else's successful PI to their own Stripe customer/PM. (H6)
  if (
    !payment_intent_id ||
    !order_number ||
    !first_payment_date ||
    !course_ids?.length ||
    !customer_name ||
    !customer_email ||
    !customer_phone
  ) {
    return jsonError(400, "Missing required fields");
  }

  if (!import.meta.env.STRIPE_SECRET_KEY) return jsonError(500, "Payment service not configured");

  const dateCheck = validateFirstPaymentDate(first_payment_date, "card");
  if (!dateCheck.ok) return jsonError(400, dateCheck.reason);

  const stripe = getStripe();

  try {
    // Verify the PI succeeded and was for the reg fee
    const pi = await stripe.paymentIntents.retrieve(payment_intent_id);
    if (pi.status !== "succeeded") {
      return jsonError(400, "Registration fee payment did not complete. Please try again.");
    }
    if (pi.metadata?.purpose !== "registration_fee") {
      return jsonError(400, "Invalid payment intent for this flow.");
    }
    if (pi.amount !== REG_FEE_PENCE) {
      return jsonError(400, "Payment amount mismatch.");
    }
    if (pi.metadata?.order_number !== order_number) {
      return jsonError(400, "Order number mismatch.");
    }

    // Derive customer + payment method from the verified PI, never from request body
    const customerId = typeof pi.customer === "string" ? pi.customer : pi.customer?.id;
    const paymentMethodId = typeof pi.payment_method === "string" ? pi.payment_method : pi.payment_method?.id;
    if (!customerId || !paymentMethodId) {
      return jsonError(400, "PaymentIntent missing customer or payment method.");
    }

    // Re-compute installment server-side
    const totalIncVatPence = courseTotalIncVatPence(course_ids);
    const plan = calculatePlan(totalIncVatPence);
    const courseNamesArr = courseNames(course_ids);
    const courseNamesStr = courseNamesArr.join(", ");
    const productName = courseNamesArr.length === 1 ? courseNamesArr[0] : `Course Bundle — ${courseNamesStr}`;

    const termsAcceptedAt = pi.metadata?.terms_accepted || new Date().toISOString();

    const metadata = {
      order_number,
      customer_name,
      customer_email,
      customer_phone,
      course_ids: course_ids.join(","),
      courses: courseNamesStr,
      payment_type: "monthly",
      payment_method: "card",
      first_payment_date,
      installment_pence: String(plan.installmentPence),
      reg_fee_pence: String(plan.regFeePence),
      terms_accepted: termsAcceptedAt,
    };

    const emailLower = (customer_email || "").toLowerCase().trim();
    const subscription = await createInstallmentSubscription({
      stripe,
      customerId,
      paymentMethodId,
      productName,
      installmentPence: plan.installmentPence,
      firstPaymentDate: dateCheck.date,
      paymentMethodType: "card",
      orderNumber: order_number,
      customerEmailLower: emailLower,
      courseIds: course_ids,
      metadata,
    });

    const { findOrderBySubscription, insertOrder, paymentReceivedButDbFailedResponse } = await import("../../lib/orders");
    const existing = await findOrderBySubscription(subscription.id);
    if (existing) {
      return jsonOK({ success: true, order_number: existing.order_number, deduped: true });
    }
    try {
      await insertOrder({
        orderNumber: order_number,
        customerName: customer_name,
        customerEmail: customer_email,
        customerPhone: customer_phone,
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
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        stripePaymentId: pi.id,
        termsAcceptedAt,
      });
    } catch {
      return paymentReceivedButDbFailedResponse(order_number);
    }

    return jsonOK({ success: true, order_number });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return jsonError(400, err.message || "Payment failed.");
    }
    console.error("[CHECKOUT-SUB-CONFIRM] Unexpected error:", err);
    return jsonError(500, "An unexpected error occurred.");
  }
};

function jsonOK(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { "Content-Type": "application/json" } });
}
