export const prerender = false;

import type { APIRoute } from "astro";

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

/** GET — fetch all orders, newest first */
export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get("x-admin-password");
  if (authHeader !== ADMIN_PASSWORD) return unauthorized();

  const { getSupabaseServerConfig } = await import("../../../lib/supabase");
  const { url, key } = getSupabaseServerConfig();

  if (!url || !key) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch(
    `${url}/rest/v1/orders?order=created_at.desc&limit=500`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();
    console.error("[ADMIN] Failed to fetch orders:", response.status, body);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

/** PATCH — update order status */
export const PATCH: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get("x-admin-password");
  if (authHeader !== ADMIN_PASSWORD) return unauthorized();

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return new Response(JSON.stringify({ error: "id and status are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const allowed = ["pending", "paid", "fulfilled", "refunded", "cancelled"];
  if (!allowed.includes(status)) {
    return new Response(
      JSON.stringify({ error: `Invalid status. Allowed: ${allowed.join(", ")}` }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { getSupabaseServerConfig } = await import("../../../lib/supabase");
  const { url, key } = getSupabaseServerConfig();

  if (!url || !key) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch(`${url}/rest/v1/orders?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[ADMIN] Failed to update order:", response.status, text);
    return new Response(JSON.stringify({ error: "Failed to update" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
