import { useState, type FormEvent, type ChangeEvent } from 'react';
import {
  Megaphone,
  Users,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  ChevronRight,
  Mail,
} from 'lucide-react';
import {
  submitAdvertisingInquiry,
  type AdvertisingInquiry,
  type ServiceResult,
} from '@/services/submissionService';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const adOptions = [
  {
    icon: Building2,
    title: 'Sponsored University Profiles',
    desc: 'Highlight your institution at the top of search results and category pages with a fully branded profile.',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: BarChart3,
    title: 'Banner Advertisements',
    desc: 'Reach students through high-visibility banner placements on the homepage and key platform pages.',
    color: 'bg-blueSaaS-50 text-blueSaaS-600',
  },
  {
    icon: Megaphone,
    title: 'Admission Campaign Promotions',
    desc: 'Promote your upcoming admission cycle directly to students actively searching for universities.',
    color: 'bg-emeraldAccent-50 text-emeraldAccent-600',
  },
  {
    icon: BookOpen,
    title: 'Education Partner Listings',
    desc: 'Be listed as a trusted education partner with a dedicated presence across the platform ecosystem.',
    color: 'bg-warningSaaS-50 text-warningSaaS-700',
  },
];

const AD_TYPES = [
  'Sponsored University Profile',
  'Banner Advertisement',
  'Admission Campaign Promotion',
  'Education Partner Listing',
  'Multiple / Custom Package',
];

// ---------------------------------------------------------------------------
// Form state type
// ---------------------------------------------------------------------------

interface FormData {
  orgName: string;
  contactPerson: string;
  email: string;
  phone: string;
  adType: string;
  campaignDetails: string;
}

const INITIAL: FormData = {
  orgName: '',
  contactPerson: '',
  email: '',
  phone: '',
  adType: '',
  campaignDetails: '',
};

type Status = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdvertisePage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate(): boolean {
    const next: Partial<FormData> = {};
    if (!form.orgName.trim()) next.orgName = 'Organization name is required.';
    if (!form.contactPerson.trim()) next.contactPerson = 'Contact person name is required.';
    if (!form.email.trim()) {
      next.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.adType) next.adType = 'Please select an advertisement type.';
    if (!form.campaignDetails.trim()) next.campaignDetails = 'Campaign details are required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerError('');

    const payload: AdvertisingInquiry = {
      orgName: form.orgName.trim(),
      contactPerson: form.contactPerson.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      adType: form.adType,
      campaignDetails: form.campaignDetails.trim(),
    };

    const result: ServiceResult = await submitAdvertisingInquiry(payload);

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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl hero-gradient px-6 py-12 sm:px-10 sm:py-16 mb-12 text-white text-center">
        {/* decorative blobs */}
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <span className="section-eyebrow text-primary-200">
          <Megaphone size={14} /> Partnership & Advertising
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mt-2 mb-4 text-white">
          Advertise With UniHub Bangladesh
        </h1>
        <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
          Connect with students exploring universities and planning their higher
          education in Bangladesh. Reach a highly targeted, intent-driven audience
          at the most important moment of their academic journey.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
          {[
            { icon: Users, stat: '50,000+', label: 'Monthly students' },
            { icon: Building2, stat: '100+', label: 'Universities listed' },
            { icon: BarChart3, stat: '95%', label: 'Decision-stage audience' },
          ].map(({ icon: Icon, stat, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={18} className="text-primary-300" />
              <span className="font-bold text-white">{stat}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Advertising Options ───────────────────────────────────────────── */}
      <section className="mb-14" aria-labelledby="ad-options-heading">
        <div className="section-header text-center mb-8">
          <p className="section-eyebrow justify-center">
            <BookOpen size={14} /> What We Offer
          </p>
          <h2 id="ad-options-heading" className="section-title">
            Advertising Options
          </h2>
          <p className="section-sub max-w-xl mx-auto">
            Choose from a range of flexible advertising packages designed to
            maximize your institution's visibility and student engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {adOptions.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card card-hover p-6 flex flex-col gap-3">
              <div className={`h-12 w-12 rounded-2xl ${color} flex items-center justify-center`}>
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-ink-900 leading-snug">{title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed flex-1">{desc}</p>
              <span className="text-xs text-primary-600 font-semibold flex items-center gap-1 mt-1">
                Learn more <ChevronRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Inquiry Form ─────────────────────────────────────────────────── */}
      <section
        className="max-w-2xl mx-auto"
        aria-labelledby="inquiry-form-heading"
      >
        <div className="card p-7 sm:p-10">
          <h2
            id="inquiry-form-heading"
            className="text-xl sm:text-2xl font-bold text-ink-900 mb-1"
          >
            Submit an Advertising Inquiry
          </h2>
          <p className="text-sm text-ink-500 mb-7">
            Fill in the form below and our partnerships team will get in touch
            within 2–3 business days.
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
                  in your <code className="font-mono bg-warningSaaS-100 px-1 rounded">.env</code>{' '}
                  file. See <code className="font-mono bg-warningSaaS-100 px-1 rounded">src/services/submissionService.ts</code> for setup instructions.
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
              <h3 className="text-lg font-bold text-ink-900">Inquiry Received!</h3>
              <p className="text-sm text-ink-500 max-w-sm">
                Thank you for your interest. Our partnerships team will review your
                inquiry and contact you within 2–3 business days.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-secondary text-sm mt-2"
              >
                Submit Another Inquiry
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

              {/* Row: Org name + Contact person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="adv-orgName"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Organization Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="adv-orgName"
                    name="orgName"
                    type="text"
                    autoComplete="organization"
                    value={form.orgName}
                    onChange={handleChange}
                    placeholder="e.g. North South University"
                    aria-describedby={errors.orgName ? 'adv-orgName-err' : undefined}
                    aria-invalid={Boolean(errors.orgName)}
                    className={`input ${errors.orgName ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                  />
                  {errors.orgName && (
                    <p id="adv-orgName-err" role="alert" className="mt-1 text-xs text-rose-600">
                      {errors.orgName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="adv-contactPerson"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Contact Person <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="adv-contactPerson"
                    name="contactPerson"
                    type="text"
                    autoComplete="name"
                    value={form.contactPerson}
                    onChange={handleChange}
                    placeholder="Full name"
                    aria-describedby={errors.contactPerson ? 'adv-contactPerson-err' : undefined}
                    aria-invalid={Boolean(errors.contactPerson)}
                    className={`input ${errors.contactPerson ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                  />
                  {errors.contactPerson && (
                    <p id="adv-contactPerson-err" role="alert" className="mt-1 text-xs text-rose-600">
                      {errors.contactPerson}
                    </p>
                  )}
                </div>
              </div>

              {/* Row: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="adv-email"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="adv-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contact@example.com"
                    aria-describedby={errors.email ? 'adv-email-err' : undefined}
                    aria-invalid={Boolean(errors.email)}
                    className={`input ${errors.email ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                  />
                  {errors.email && (
                    <p id="adv-email-err" role="alert" className="mt-1 text-xs text-rose-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="adv-phone"
                    className="block text-sm font-semibold text-ink-700 mb-1.5"
                  >
                    Phone Number <span className="text-ink-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    id="adv-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1700 000000"
                    className="input"
                  />
                </div>
              </div>

              {/* Ad type */}
              <div>
                <label
                  htmlFor="adv-adType"
                  className="block text-sm font-semibold text-ink-700 mb-1.5"
                >
                  Advertisement Type <span className="text-rose-500">*</span>
                </label>
                <select
                  id="adv-adType"
                  name="adType"
                  value={form.adType}
                  onChange={handleChange}
                  aria-describedby={errors.adType ? 'adv-adType-err' : undefined}
                  aria-invalid={Boolean(errors.adType)}
                  className={`input ${errors.adType ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                >
                  <option value="">Select advertisement type…</option>
                  {AD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.adType && (
                  <p id="adv-adType-err" role="alert" className="mt-1 text-xs text-rose-600">
                    {errors.adType}
                  </p>
                )}
              </div>

              {/* Campaign details */}
              <div>
                <label
                  htmlFor="adv-campaignDetails"
                  className="block text-sm font-semibold text-ink-700 mb-1.5"
                >
                  Campaign Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="adv-campaignDetails"
                  name="campaignDetails"
                  rows={5}
                  value={form.campaignDetails}
                  onChange={handleChange}
                  placeholder="Describe your campaign goals, target audience, budget range, preferred duration, and any other relevant details…"
                  aria-describedby={errors.campaignDetails ? 'adv-campaignDetails-err' : undefined}
                  aria-invalid={Boolean(errors.campaignDetails)}
                  className={`input resize-none leading-relaxed ${errors.campaignDetails ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-50' : ''}`}
                />
                {errors.campaignDetails && (
                  <p id="adv-campaignDetails-err" role="alert" className="mt-1 text-xs text-rose-600">
                    {errors.campaignDetails}
                  </p>
                )}
              </div>

              {/* Privacy notice */}
              <div className="flex gap-3 rounded-2xl bg-ink-50 border border-ink-200 p-4 text-xs text-ink-500 leading-relaxed">
                <Shield size={16} className="shrink-0 mt-0.5 text-primary-500" />
                <p>
                  <span className="font-semibold text-ink-700">Privacy Notice: </span>
                  The information you submit will be used solely to evaluate your
                  advertising inquiry and to contact you with relevant partnership
                  details. We will not share your personal information with third
                  parties without your consent. By submitting this form, you agree
                  to UniHub Bangladesh's privacy policy and terms of service.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="adv-submit-btn"
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
                    <Mail size={18} />
                    Submit Advertising Inquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact note */}
        <p className="text-center text-xs text-ink-400 mt-5">
          Prefer email?{' '}
          <a
            href="mailto:advertise@unihub.com.bd"
            className="text-primary-600 hover:underline font-medium"
          >
            advertise@unihub.com.bd
          </a>
        </p>
      </section>
    </div>
  );
}
