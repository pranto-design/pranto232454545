-- UniVara 2.0 University CMS Database Schema
-- Provides complete dynamic content management for university profile websites

-- Enable pgcrypto for UUIDs if not already enabled
create extension if not exists pgcrypto;

-- 1. Status and Roles Enum types (if not already defined)
do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum ('draft', 'review', 'approved', 'published', 'rejected', 'archived');
  end if;
end$$;

-- 2. Ensure universities table has all CMS columns
alter table public.universities add column if not exists type text default 'Private';
alter table public.universities add column if not exists cover_image text;
alter table public.universities add column if not exists ugc_approved boolean default true;
alter table public.universities add column if not exists ugc_approval_info text;
alter table public.universities add column if not exists social_links jsonb default '{}'::jsonb;
alter table public.universities add column if not exists contact_email text;
alter table public.universities add column if not exists contact_phone text;
alter table public.universities add column if not exists full_address text;
alter table public.universities add column if not exists about_text text;
alter table public.universities add column if not exists status text default 'draft';
alter table public.universities add column if not exists is_published boolean default false;
alter table public.universities add column if not exists published_at timestamptz;
alter table public.universities add column if not exists design_settings jsonb default '{}'::jsonb;
alter table public.universities add column if not exists seo_settings jsonb default '{}'::jsonb;

-- 3. Dedicated CMS Section Content Table
-- Stores complete structured section data for each university
create table if not exists public.university_cms_sections (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  section_key text not null, -- 'homepage', 'about', 'academics', 'departments', 'admission', 'tuition', 'facilities', 'faculty_staff', 'research', 'student_life', 'notices', 'gallery', 'contact', 'design', 'seo'
  content jsonb not null default '{}'::jsonb,
  status text not null default 'draft', -- 'draft', 'review', 'approved', 'published', 'rejected'
  revision_number integer not null default 1,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(university_id, section_key)
);

-- 4. Dynamic Departments Table
create table if not exists public.university_departments (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  name text not null,
  description text,
  faculty_name text,
  head_of_department text,
  image_url text,
  research_areas text[] default '{}',
  contact_email text,
  contact_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. Dynamic Faculty & Staff Members Table
create table if not exists public.university_faculty_members (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  department_id uuid references public.university_departments(id) on delete set null,
  department_name text,
  name text not null,
  designation text not null,
  photo_url text,
  education text,
  research_interests text,
  email text,
  phone text,
  display_order integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. Dynamic Notices and News Table
create table if not exists public.university_notices (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  title text not null,
  category text not null default 'General', -- 'Admission', 'Academic', 'Exam', 'General', 'Events'
  content text,
  file_url text, -- PDF attachment
  publish_date date default current_date,
  expiry_date date,
  is_pinned boolean default false,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 7. Dynamic Gallery and Media Table
create table if not exists public.university_gallery (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  title text,
  caption text,
  category text not null default 'Campus', -- 'Campus', 'Event', 'Laboratory', 'Classroom', 'Video'
  media_type text not null default 'image', -- 'image', 'video'
  media_url text not null,
  thumbnail_url text,
  display_order integer default 0,
  created_at timestamptz not null default now()
);

-- 8. Content Revision & Audit Logs Table
create table if not exists public.university_cms_audit_logs (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id) on delete cascade,
  actor_id uuid references auth.users(id),
  actor_email text,
  action text not null, -- 'create', 'update', 'submit_review', 'approve', 'publish', 'reject', 'delete'
  entity_type text not null, -- 'university', 'section', 'department', 'faculty', 'notice', 'gallery'
  entity_id text,
  changes jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 9. Storage Bucket setup for University Media
insert into storage.buckets (id, name, public)
values ('university-assets', 'university-assets', true)
on conflict (id) do nothing;

-- Storage public read policy
create policy "Public Access to University Assets"
on storage.objects for select
using (bucket_id = 'university-assets');

-- Storage authenticated upload policy
create policy "Authenticated Users can upload University Assets"
on storage.objects for insert
with check (bucket_id = 'university-assets' and auth.role() = 'authenticated');

-- 10. Enable Row Level Security (RLS)
alter table public.universities enable row level security;
alter table public.university_cms_sections enable row level security;
alter table public.university_departments enable row level security;
alter table public.university_faculty_members enable row level security;
alter table public.university_notices enable row level security;
alter table public.university_gallery enable row level security;
alter table public.university_cms_audit_logs enable row level security;

-- 11. RLS Policies

-- Public Read for Published Universities & CMS Sections
create policy "Public can view published universities"
on public.universities for select
using (status = 'published' or is_published = true or auth.role() = 'authenticated');

create policy "Admins can manage all universities"
on public.universities for all
using (
  auth.role() = 'authenticated' and exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('super_admin', 'admin')
  )
)
with check (
  auth.role() = 'authenticated' and exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('super_admin', 'admin')
  )
);

create policy "Public can view published CMS sections"
on public.university_cms_sections for select
using (status = 'published' or auth.role() = 'authenticated');

create policy "Admins can manage CMS sections"
on public.university_cms_sections for all
using (
  auth.role() = 'authenticated' and exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('super_admin', 'admin')
  )
)
with check (
  auth.role() = 'authenticated' and exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('super_admin', 'admin')
  )
);

-- Repeat for child tables: public read, admin manage
create policy "Public can view departments" on public.university_departments for select using (true);
create policy "Admins manage departments" on public.university_departments for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can view faculty members" on public.university_faculty_members for select using (true);
create policy "Admins manage faculty members" on public.university_faculty_members for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can view notices" on public.university_notices for select using (true);
create policy "Admins manage notices" on public.university_notices for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can view gallery" on public.university_gallery for select using (true);
create policy "Admins manage gallery" on public.university_gallery for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins can read audit logs" on public.university_cms_audit_logs for select
using (auth.role() = 'authenticated');
create policy "Admins can insert audit logs" on public.university_cms_audit_logs for insert
with check (auth.role() = 'authenticated');

