# Environment and deployment

The current application is Vite. Copy `.env.example` to `.env.local` for local development.

## Browser-safe variables

- `VITE_SUPABASE_URL`: Supabase project URL.
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous/publishable key. This key is safe for browser use only when RLS is enabled.

## Server-only variables (future Next.js/Edge Functions)

- `SUPABASE_SERVICE_ROLE_KEY`: never expose to client code, never prefix with `VITE_`, and store only in Vercel/Supabase server environments.
- `AI_PROVIDER_API_KEY`: server-only key for the research importer.

No secret values belong in Git. Apply migrations through Supabase CLI or the dashboard against a staging project first.
