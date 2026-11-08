# UniVara 2.0 — Phase 1: Safe Foundation

## Approved configuration

- Hosting: keep the existing Vercel project and production domain.
- Database: create a separate, new Supabase project for UniVara 2.0.
- GitHub repository: `pranto-design/pranto232454545`.
- Working branch: `univara-v2-rebuild`.
- Production branch: keep `main` unchanged during the rebuild.

## Non-negotiable safety rules

1. Do not make direct commits to `main`.
2. Do not change the production Vercel project's production branch or production environment variables during Phase 1.
3. Do not connect the new Supabase project to the live production deployment yet.
4. Never copy the Supabase `service_role` key into frontend code, Git, screenshots, prompts, or public environment variables.
5. Do not delete or overwrite the existing static data, pages, or current Supabase resources. Treat the current site as the production baseline.
6. All schema changes must be versioned as SQL migrations in the repository and reviewed before being applied.

## Phase 1 objectives

- Establish an isolated rebuild branch.
- Record the current application architecture and deployment baseline.
- Prepare a documented environment-variable contract for local and Vercel preview use.
- Define the new Supabase project setup and access-control baseline.
- Decide the framework migration only after a short technical spike confirms the SEO, routing, and hosting implications. The current app is Vite/React; do not blindly replace it with Next.js before checking route coverage and migration cost.
- Produce a Phase 2 database implementation checklist.

## Current architecture baseline (to verify against the live branch)

The existing application has been identified as a React + TypeScript + Vite application with Tailwind CSS and React Router. Important existing areas include:

- `src/pages/UniversityProfilePage.tsx` — reusable university profile interface.
- `src/data/sampleData.ts` — static/sample university and related data.
- `src/pages/AdminPage.tsx` — current admin interface.
- `src/pages/AuthPage.tsx` — current sign-in interface.
- `src/pages/RepPortalPage.tsx` — university representative interface.
- `src/services/submissionService.ts` — existing submission-related service.

These are migration inputs, not files to delete in Phase 1.

## Hosting plan: existing Vercel project

1. Keep the existing production deployment and domain live.
2. Confirm the Vercel project is connected to this GitHub repository.
3. Keep `main` as the Production Branch.
4. Allow the `univara-v2-rebuild` branch to create a Preview Deployment.
5. Use Preview-only environment variables for the new Supabase project.
6. Do not change production environment variables until the rebuilt site passes acceptance tests and a deliberate cutover is approved.

## Database plan: new Supabase project

Create a new Supabase project with a clear name such as `univara-v2` in a region selected for acceptable latency and data-residency requirements.

After creation, record these values in a password manager (not in Git):

- Project URL
- Project reference / project ID
- Publishable (or legacy anon) key
- Secret service-role key — server-side only; never expose to the browser

Expected environment-variable contract (names may be adapted to the chosen framework):

- `VITE_SUPABASE_URL` — preview/local client URL for the current Vite app.
- `VITE_SUPABASE_ANON_KEY` — preview/local public key for the current Vite app.
- If/when server-side code is introduced, use server-only variables such as `SUPABASE_SERVICE_ROLE_KEY` without a `VITE_` prefix.
- Never commit real values. Keep only placeholders in `.env.example`.

Do not create production tables or import real university records in Phase 1.

## Security baseline for the database phase

- Enable Row Level Security on every table containing user, submission, review, representative, or administrative data.
- Public visitors may read only published university content.
- Only authorized editors/admins may create or publish university records.
- Representatives may submit proposed changes only for universities explicitly assigned to them; proposals require moderation.
- Students may create and manage only their own profile, review, or submission records, subject to moderation rules.
- Use least-privilege policies. Do not rely on hiding admin buttons in the UI as authorization.
- Add indexes for slugs, university foreign keys, publication status, and frequently searched names/aliases.
- Keep fee history and source/verification metadata; do not overwrite historical fee records.

## Phase 1 deliverables and acceptance checklist

- [x] Create isolated branch `univara-v2-rebuild` from `main`.
- [ ] Confirm existing Vercel project and production branch without changing production settings.
- [ ] Create a new Supabase project; keep credentials outside Git.
- [ ] Add a placeholder-only `.env.example` after confirming the framework/client variable names.
- [ ] Run the existing app's install, build, and lint/test commands on the rebuild branch and record any pre-existing failures.
- [ ] Inventory existing routes, components, data types, and current Supabase usage.
- [ ] Complete a framework/SEO technical spike before deciding whether to retain Vite or migrate to Next.js.
- [ ] Review this checklist before beginning Phase 2 migrations.

## Exit criteria

Phase 1 is complete when the production website remains unchanged, the rebuild branch has a working preview path, the new Supabase project is isolated from production, baseline build status is known, and the architecture decision is documented. Only then should Phase 2 add SQL migrations and the normalized university database.
