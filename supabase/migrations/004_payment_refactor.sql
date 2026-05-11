-- Migration 004: Payment model refactor
-- Captures every schema change applied between 2026-05-07 and 2026-05-11 via the
-- Supabase MCP tool. Idempotent — safe to re-run.
--
-- Together with migrations 001/002/003, this brings a fresh database to the state
-- required by the live application code (post-registration-fee refactor).
--
-- New model: customer pays £20 registration fee + 12 monthly installments.
-- Total = course.price (inc VAT). Card or BACS Direct Debit (single method per signup).

-- ============================================================================
-- enquiries — add missing columns referenced by code
-- ============================================================================
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS utm_source TEXT DEFAULT NULL;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS utm_campaign TEXT DEFAULT NULL;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries(email);

CREATE OR REPLACE FUNCTION public.update_enquiries_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enquiries_updated_at ON public.enquiries;
CREATE TRIGGER enquiries_updated_at BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_enquiries_updated_at();

-- ============================================================================
-- orders — add all columns the application writes
-- ============================================================================
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_type TEXT NOT NULL DEFAULT 'one_time';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS monthly_amount NUMERIC(10,2) DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subscription_months INTEGER DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS stripe_mandate_id TEXT DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subscription_start TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS first_payment_date DATE DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC(10,2) DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS registration_fee NUMERIC(10,2) DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

COMMENT ON COLUMN public.orders.payment_method IS 'card | bacs_debit | NULL (for legacy one-time payments)';
COMMENT ON COLUMN public.orders.registration_fee IS '£20 inc-VAT fixed registration fee. NULL for one-time payments.';
COMMENT ON COLUMN public.orders.first_payment_date IS 'For monthly plans: anchor date for first installment, customer-chosen.';
COMMENT ON COLUMN public.orders.deposit_amount IS 'LEGACY column from earlier two-method DD design. Not written by current code.';

CREATE INDEX IF NOT EXISTS idx_orders_payment_type ON public.orders(payment_type);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_subscription_id ON public.orders(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_first_payment_date ON public.orders(first_payment_date);

CREATE OR REPLACE FUNCTION public.update_orders_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_orders_updated_at();

-- ============================================================================
-- CHECK constraints — prevent typos & enforce the trimmed status set
-- ============================================================================
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check
  CHECK (status IN ('paid', 'subscription_active', 'failed'));

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_subscription_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_subscription_status_check
  CHECK (subscription_status IS NULL OR subscription_status IN (
    'active', 'past_due', 'canceled', 'incomplete',
    'incomplete_expired', 'paused', 'trialing', 'unpaid'
  ));

-- ============================================================================
-- payment_log — per-collection audit trail (one row per Stripe charge / DD)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payment_log (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES public.orders(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL,
  stripe_event_id TEXT UNIQUE,
  stripe_invoice_id TEXT,
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  amount NUMERIC(10,2),
  currency TEXT DEFAULT 'gbp',
  status TEXT NOT NULL,
  payment_method TEXT,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  raw_event JSONB
);

CREATE INDEX IF NOT EXISTS idx_payment_log_order_number ON public.payment_log(order_number);
CREATE INDEX IF NOT EXISTS idx_payment_log_stripe_invoice ON public.payment_log(stripe_invoice_id);
CREATE INDEX IF NOT EXISTS idx_payment_log_occurred_at ON public.payment_log(occurred_at DESC);

ALTER TABLE public.payment_log ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- webhook_events — idempotency guard for Stripe webhook retries
-- Atomic claim via UNIQUE on stripe_event_id (see /api/stripe-webhook.ts).
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.webhook_events (
  stripe_event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
