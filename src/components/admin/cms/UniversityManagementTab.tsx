import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Filter, Edit, Trash2, Copy, Globe, Eye,
  CheckCircle2, XCircle, ShieldCheck, Database, RefreshCw, Upload,
  Building2, MapPin, ExternalLink, AlertTriangle
} from 'lucide-react';
import { UniversityBasicInfo, ContentStatus, UniversityType } from '@/types/cms';
import MediaUploader from './MediaUploader';

interface UniversityManagementTabProps {
  universities: UniversityBasicInfo[];
  onSelectForEdit: (uniId: string, section?: string) => void;
  onSaveBasic: (basic: Partial<UniversityBasicInfo> & { id: string }) => Promise<void>;
  onDuplicate: (uniId: string) => Promise<void>;
  onDelete: (uniId: string) => Promise<void>;
  onStatusToggle: (uniId: string, status: ContentStatus) => Promise<void>;
  onSyncSeedData: () => Promise<void>;
  isSuperAdmin: boolean;
}

export default function UniversityManagementTab({
  universities,
  onSelectForEdit,
  onSaveBasic,
  onDuplicate,
  onDelete,
  onStatusToggle,
  onSyncSeedData,
  isSuperAdmin,
}: UniversityManagementTabProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUni, setEditingUni] = useState<Partial<UniversityBasicInfo> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Filter list
  const filtered = universities.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.shortName.toLowerCase().includes(search.toLowerCase()) ||
      u.slug.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase());

    const matchType = typeFilter === 'all' || u.type === typeFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const handleOpenAdd = () => {
    const newId = `uni-${Date.now()}`;
    setEditingUni({
      id: newId,
      name: '',
      shortName: '',
      slug: '',
      type: 'Private',
      established: 2026,
      accreditation: 'UGC Approved',
      ugcApproved: true,
      ugcApprovalInfo: 'Approved by the University Grants Commission of Bangladesh (UGC).',
      location: 'Dhaka',
      division: 'Dhaka',
      address: '',
      website: 'https://',
      email: '',
      phone: '',
      socialLinks: {},
      description: '',
      status: 'draft',
      isPublished: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (uni: UniversityBasicInfo) => {
    setEditingUni({ ...uni });
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni?.name || !editingUni.id) return;
    try {
      setIsSubmitting(true);
      const slug =
        editingUni.slug?.trim() ||
        editingUni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await onSaveBasic({ ...editingUni, slug } as UniversityBasicInfo);
      setIsModalOpen(false);
      setEditingUni(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTriggerSeed = async () => {
    if (!confirm('Sync default universities into Supabase? Existing data will be safely updated.')) return;
    try {
      setIsSeeding(true);
      await onSyncSeedData();
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
            University Management
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            Create, configure, publish and manage every university profile website on UniVara.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isSuperAdmin && (
            <button
              type="button"
              onClick={handleTriggerSeed}
              disabled={isSeeding}
              className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5"
              title="Sync sample universities directly into Supabase"
            >
              <Database size={14} className={isSeeding ? 'animate-spin text-brand-600' : ''} />
              {isSeeding ? 'Syncing...' : 'Sync Data to Supabase'}
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> Add New University
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white border border-ink-200 shadow-sm">
        <div className="sm:col-span-2 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search universities by name, short code, location, or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 text-xs sm:text-sm py-2"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field text-xs sm:text-sm py-2"
          >
            <option value="all">All University Types</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="International">International</option>
            <option value="Specialized">Specialized</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field text-xs sm:text-sm py-2"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="approved">Approved</option>
            <option value="review">Pending Review</option>
            <option value="draft">Draft</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* University Cards Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((u) => {
          const isPub = u.status === 'published' || u.isPublished;
          return (
            <div
              key={u.id}
              className="card p-5 bg-white border border-ink-200/90 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {u.logoUrl ? (
                      <img
                        src={u.logoUrl}
                        alt={u.name}
                        className="h-12 w-12 rounded-xl object-contain border border-ink-100 p-1 bg-white shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {u.shortName || u.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-ink-900 truncate" title={u.name}>
                        {u.name}
                      </h3>
                      <p className="text-xs text-ink-500 font-medium">
                        {u.shortName} • Est. {u.established}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                      isPub
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : u.status === 'review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-ink-100 text-ink-600'
                    }`}
                  >
                    {isPub ? 'Published' : u.status}
                  </span>
                </div>

                {/* Info Pills */}
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-ink-600">
                  <span className="bg-ink-50 px-2 py-0.5 rounded-md border border-ink-100 flex items-center gap-1">
                    <Building2 size={12} className="text-brand-600" /> {u.type}
                  </span>
                  <span className="bg-ink-50 px-2 py-0.5 rounded-md border border-ink-100 flex items-center gap-1">
                    <MapPin size={12} className="text-brand-600" /> {u.location}
                  </span>
                  {u.ugcApproved && (
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                      <ShieldCheck size={12} /> UGC Approved
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs text-ink-500 line-clamp-2 leading-relaxed">
                  {u.description || 'No overview text provided yet.'}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onSelectForEdit(u.id, 'homepage')}
                    className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1"
                  >
                    <Edit size={13} /> Edit Website
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(u)}
                    className="btn-secondary !py-1.5 !px-2.5 text-xs text-ink-700"
                    title="Edit Basic Details"
                  >
                    Info
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    to={`/universities/${u.slug}?preview=true`}
                    target="_blank"
                    className="p-1.5 text-ink-400 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition"
                    title="Live Preview"
                  >
                    <Eye size={15} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onDuplicate(u.id)}
                    className="p-1.5 text-ink-400 hover:text-ink-700 rounded-lg hover:bg-ink-100 transition"
                    title="Duplicate University Profile"
                  >
                    <Copy size={15} />
                  </button>

                  {isSuperAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${u.name}?`)) {
                          onDelete(u.id);
                        }
                      }}
                      className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      title="Delete University"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-12 text-center bg-white border border-dashed border-ink-300">
          <Building2 size={36} className="mx-auto text-ink-400 mb-3" />
          <h3 className="text-base font-bold text-ink-900">No universities found</h3>
          <p className="text-xs text-ink-500 max-w-sm mx-auto mt-1">
            Try adjusting your search terms or add a new university profile to UniVara.
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-primary !py-2 !px-4 text-xs mt-4 inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add University
          </button>
        </div>
      )}

      {/* Add / Edit Basic Information Modal */}
      {isModalOpen && editingUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-ink-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-ink-100">
              <h2 className="text-lg font-bold text-ink-900">
                {editingUni.name ? `Edit ${editingUni.name}` : 'Add New University'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 hover:text-ink-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink-700">University Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingUni.name || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, name: e.target.value })}
                    placeholder="American International University-Bangladesh"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Short Name / Acronym *</label>
                  <input
                    type="text"
                    required
                    value={editingUni.shortName || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, shortName: e.target.value })}
                    placeholder="AIUB"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingUni.slug || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, slug: e.target.value })}
                    placeholder="aiub"
                    className="input-field text-xs mt-1"
                  />
                  <p className="text-[10px] text-ink-400 mt-0.5">Website URL: /universities/[slug]</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">University Type</label>
                  <select
                    value={editingUni.type || 'Private'}
                    onChange={(e) => setEditingUni({ ...editingUni, type: e.target.value as UniversityType })}
                    className="input-field text-xs mt-1"
                  >
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="International">International</option>
                    <option value="Specialized">Specialized</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Established Year</label>
                  <input
                    type="number"
                    value={editingUni.established || 2000}
                    onChange={(e) => setEditingUni({ ...editingUni, established: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Accreditation Info</label>
                  <input
                    type="text"
                    value={editingUni.accreditation || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, accreditation: e.target.value })}
                    placeholder="UGC, IEB, ACBSP"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Location / Area</label>
                  <input
                    type="text"
                    value={editingUni.location || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, location: e.target.value })}
                    placeholder="Kuratoli, Kuril, Dhaka"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Division</label>
                  <input
                    type="text"
                    value={editingUni.division || 'Dhaka'}
                    onChange={(e) => setEditingUni({ ...editingUni, division: e.target.value })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Official Website URL</label>
                  <input
                    type="url"
                    value={editingUni.website || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, website: e.target.value })}
                    placeholder="https://www.aiub.edu"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Official Contact Email</label>
                  <input
                    type="email"
                    value={editingUni.email || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, email: e.target.value })}
                    placeholder="info@aiub.edu"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Phone Number</label>
                  <input
                    type="tel"
                    value={editingUni.phone || ''}
                    onChange={(e) => setEditingUni({ ...editingUni, phone: e.target.value })}
                    placeholder="+880 2 841 4046-9"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">UGC Approval Status</label>
                  <div className="flex items-center gap-3 mt-2">
                    <label className="flex items-center gap-1.5 text-xs text-ink-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingUni.ugcApproved ?? true}
                        onChange={(e) => setEditingUni({ ...editingUni, ugcApproved: e.target.checked })}
                        className="rounded text-brand-600 focus:ring-brand-500"
                      />
                      <span>UGC Approved Institution</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Logo & Cover Image Uploaders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <MediaUploader
                  label="University Logo"
                  value={editingUni.logoUrl || ''}
                  onChange={(url) => setEditingUni({ ...editingUni, logoUrl: url })}
                  folder="logos"
                  helperText="Transparent PNG or SVG recommended."
                />

                <MediaUploader
                  label="Campus Banner / Cover Image"
                  value={editingUni.coverImage || ''}
                  onChange={(url) => setEditingUni({ ...editingUni, coverImage: url })}
                  folder="covers"
                  helperText="High-resolution landscape image (16:9 ratio)."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Full Campus Address</label>
                <input
                  type="text"
                  value={editingUni.address || ''}
                  onChange={(e) => setEditingUni({ ...editingUni, address: e.target.value })}
                  placeholder="408/1, Kuratoli, Khilkhet, Dhaka 1229, Bangladesh"
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">About University / Short Overview</label>
                <textarea
                  rows={3}
                  value={editingUni.description || ''}
                  onChange={(e) => setEditingUni({ ...editingUni, description: e.target.value })}
                  placeholder="Brief introduction of the university..."
                  className="input-field text-xs mt-1 resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary !py-2 !px-4 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary !py-2 !px-5 text-xs"
                >
                  {isSubmitting ? 'Saving...' : 'Save University Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

