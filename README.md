# UniVara

UniVara is a Bangladesh university discovery platform. The current production-compatible UI remains a Vite React SPA while the database-backed UniVara 2.0 foundation is introduced incrementally.

## UniVara 2.0 foundation

- Branch: `univara-v2-rebuild`
- Migration: `supabase/migrations/202611080001_univara_v2_core.sql`
- Plan and rollback strategy: `docs/V2_MIGRATION_PLAN.md`
- EWU source register: `docs/EWU_SOURCE_REGISTER.md`
- Environment setup: `docs/ENVIRONMENT.md` and `.env.example`

Run `npm run typecheck`, `npm run lint`, and `npm run build` to validate the existing SPA. Do not apply the migration to production without staging RLS tests.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-lbmv2efu)
