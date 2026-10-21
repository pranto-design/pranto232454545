import { useState, type FormEvent, type ChangeEvent } from 'react';
import {
  DatabaseZap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Info,
  Link as LinkIcon,
  Send,
} from 'lucide-react';
import {
  submitUniversityInformation,
  type UniversitySubmission,
  type ServiceResult,
} from '@/services/submissionService';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INFO_CATEGORIES = [
  'Departments & Faculties',
  'Programs & Courses',
  'Tuition Fees',
  'Admission Requirements',
  'Scholarships',
  'Contact Details',
  'Other',
];

// ---------------------------------------------------------------------------
// Form state
// ---------------------------------------------------------------------------

interface FormData {
  universityName: string;
  submissionType: 'new' | 'correction' | '';
  infoCategory: string;
  updatedInformation: string;
  sourceUrl: string;
  submitterName: string;
  email: string;
}

const INITIAL: FormData = {
  universityName: '',
  submissionType: '',
  infoCategory: '',
  updatedInformation: '',
  sourceUrl: '',
  submitterName: '',
  email: '',
};

type Status = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured';

// Separate errors type so any field can hold a plain string message
interface FormErrors {
  universityName?: string;
  submissionType?: string;
  infoCategory?: string;
  updatedInformation?: string;
  sourceUrl?: string;
  submitterName?: string;
  email?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SubmitInformationPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate(): boolean {
    const next: FormErrors = {};

    if (!form.universityName.trim())
      next.universityName = 'University name is required.';
    if (!form.submissionType)
      next.submissionType = 'Please select a submission type.';
    if (!form.infoCategory)
      next.infoCategory = 'Please select an information category.';
    if (!form.updatedInformation.trim())
      next.updatedInformation = 'The updated information field is required.';
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      next.email = 'Please enter a valid email address.';
    }
    if (
      form.sourceUrl.trim() &&
      !/^https?:\/\/.+/.test(form.sourceUrl.trim())
    ) {
      next.sourceUrl = 'Please enter a valid URL starting with http:// or https://';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerError('');

    const payload: UniversitySubmission = {
      universityName: form.universityName.trim(),
      submissionType: form.submissionType as 'new' | 'correction',
      infoCategory: form.infoCategory,
      updatedInformation: form.updatedInformation.trim(),
      sourceUrl: form.sourceUrl.trim() || undefined,
      submitterName: form.submitterName.trim() || undefined,
      email: form.email.trim() || undefined,
    };

    const result: ServiceResult = await submitUniversityInformation(payload);

    if (!result.configured) {
      setStatus('unconfigured');
    } else if (result.ok) {
      setStatus('success');
      setForm(INITIAL);
    } else {
      setStatus('error');
      setServerError(result.error);
    }
  }

  return (
    <div className="container-page py-10 sm:py-14">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="max-w-2xl mb-10">
        <span className="section-eyebrow">
          <DatabaseZap size={14} /> Community Contributions
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-ink-900 mt-2 mb-4">
          Help Us Keep University Information Accurate
        </h1>
        <p className="text-base text-ink-500 leading-relaxed">
          UniHub Bangladesh relies on contributions from universities,
          students, and visitors to maintain the most accurate and up-to-date
          information. If you have verified information to add or a correction
          to suggest, please use the form below. All submissions are reviewed by
          our team before publication.
        </p>
      </div>

      {/* ── How it works strip ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          {
            step: '1',
            title: 'Submit your information',
            desc: 'Fill in the form with as much detail as possible, including an official source URL.',
            color: 'bg-primary-50 text-primary-600 border-primary-100',
          },
          {
            step: '2',
            title: 'Our team reviews it',
            desc: 'We verify the information against official sources before approving it.',
            color: 'bg-blueSaaS-50 text-blueSaaS-600 border-blueSaaS-100',
          },
          {
            step: '3',
            title: 'Published on the platform',
            desc: 'Once verified, the information goes live and benefits thousands of students.',
            color: 'bg-emeraldAccent-50 text-emeraldAccent-600 border-emeraldAccent-100',
          },
        ].map(({ step, title, desc, color }) => (
          <div key={step} className="card p-5 flex gap-4">
            <div
              className={`h-9 w-9 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 ${color}`}
            >
              {step}
            </div>
            <div>
              <h3 className="font-semibold text-ink-900 text-sm mb-0.5">{title}</h3>
              <p className="text-xs text-ink-500 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Form card ────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto">
        <div className="card p-7 sm:p-10">
          <h2 className="text-xl font-bold text-ink-900 mb-1">
            Submission Form
          </h2>
          <p className="text-sm text-ink-500 mb-7">
            Fields marked with <span className="text-rose-500 font-semibold">*</span> are
            required.
          </p>

          {/* ── Unconfigured notice ──────────────────────────────────────── */}
          {status === 'unconfigured' && (
            <div
              role="alert"
              className="flex gap-3 rounded-2xl bg-warningSaaS-50 border border-warningSaaS-200 p-4 mb-6 text-sm text-warningSaaS-800"
            >
              <AlertCircle size={20} className="shrink-0 mt-0.5 text-warningSaaS-600" />
              <div>
                <p className="font-semibold mb-0.5">Submissions not yet connected</p>
                <p>
                  The backend is not configured. Set{' '}
                  <code className="font-mono bg-warningSaaS-100 px-1 rounded">
                    VITE_SUPABASE_URL
                  </code>{' '}
                  and{' '}
                  <code className="font-mono bg-warningSaaS-100 px-1 rounded">
                    VITE_SUPABASE_ANON_KEY
                  </code>{' '}
                  in your <code className="font-mono bg-warningSaaS-100 px-1 rounded">.env</code> file.
                  See <code className="font-mono bg-warningSaaS-100 px-1 rounded">src/services/submissionService.ts</code> for full setup instructions.
                </p>
              </div>
            </div>
          )}

          {/* ── Success state ────────────────────────────────────────────── */}
          {status === 'success' ? (
            <div
              role="status"
              className="flex flex-col items-center text-center py-10 gap-4"
            >
              <div className="h-16 w-16 rounded-full bg-emeraldAccent-100 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-emeraldAccent-600" />
              </div>
              <h3 className="text-lg font-bold text-ink-900">Submission Received!</h3>
              <p className="text-sm text-ink-500 max-w-sm">
                Thank you for contributing. Our team will review your submission
                and, once verified, publish the information on the platform.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-secondary text-sm mt-2"
              >
                Submit Another Correction
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Server error */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-800"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
                  <div>
                    <p className="font-semibold mb-0.5">Submission failed</p>
                    <p>{serverError || 'An unexpected error occurred. Please try again.'}</p>
                  </div>
                </div>
              )}

              {/* University name */}
              <div>
                <label
                  htmlFor="sub-universityName"
                  className="block text-sm font-semibold text-ink-700 mb-1.5"
                >
                  University Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="sub-universityName"
                  name="universityName"
                  type="text"
                  value={form.universityName}
                  onChange={handleChange}
                  placeholder="e.g. BRAC University"
                  aria-describedby={errors.universityName ? 'sub-universityName-err' : undefined}
                  aria-invalid={Boolean(errors.universityName)}
                  className={`input ${errors.universityName ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                />
                {errors.universityName && (
                  <p id="sub-universityName-err" role="alert" className="mt-1 text-xs text-rose-600">
                    {errors.universityName}
                  </p>
                )}
              </div>

              {/* Row: Submission type + Info category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="sub-submissionType"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Submission Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="sub-submissionType"
                    name="submissionType"
                    value={form.submissionType}
                    onChange={handleChange}
                    aria-describedby={errors.submissionType ? 'sub-submissionType-err' : undefined}
                    aria-invalid={Boolean(errors.submissionType)}
                    className={`input ${errors.submissionType ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                  >
                    <option value="">Select type…</option>
                    <option value="new">New Information</option>
                    <option value="correction">Correction / Update</option>
                  </select>
                  {errors.submissionType && (
                    <p id="sub-submissionType-err" role="alert" className="mt-1 text-xs text-rose-600">
                      {errors.submissionType}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="sub-infoCategory"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Information Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="sub-infoCategory"
                    name="infoCategory"
                    value={form.infoCategory}
                    onChange={handleChange}
                    aria-describedby={errors.infoCategory ? 'sub-infoCategory-err' : undefined}
                    aria-invalid={Boolean(errors.infoCategory)}
                    className={`input ${errors.infoCategory ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                  >
                    <option value="">Select category…</option>
                    {INFO_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.infoCategory && (
                    <p id="sub-infoCategory-err" role="alert" className="mt-1 text-xs text-rose-600">
                      {errors.infoCategory}
                    </p>
                  )}
                </div>
              </div>

              {/* Updated information */}
              <div>
                <label
                  htmlFor="sub-updatedInformation"
                  className="block text-sm font-semibold text-ink-700 mb-1.5"
                >
                  Updated Information <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="sub-updatedInformation"
                  name="updatedInformation"
                  rows={6}
                  value={form.updatedInformation}
                  onChange={handleChange}
                  placeholder="Provide the accurate information in as much detail as possible. For corrections, describe what is currently wrong and what the correct information should be…"
                  aria-describedby={errors.updatedInformation ? 'sub-updatedInformation-err' : undefined}
                  aria-invalid={Boolean(errors.updatedInformation)}
                  className={`input resize-none leading-relaxed ${errors.updatedInformation ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                />
                {errors.updatedInformation && (
                  <p id="sub-updatedInformation-err" role="alert" className="mt-1 text-xs text-rose-600">
                    {errors.updatedInformation}
                  </p>
                )}
              </div>

              {/* Official source URL */}
              <div>
                <label
                  htmlFor="sub-sourceUrl"
                  className="block text-sm font-semibold text-ink-700 mb-1.5"
                >
                  <span className="flex items-center gap-1.5">
                    <LinkIcon size={13} />
                    Official Source URL
                    <span className="text-ink-400 text-xs font-normal">(recommended)</span>
                  </span>
                </label>
                <input
                  id="sub-sourceUrl"
                  name="sourceUrl"
                  type="url"
                  value={form.sourceUrl}
                  onChange={handleChange}
                  placeholder="https://www.university.edu.bd/admissions"
                  aria-describedby={errors.sourceUrl ? 'sub-sourceUrl-err' : 'sub-sourceUrl-hint'}
                  aria-invalid={Boolean(errors.sourceUrl)}
                  className={`input ${errors.sourceUrl ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                />
                {errors.sourceUrl ? (
                  <p id="sub-sourceUrl-err" role="alert" className="mt-1 text-xs text-rose-600">
                    {errors.sourceUrl}
                  </p>
                ) : (
                  <p id="sub-sourceUrl-hint" className="mt-1 text-xs text-ink-400">
                    Link to the official university website or document that confirms this information.
                  </p>
                )}
              </div>

              {/* Row: Submitter name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="sub-submitterName"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Your Name <span className="text-ink-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    id="sub-submitterName"
                    name="submitterName"
                    type="text"
                    autoComplete="name"
                    value={form.submitterName}
                    onChange={handleChange}
                    placeholder="Anonymous"
                    className="input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sub-email"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Email Address <span className="text-ink-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    id="sub-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="for follow-up only"
                    aria-describedby={errors.email ? 'sub-email-err' : undefined}
                    aria-invalid={Boolean(errors.email)}
                    className={`input ${errors.email ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                  />
                  {errors.email && (
                    <p id="sub-email-err" role="alert" className="mt-1 text-xs text-rose-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Review notice */}
              <div className="flex gap-3 rounded-2xl bg-primary-50 border border-primary-100 p-4 text-xs text-primary-800 leading-relaxed">
                <Info size={16} className="shrink-0 mt-0.5 text-primary-500" />
                <p>
                  <span className="font-semibold">Review Notice: </span>
                  All submissions are reviewed by our editorial team before being
                  published. Providing an official source URL significantly speeds
                  up the review process. Submissions that cannot be verified
                  against an official source may not be published.
                </p>
              </div>

              {/* Privacy notice */}
              <div className="flex gap-3 rounded-2xl bg-ink-50 border border-ink-200 p-4 text-xs text-ink-500 leading-relaxed">
                <Shield size={16} className="shrink-0 mt-0.5 text-primary-500" />
                <p>
                  <span className="font-semibold text-ink-700">Privacy Notice: </span>
                  Your name and email are optional and will only be used to
                  contact you if we need clarification on your submission. This
                  information will not be published or shared with third parties.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="sub-submit-btn"
                disabled={status === 'loading'}
                className="btn-primary w-full justify-center py-3.5 text-base"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Information
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
