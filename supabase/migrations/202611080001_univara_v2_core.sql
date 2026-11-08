-- UniVara 2.0 normalized content model. Apply to staging first.
create extension if not exists pgcrypto;
create type public.content_status as enum ('draft','review','approved','published','archived');
create type public.verification_status as enum ('unverified','pending','verified','university_verified','rejected');
create type public.app_role as enum ('super_admin','admin','editor','university_representative','student');

create table public.user_roles (user_id uuid primary key references auth.users(id) on delete cascade, role public.app_role not null default 'student', created_at timestamptz not null default now());

create table public.universities (id uuid primary key default gen_random_uuid(), slug text not null unique, name text not null, short_name text, name_bn text, website_url text not null, logo_path text, overview text, history text, recognition text, address text, city text, division text, email text, phone text, status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', published_at timestamptz, last_verified_at timestamptz, created_by uuid references auth.users(id), updated_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create table public.university_aliases (id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete cascade, alias text not null, language_code text not null default 'en', unique(university_id,alias));

create table public.information_sources (id uuid primary key default gen_random_uuid(), url text not null unique, publisher text, title text, source_type text not null default 'official', accessed_at timestamptz not null default now(), published_at timestamptz, notes text, created_by uuid references auth.users(id));


create table public.campuses (id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete cascade, name text not null, address text, city text, latitude numeric, longitude numeric, status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', source_id uuid references public.information_sources(id), last_verified_at timestamptz);

create table public.faculties (id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete cascade, name text not null, name_bn text, description text, status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', source_id uuid references public.information_sources(id), last_verified_at timestamptz, unique(university_id,name));

create table public.departments (id uuid primary key default gen_random_uuid(), faculty_id uuid not null references public.faculties(id) on delete cascade, name text not null, name_bn text, description text, status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', source_id uuid references public.information_sources(id), last_verified_at timestamptz, unique(faculty_id,name));


create table public.tuition_fee_structures (id uuid primary key default gen_random_uuid(), offering_id uuid not null references public.program_offerings(id) on delete cascade, fee_name text not null, amount numeric, currency text not null default 'BDT', unit text, effective_from date, effective_to date, source_id uuid references public.information_sources(id), status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', last_verified_at timestamptz);

create table public.admission_requirements (id uuid primary key default gen_random_uuid(), offering_id uuid references public.program_offerings(id) on delete cascade, requirement text not null, name_bn text, source_id uuid references public.information_sources(id), status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', last_verified_at timestamptz);

create table public.admission_deadlines (id uuid primary key default gen_random_uuid(), offering_id uuid references public.program_offerings(id) on delete cascade, intake text, deadline timestamptz, application_url text, source_id uuid references public.information_sources(id), status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', last_verified_at timestamptz);

create table public.scholarships (id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete cascade, name text not null, name_bn text, eligibility text, award_description text, application_url text, source_id uuid references public.information_sources(id), status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', last_verified_at timestamptz);

create table public.university_media (id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete cascade, storage_path text, external_url text, alt_text text not null, media_type text not null default 'image', source_id uuid references public.information_sources(id), status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', last_verified_at timestamptz, check(storage_path is not null or external_url is not null));

create table public.university_facilities (id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete cascade, name text not null, name_bn text, description text, source_id uuid references public.information_sources(id), status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', last_verified_at timestamptz);

create table public.university_faqs (id uuid primary key default gen_random_uuid(), university_id uuid not null references public.universities(id) on delete cascade, question text not null, question_bn text, answer text not null, answer_bn text, source_id uuid references public.information_sources(id), status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', last_verified_at timestamptz);


create table public.university_representative_assignments (user_id uuid not null references auth.users(id) on delete cascade, university_id uuid not null references public.universities(id) on delete cascade, approved_by uuid references auth.users(id), created_at timestamptz not null default now(), primary key(user_id,university_id));

create table public.ai_import_jobs (id uuid primary key default gen_random_uuid(), university_name text not null, official_website text not null, status public.content_status not null default 'draft', extracted_payload jsonb not null default '{}'::jsonb, source_urls text[] not null default '{}', missing_fields text[] not null default '{}', conflicts jsonb not null default '[]'::jsonb, created_by uuid not null references auth.users(id), reviewed_by uuid references auth.users(id), created_at timestamptz not null default now(), reviewed_at timestamptz);


create table public.audit_logs (id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id), action text not null, table_name text not null, record_id uuid, before_data jsonb, after_data jsonb, created_at timestamptz not null default now());

create table public.academic_programs (id uuid primary key default gen_random_uuid(), department_id uuid references public.departments(id) on delete set null, name text not null, name_bn text, degree_level text, description text, status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', source_id uuid references public.information_sources(id), last_verified_at timestamptz);

create table public.program_offerings (id uuid primary key default gen_random_uuid(), program_id uuid not null references public.academic_programs(id) on delete cascade, campus_id uuid references public.campuses(id) on delete set null, intake text, duration text, credit_count numeric, status public.content_status not null default 'draft', verification_status public.verification_status not null default 'unverified', source_id uuid references public.information_sources(id), last_verified_at timestamptz);

create index universities_status_idx on public.universities(status, verification_status);

create index universities_name_search_idx on public.universities using gin (to_tsvector('simple', name || ' ' || coalesce(name_bn,'') || ' ' || coalesce(short_name,'')));

create index university_aliases_lookup_idx on public.university_aliases(lower(alias));

create or replace function public.has_role(required_role public.app_role) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.user_roles where user_id=auth.uid() and (role=required_role or role in ('super_admin','admin'))); $$;

create or replace function public.can_edit_university(target_id uuid) returns boolean language sql stable security definer set search_path = public as $$ select public.has_role('editor') or exists (select 1 from public.university_representative_assignments where user_id=auth.uid() and university_id=target_id); $$;

alter table public.universities enable row level security;

alter table public.university_aliases enable row level security;

alter table public.information_sources enable row level security;

alter table public.campuses enable row level security;

alter table public.faculties enable row level security;

alter table public.departments enable row level security;

alter table public.academic_programs enable row level security;

alter table public.program_offerings enable row level security;

alter table public.tuition_fee_structures enable row level security;

alter table public.admission_requirements enable row level security;

alter table public.admission_deadlines enable row level security;

alter table public.scholarships enable row level security;

alter table public.university_media enable row level security;

alter table public.university_facilities enable row level security;

alter table public.university_faqs enable row level security;

alter table public.user_roles enable row level security;

alter table public.university_representative_assignments enable row level security;

alter table public.ai_import_jobs enable row level security;

alter table public.audit_logs enable row level security;

-- Published child records are readable only when their parent university is published and verified.
create policy published_universities_read on public.universities for select using (status='published' and verification_status in ('verified','university_verified'));

create policy staff_universities_read on public.universities for select using (public.has_role('editor') or public.can_edit_university(id));

create policy staff_universities_insert on public.universities for insert with check (public.has_role('editor'));

create policy staff_universities_update on public.universities for update using (public.can_edit_university(id)) with check (public.can_edit_university(id));

create policy admins_publish on public.universities for update using (public.has_role('admin')) with check (public.has_role('admin'));

create policy published_sources_read on public.information_sources for select using (exists (select 1 from public.universities u where u.status='published' and u.verification_status in ('verified','university_verified')));

create policy editors_manage_sources on public.information_sources for all using (public.has_role('editor')) with check (public.has_role('editor'));

create policy own_role_read on public.user_roles for select using (user_id=auth.uid() or public.has_role('admin'));

create policy admins_manage_roles on public.user_roles for all using (public.has_role('admin')) with check (public.has_role('admin'));

create policy reps_read_assignments on public.university_representative_assignments for select using (user_id=auth.uid() or public.has_role('admin'));

create policy admins_manage_assignments on public.university_representative_assignments for all using (public.has_role('admin')) with check (public.has_role('admin'));

create policy editors_manage_imports on public.ai_import_jobs for all using (public.has_role('editor')) with check (public.has_role('editor'));

create policy admins_read_audit_logs on public.audit_logs for select using (public.has_role('admin'));


create policy published_aliases_read on public.university_aliases for select using (exists (select 1 from public.universities u where u.id=university_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_campuses_read on public.campuses for select using (exists (select 1 from public.universities u where u.id=university_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_faculties_read on public.faculties for select using (exists (select 1 from public.universities u where u.id=university_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_scholarships_read on public.scholarships for select using (exists (select 1 from public.universities u where u.id=university_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_facilities_read on public.university_facilities for select using (exists (select 1 from public.universities u where u.id=university_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_media_read on public.university_media for select using (exists (select 1 from public.universities u where u.id=university_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_faqs_read on public.university_faqs for select using (exists (select 1 from public.universities u where u.id=university_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_departments_read on public.departments for select using (exists (select 1 from public.faculties f join public.universities u on u.id=f.university_id where f.id=faculty_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_programs_read on public.academic_programs for select using (exists (select 1 from public.departments d join public.faculties f on f.id=d.faculty_id join public.universities u on u.id=f.university_id where d.id=department_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_offerings_read on public.program_offerings for select using (exists (select 1 from public.academic_programs p join public.departments d on d.id=p.department_id join public.faculties f on f.id=d.faculty_id join public.universities u on u.id=f.university_id where p.id=program_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_fees_read on public.tuition_fee_structures for select using (exists (select 1 from public.program_offerings o join public.academic_programs p on p.id=o.program_id join public.departments d on d.id=p.department_id join public.faculties f on f.id=d.faculty_id join public.universities u on u.id=f.university_id where o.id=offering_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_requirements_read on public.admission_requirements for select using (exists (select 1 from public.program_offerings o join public.academic_programs p on p.id=o.program_id join public.departments d on d.id=p.department_id join public.faculties f on f.id=d.faculty_id join public.universities u on u.id=f.university_id where o.id=offering_id and u.status='published' and u.verification_status in ('verified','university_verified')));

create policy published_deadlines_read on public.admission_deadlines for select using (exists (select 1 from public.program_offerings o join public.academic_programs p on p.id=o.program_id join public.departments d on d.id=p.department_id join public.faculties f on f.id=d.faculty_id join public.universities u on u.id=f.university_id where o.id=offering_id and u.status='published' and u.verification_status in ('verified','university_verified')));

