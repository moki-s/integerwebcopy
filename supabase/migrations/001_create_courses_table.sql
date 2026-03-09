-- Create courses table with all fields needed for course page editing
-- This mirrors the Course interface in src/data/courses.ts

CREATE TABLE IF NOT EXISTS courses (
  -- Core fields
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  old_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  monthly_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  old_monthly_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  students INTEGER NOT NULL DEFAULT 0,
  badge TEXT NOT NULL DEFAULT '',
  badge_color TEXT NOT NULL DEFAULT '#2F855A',
  image TEXT NOT NULL DEFAULT '',
  overview TEXT NOT NULL DEFAULT '',
  curriculum JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Extended page content fields
  description TEXT,                          -- Long-form "About this course" content
  glance_points JSONB DEFAULT NULL,          -- "Course at a Glance" bullet points (string[])
  whats_included JSONB DEFAULT NULL,         -- Override "What's Included" list (string[])
  benefits JSONB DEFAULT NULL,               -- Override benefits list (string[])
  faqs JSONB DEFAULT NULL,                   -- Per-course FAQs ([{question, answer}])
  career_roles JSONB DEFAULT NULL,           -- Career roles + salaries ([{title, salary}])
  avg_salary TEXT,                           -- Average salary string (e.g., "£35,000+")
  pass_rate INTEGER DEFAULT NULL,            -- Pass rate percentage (e.g., 93)
  study_hours INTEGER DEFAULT NULL,          -- Notional learning hours
  units INTEGER DEFAULT NULL,               -- Number of course units
  duration TEXT DEFAULT NULL,                -- E.g., "6-12 months"
  assessment_type TEXT DEFAULT NULL,         -- E.g., "Online exams & coursework"
  entry_requirements TEXT DEFAULT NULL,      -- Entry requirement description
  progression_options JSONB DEFAULT NULL,    -- What to do after (string[])
  awarding_body TEXT DEFAULT NULL,           -- E.g., "NCFE", "AAT", "HABC"
  qualification_level TEXT DEFAULT NULL,     -- E.g., "Level 2", "Level 5"

  -- SEO fields
  meta_title TEXT DEFAULT NULL,              -- Custom SEO title
  meta_description TEXT DEFAULT NULL,        -- Custom SEO meta description

  -- Admin fields
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_courses_sort_order ON courses(sort_order);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_courses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_courses_updated_at();

-- RLS policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Public read access (for site building)
CREATE POLICY "courses_public_read" ON courses
  FOR SELECT USING (true);

-- Authenticated write access (for admin)
CREATE POLICY "courses_auth_write" ON courses
  FOR ALL USING (auth.role() = 'authenticated');

-- Create course_categories lookup table
CREATE TABLE IF NOT EXISTS course_categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  avg_salary TEXT,
  career_roles JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_public_read" ON course_categories
  FOR SELECT USING (true);

CREATE POLICY "categories_auth_write" ON course_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Seed categories
INSERT INTO course_categories (slug, name, description, avg_salary, career_roles, sort_order) VALUES
  ('accounting', 'Accounting', 'Professional accounting and bookkeeping qualifications', '£35,000+',
   '[{"title":"Accounts Assistant","salary":"£22k - £26k"},{"title":"Bookkeeper","salary":"£24k - £30k"},{"title":"Finance Officer","salary":"£28k - £35k"},{"title":"Management Accountant","salary":"£35k - £50k"}]'::jsonb, 1),
  ('health-social-care', 'Health & Social Care', 'Health, social care, and childcare qualifications', '£28,000+',
   '[{"title":"Care Worker","salary":"£20k - £24k"},{"title":"Senior Care Assistant","salary":"£23k - £28k"},{"title":"Care Home Manager","salary":"£28k - £40k"},{"title":"Social Worker","salary":"£30k - £42k"}]'::jsonb, 2),
  ('business-management', 'Business & Management', 'Leadership and management qualifications', '£32,000+',
   '[{"title":"Team Leader","salary":"£24k - £30k"},{"title":"Office Manager","salary":"£26k - £34k"},{"title":"Operations Manager","salary":"£32k - £45k"},{"title":"Business Manager","salary":"£35k - £50k"}]'::jsonb, 3),
  ('functional-skills', 'Functional Skills', 'Maths and English essential skills qualifications', '£25,000+',
   '[{"title":"Administrative Assistant","salary":"£20k - £24k"},{"title":"Customer Service Advisor","salary":"£21k - £26k"},{"title":"Data Entry Clerk","salary":"£20k - £25k"},{"title":"Teaching Assistant","salary":"£22k - £27k"}]'::jsonb, 4),
  ('security-stewarding', 'Security & Stewarding', 'SIA licence and security qualifications', '£27,000+',
   '[{"title":"Door Supervisor","salary":"£22k - £28k"},{"title":"Security Officer","salary":"£22k - £30k"},{"title":"Event Steward","salary":"£20k - £26k"},{"title":"Security Manager","salary":"£30k - £42k"}]'::jsonb, 5),
  ('occupational-studies', 'Occupational Studies', 'Workplace and vocational qualifications', '£24,000+',
   '[{"title":"Administrative Assistant","salary":"£20k - £24k"},{"title":"Customer Service Advisor","salary":"£21k - £26k"},{"title":"Office Coordinator","salary":"£22k - £28k"},{"title":"Operations Assistant","salary":"£22k - £27k"}]'::jsonb, 6)
ON CONFLICT (slug) DO NOTHING;
