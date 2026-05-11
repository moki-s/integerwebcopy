import { createClient } from "@supabase/supabase-js";

// Trim env vars defensively — DO/Cloudflare/etc. dashboards sometimes capture
// trailing newlines or carriage returns when secrets are pasted, which Node's
// fetch rejects as invalid HTTP header values. Trim ALL whitespace including \r\n.
function cleanEnv(name: string): string {
  const v = (import.meta.env[name] as string | undefined) || "";
  return v.replace(/[\s\r\n]+/g, "").trim();
}

const supabaseUrl = cleanEnv("SUPABASE_URL");
const supabaseAnonKey = cleanEnv("SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get the Supabase URL and key for server-side operations.
 * Uses the service_role key (bypasses RLS) — required for order inserts.
 * Falls back to anon key only if service_role is not set (will likely fail on RLS-protected tables).
 */
export function getSupabaseServerConfig(): {
  url: string;
  key: string;
  isServiceRole: boolean;
} {
  const url = cleanEnv("SUPABASE_URL");
  const serviceRoleKey = cleanEnv("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = cleanEnv("SUPABASE_ANON_KEY");

  if (url && serviceRoleKey) {
    return { url, key: serviceRoleKey, isServiceRole: true };
  }
  if (!serviceRoleKey) {
    console.warn("[SUPABASE] SUPABASE_SERVICE_ROLE_KEY is not set — falling back to anon key. Order inserts will fail if RLS is enabled.");
  }
  return { url, key: anonKey, isServiceRole: false };
}

/**
 * Insert a row into a Supabase table via REST API (server-side).
 * Uses service_role key if available to bypass RLS.
 * Returns the fetch Response object.
 */
export async function supabaseInsert(
  table: string,
  data: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; body: string }> {
  const { url, key } = getSupabaseServerConfig();

  if (!url || !key) {
    return { ok: false, status: 0, body: "Supabase not configured" };
  }

  try {
    const response = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(data),
    });

    const body = response.ok ? "" : await response.text();
    return { ok: response.ok, status: response.status, body };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      body: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
