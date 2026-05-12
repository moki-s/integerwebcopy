import { supabaseInsert } from "./supabase";

export type OrderStatus = "paid" | "subscription_active" | "failed";
export type PaymentType = "one_time" | "monthly";
export type PaymentMethod = "card" | "bacs_debit";

export interface InsertOrderInput {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  courses: string;
  courseIds: string;
  total: number;
  stripePaymentId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCustomerId?: string | null;
  stripeMandateId?: string | null;
  status: OrderStatus;
  paymentType: PaymentType;
  paymentMethod?: PaymentMethod | null;
  monthlyAmount?: number | null;
  subscriptionMonths?: number | null;
  subscriptionStatus?: string | null;
  firstPaymentDate?: string | null;
  depositAmount?: number | null;
  registrationFee?: number | null;
  termsAcceptedAt?: string | null;
}

export class OrderInsertError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`Order insert failed (${status}): ${body}`);
    this.name = "OrderInsertError";
    this.status = status;
    this.body = body;
  }
}

/**
 * Look up an existing order by Stripe subscription ID. Used to dedupe when
 * two browser tabs both complete the same checkout — Stripe's idempotent
 * subscription return means both end up with the same sub_id; this helper
 * lets the caller return the original order_number instead of inserting a
 * second row.
 */
export async function findOrderBySubscription(
  stripeSubscriptionId: string,
): Promise<{ order_number: string } | null> {
  const { getSupabaseServerConfig } = await import("./supabase");
  const { url, key } = getSupabaseServerConfig();
  if (!url || !key) return null;
  const res = await fetch(
    `${url}/rest/v1/orders?stripe_subscription_id=eq.${encodeURIComponent(stripeSubscriptionId)}&select=order_number&limit=1`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } },
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as Array<{ order_number: string }>;
  return rows[0] ?? null;
}

export async function insertOrder(input: InsertOrderInput): Promise<void> {
  const row: Record<string, unknown> = {
    order_number: input.orderNumber,
    customer_name: input.customerName,
    customer_email: input.customerEmail,
    customer_phone: input.customerPhone,
    courses: input.courses,
    course_ids: input.courseIds,
    total: input.total,
    status: input.status,
    payment_type: input.paymentType,
  };

  if (input.stripePaymentId !== undefined) row.stripe_payment_id = input.stripePaymentId;
  if (input.stripeSubscriptionId !== undefined) row.stripe_subscription_id = input.stripeSubscriptionId;
  if (input.stripeCustomerId !== undefined) row.stripe_customer_id = input.stripeCustomerId;
  if (input.stripeMandateId !== undefined) row.stripe_mandate_id = input.stripeMandateId;
  if (input.paymentMethod !== undefined) row.payment_method = input.paymentMethod;
  if (input.monthlyAmount !== undefined) row.monthly_amount = input.monthlyAmount;
  if (input.subscriptionMonths !== undefined) row.subscription_months = input.subscriptionMonths;
  if (input.subscriptionStatus !== undefined) row.subscription_status = input.subscriptionStatus;
  if (input.firstPaymentDate !== undefined) row.first_payment_date = input.firstPaymentDate;
  if (input.depositAmount !== undefined) row.deposit_amount = input.depositAmount;
  if (input.registrationFee !== undefined) row.registration_fee = input.registrationFee;
  if (input.termsAcceptedAt !== undefined) row.terms_accepted_at = input.termsAcceptedAt;

  const result = await supabaseInsert("orders", row);

  if (!result.ok) {
    console.error(
      "[CRITICAL] Order insert failed — Stripe may have charged the customer.",
      { orderNumber: input.orderNumber, status: result.status, body: result.body },
    );
    throw new OrderInsertError(result.status, result.body);
  }
}

/**
 * Standard 500 response for when Stripe succeeded but the DB write failed.
 * Customer is told payment was received + given order number for support follow-up.
 * The Stripe webhook is the safety net that will reconcile the order later.
 */
export function paymentReceivedButDbFailedResponse(orderNumber: string): Response {
  return new Response(
    JSON.stringify({
      error: `Your payment was received successfully, but we hit a temporary issue saving your order. Our team has been alerted and will contact you within 30 minutes. Please keep this reference for support: ${orderNumber}. Email info@integertraining.com or call 0121 690 9563 if you need help sooner.`,
      order_number: orderNumber,
      payment_received: true,
    }),
    { status: 500, headers: { "Content-Type": "application/json" } },
  );
}
