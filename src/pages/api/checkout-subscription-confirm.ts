export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const json = (await request.json()) as {
    payment_intent_id?: string;
    subscription_id?: string;
    order_number?: string;
  };
  const { payment_intent_id, subscription_id, order_number } = json;

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

  const stripeHeaders = {
    Authorization: `Bearer ${stripeSecretKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    // Retrieve the PaymentIntent to check its status after 3DS
    const piRes = await fetch(
      `https://api.stripe.com/v1/payment_intents/${payment_intent_id}`,
      { method: "GET", headers: stripeHeaders },
    );
    const paymentIntent = await piRes.json();

    if (paymentIntent.error) {
      const friendlyMessage = mapStripeError(paymentIntent.error);
      return new Response(JSON.stringify({ error: friendlyMessage }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (paymentIntent.status === "succeeded") {
      // Payment succeeded after 3DS - store order
      const metadata = paymentIntent.metadata || {};
      // Reuse order number from the client (passed through 3DS flow) or from metadata
      const finalOrderNumber =
        order_number || metadata.order_number || "INT-UNKNOWN";

      const { supabaseInsert } = await import("../../lib/supabase");
      const dbResult = await supabaseInsert("orders", {
        order_number: finalOrderNumber,
        customer_name: metadata.customer_name || "",
        customer_email: metadata.customer_email || "",
        customer_phone: metadata.customer_phone || "",
        courses: metadata.courses || "",
        course_ids: metadata.course_ids || "",
        total: paymentIntent.amount / 100,
        stripe_payment_id: subscription_id || paymentIntent.id,
        status: "subscription_active",
        payment_type: "monthly",
        terms_accepted_at: metadata.terms_accepted || null,
      });

      if (!dbResult.ok) {
        console.error("[SUPABASE INSERT FAILED] orders (subscription 3DS confirm):", dbResult.status, dbResult.body);
      }

      return new Response(
        JSON.stringify({
          success: true,
          order_number: finalOrderNumber,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // If requires_action still, the user may need to retry
    if (paymentIntent.status === "requires_action") {
      return new Response(
        JSON.stringify({
          error: "3D Secure verification was not completed. Please try again.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
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
