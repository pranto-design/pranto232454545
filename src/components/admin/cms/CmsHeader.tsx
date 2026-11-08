import { Link } from 'react-router-dom';
import {
  ExternalLink, Save, CheckCircle2, AlertCircle, Clock, Send,
  ShieldCheck, Globe, ChevronDown
} from 'lucide-react';
import { UniversityBasicInfo, ContentStatus } from '@/types/cms';

interface CmsHeaderProps {
  universities: UniversityBasicInfo[];
  selectedUniId: string;
  onSelectUni: (id: string) => void;
  currentUni: UniversityBasicInfo | null;
  sectionTitle: string;
  sectionSubtitle?: string;
  onSave: () => void;
  saving: boolean;
  userRole: string | null;
  onStatusChange: (status: ContentStatus) => void;
}

export default function CmsHeader({
  universities,
  selectedUniId,
  onSelectUni,
  currentUni,
  sectionTitle,
  sectionSubtitle,
  onSave,
  saving,
  userRole,
  onStatusChange,
}: CmsHeaderProps) {
  const isSuperAdmin = userRole === 'super_admin';
  const status = currentUni?.status || 'draft';

  const statusBadge = () => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Published
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 size={12} /> Approved
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={12} /> Pending Review
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle size={12} /> Rejected
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-ink-100 text-ink-700 border border-ink-200">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="bg-white border-b border-ink-200 sticky top-0 z-20 px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: University Selector and Section Header */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Editing Profile:
            </span>
            <div className="relative inline-block">
              <select
                value={selectedUniId}
                onChange={(e) => onSelectUni(e.target.value)}
                className="bg-brand-50/80 border border-brand-200 text-brand-900 text-xs sm:text-sm font-bold rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.shortName})
                  </option>
                ))}
              </select>
            </div>
            {statusBadge()}
          </div>

          <div className="pt-1">
            <h1 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
              {sectionTitle}
            </h1>
            {sectionSubtitle && (
              <p className="text-xs text-ink-500 mt-0.5">{sectionSubtitle}</p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {currentUni && (
            <Link
              to={`/universities/${currentUni.slug}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5"
              title="Preview Live Profile"
            >
              <Globe size={14} />
              <span>Preview Website</span>
              <ExternalLink size={12} className="text-ink-400" />
            </Link>
          )}

          {/* Workflow approval buttons */}
          {status === 'draft' && !isSuperAdmin && (
            <button
              type="button"
              onClick={() => onStatusChange('review')}
              className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5 text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200"
            >
              <Send size={13} /> Submit for Review
            </button>
          )}

          {isSuperAdmin && status === 'review' && (
            <>
              <button
                type="button"
                onClick={() => onStatusChange('approved')}
                className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <CheckCircle2 size={13} /> Approve
              </button>
              <button
                type="button"
                onClick={() => onStatusChange('rejected')}
                className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5 text-red-700 bg-red-50 hover:bg-red-100 border-red-200"
              >
                <AlertCircle size={13} /> Reject
              </button>
            </>
          )}

          {isSuperAdmin && status !== 'published' && (
            <button
              type="button"
              onClick={() => onStatusChange('published')}
              className="btn-primary !py-2 !px-3 text-xs flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <ShieldCheck size={14} /> Publish University
            </button>
          )}

          {isSuperAdmin && status === 'published' && (
            <button
              type="button"
              onClick={() => onStatusChange('draft')}
              className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5 text-ink-600 hover:text-red-600"
              title="Unpublish to Draft"
            >
              Unpublish
            </button>
          )}

          {/* Save button */}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="btn-primary !py-2 !px-4 text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <Save size={14} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

