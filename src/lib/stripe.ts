import Stripe from "stripe";

let _stripe: Stripe | null = null;

// Strip ALL whitespace from env vars before use. DO/Cloudflare/etc. UIs
// sometimes capture trailing \r\n when secrets are pasted; Node's fetch
// then rejects the value as an invalid HTTP header (returns 500).
function cleanEnv(name: string): string {
  const v = (import.meta.env[name] as string | undefined) || "";
  return v.replace(/[\s\r\n]+/g, "").trim();
}

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = cleanEnv("STRIPE_SECRET_KEY");
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  _stripe = new Stripe(key, {
    apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
  });
  return _stripe;
}

export function getWebhookSecret(): string {
  const secret = cleanEnv("STRIPE_WEBHOOK_SECRET");
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return secret;
}
