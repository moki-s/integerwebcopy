// Replay a specific Stripe event to the local webhook with a valid signature.
// Bypasses `stripe listen` for the cases where it loses an event.
//
// Usage: node scripts/replay-webhook.mjs <evt_id>

import crypto from "node:crypto";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const STRIPE_KEY = env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
const TARGET = "http://localhost:4322/api/stripe-webhook";

const eventId = process.argv[2];
if (!eventId) {
  console.error("usage: node scripts/replay-webhook.mjs <evt_id>");
  process.exit(1);
}

console.log(`Fetching event ${eventId} from Stripe...`);
const evRes = await fetch(`https://api.stripe.com/v1/events/${eventId}`, {
  headers: { Authorization: `Bearer ${STRIPE_KEY}` },
});
if (!evRes.ok) {
  console.error("Failed to fetch event:", await evRes.text());
  process.exit(1);
}
const event = await evRes.json();
console.log("Event type:", event.type);
console.log("Metadata:", event.data?.object?.metadata);

const body = JSON.stringify(event);
const timestamp = Math.floor(Date.now() / 1000);
const signedPayload = `${timestamp}.${body}`;
const signature = crypto
  .createHmac("sha256", WEBHOOK_SECRET)
  .update(signedPayload)
  .digest("hex");
const stripeSignature = `t=${timestamp},v1=${signature}`;

console.log(`POSTing to ${TARGET} with valid signature...`);
const res = await fetch(TARGET, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Stripe-Signature": stripeSignature,
  },
  body,
});
console.log(`Response: HTTP ${res.status}`);
console.log(await res.text());
