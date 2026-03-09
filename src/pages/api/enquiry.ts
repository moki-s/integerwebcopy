export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Honeypot
  if (data.get("website")) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const phone = data.get("phone")?.toString().trim() ?? "";
  const courseInterest = data.get("course_interest")?.toString().trim() ?? "";
  const message = data.get("message")?.toString().trim() ?? "";
  const page = data.get("page")?.toString().trim() ?? "website";
  const utmSource = data.get("utm_source")?.toString().trim() ?? "";
  const utmCampaign = data.get("utm_campaign")?.toString().trim() ?? "";

  if (!name || !email || !phone) {
    return new Response(
      JSON.stringify({ error: "Name, email, and phone are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: "Service not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/enquiries`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        course_interest: courseInterest,
        message,
        page,
        source: "website",
        ...(utmSource && { utm_source: utmSource }),
        ...(utmCampaign && { utm_campaign: utmCampaign }),
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to submit enquiry" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Also send email notification via Resend if configured
    const resendKey = import.meta.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Website Enquiry <noreply@integertraining.com>",
          to: ["info@integertraining.com"],
          subject: `New enquiry from ${name}${courseInterest ? ` - ${courseInterest}` : ""}`,
          html: `
            <h2>New Website Enquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Course Interest:</strong> ${escapeHtml(courseInterest) || "Not specified"}</p>
            <p><strong>Message:</strong> ${escapeHtml(message) || "No message"}</p>
            <p><strong>Page:</strong> ${escapeHtml(page)}</p>
            ${utmSource ? `<p><strong>UTM Source:</strong> ${escapeHtml(utmSource)}</p>` : ""}
            ${utmCampaign ? `<p><strong>UTM Campaign:</strong> ${escapeHtml(utmCampaign)}</p>` : ""}
          `,
        });
      } catch {
        // Email failure is non-critical - enquiry already stored in Supabase
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
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
