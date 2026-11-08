# UniVara 2.0 — Phase 1: Safe Foundation

## Approved configuration

- Hosting: keep the existing Vercel project and production domain.
- Database: keep and audit the existing Supabase project; do not create a new project.
- GitHub repository: `pranto-design/pranto232454545`.
- Working branch: `univara-v2-rebuild`.
- Production branch: keep `main` unchanged during the rebuild.

## Non-negotiable safety rules

1. Do not make direct commits to `main`.
2. Do not change the production Vercel project's production branch or production environment variables during Phase 1.
3. Treat the existing Supabase project as potentially containing production data. Do not reset it, drop tables, rename tables, alter columns, change policies, or run migrations in Phase 1.
4. Do not point a new Preview Deployment at production database credentials if the preview app can perform writes. Prefer a Supabase staging branch/project or a read-only database role for preview validation. If neither is available, keep database-backed preview features disabled until safe isolation is arranged.
5. Never copy the Supabase `service_role` / secret key into frontend code, Git, screenshots, prompts, or public environment variables.
6. Do not delete or overwrite existing static data, pages, or Supabase resources. Treat the current site and database as the production baseline.
7. All future schema changes must be versioned as SQL migrations in the repository, reviewed, backed up, and tested against a non-production database before production application.
8. Never assume the current schema is empty or matches a proposed schema. Inspect and document it first.

## Phase 1 objectives

- Establish an isolated rebuild branch.
- Record the current application architecture and deployment baseline.
- Identify the existing Supabase project used by the application without exposing credentials.
- Inventory existing tables, columns, constraints, indexes, RLS policies, triggers, functions, storage buckets, and Auth configuration using read-only inspection.
- Prepare an environment-variable contract without committing real values.
- Define a safe preview strategy so preview code cannot accidentally write to production.
- Decide the framework migration only after a technical spike confirms SEO, routing, and hosting implications. The current app is Vite/React; do not blindly replace it with Next.js before checking route coverage and migration cost.
- Produce a Phase 2 database compatibility and migration checklist.

## Current architecture baseline (to verify against the live branch)

The existing application has been identified as a React + TypeScript + Vite application with Tailwind CSS and React Router. Important existing areas include:

- `src/pages/UniversityProfilePage.tsx` — reusable university profile interface.
- `src/data/sampleData.ts` — static/sample university and related data.
- `src/pages/AdminPage.tsx` — current admin interface.
- `src/pages/AuthPage.tsx` — current sign-in interface.
- `src/pages/RepPortalPage.tsx` — university representative interface.
- `src/services/submissionService.ts` — existing submission-related service.

These are migration inputs, not files to delete in Phase 1. Verify actual Supabase imports, queries, and environment variable names from source before changing them.

## Hosting plan: existing Vercel project

1. Keep the existing production deployment and domain live.
2. Confirm the Vercel project is connected to this GitHub repository.
3. Keep `main` as the Production Branch.
4. Allow the `univara-v2-rebuild` branch to create a Preview Deployment.
5. Do not expose production database write credentials to preview deployments.
6. Do not change production environment variables until the rebuilt site passes acceptance tests and a deliberate cutover is approved.

## Database plan: existing Supabase project

Keep the existing Supabase project and preserve its data. Phase 1 is audit-only.

Record the following securely (never commit secrets):

- Existing project URL and project reference.
- Which Vercel environments currently have Supabase variables configured (record variable names and environment scopes, not values).
- Existing public/publishable or anon key configuration.
- Whether any server-side service-role/secret key is used, and where (record locations, never the value).
- Backup/PITR availability and the most recent known backup point.

### Read-only database inventory

Before designing migrations, inspect and document:

- Tables, columns, data types, defaults, primary keys, foreign keys, unique constraints, and check constraints.
- Indexes, triggers, database functions, and views.
- RLS enabled/disabled status and every existing policy.
- Supabase Auth providers and relevant user/profile relationships.
- Storage buckets and their public/private access settings.
- Existing university, program, tuition, admission, scholarship, user, review, submission, and representative data (row counts and shape only; do not expose personal data).

Do not run destructive SQL or broad data exports during this audit. Do not include personal user data in the report.

### Safe preview strategy

Preferred order:

1. Use a Supabase staging branch or a separate staging project if available.
2. Otherwise create a restricted read-only database role for preview inspection, if compatible with the app's access pattern.
3. If neither is practical, do not connect preview to the production database yet. Validate UI with mock data until a safe environment exists.

Do not use the production anon key as a substitute for a safe environment: RLS may still permit writes.

### Environment-variable contract

First inspect the repository and current Vercel settings to confirm exact variable names. Do not blindly rename existing variables.

Likely client-side Vite variables may include:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` or the current publishable-key variable used by this app.

Any service-role/secret key must be server-only, must not have a `VITE_` prefix, and must never be exposed to browser bundles.

Keep only placeholders in `.env.example`. Never commit real values or paste secrets into chat.

## Security and data migration baseline for Phase 2

- Preserve existing table names and data until a reviewed compatibility/migration plan exists.
- Enable or refine RLS only after current policies and app behavior have been documented and tested.
- Public visitors may read only published university content.
- Only authorized editors/admins may create or publish university records.
- Representatives may submit proposed changes only for universities explicitly assigned to them; proposals require moderation.
- Students may create and manage only their own profile, review, or submission records, subject to moderation rules.
- Use least-privilege policies. Hiding admin buttons in the UI is not authorization.
- Add indexes for slugs, university foreign keys, publication status, and frequently searched names/aliases only after query patterns and existing indexes are reviewed.
- Keep fee history and source/verification metadata; do not overwrite historical fee records.
- Every migration must include a rollback or recovery plan where feasible, a backup checkpoint, and validation queries.

## Phase 1 deliverables and acceptance checklist

- [x] Create isolated branch `univara-v2-rebuild` from `main`.
- [x] Record hosting/database decision: existing Vercel + existing Supabase.
- [ ] Confirm existing Vercel project and production branch without changing production settings.
- [ ] Identify the existing Supabase project and current application environment-variable names without exposing values.
- [ ] Confirm backup/PITR availability before any future schema change.
- [ ] Complete a read-only inventory of the existing Supabase schema, RLS, Auth, Storage, functions, and triggers.
- [ ] Run existing app install/build/lint/test commands on the rebuild branch and record pre-existing failures.
- [ ] Inventory existing routes, components, data types, and current Supabase usage.
- [ ] Define a safe Preview database strategy.
- [ ] Complete a framework/SEO technical spike before deciding whether to retain Vite or migrate to Next.js.
- [ ] Review the compatibility plan before beginning Phase 2 migrations.

## Exit criteria

Phase 1 is complete when the production website and existing database remain unchanged, the rebuild branch has a working preview path that cannot write to production, baseline build status is known, the current Supabase schema/security setup is documented, and the framework/architecture decision is recorded. Only then should Phase 2 design additive, compatibility-aware migrations for the existing database.
