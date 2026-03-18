export const prerender = false;

import type { APIRoute } from "astro";
import { COURSES } from "../../data/courses";

export const POST: APIRoute = async ({ request }) => {
  const json = (await request.json()) as {
    payment_method_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    course_ids?: string[];
  };

  const { payment_method_id, first_name, last_name, email, phone, course_ids } =
    json;

  if (
    !payment_method_id ||
    !first_name ||
    !last_name ||
    !email ||
    !phone ||
    !course_ids?.length
  ) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Name validation
  if (first_name.length < 2 || first_name.length > 100 || last_name.length < 2 || last_name.length > 100) {
    return new Response(JSON.stringify({ error: "Name must be between 2 and 100 characters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Phone validation
  const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
  if (!phoneRegex.test(phone)) {
    return new Response(JSON.stringify({ error: "Please enter a valid phone number" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Server-side total calculation (prevents client tampering)
  let total = 0;
  const courseNames: string[] = [];
  const validCourses: typeof COURSES[string][] = [];
  for (const id of course_ids) {
    const course = COURSES[id];
    if (!course) {
      return new Response(JSON.stringify({ error: `Invalid course: ${id}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    validCourses.push(course);
    total += course.price;
    courseNames.push(course.title);
  }

  // Reject enquiry-only courses
  const enquiryOnlyCourses = validCourses.filter(c => c.isEnquiryOnly);
  if (enquiryOnlyCourses.length > 0) {
    return new Response(JSON.stringify({ error: "Some courses require enquiry only and cannot be purchased online." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (total <= 0) {
    return new Response(JSON.stringify({ error: "Cart is empty" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
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
    // Generate order number once (used for both API response and Supabase)
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    const orderNumber = `INT-${yy}${mm}${dd}-${rand}`;

    // Create PaymentIntent via Stripe REST API (avoids SDK compatibility issues with Cloudflare Workers)
    const amountInPence = Math.round(total * 100);
    const params = new URLSearchParams({
      amount: amountInPence.toString(),
      currency: "gbp",
      payment_method: payment_method_id,
      confirmation_method: "manual",
      confirm: "true",
      "metadata[customer_name]": `${first_name} ${last_name}`,
      "metadata[customer_email]": email,
      "metadata[customer_phone]": phone,
      "metadata[course_ids]": course_ids.join(","),
      "metadata[courses]": courseNames.join(", "),
      "metadata[order_number]": orderNumber,
      "metadata[terms_accepted]": new Date().toISOString(),
    });

    // Idempotency key derived from email + cart + amount to prevent duplicate charges
    const idempotencySource = `${email}-${course_ids.sort().join(",")}-${amountInPence}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(idempotencySource);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const idempotencyKey = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);

    const stripeResponse = await fetch(
      "https://api.stripe.com/v1/payment_intents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Idempotency-Key": idempotencyKey,
        },
        body: params.toString(),
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

    if (
      paymentIntent.status === "requires_action" &&
      paymentIntent.next_action?.type === "use_stripe_sdk"
    ) {
      // 3DS required
      return new Response(
        JSON.stringify({
          requires_action: true,
          payment_intent_client_secret: paymentIntent.client_secret,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    if (paymentIntent.status === "succeeded") {
      // Payment successful - store order in Supabase
      const totalWithVat = amountInPence;
      await storeOrder({
        orderNumber,
        customerName: `${first_name} ${last_name}`,
        customerEmail: email,
        customerPhone: phone,
        courses: courseNames.join(", "),
        courseIds: course_ids.join(","),
        total,
        stripePaymentId: paymentIntent.id,
        termsAcceptedAt: new Date().toISOString(),
      });

      // Send confirmation email
      const resendKey = import.meta.env.RESEND_API_KEY;
      if (resendKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Integer Training <noreply@integertraining.com>',
              to: [email],
              subject: `Order Confirmation - ${orderNumber}`,
              html: `<h2>Thank you for your order!</h2>
                <p>Hi ${first_name},</p>
                <p>Your order <strong>${orderNumber}</strong> has been confirmed.</p>
                <p><strong>Courses:</strong> ${courseNames.join(", ")}</p>
                <p><strong>Amount:</strong> \u00A3${(totalWithVat / 100).toFixed(2)}</p>
                <p>Our team will be in touch within 24 hours with your course access details.</p>
                <p>If you have any questions, contact us at info@integertraining.com or call 0121 690 9563.</p>
                <p>Best regards,<br>Integer Training Team</p>`
            }),
          });
        } catch (emailErr) {
          console.error('[EMAIL SEND FAILED]', emailErr);
        }
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
          "Payment could not be processed. Please try again or call us on 0121 690 9563 for assistance.",
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

async function storeOrder(order: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  courses: string;
  courseIds: string;
  total: number;
  stripePaymentId: string;
  termsAcceptedAt: string;
}) {
  const { supabaseInsert } = await import("../../lib/supabase");
  const result = await supabaseInsert("orders", {
    order_number: order.orderNumber,
    customer_name: order.customerName,
    customer_email: order.customerEmail,
    customer_phone: order.customerPhone,
    courses: order.courses,
    course_ids: order.courseIds,
    total: order.total,
    stripe_payment_id: order.stripePaymentId,
    status: "paid",
    terms_accepted_at: order.termsAcceptedAt,
  });

  if (!result.ok) {
    console.error("[SUPABASE INSERT FAILED] orders:", result.status, result.body);
  }
}
