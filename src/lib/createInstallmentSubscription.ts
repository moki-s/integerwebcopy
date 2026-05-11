import type Stripe from "stripe";
import { cancelAtUnix } from "./pricing";

/**
 * Shared helper — creates a Stripe Product + Price + Subscription that bills
 * one installment per month for 12 months, starting on the customer-picked date.
 *
 * Used by:
 *   - /api/checkout-subscription (card flow): after the £20 reg-fee PI succeeds
 *   - /api/checkout-subscription-confirm (card 3DS flow): same, post-3DS
 *   - /api/stripe-webhook handleCheckoutSessionCompleted (DD flow): after the
 *     BACS mandate is in place
 *
 * Idempotency: keyed on order_number so retries by webhook / 3DS confirm don't
 * create duplicate subscriptions.
 */
export interface InstallmentSubscriptionParams {
  stripe: Stripe;
  customerId: string;
  paymentMethodId: string;
  productName: string;
  installmentPence: number;
  firstPaymentDate: Date; // already-validated by pricing.validateFirstPaymentDate
  paymentMethodType: "card" | "bacs_debit";
  orderNumber: string;
  metadata: Record<string, string>; // course_ids, customer info, terms etc.
}

export async function createInstallmentSubscription(
  p: InstallmentSubscriptionParams,
): Promise<Stripe.Subscription> {
  const product = await p.stripe.products.create({
    name: p.productName,
    metadata: {
      order_number: p.orderNumber,
      course_ids: p.metadata.course_ids || "",
    },
  });

  const price = await p.stripe.prices.create({
    product: product.id,
    unit_amount: p.installmentPence,
    currency: "gbp",
    recurring: { interval: "month" },
  });

  const anchorUnix = Math.floor(p.firstPaymentDate.getTime() / 1000);
  const cancelUnix = cancelAtUnix(p.firstPaymentDate);

  return p.stripe.subscriptions.create(
    {
      customer: p.customerId,
      items: [{ price: price.id }],
      default_payment_method: p.paymentMethodId,
      billing_cycle_anchor: anchorUnix,
      proration_behavior: "none",
      cancel_at: cancelUnix,
      payment_settings: { payment_method_types: [p.paymentMethodType] },
      collection_method: "charge_automatically",
      metadata: {
        order_number: p.orderNumber,
        payment_method: p.paymentMethodType,
        ...p.metadata,
      },
    },
    { idempotencyKey: `sub-${p.orderNumber}` },
  );
}
