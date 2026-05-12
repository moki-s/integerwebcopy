export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const json = (await request.json()) as { payment_intent_id?: string };
  const { payment_intent_id } = json;

  if (!payment_intent_id) {
    return new Response(
      JSON.stringify({ error: "Missing payment intent ID" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new Response(
      JSON.stringify({ error: "Payment service not configured" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    // Confirm the PaymentIntent after 3DS
    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/payment_intents/${payment_intent_id}/confirm`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const paymentIntent = await stripeResponse.json();

    if (paymentIntent.error) {
      const friendlyMessage = mapStripeError(paymentIntent.error);
      return new Response(JSON.stringify({ error: friendlyMessage }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (paymentIntent.status === "succeeded") {
      // Store order in Supabase
      const metadata = paymentIntent.metadata || {};
      // Reuse the order number from the original PaymentIntent metadata (generated in checkout.ts)
      const orderNumber = metadata.order_number || "INT-UNKNOWN";

      const { insertOrder, paymentReceivedButDbFailedResponse } = await import("../../lib/orders");
      try {
        await insertOrder({
          orderNumber,
          customerName: metadata.customer_name || "",
          customerEmail: (metadata.customer_email || "").toLowerCase().trim(),
          customerPhone: metadata.customer_phone || "",
          courses: metadata.courses || "",
          courseIds: metadata.course_ids || "",
          total: paymentIntent.amount / 100,
          stripePaymentId: paymentIntent.id,
          status: "paid",
          paymentType: "one_time",
          paymentMethod: "card",
          termsAcceptedAt: metadata.terms_accepted || null,
        });
      } catch {
        return paymentReceivedButDbFailedResponse(orderNumber);
      }

      return new Response(
        JSON.stringify({
          success: true,
          order_number: orderNumber,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        error:
          "Payment failed. Please try again or call us on 0121 690 9563 for assistance.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({
        error:
          "An unexpected error occurred. Please try again or call us on 0121 690 9563 for assistance.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

function mapStripeError(error: {
  code?: string;
  decline_code?: string;
  message?: string;
}): string {
  const code = error.decline_code || error.code || "";
  const messages: Record<string, string> = {
    card_declined:
      "Your card was declined. Please try a different card or contact your bank.",
    expired_card: "Your card has expired. Please use a different card.",
    incorrect_cvc:
      "The security code (CVC) is incorrect. Please check and try again.",
    insufficient_funds:
      "Insufficient funds on your card. Please try a different payment method.",
    processing_error:
      "There was an issue processing your card. Please try again in a moment.",
    incorrect_number:
      "The card number is incorrect. Please check and try again.",
  };
  return (
    messages[code] ||
    error.message ||
    "Payment failed. Please try again or call us on 0121 690 9563 for assistance."
  );
}
