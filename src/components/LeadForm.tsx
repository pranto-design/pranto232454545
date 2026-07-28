import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { universities, programs } from '@/data/sampleData';

export default function LeadForm({
  defaultUniversityId,
  defaultProgramId,
  compact = false,
}: {
  defaultUniversityId?: string;
  defaultProgramId?: string;
  compact?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    preferredUniversityId: defaultUniversityId || '',
    preferredProgramId: defaultProgramId || '',
    background: '', consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card p-6 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
          <CheckCircle2 className="text-emerald-600" size={28} />
        </div>
        <h3 className="font-semibold text-ink-900">Request received!</h3>
        <p className="text-sm text-ink-500 mt-1">
          Thank you, {form.name}. A university admissions counselor will contact you soon. This is a demo — no data was stored.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-secondary mt-4">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`card p-6 ${compact ? '' : 'max-w-xl'}`}>
      <h3 className="font-semibold text-ink-900">Request Admission Information</h3>
      <p className="text-sm text-ink-500 mt-1 mb-4">
        Get contacted by university admissions. Free service for students.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1 block">Full Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Your name" />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1 block">Phone *</label>
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="01XXXXXXXXX" />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1 block">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1 block">HSC/A-Level Background</label>
          <input value={form.background} onChange={(e) => setForm({ ...form, background: e.target.value })} className="input" placeholder="e.g. Science, GPA 4.5" />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1 block">Preferred University</label>
          <select value={form.preferredUniversityId} onChange={(e) => setForm({ ...form, preferredUniversityId: e.target.value })} className="input">
            <option value="">Any</option>
            {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1 block">Preferred Program</label>
          <select value={form.preferredProgramId} onChange={(e) => setForm({ ...form, preferredProgramId: e.target.value })} className="input">
            <option value="">Any</option>
            {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>
      <label className="flex items-start gap-2 mt-4 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-0.5 rounded border-ink-300 text-brand-600 focus:ring-brand-400"
        />
        <span className="text-xs text-ink-600">
          I consent to be contacted by UniVara and partner universities regarding admission information.
        </span>
      </label>
      <button type="submit" disabled={!form.consent} className="btn-primary w-full mt-4">
        <Send size={16} /> Submit Request
      </button>
      <p className="text-[11px] text-ink-400 mt-2 text-center">
        Your information is kept private and shared only with your selected universities.
      </p>
    </form>
  );
}
