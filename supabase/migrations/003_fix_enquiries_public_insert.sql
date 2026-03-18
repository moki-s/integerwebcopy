-- Allow public (anon) inserts on enquiries table
-- Contact form and course enquiry forms submit without authentication
-- This ensures submissions work even without SUPABASE_SERVICE_ROLE_KEY

CREATE POLICY "enquiries_public_insert" ON enquiries
  FOR INSERT WITH CHECK (true);
