/**
 * submissionService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised module for all user-generated form submissions (advertising
 * inquiries and university information contributions).
 *
 * BACKEND SETUP REQUIRED
 * ──────────────────────
 * This project already has `@supabase/supabase-js` installed. To activate live
 * submissions, complete these steps:
 *
 *  1. Create a Supabase project at https://supabase.com
 *  2. Create the following tables (SQL migrations are included below as
 *     comments — copy them into the Supabase SQL editor):
 *
 *     CREATE TABLE advertising_inquiries (
 *       id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *       created_at    timestamptz DEFAULT now(),
 *       org_name      text NOT NULL,
 *       contact_person text NOT NULL,
 *       email         text NOT NULL,
 *       phone         text,
 *       ad_type       text NOT NULL,
 *       campaign_details text NOT NULL
 *     );
 *
 *     CREATE TABLE university_submissions (
 *       id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *       created_at         timestamptz DEFAULT now(),
 *       university_name    text NOT NULL,
 *       submission_type    text NOT NULL,
 *       info_category      text NOT NULL,
 *       updated_information text NOT NULL,
 *       source_url         text,
 *       submitter_name     text,
 *       email              text,
 *       status             text DEFAULT 'pending'
 *     );
 *
 *  3. Enable Row Level Security (RLS) and add an INSERT policy that allows
 *     anonymous inserts (or authenticated, depending on your auth strategy).
 *
 *  4. Add the following environment variables to a `.env` file in the project
 *     root (NEVER commit this file — it is already in .gitignore):
 *
 *       VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
 *       VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
 *
 * Until the env vars are present, every submission call will return a
 * ServiceResult with `configured: false` so the UI can show an honest
 * "not yet connected" message instead of a false success.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdvertisingInquiry {
  orgName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  adType: string;
  campaignDetails: string;
}

export interface UniversitySubmission {
  universityName: string;
  submissionType: 'new' | 'correction';
  infoCategory: string;
  updatedInformation: string;
  sourceUrl?: string;
  submitterName?: string;
  email?: string;
}

export type ServiceResult =
  | { ok: true; configured: true }
  | { ok: false; configured: true; error: string }
  | { ok: false; configured: false };

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function isConfigured(): boolean {
  return (
    Boolean(import.meta.env.VITE_SUPABASE_URL) &&
    Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY)
  );
}

/**
 * Lazily creates the Supabase client only when env vars are present, so the
 * app never throws on startup in unconfigured environments.
 */
async function getClient() {
  if (!isConfigured()) return null;
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function submitAdvertisingInquiry(
  data: AdvertisingInquiry,
): Promise<ServiceResult> {
  if (!isConfigured()) return { ok: false, configured: false };

  try {
    const supabase = await getClient();
    if (!supabase) return { ok: false, configured: false };

    const { error } = await supabase.from('advertising_inquiries').insert({
      org_name: data.orgName,
      contact_person: data.contactPerson,
      email: data.email,
      phone: data.phone || null,
      ad_type: data.adType,
      campaign_details: data.campaignDetails,
    });

    if (error) return { ok: false, configured: true, error: error.message };
    return { ok: true, configured: true };
  } catch (err) {
    return {
      ok: false,
      configured: true,
      error: err instanceof Error ? err.message : 'Unexpected error',
    };
  }
}

export async function submitUniversityInformation(
  data: UniversitySubmission,
): Promise<ServiceResult> {
  if (!isConfigured()) return { ok: false, configured: false };

  try {
    const supabase = await getClient();
    if (!supabase) return { ok: false, configured: false };

    const { error } = await supabase.from('university_submissions').insert({
      university_name: data.universityName,
      submission_type: data.submissionType,
      info_category: data.infoCategory,
      updated_information: data.updatedInformation,
      source_url: data.sourceUrl || null,
      submitter_name: data.submitterName || null,
      email: data.email || null,
      status: 'pending',
    });

    if (error) return { ok: false, configured: true, error: error.message };
    return { ok: true, configured: true };
  } catch (err) {
    return {
      ok: false,
      configured: true,
      error: err instanceof Error ? err.message : 'Unexpected error',
    };
  }
}
