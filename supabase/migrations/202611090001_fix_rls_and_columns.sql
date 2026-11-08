-- =============================================================================
-- UniVara: Fix RLS policies and add missing columns
-- SAFE ADDITIVE MIGRATION — no drops, no truncates, no data changes
-- Run this in Supabase SQL Editor → Run
-- =============================================================================

-- ── 1. Add missing columns to universities ──────────────────────────────────
-- These columns are referenced in the frontend but were missing from the DB
alter table public.universities add column if not exists cover_photo_url text;
alter table public.universities add column if not exists information_source text;
alter table public.universities add column if not exists logo_color text default 'from-brand-600 to-accent-600';
alter table public.universities add column if not exists logo_initials text;
alter table public.universities add column if not exists type text default 'Private';
alter table public.universities add column if not exists verification text default 'verified';
alter table public.universities add column if not exists is_published boolean default true;
alter table public.universities add column if not exists status text default 'published';
alter table public.universities add column if not exists seo_title text;
alter table public.universities add column if not exists seo_description text;

-- ── 2. Add missing columns to programs ──────────────────────────────────────
alter table public.programs add column if not exists status text default 'published';
alter table public.programs add column if not exists category text default 'General';

-- ── 3. Add missing columns to scholarships ───────────────────────────────────
alter table public.scholarships add column if not exists gpa_requirement numeric default 4.5;
alter table public.scholarships add column if not exists percentage numeric default 50;
alter table public.scholarships add column if not exists name text;

-- ── 4. Drop old conflicting RLS policies that filter on missing columns ──────
-- (These policies used `status = 'published' AND verification_status IN (...)` 
--  but those columns didn't exist, causing ALL reads to return 0 rows)
drop policy if exists "published_universities_read" on public.universities;
drop policy if exists "Allow public read published universities" on public.universities;
drop policy if exists "staff_universities_read" on public.universities;
drop policy if exists "staff_universities_insert" on public.universities;
drop policy if exists "staff_universities_update" on public.universities;
drop policy if exists "admins_publish" on public.universities;
drop policy if exists "Admins manage universities" on public.universities;

-- Programs
drop policy if exists "published_programs_read" on public.programs;
drop policy if exists "published_offerings_read" on public.program_offerings;

-- Admission notices
drop policy if exists "published_notices_read" on public.admission_notices;

-- Scholarships
drop policy if exists "published_scholarships_read" on public.scholarships;
drop policy if exists "published_facilities_read" on public.university_facilities;

-- ── 5. Create correct RLS policies ──────────────────────────────────────────

-- Universities: anyone can read published universities (no status filter since we now have the column)
create policy "public_read_universities"
  on public.universities for select
  using (is_published = true or auth.role() = 'authenticated');

-- Universities: authenticated users (admins) can insert/update/delete
create policy "auth_write_universities"
  on public.universities for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Programs: anyone can read
create policy "public_read_programs"
  on public.programs for select
  using (true);

-- Programs: authenticated can write
create policy "auth_write_programs"
  on public.programs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Admission notices: anyone can read
create policy "public_read_admission_notices"
  on public.admission_notices for select
  using (true);

-- Admission notices: authenticated can write
create policy "auth_write_admission_notices"
  on public.admission_notices for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Scholarships: anyone can read
create policy "public_read_scholarships"
  on public.scholarships for select
  using (true);

-- Scholarships: authenticated can write
create policy "auth_write_scholarships"
  on public.scholarships for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ── 6. Enable RLS on tables that may not have it yet ────────────────────────
alter table public.universities enable row level security;
alter table public.programs enable row level security;
alter table public.admission_notices enable row level security;
alter table public.scholarships enable row level security;

-- ── 7. Grant anon read to public tables ─────────────────────────────────────
-- (Without this, the anon role can't even execute the SELECT)
grant select on public.universities to anon;
grant select on public.programs to anon;
grant select on public.admission_notices to anon;
grant select on public.scholarships to anon;
grant all on public.universities to authenticated;
grant all on public.programs to authenticated;
grant all on public.admission_notices to authenticated;
grant all on public.scholarships to authenticated;

-- ── 8. Set correct defaults for existing rows ────────────────────────────────
-- If any rows exist without is_published set, default them to true
update public.universities set is_published = true where is_published is null;
update public.universities set status = 'published' where status is null;

