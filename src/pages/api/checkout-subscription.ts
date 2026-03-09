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

  // Server-side monthly total calculation (prevents client tampering)
  let monthlyTotal = 0;
  const courseNames: string[] = [];
  for (const id of course_ids) {
    const course = COURSES[id];
    if (!course) {
      return new Response(JSON.stringify({ error: `Invalid course: ${id}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    monthlyTotal += course.monthlyPrice;
    courseNames.push(course.title);
  }

  if (monthlyTotal <= 0) {
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

  const stripeHeaders = {
    Authorization: `Bearer ${stripeSecretKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    // Generate order number
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    const orderNumber = `INT-${yy}${mm}${dd}-${rand}`;

    const customerName = `${first_name} ${last_name}`;
    const amountInPence = Math.round(monthlyTotal * 100);

    // --- Step 1: Find or create Stripe Customer ---
    const searchRes = await fetch(
      `https://api.stripe.com/v1/customers?email=${encodeURIComponent(email)}&limit=1`,
      { method: "GET", headers: stripeHeaders },
    );
    const searchData = await searchRes.json();

    let customerId: string;

    if (searchData.data && searchData.data.length > 0) {
      customerId = searchData.data[0].id;
    } else {
      const createCustomerParams = new URLSearchParams({
        email,
        name: customerName,
        phone,
        "metadata[source]": "integer-training-website",
        "metadata[first_order]": orderNumber,
      });

      const createRes = await fetch("https://api.stripe.com/v1/customers", {
        method: "POST",
        headers: stripeHeaders,
        body: createCustomerParams.toString(),
      });
      const customerData = await createRes.json();

      if (customerData.error) {
        return new Response(
          JSON.stringify({
            error: "Could not create customer account. Please try again.",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
      customerId = customerData.id;
    }

    // --- Step 2: Attach PaymentMethod to Customer ---
    const attachParams = new URLSearchParams({
      customer: customerId,
    });

    const attachRes = await fetch(
      `https://api.stripe.com/v1/payment_methods/${payment_method_id}/attach`,
      {
        method: "POST",
        headers: stripeHeaders,
        body: attachParams.toString(),
      },
    );
    const attachData = await attachRes.json();

    if (attachData.error) {
      // If already attached to this customer, that's fine - continue
      if (attachData.error.code !== "resource_already_exists") {
        const friendlyMessage = mapStripeError(attachData.error);
        return new Response(JSON.stringify({ error: friendlyMessage }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Set as default payment method
    const updateCustomerParams = new URLSearchParams({
      "invoice_settings[default_payment_method]": payment_method_id,
    });

    await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
      method: "POST",
      headers: stripeHeaders,
      body: updateCustomerParams.toString(),
    });

    // --- Step 3: Create Product + Price ---
    const productName =
      courseNames.length === 1
        ? courseNames[0]
        : `Course Bundle - ${courseNames.join(", ")}`;

    const productParams = new URLSearchParams({
      name: productName,
      "metadata[course_ids]": course_ids.join(","),
      "metadata[order_number]": orderNumber,
    });

    const productRes = await fetch("https://api.stripe.com/v1/products", {
      method: "POST",
      headers: stripeHeaders,
      body: productParams.toString(),
    });
    const productData = await productRes.json();

    if (productData.error) {
      return new Response(
        JSON.stringify({
          error:
            "Could not set up your subscription. Please try again or call us on 0121 690 9563 for assistance.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const priceParams = new URLSearchParams({
      product: productData.id,
      unit_amount: amountInPence.toString(),
      currency: "gbp",
      "recurring[interval]": "month",
    });

    const priceRes = await fetch("https://api.stripe.com/v1/prices", {
      method: "POST",
      headers: stripeHeaders,
      body: priceParams.toString(),
    });
    const priceData = await priceRes.json();

    if (priceData.error) {
      return new Response(
        JSON.stringify({
          error:
            "Could not set up your subscription. Please try again or call us on 0121 690 9563 for assistance.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // --- Step 4: Create Subscription ---
    // Cancel date: 12 months from now (installment plan end)
    const cancelAt = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

    // Idempotency key to prevent duplicate subscriptions
    const idempotencySource = `sub-${email}-${course_ids.sort().join(",")}-${amountInPence}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(idempotencySource);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const idempotencyKey = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);

    const subscriptionParams = new URLSearchParams({
      customer: customerId,
      "items[0][price]": priceData.id,
      payment_behavior: "default_incomplete",
      "payment_settings[payment_method_types][0]": "card",
      "expand[0]": "latest_invoice.payment_intent",
      "metadata[order_number]": orderNumber,
      "metadata[course_ids]": course_ids.join(","),
      "metadata[courses]": courseNames.join(", "),
      "metadata[customer_name]": customerName,
      "metadata[customer_email]": email,
      "metadata[customer_phone]": phone,
      "metadata[payment_type]": "monthly",
      cancel_at: cancelAt.toString(),
    });

    const subscriptionRes = await fetch(
      "https://api.stripe.com/v1/subscriptions",
      {
        method: "POST",
        headers: {
          ...stripeHeaders,
          "Idempotency-Key": idempotencyKey,
        },
        body: subscriptionParams.toString(),
      },
    );
    const subscription = await subscriptionRes.json();

    if (subscription.error) {
      const friendlyMessage = mapStripeError(subscription.error);
      return new Response(JSON.stringify({ error: friendlyMessage }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Step 5: Handle subscription response ---
    const latestInvoice = subscription.latest_invoice;
    const paymentIntent = latestInvoice?.payment_intent;

    // Subscription is active (payment succeeded immediately)
    if (subscription.status === "active") {
      await storeOrder({
        orderNumber,
        customerName,
        customerEmail: email,
        customerPhone: phone,
        courses: courseNames.join(", "),
        courseIds: course_ids.join(","),
        total: monthlyTotal,
        stripePaymentId: subscription.id,
        status: "subscription_active",
        paymentType: "monthly",
      });

      return new Response(
        JSON.stringify({
          success: true,
          order_number: orderNumber,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // 3DS authentication required
    if (
      paymentIntent &&
      paymentIntent.status === "requires_action" &&
      paymentIntent.next_action?.type === "use_stripe_sdk"
    ) {
      return new Response(
        JSON.stringify({
          requires_action: true,
          payment_intent_client_secret: paymentIntent.client_secret,
          subscription_id: subscription.id,
          order_number: orderNumber,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // Payment intent requires payment method (shouldn't happen since we attached one)
    if (paymentIntent && paymentIntent.status === "requires_payment_method") {
      return new Response(
        JSON.stringify({
          error:
            "Your card was declined. Please try a different card or contact your bank.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Fallback: unexpected status
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
    resource_already_exists:
      "This payment method is already on file. Please try again.",
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
  status: string;
  paymentType: string;
}) {
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return;

  try {
    await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        order_number: order.orderNumber,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,
        courses: order.courses,
        course_ids: order.courseIds,
        total: order.total,
        stripe_payment_id: order.stripePaymentId,
        status: order.status,
        payment_type: order.paymentType,
      }),
    });
  } catch {
    // Silently fail - subscription already created in Stripe
  }
}
