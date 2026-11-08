-- ==============================================================================
-- UniVara University CMS & Admin System Migration
-- SAFE, ADDITIVE MIGRATION ONLY - PRESERVES 100% OF EXISTING DATA
-- ==============================================================================

-- 1. Ensure required extensions
create extension if not exists pgcrypto;

-- 2. Role & Status types (if not existing)
do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum ('draft', 'review', 'approved', 'published', 'rejected', 'archived');
  end if;
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('super_admin', 'admin', 'student');
  end if;
end$$;

-- 3. Additive columns for existing universities table
-- (Never drops or overwrites existing columns)
alter table public.universities add column if not exists short_name text;
alter table public.universities add column if not exists type text default 'Private';
alter table public.universities add column if not exists established integer;
alter table public.universities add column if not exists accreditation text;
alter table public.universities add column if not exists verification_status text default 'verified';
alter table public.universities add column if not exists logo_url text;
alter table public.universities add column if not exists cover_photo_url text;
alter table public.universities add column if not exists division text default 'Dhaka';
alter table public.universities add column if not exists location text;
alter table public.universities add column if not exists address text;
alter table public.universities add column if not exists website text;
alter table public.universities add column if not exists email text;
alter table public.universities add column if not exists phone text;
alter table public.universities add column if not exists campus_info text;
alter table public.universities add column if not exists description text;
alter table public.universities add column if not exists information_source text;
alter table public.universities add column if not exists rating numeric default 4.5;
alter table public.universities add column if not exists review_count integer default 0;
alter table public.universities add column if not exists tuition_min numeric default 0;
alter table public.universities add column if not exists tuition_max numeric default 0;
alter table public.universities add column if not exists program_count integer default 0;
alter table public.universities add column if not exists scholarship_available boolean default true;
alter table public.universities add column if not exists faculties jsonb default '[]'::jsonb;
alter table public.universities add column if not exists popular_programs text[] default '{}';
alter table public.universities add column if not exists facilities text[] default '{}';
alter table public.universities add column if not exists admission_test_required boolean default true;
alter table public.universities add column if not exists min_gpa numeric default 3.5;
alter table public.universities add column if not exists seo_title text;
alter table public.universities add column if not exists seo_description text;
alter table public.universities add column if not exists status text default 'published';
alter table public.universities add column if not exists is_published boolean default true;
alter table public.universities add column if not exists design_settings jsonb default '{}'::jsonb;
alter table public.universities add column if not exists seo_settings jsonb default '{}'::jsonb;
alter table public.universities add column if not exists updated_at timestamptz default now();

-- 4. User Roles table (if not exists)
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  role text not null default 'admin', -- 'super_admin' | 'admin'
  created_at timestamptz not null default now()
);

-- 5. Admin University Access Table (for assigning multiple universities to Admins)
create table if not exists public.admin_university_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  university_id uuid not null references public.universities(id) on delete cascade,
  assigned_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique(user_id, university_id)
);

-- 6. Helper functions: is_super_admin() and can_manage_university(target_university_id)
create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'super_admin'
  );
$$;

create or replace function public.can_manage_university(target_university_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select (
    public.is_super_admin() or exists (
      select 1 from public.admin_university_access
      where user_id = auth.uid() and university_id = target_university_id
    )
  );
$$;

-- 7. CMS Section Content Table (Flexible content blocks for complete page control)
create table if not exists public.university_cms_sections (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  section_key text not null, -- 'overview', 'academics', 'facilities', 'admission', 'scholarships', 'contact', etc.
  content jsonb not null default '{}'::jsonb,
  status text not null default 'published',
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(university_id, section_key)
);

-- 8. Programs table (Ensure fields if not exists)
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id) on delete cascade,
  name text not null,
  slug text,
  degree text,
  department text,
  duration text,
  tuition_min numeric default 0,
  tuition_max numeric default 0,
  credits numeric default 0,
  description text,
  admission_requirements text,
  career_opportunities text,
  status text default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 9. Admission Notices table (Ensure fields if not exists)
create table if not exists public.admission_notices (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id) on delete cascade,
  title text not null,
  description text,
  application_start date,
  application_deadline date,
  admission_test_date date,
  application_url text,
  status text default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 10. Scholarships table (Ensure fields if not exists)
create table if not exists public.scholarships (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id) on delete cascade,
  title text not null,
  description text,
  eligibility text,
  amount text,
  deadline date,
  application_url text,
  status text default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 11. Student Leads table (Ensure fields if not exists)
create table if not exists public.student_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  university_id uuid references public.universities(id) on delete set null,
  program text,
  message text,
  status text default 'new',
  created_at timestamptz not null default now()
);

-- 12. Storage bucket: university-assets
insert into storage.buckets (id, name, public)
values ('university-assets', 'university-assets', true)
on conflict (id) do nothing;

-- Storage public read policy
do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Public read university-assets') then
    create policy "Public read university-assets"
    on storage.objects for select
    using (bucket_id = 'university-assets');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Authenticated users upload university-assets') then
    create policy "Authenticated users upload university-assets"
    on storage.objects for insert
    with check (bucket_id = 'university-assets' and auth.role() = 'authenticated');
  end if;
end$$;

-- 13. Enable RLS on all tables
alter table public.universities enable row level security;
alter table public.user_roles enable row level security;
alter table public.admin_university_access enable row level security;
alter table public.university_cms_sections enable row level security;
alter table public.programs enable row level security;
alter table public.admission_notices enable row level security;
alter table public.scholarships enable row level security;
alter table public.student_leads enable row level security;

-- 14. Additive RLS Policies
-- Public Read for published universities
create policy "Allow public read published universities"
on public.universities for select
using (status = 'published' or is_published = true or auth.role() = 'authenticated');

-- Super Admin & Assigned Admin manage universities
create policy "Admins manage universities"
on public.universities for all
using (
  public.is_super_admin() or public.can_manage_university(id)
)
with check (
  public.is_super_admin() or public.can_manage_university(id)
);

-- Public read for published CMS sections
create policy "Public read cms sections"
on public.university_cms_sections for select
using (status = 'published' or auth.role() = 'authenticated');

create policy "Admins manage cms sections"
on public.university_cms_sections for all
using (public.can_manage_university(university_id))
with check (public.can_manage_university(university_id));

-- Student leads security: Admins only can view leads
create policy "Admins view relevant student leads"
on public.student_leads for select
using (
  public.is_super_admin() or (
    university_id is not null and public.can_manage_university(university_id)
  )
);

create policy "Public can submit student leads"
on public.student_leads for insert
with check (true);

