export const prerender = false;

import type { APIRoute } from "astro";
import type Stripe from "stripe";
import { getStripe, getWebhookSecret } from "../../lib/stripe";
import { getSupabaseServerConfig } from "../../lib/supabase";

// =====================================================================
// Stripe webhook handler — safety net for all payment flows.
//
// Stripe POSTs events here. We verify the signature, store the event_id
// for idempotency (Stripe retries on non-2xx), then route by event type.
//
// We ALWAYS return 200 unless signature verification fails, so Stripe
// stops retrying. Internal errors are logged and surfaced via the
// payment_log + console for ops.
// =====================================================================

export const POST: APIRoute = async ({ request }) => {
  // 1. Raw body BEFORE any JSON parse — signature is computed over bytes
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return jsonResponse(400, { error: "Missing stripe-signature header" });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    const secret = getWebhookSecret();
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[WEBHOOK] Signature verification failed:", msg);
    return jsonResponse(400, { error: `Webhook signature failure: ${msg}` });
  }

  // 2. Idempotency — claim the event_id FIRST (UNIQUE constraint enforces). If two
  //    Stripe deliveries arrive concurrently, only one will succeed in inserting.
  //    The other gets 409 → returns 200 immediately, no handler runs twice. (C2)
  const supabase = getSupabaseServerConfig();
  if (!supabase.url || !supabase.key) {
    // C3: don't 5xx after signature OK — Stripe will retry forever. Log and 200.
    console.error("[WEBHOOK] Supabase not configured — accepting and dropping event", event.id);
    return jsonResponse(200, { received: true, error: "internal-config" });
  }

  const claimed = await claimWebhookEvent(supabase, event.id, event.type);
  if (!claimed) {
    console.log(`[WEBHOOK] Skipping duplicate event ${event.id} (${event.type})`);
    return jsonResponse(200, { received: true, duplicate: true });
  }

  // 3. Route by event type
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(supabase, event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
      case "payment_intent.canceled":
        await handlePaymentIntentFailed(supabase, event.data.object as Stripe.PaymentIntent);
        break;

      case "setup_intent.succeeded":
        await handleSetupIntentSucceeded(event.data.object as Stripe.SetupIntent);
        break;

      case "mandate.updated":
        await handleMandateUpdated(supabase, event.data.object as Stripe.Mandate);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(supabase, event);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(supabase, event);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(supabase, event.data.object as Stripe.Subscription);
        break;

      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(supabase, event.data.object as Stripe.Checkout.Session);
        break;

      case "checkout.session.async_payment_succeeded":
        await handleCheckoutAsyncSucceeded(supabase, event.data.object as Stripe.Checkout.Session);
        break;

      case "checkout.session.async_payment_failed":
        await handleCheckoutAsyncFailed(supabase, event.data.object as Stripe.Checkout.Session);
        break;

      default:
        console.log(`[WEBHOOK] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    // Event_id already claimed → don't double-process even if handler crashed.
    // Stripe shouldn't retry; ops follows up via logs.
    console.error(`[WEBHOOK] Handler error for ${event.type} (${event.id}):`, err);
  }

  return jsonResponse(200, { received: true });
};

// =====================================================================
// Handlers
// =====================================================================

async function handlePaymentIntentSucceeded(
  supabase: { url: string; key: string },
  pi: Stripe.PaymentIntent,
) {
  const metadata = pi.metadata || {};
  const orderNumber = metadata.order_number;

  if (!orderNumber) {
    console.warn(`[WEBHOOK] PaymentIntent ${pi.id} has no order_number metadata — skipping`);
    return;
  }

  // Does an order row exist for this order_number?
  const existing = await selectFromOrders(supabase, `order_number=eq.${encodeURIComponent(orderNumber)}`);

  if (existing && existing.length > 0) {
    // Order exists — ensure status is correct
    const row = existing[0];
    if (row.status !== "paid" && row.status !== "subscription_active") {
      const newStatus = metadata.payment_type === "monthly" ? "subscription_active" : "paid";
      await patchOrder(supabase, row.id, { status: newStatus });
      console.log(`[WEBHOOK] PI succeeded → updated order ${orderNumber} status=${newStatus}`);
    }
    return;
  }

  // Orphan recovery: order row was never written (sync flow failed mid-way).
  //   - One-time card: just insert the order row from PI metadata
  //   - Monthly card:  ALSO create the missing Subscription, because the sync
  //                    flow charged the £20 reg fee but threw before creating
  //                    the subscription (D12). Without this, the customer is
  //                    £20 down with no installment plan.
  // Refunds and cancellations are explicitly NOT performed here — those are
  // handled by the payments team in a separate system per product decision.
  console.warn(`[WEBHOOK] Orphan PI ${pi.id} for order ${orderNumber} — recreating order`);
  const isMonthly = metadata.payment_type === "monthly";
  const courseTotalPence = parseInt(metadata.course_total_inc_vat_pence || "0", 10);
  const installmentPence = parseInt(metadata.installment_pence || "0", 10);
  const orderTotalPounds = isMonthly && courseTotalPence ? courseTotalPence / 100 : pi.amount / 100;
  const customerIdForOrphan = typeof pi.customer === "string" ? pi.customer : pi.customer?.id || null;
  const paymentMethodIdForOrphan =
    typeof pi.payment_method === "string" ? pi.payment_method : pi.payment_method?.id || null;

  // For monthly card flow: create the missing Subscription before inserting the order.
  let recoveredSubscriptionId: string | null = null;
  if (isMonthly && customerIdForOrphan && paymentMethodIdForOrphan && installmentPence > 0 && metadata.first_payment_date) {
    try {
      const stripe = getStripe();
      const { createInstallmentSubscription } = await import("../../lib/createInstallmentSubscription");
      const anchor = new Date(metadata.first_payment_date + "T00:00:00Z");
      const courseIdsArr = (metadata.course_ids || "").split(",").filter(Boolean);
      const emailLower = (metadata.customer_email || "").toLowerCase().trim();
      const sub = await createInstallmentSubscription({
        stripe,
        customerId: customerIdForOrphan,
        paymentMethodId: paymentMethodIdForOrphan,
        productName: metadata.courses || "Integer Training Monthly Plan",
        installmentPence,
        firstPaymentDate: anchor,
        paymentMethodType: "card",
        orderNumber,
        customerEmailLower: emailLower,
        courseIds: courseIdsArr,
        metadata: {
          course_ids: metadata.course_ids || "",
          courses: metadata.courses || "",
          customer_name: metadata.customer_name || "",
          customer_email: metadata.customer_email || "",
          customer_phone: metadata.customer_phone || "",
          payment_type: "monthly",
          terms_accepted: metadata.terms_accepted || new Date().toISOString(),
          recovered_from_pi: pi.id,
        },
      });
      recoveredSubscriptionId = sub.id;
      console.log(`[WEBHOOK] Orphan recovery created subscription ${sub.id} for order ${orderNumber}`);
    } catch (subErr) {
      console.error(`[WEBHOOK CRITICAL] Orphan PI had no sub and recovery failed for ${orderNumber}:`, subErr);
      // Continue — still record the order row so ops can see something happened
    }
  }

  const { findOrderBySubscription, insertOrder } = await import("../../lib/orders");
  // Dedupe — if a concurrent retry already wrote this order via the same subscription, skip
  if (recoveredSubscriptionId) {
    const existingSubOrder = await findOrderBySubscription(recoveredSubscriptionId);
    if (existingSubOrder) {
      console.log(`[WEBHOOK] Order ${orderNumber} dedupe via sub ${recoveredSubscriptionId} — skipping insert`);
      return;
    }
  }

  try {
    await insertOrder({
      orderNumber,
      customerName: metadata.customer_name || "",
      customerEmail: metadata.customer_email || "",
      customerPhone: metadata.customer_phone || "",
      courses: metadata.courses || "",
      courseIds: metadata.course_ids || "",
      total: orderTotalPounds,
      registrationFee: isMonthly ? 20 : null,
      monthlyAmount: installmentPence ? installmentPence / 100 : null,
      subscriptionMonths: isMonthly ? 12 : null,
      firstPaymentDate: metadata.first_payment_date || null,
      stripePaymentId: pi.id,
      stripeSubscriptionId: recoveredSubscriptionId,
      stripeCustomerId: customerIdForOrphan,
      status: isMonthly ? "subscription_active" : "paid",
      subscriptionStatus: isMonthly && recoveredSubscriptionId ? "active" : null,
      paymentType: isMonthly ? "monthly" : "one_time",
      paymentMethod: "card",
      termsAcceptedAt: metadata.terms_accepted || null,
    });
  } catch (err) {
    console.error(`[WEBHOOK] Failed to recreate orphan order ${orderNumber}:`, err);
  }
}

async function handlePaymentIntentFailed(
  supabase: { url: string; key: string },
  pi: Stripe.PaymentIntent,
) {
  const metadata = pi.metadata || {};
  const orderNumber = metadata.order_number;

  if (!orderNumber) return;

  const existing = await selectFromOrders(supabase, `order_number=eq.${encodeURIComponent(orderNumber)}`);
  if (existing && existing.length > 0) {
    await patchOrder(supabase, existing[0].id, { status: "failed" });
    console.log(`[WEBHOOK] PI failed → marked order ${orderNumber} failed`);
  }
}

async function handleSetupIntentSucceeded(si: Stripe.SetupIntent) {
  // Mandate is now active. The DD-confirm endpoint creates the subscription
  // optimistically immediately after this fires from the browser, so no DB
  // mutation is required here — log only.
  console.log(`[WEBHOOK] SetupIntent ${si.id} succeeded for customer ${si.customer}`);
}

async function handleMandateUpdated(
  supabase: { url: string; key: string },
  mandate: Stripe.Mandate,
) {
  if (mandate.status === "inactive") {
    // BACS mandate failed validation. Find the order via stored mandate id.
    const existing = await selectFromOrders(
      supabase,
      `stripe_mandate_id=eq.${encodeURIComponent(mandate.id)}`,
    );
    if (existing && existing.length > 0) {
      await patchOrder(supabase, existing[0].id, {
        subscription_status: "canceled",
        status: "failed",
      });
      console.warn(
        `[WEBHOOK] Mandate ${mandate.id} inactive — flagged order ${existing[0].order_number}. ` +
          `Deposit may need manual review.`,
      );
    }
  }
}

async function handleInvoicePaymentSucceeded(
  supabase: { url: string; key: string },
  event: Stripe.Event,
) {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId =
    typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id || null;

  if (!subscriptionId) return;

  // Find the order by subscription id
  const existing = await selectFromOrders(
    supabase,
    `stripe_subscription_id=eq.${encodeURIComponent(subscriptionId)}`,
  );
  const order = existing && existing[0];

  // Always log to payment_log (idempotent on stripe_event_id)
  await insertPaymentLog(supabase, {
    order_id: order?.id ?? null,
    order_number: order?.order_number ?? "UNKNOWN",
    stripe_event_id: event.id,
    stripe_invoice_id: invoice.id,
    stripe_charge_id: typeof invoice.charge === "string" ? invoice.charge : invoice.charge?.id ?? null,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
    status: "succeeded",
    payment_method: extractInvoicePaymentMethod(invoice),
    raw_event: event,
  });

  if (order && order.subscription_status !== "active") {
    await patchOrder(supabase, order.id, { subscription_status: "active" });
  }
  console.log(`[WEBHOOK] Invoice paid for subscription ${subscriptionId} → ${invoice.amount_paid / 100}`);
}

async function handleInvoicePaymentFailed(
  supabase: { url: string; key: string },
  event: Stripe.Event,
) {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId =
    typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id || null;

  if (!subscriptionId) return;

  const existing = await selectFromOrders(
    supabase,
    `stripe_subscription_id=eq.${encodeURIComponent(subscriptionId)}`,
  );
  const order = existing && existing[0];

  await insertPaymentLog(supabase, {
    order_id: order?.id ?? null,
    order_number: order?.order_number ?? "UNKNOWN",
    stripe_event_id: event.id,
    stripe_invoice_id: invoice.id,
    amount: invoice.amount_due / 100,
    currency: invoice.currency,
    status: "failed",
    payment_method: extractInvoicePaymentMethod(invoice),
    raw_event: event,
  });

  if (order) {
    await patchOrder(supabase, order.id, { subscription_status: "past_due" });
    console.warn(
      `[WEBHOOK] Invoice payment failed for order ${order.order_number} (sub ${subscriptionId}) — past_due`,
    );
  }
}

async function handleSubscriptionDeleted(
  supabase: { url: string; key: string },
  sub: Stripe.Subscription,
) {
  const existing = await selectFromOrders(
    supabase,
    `stripe_subscription_id=eq.${encodeURIComponent(sub.id)}`,
  );
  if (existing && existing.length > 0) {
    await patchOrder(supabase, existing[0].id, { subscription_status: "canceled" });
    console.log(`[WEBHOOK] Subscription ${sub.id} deleted → order ${existing[0].order_number} canceled`);
  }
}

async function handleCheckoutSessionCompleted(
  supabase: { url: string; key: string },
  session: Stripe.Checkout.Session,
) {
  // Path A — Direct Debit flow:
  //   /api/checkout-direct-debit-session charges the deposit by card, then creates a
  //   Checkout Session (mode='setup', bacs_debit) so the customer enters bank details
  //   on Stripe. When they complete it, this handler fires:
  //     1. Retrieve the SetupIntent → grab the BACS payment_method + mandate
  //     2. Create the Subscription with billing_cycle_anchor = customer-chosen date,
  //        default_payment_method = the new BACS mandate
  //     3. Insert the order row with status='subscription_active', subscription_status='incomplete'
  //        (incomplete because BACS mandate validation takes 3-5 working days)
  const metadata = session.metadata || {};
  const orderNumber = metadata.order_number;
  if (!orderNumber) {
    console.warn(`[WEBHOOK] Checkout session ${session.id} has no order_number — skipping`);
    return;
  }

  const purpose = metadata.purpose || "";

  // Only DD mandate setup needs server-side subscription creation.
  if (purpose !== "dd_mandate") {
    console.log(`[WEBHOOK] Checkout session ${session.id} completed with unknown purpose=${purpose} — skipping`);
    return;
  }

  // Idempotency: if order already exists, don't double-create
  const existing = await selectFromOrders(
    supabase,
    `order_number=eq.${encodeURIComponent(orderNumber)}`,
  );
  if (existing && existing.length > 0) {
    console.log(`[WEBHOOK] Order ${orderNumber} already exists, skipping duplicate session.completed`);
    return;
  }

  const stripe = getStripe();

  // 1. Retrieve the SetupIntent to get the BACS payment method + mandate
  const setupIntentId = typeof session.setup_intent === "string" ? session.setup_intent : session.setup_intent?.id;
  if (!setupIntentId) {
    console.error(`[WEBHOOK] Session ${session.id} has no setup_intent`);
    return;
  }

  let setupIntent: Stripe.SetupIntent;
  try {
    setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
  } catch (err) {
    console.error(`[WEBHOOK] Failed to retrieve SetupIntent ${setupIntentId}:`, err);
    return;
  }

  if (setupIntent.status !== "succeeded") {
    console.warn(`[WEBHOOK] SetupIntent ${setupIntentId} status=${setupIntent.status} — deferring`);
    return;
  }

  const paymentMethodId = typeof setupIntent.payment_method === "string"
    ? setupIntent.payment_method
    : setupIntent.payment_method?.id;
  const mandateId = typeof setupIntent.mandate === "string" ? setupIntent.mandate : setupIntent.mandate?.id;
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!paymentMethodId || !customerId) {
    console.error(`[WEBHOOK] Missing pm/customer on session ${session.id}`);
    return;
  }

  const installmentPence = parseInt(metadata.installment_pence || "0", 10);
  const regFeePence = parseInt(metadata.reg_fee_pence || "2000", 10);
  const totalIncVatPence = parseInt(metadata.course_total_inc_vat_pence || "0", 10);
  const firstPaymentDate = metadata.first_payment_date;

  if (!installmentPence || !firstPaymentDate) {
    console.error(`[WEBHOOK] Missing installment_pence or first_payment_date on session ${session.id}`);
    return;
  }

  // 2. Set BACS as customer default
  try {
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  } catch (err) {
    console.error(`[WEBHOOK] Failed to set default PM for customer ${customerId}:`, err);
  }

  // 3. Create the £20 registration fee Invoice (BACS-collected, settles in 3-5 working days).
  //    Idempotency keys on both the invoice item AND the invoice so concurrent webhook
  //    deliveries can never double-bill. (C8)
  let regFeeInvoiceId: string | null = null;
  try {
    await stripe.invoiceItems.create(
      {
        customer: customerId,
        amount: regFeePence,
        currency: "gbp",
        description: "Course registration fee",
        metadata: { order_number: orderNumber, purpose: "registration_fee" },
      },
      { idempotencyKey: `regfee-item-${orderNumber}` },
    );
    const invoice = await stripe.invoices.create(
      {
        customer: customerId,
        collection_method: "charge_automatically",
        auto_advance: true,
        default_payment_method: paymentMethodId,
        payment_settings: { payment_method_types: ["bacs_debit"] },
        metadata: { order_number: orderNumber, purpose: "registration_fee" },
      },
      { idempotencyKey: `regfee-inv-${orderNumber}` },
    );
    regFeeInvoiceId = invoice.id ?? null;
    if (regFeeInvoiceId) {
      await stripe.invoices.finalizeInvoice(regFeeInvoiceId);
    }
  } catch (err) {
    console.error(`[WEBHOOK CRITICAL] Failed to create reg-fee invoice for ${orderNumber}:`, err);
    // Continue — at least create the subscription. Reg fee can be re-billed manually.
  }

  // 4. Create Product + Price + Subscription for the 12 monthly installments
  const anchorDate = new Date(firstPaymentDate + "T00:00:00Z");
  const customerEmailLower = (metadata.customer_email || "").toLowerCase().trim();
  const courseIdsArr = (metadata.course_ids || "").split(",").filter(Boolean);
  const { createInstallmentSubscription } = await import("../../lib/createInstallmentSubscription");
  let subscription: Stripe.Subscription;
  try {
    subscription = await createInstallmentSubscription({
      stripe,
      customerId,
      paymentMethodId,
      productName: metadata.courses || "Integer Training Monthly Plan",
      installmentPence,
      firstPaymentDate: anchorDate,
      paymentMethodType: "bacs_debit",
      orderNumber,
      customerEmailLower,
      courseIds: courseIdsArr,
      metadata: {
        course_ids: metadata.course_ids || "",
        courses: metadata.courses || "",
        customer_name: metadata.customer_name || "",
        customer_email: metadata.customer_email || "",
        customer_phone: metadata.customer_phone || "",
        payment_type: "monthly",
        terms_accepted: metadata.terms_accepted || new Date().toISOString(),
        reg_fee_invoice: regFeeInvoiceId || "",
      },
    });
  } catch (err) {
    console.error(`[WEBHOOK] Failed to create subscription for order ${orderNumber}:`, err);
    return;
  }

  // Dedupe — if a concurrent webhook delivery already inserted this order, skip the second insert
  const { findOrderBySubscription, insertOrder } = await import("../../lib/orders");
  const existingSubOrder = await findOrderBySubscription(subscription.id);
  if (existingSubOrder) {
    console.log(`[WEBHOOK] Order already exists for sub ${subscription.id} — skipping duplicate insert`);
    return;
  }

  // 5. Insert order row
  try {
    await insertOrder({
      orderNumber,
      customerName: metadata.customer_name || "",
      customerEmail: metadata.customer_email || "",
      customerPhone: metadata.customer_phone || "",
      courses: metadata.courses || "",
      courseIds: metadata.course_ids || "",
      total: totalIncVatPence / 100,
      registrationFee: regFeePence / 100,
      monthlyAmount: installmentPence / 100,
      subscriptionMonths: 12,
      firstPaymentDate,
      stripePaymentId: regFeeInvoiceId, // ref to reg-fee invoice
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customerId,
      stripeMandateId: mandateId || null,
      status: "subscription_active",
      paymentType: "monthly",
      paymentMethod: "bacs_debit",
      subscriptionStatus: "incomplete", // → 'active' when first DD clears
      termsAcceptedAt: metadata.terms_accepted || null,
    });
    console.log(
      `[WEBHOOK] DD subscription created for ${orderNumber}: £${(regFeePence / 100).toFixed(2)} reg + 12 × £${(installmentPence / 100).toFixed(2)} from ${firstPaymentDate}`,
    );
  } catch (err) {
    console.error(
      `[WEBHOOK CRITICAL] Subscription ${subscription.id} created but order insert failed for ${orderNumber}:`,
      err,
    );
  }
}

async function handleCheckoutAsyncSucceeded(
  supabase: { url: string; key: string },
  session: Stripe.Checkout.Session,
) {
  // BACS first DD collection succeeded (async, hours/days later)
  const orderNumber = session.metadata?.order_number;
  if (!orderNumber) return;
  const existing = await selectFromOrders(supabase, `order_number=eq.${encodeURIComponent(orderNumber)}`);
  if (existing && existing.length > 0) {
    await patchOrder(supabase, existing[0].id, { status: "subscription_active", subscription_status: "active" });
    console.log(`[WEBHOOK] Async payment succeeded for order ${orderNumber}`);
  }
}

async function handleCheckoutAsyncFailed(
  supabase: { url: string; key: string },
  session: Stripe.Checkout.Session,
) {
  // BACS mandate/payment failed asynchronously
  const orderNumber = session.metadata?.order_number;
  if (!orderNumber) return;
  const existing = await selectFromOrders(supabase, `order_number=eq.${encodeURIComponent(orderNumber)}`);
  if (existing && existing.length > 0) {
    await patchOrder(supabase, existing[0].id, { status: "failed", subscription_status: "canceled" });
    console.warn(`[WEBHOOK] Async payment FAILED for order ${orderNumber} — manual review needed`);
  }
}

// =====================================================================
// DB helpers — raw REST calls, service_role auth
// =====================================================================

interface OrderRow {
  id: number;
  order_number: string;
  status: string;
  subscription_status: string | null;
}

async function selectFromOrders(
  supabase: { url: string; key: string },
  query: string,
): Promise<OrderRow[] | null> {
  const res = await fetch(`${supabase.url}/rest/v1/orders?${query}&select=*`, {
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
    },
  });
  if (!res.ok) {
    console.error("[WEBHOOK] selectFromOrders failed:", res.status, await res.text());
    return null;
  }
  return (await res.json()) as OrderRow[];
}

async function patchOrder(
  supabase: { url: string; key: string },
  id: number,
  fields: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(`${supabase.url}/rest/v1/orders?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(fields),
  });
  if (!res.ok) {
    console.error("[WEBHOOK] patchOrder failed:", res.status, await res.text());
  }
}

interface PaymentLogInput {
  order_id: number | null;
  order_number: string;
  stripe_event_id: string;
  stripe_invoice_id?: string | null;
  stripe_payment_intent_id?: string | null;
  stripe_charge_id?: string | null;
  amount: number;
  currency: string;
  status: string;
  payment_method: string | null;
  raw_event: unknown;
}

async function insertPaymentLog(
  supabase: { url: string; key: string },
  log: PaymentLogInput,
): Promise<void> {
  const res = await fetch(`${supabase.url}/rest/v1/payment_log`, {
    method: "POST",
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify(log),
  });
  if (!res.ok) {
    const body = await res.text();
    // 409 conflict on stripe_event_id is fine — means duplicate event, already logged
    if (res.status !== 409) {
      console.error("[WEBHOOK] insertPaymentLog failed:", res.status, body);
    }
  }
}

/**
 * Atomically claim a webhook event_id. Returns true if we won the race (caller
 * should run the handler), false if it was already processed by a concurrent
 * delivery (caller should respond 200 without running). The UNIQUE constraint
 * on webhook_events.stripe_event_id enforces atomicity at the DB level.
 */
async function claimWebhookEvent(
  supabase: { url: string; key: string },
  eventId: string,
  eventType: string,
): Promise<boolean> {
  const res = await fetch(`${supabase.url}/rest/v1/webhook_events`, {
    method: "POST",
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ stripe_event_id: eventId, event_type: eventType }),
  });
  if (res.status === 201 || res.status === 204) return true;
  if (res.status === 409) return false; // UNIQUE violation → duplicate
  // Other error: treat as not-claimed but log; safer to skip than risk double-process
  console.error("[WEBHOOK] claimWebhookEvent unexpected status:", res.status, await res.text());
  return false;
}

function extractInvoicePaymentMethod(invoice: Stripe.Invoice): string | null {
  // Read the payment method type from invoice payment_settings if set, else null.
  return invoice.payment_settings?.payment_method_types?.[0] ?? null;
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
