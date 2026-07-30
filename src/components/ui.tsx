import { Star, BadgeCheck, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import type { University, VerificationStatus } from '@/types';
import { useCompare } from '@/context/CompareContext';
import { useSaved } from '@/context/SavedContext';
import { Link } from 'react-router-dom';

export function UniversityLogo({ uni, size = 'md' }: { uni: University; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'h-16 w-16 text-xl' : size === 'sm' ? 'h-9 w-9 text-xs' : 'h-12 w-12 text-base';
  return (
    <div
      className={`${dims} rounded-2xl bg-gradient-to-br ${uni.logoColor} text-white flex items-center justify-center font-bold font-display shadow-sm shrink-0`}
    >
      {uni.logoInitials}
    </div>
  );
}

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-ink-200 text-ink-200'}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-ink-700">{rating.toFixed(1)}</span>
    </div>
  );
}

export function VerificationBadge({ status, size = 'sm' }: { status: VerificationStatus; size?: 'sm' | 'xs' }) {
  const map = {
    verified: { icon: BadgeCheck, label: 'Verified', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    university_verified: { icon: ShieldCheck, label: 'University Verified', cls: 'bg-brand-50 text-brand-700 border-brand-200' },
    community_reported: { icon: AlertTriangle, label: 'Community Reported', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    needs_verification: { icon: HelpCircle, label: 'Needs Verification', cls: 'bg-ink-100 text-ink-600 border-ink-200' },
  };
  const { icon: Icon, label, cls } = map[status];
  const sz = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${cls} ${sz}`}>
      <Icon size={11} />
      {label}
    </span>
  );
}

export function CompareButton({ offeringId }: { offeringId: string }) {
  const { isOfferingSelected, toggleOffering, count } = useCompare();
  const selected = isOfferingSelected(offeringId);
  const disabled = !selected && count >= 4;
  return (
    <button
      onClick={() => toggleOffering(offeringId)}
      disabled={disabled}
      className={`btn text-xs px-3 py-2 ${
        selected
          ? 'bg-brand-600 text-white hover:bg-brand-700'
          : 'bg-white text-ink-700 border border-ink-200 hover:border-brand-300 hover:bg-brand-50'
      }`}
    >
      {selected ? '✓ Comparing' : '+ Compare'}
    </button>
  );
}

export function SaveButton({ universityId }: { universityId: string }) {
  const { isUniversitySaved, toggleUniversity } = useSaved();
  const saved = isUniversitySaved(universityId);
  return (
    <button
      onClick={() => toggleUniversity(universityId)}
      className={`btn text-xs px-3 py-2 ${
        saved
          ? 'bg-accent-600 text-white hover:bg-accent-700'
          : 'bg-white text-ink-700 border border-ink-200 hover:border-accent-300 hover:bg-accent-50'
      }`}
    >
      {saved ? '✓ Saved' : '+ Save'}
    </button>
  );
}

export function EmptyState({ title, message, icon }: { title: string; message: string; icon?: React.ReactNode }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-ink-800">{title}</h3>
      <p className="mt-1 text-sm text-ink-500 max-w-md mx-auto">{message}</p>
    </div>
  );
}

export function SectionHeader({
  title, subtitle, action,
}: {
  title: string; subtitle?: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function UniversityCard({ uni }: { uni: University }) {
  return (
    <div className="card card-hover p-5 flex flex-col h-full">
      <div className="flex items-start gap-3">
        <UniversityLogo uni={uni} />
        <div className="min-w-0 flex-1">
          <Link to={`/universities/${uni.slug}`} className="block">
            <h3 className="font-semibold text-ink-900 leading-tight hover:text-brand-700 line-clamp-2">
              {uni.name}
            </h3>
          </Link>
          <p className="text-xs text-ink-500 mt-0.5">{uni.location} • Est. {uni.established}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-600 line-clamp-2 flex-1">{uni.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {uni.popularPrograms.slice(0, 3).map((p) => (
          <span key={p} className="chip-muted">{p}</span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-500">Tuition (est.)</p>
          <p className="text-sm font-semibold text-ink-800">
            ৳{(uni.tuitionMin / 100000).toFixed(1)}L – ৳{(uni.tuitionMax / 100000).toFixed(1)}L
          </p>
        </div>
        <RatingStars rating={uni.rating} />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Link to={`/universities/${uni.slug}`} className="btn-primary flex-1 text-xs">
          View University
        </Link>
        <Link to={`/universities/${uni.slug}`} className="btn-secondary !px-3 !py-2 text-xs">
          View Programs
        </Link>
      </div>
    </div>
  );
}
