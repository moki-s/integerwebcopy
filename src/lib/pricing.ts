import { COURSES } from "../data/courses";

// =====================================================================
// Pricing — single source of truth for the registration-fee + 12-installment model
//
// Customer pays 13 charges total per signup:
//   1 × £20 registration fee (today, via card or BACS DD)
// + 12 × monthly installment (from customer-picked first payment date)
//
// The £20 is CARVED OUT of the existing displayed course total (Option B).
// installment = (courseTotalIncVat - 2000) / 12, rounded.
// Up to ~6p rounding drift over 12 installments — documented, acceptable.
// =====================================================================

export const REG_FEE_PENCE = 2000; // £20 inc-VAT, fixed for every course
export const VAT_RATE = 0.2;
export const MONTHS = 12;

/**
 * Sum of `course.price` for the cart. `course.price` in the data is already inc-VAT
 * (the same number shown on pay-in-full checkout). This is the SINGLE source of truth
 * for total customer cost — the same amount they pay whether one-time or monthly.
 * Ignore `course.monthlyPrice` — it's a legacy field from the old "£50 deposit + 12 × X"
 * model and has a 15% premium baked in. New model: reg fee + installments = course.price.
 */
export function courseTotalIncVatPence(courseIds: string[]): number {
  let totalIncVat = 0;
  for (const id of courseIds) {
    const c = COURSES[id];
    if (!c) throw new Error(`Unknown course id: ${id}`);
    totalIncVat += c.price;
  }
  return Math.round(totalIncVat * 100);
}

/** Map cart course IDs to readable course names (for Stripe metadata / emails). */
export function courseNames(courseIds: string[]): string[] {
  return courseIds.map((id) => COURSES[id]?.title || id);
}

/**
 * Given the course total inc VAT in pence, return the registration fee + installment
 * shape. The 12 installments are all the same amount; any rounding remainder
 * (max 11 pence) is left as drift — documented.
 */
export function calculatePlan(courseTotalIncVatPence: number): {
  regFeePence: number;
  installmentPence: number;
  totalChargedPence: number;
  driftPence: number;
} {
  const remainder = courseTotalIncVatPence - REG_FEE_PENCE;
  const installmentPence = Math.round(remainder / MONTHS);
  // Guard against carts so cheap that the monthly installment rounds to 0 or below.
  // Without this, Stripe would reject the Price create with a vague API error.
  // For a £20 reg + 12 installments model, cart needs to be > £20 + 12 pence = £20.12
  // to leave at least 1 pence per installment after rounding.
  if (installmentPence <= 0) {
    throw new Error(
      `Cart total too low for monthly plan. Total £${(courseTotalIncVatPence / 100).toFixed(2)} ` +
        `would leave nothing left after the £20 registration fee. Pick "Pay in Full" instead.`,
    );
  }
  const totalChargedPence = REG_FEE_PENCE + installmentPence * MONTHS;
  return {
    regFeePence: REG_FEE_PENCE,
    installmentPence,
    totalChargedPence,
    driftPence: totalChargedPence - courseTotalIncVatPence,
  };
}

// =====================================================================
// First-installment-date validation
// =====================================================================

/** Add N working days (skipping Sat/Sun) to a date. UK bank holidays not handled — BACS itself adjusts. */
export function addWorkingDays(from: Date, n: number): Date {
  const d = new Date(from);
  let added = 0;
  while (added < n) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return d;
}

export function validateFirstPaymentDate(
  dateStr: string,
  mode: "card" | "bacs_debit",
): { ok: true; date: Date } | { ok: false; reason: string } {
  const chosen = new Date(dateStr + "T00:00:00Z");
  if (Number.isNaN(chosen.getTime())) {
    return { ok: false, reason: "Invalid date format. Use YYYY-MM-DD." };
  }
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const min =
    mode === "bacs_debit"
      ? addWorkingDays(today, 5)
      : (() => {
          const c = new Date(today);
          c.setUTCDate(today.getUTCDate() + 5);
          return c;
        })();
  min.setUTCHours(0, 0, 0, 0);

  const max = new Date(today);
  max.setUTCDate(today.getUTCDate() + 30);
  max.setUTCHours(0, 0, 0, 0);

  if (chosen < min) {
    return {
      ok: false,
      reason: `First installment date must be on or after ${isoDate(min)}.`,
    };
  }
  if (chosen > max) {
    return {
      ok: false,
      reason: `First installment date must be on or before ${isoDate(max)}.`,
    };
  }
  return { ok: true, date: chosen };
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Compute the cancel_at Unix timestamp.
 * cancel_at = anchor + 12 months + 1 day buffer so the 12th invoice fires reliably
 * before Stripe cancels the subscription. (H2: avoid 12th-payment race condition)
 */
export function cancelAtUnix(firstPaymentDate: Date): number {
  const cancel = new Date(firstPaymentDate);
  cancel.setUTCMonth(cancel.getUTCMonth() + 12);
  cancel.setUTCDate(cancel.getUTCDate() + 1);
  return Math.floor(cancel.getTime() / 1000);
}
