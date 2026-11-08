# UniVara 2.0 migration plan

## Audit baseline

- The repository is a Vite React 18 SPA using React Router, Tailwind, Framer Motion and Recharts.
- `src/data/sampleData.ts` is the current read model for universities, programs, fees, notices, scholarships, reviews, community posts and leads.
- `src/pages/AuthPage.tsx`, `AdminPage.tsx` and `RepPortalPage.tsx` are presentation-only flows; they do not enforce identity or permissions.
- Supabase JS is already installed and is used by `src/services/submissionService.ts` for optional public submissions.
- An existing uncommitted edit to `src/pages/ProgramDetailsPage.tsx` was preserved in `pre-v2-working-tree.patch`.

## Safety and migration strategy

1. Keep the existing SPA and static read model deployable while Supabase is provisioned.
2. Apply `supabase/migrations/202611080001_univara_v2_core.sql` to a non-production Supabase project first.
3. Import legacy records into staging tables or explicit mapping scripts; do not drop `sampleData.ts` until row counts and user-generated records are reconciled.
4. Publish only records with `approved`/`published` workflow state and a source record. Existing static data is treated as legacy display data, not verified truth.
5. Run RLS tests with anonymous, student, editor, representative and admin identities before cutover.
6. Switch public profile reads to the database behind a feature flag, then retain a rollback path to the SPA/static read model.
7. Migrate user-generated tables separately with foreign-key reconciliation; never delete them as part of the university-content migration.

## Current phase delivered

- Feature branch: `univara-v2-rebuild`
- Pre-implementation backup: `docs/pre-v2-ProgramDetailsPage.tsx` (the existing modified file was preserved verbatim).
- Normalized core schema with workflow, attribution, audit logging and RLS.
- Typed, source-attributed East West University seed record based only on official EWU pages reviewed on 2026-11-08.
- Environment and rollout documentation.

## Remaining phases

- Add Next.js App Router as a separate migration phase after route/component parity review.
- Replace mock auth/admin/representative screens with Supabase Auth and database-backed CRUD.
- Build an Edge Function/worker for AI-assisted research; AI output must enter `review` state and cannot publish itself.
- Complete EWU fee, deadline, program and media imports from individual official source pages and approved reusable media.

Because Git emitted no textual diff for the pre-existing modified ProgramDetailsPage.tsx, its exact pre-phase working copy is also preserved at docs/pre-v2-ProgramDetailsPage.tsx.
