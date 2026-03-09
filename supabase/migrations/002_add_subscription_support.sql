-- Add subscription support: orders table with monthly payment columns + enquiries table
-- Extends the database with e-commerce and lead capture capabilities

-- ============================================================================
-- 1. Create orders table (if it doesn't exist yet)
-- ============================================================================

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL DEFAULT '',
  courses TEXT NOT NULL DEFAULT '',
  course_ids TEXT NOT NULL DEFAULT '',
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  stripe_payment_id TEXT DEFAULT NULL,
  stripe_subscription_id TEXT DEFAULT NULL,
  payment_type TEXT NOT NULL DEFAULT 'one_time',
  monthly_amount NUMERIC(10,2) DEFAULT NULL,
  subscription_months INTEGER DEFAULT NULL,
  subscription_status TEXT DEFAULT NULL,
  subscription_start TIMESTAMPTZ DEFAULT NULL,
  subscription_end TIMESTAMPTZ DEFAULT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 2. Alter orders table to add subscription columns (if table already existed)
-- ============================================================================

ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_type TEXT NOT NULL DEFAULT 'one_time';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT DEFAULT NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS monthly_amount NUMERIC(10,2) DEFAULT NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subscription_months INTEGER DEFAULT NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subscription_start TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMPTZ DEFAULT NULL;

-- ============================================================================
-- 3. Create enquiries table
-- ============================================================================

CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  course_interest TEXT DEFAULT '',
  message TEXT DEFAULT '',
  page TEXT DEFAULT 'website',
  source TEXT DEFAULT 'website',
  utm_source TEXT DEFAULT NULL,
  utm_campaign TEXT DEFAULT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 4. Indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_type ON orders(payment_type);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- ============================================================================
-- 5. Updated_at triggers
-- ============================================================================

CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();

CREATE OR REPLACE FUNCTION update_enquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_enquiries_updated_at();

-- ============================================================================
-- 6. RLS policies
-- ============================================================================

-- Orders: public read for site, authenticated write for admin
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_public_read" ON orders
  FOR SELECT USING (true);

CREATE POLICY "orders_auth_write" ON orders
  FOR ALL USING (auth.role() = 'authenticated');

-- Enquiries: public read for site, authenticated write for admin
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enquiries_public_read" ON enquiries
  FOR SELECT USING (true);

CREATE POLICY "enquiries_auth_write" ON enquiries
  FOR ALL USING (auth.role() = 'authenticated');
