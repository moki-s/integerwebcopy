export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Honeypot check
  if (data.get("_honey")) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const phone = data.get("phone")?.toString().trim() ?? "";
  const service = data.get("service")?.toString().trim() ?? "";
  const message = data.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Store in Supabase — this is the critical operation
    const { supabaseInsert } = await import("../../lib/supabase");
    const dbResult = await supabaseInsert("enquiries", {
      name,
      email,
      phone,
      course_interest: service,
      message,
      page: "contact",
      source: "website",
    });

    if (!dbResult.ok) {
      console.error("[SUPABASE INSERT FAILED] enquiries:", dbResult.status, dbResult.body);
      return new Response(
        JSON.stringify({ error: "Failed to submit enquiry. Please try again or call us directly." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Send email notification via Resend (non-critical — enquiry already stored)
    const resendKey = import.meta.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);

        await resend.emails.send({
          from: "Website Contact Form <noreply@integertraining.com>",
          to: ["info@integertraining.com"],
          subject: `New enquiry from ${name}${service ? ` - ${service}` : ""}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone) || "Not provided"}</p>
            <p><strong>Course Interest:</strong> ${escapeHtml(service) || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (emailErr) {
        console.error("[RESEND EMAIL FAILED]", emailErr);
        // Non-critical — enquiry is already stored in Supabase
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m] || m);
}
