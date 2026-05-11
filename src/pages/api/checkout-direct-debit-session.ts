export const prerender = false;

import type { APIRoute } from "astro";
import { getStripe } from "../../lib/stripe";
import {
  REG_FEE_PENCE,
  calculatePlan,
  courseNames,
  courseTotalIncVatPence,
  validateFirstPaymentDate,
} from "../../lib/pricing";
import { COURSES } from "../../data/courses";

/**
 * DD signup — no card collected on our page.
 *
 *   1) Validate inputs + first_payment_date (today+5 WORKING days to today+30)
 *   2) Find/create Stripe Customer
 *   3) Create a Checkout Session in mode='setup', payment_method_types=['bacs_debit']
 *      with full metadata. Customer enters bank details on Stripe-hosted page.
 *   4) On `checkout.session.completed` webhook: handler creates the £20 reg-fee
 *      Invoice (BACS-collected) + the 12-month installment Subscription, then
 *      writes the order row. See src/pages/api/stripe-webhook.ts.
 *
 *   No payment is taken in this endpoint — money lands only after Stripe finishes
 *   the BACS clearing window (~3-5 working days), via the recurring invoice schedule.
 */

export const POST: APIRoute = async ({ request, url }) => {
  const json = (await request.json()) as {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    course_ids?: string[];
    first_payment_date?: string;
  };

  const { first_name, last_name, email, phone, course_ids, first_payment_date } = json;

  if (!first_name || !last_name || !email || !phone || !course_ids?.length || !first_payment_date) {
    return jsonError(400, "Missing required fields.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return jsonError(400, "Invalid email address");
  const emailLower = email.toLowerCase().trim();
  if (first_name.length < 2 || first_name.length > 100 || last_name.length < 2 || last_name.length > 100) {
    return jsonError(400, "Name must be between 2 and 100 characters");
  }
  const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
  if (!phoneRegex.test(phone)) return jsonError(400, "Please enter a valid phone number");

  const dateCheck = validateFirstPaymentDate(first_payment_date, "bacs_debit");
  if (!dateCheck.ok) return jsonError(400, dateCheck.reason);

  // Validate courses
  for (const id of course_ids) {
    const course = COURSES[id];
    if (!course) return jsonError(400, `Invalid course: ${id}`);
    if (course.isEnquiryOnly) return jsonError(400, "Some courses require enquiry only and cannot be purchased online.");
  }

  const totalIncVatPence = courseTotalIncVatPence(course_ids);
  if (totalIncVatPence <= REG_FEE_PENCE) return jsonError(400, "Cart total is too low for monthly plan.");
  const plan = calculatePlan(totalIncVatPence);
  const customerName = `${first_name} ${last_name}`;
  const courseNamesStr = courseNames(course_ids).join(", ");

  if (!import.meta.env.STRIPE_SECRET_KEY) return jsonError(500, "Payment service not configured");

  const stripe = getStripe();

  try {
    // Find or create customer (idempotent on lowercased email)
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

    // Generate order number now (so we can return it; webhook reuses it from metadata)
    const orderNumber = generateOrderNumber();
    const termsAcceptedAt = new Date().toISOString();

    const origin = url.origin;
    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      payment_method_types: ["bacs_debit"],
      customer: customer.id,
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}&order_number=${encodeURIComponent(orderNumber)}`,
      cancel_url: `${origin}/checkout?dd_cancelled=1`,
      metadata: {
        purpose: "dd_mandate",
        order_number: orderNumber,
        customer_name: customerName,
        customer_email: emailLower,
        customer_phone: phone,
        course_ids: course_ids.join(","),
        courses: courseNamesStr,
        installment_pence: String(plan.installmentPence),
        reg_fee_pence: String(plan.regFeePence),
        course_total_inc_vat_pence: String(totalIncVatPence),
        first_payment_date,
        terms_accepted: termsAcceptedAt,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        checkout_url: session.url,
        session_id: session.id,
        order_number: orderNumber,
        first_payment_date,
        registration_fee: REG_FEE_PENCE / 100,
        monthly_amount: plan.installmentPence / 100,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[DD-SESSION] Unexpected error:", err);
    return jsonError(500, "An unexpected error occurred. Please try again or call us on 0121 690 9563 for assistance.");
  }
};

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function generateOrderNumber(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `INT-${yy}${mm}${dd}-${rand}`;
}
