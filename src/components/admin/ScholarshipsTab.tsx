import React, { useState, useEffect } from 'react';
import {
  Award, Plus, Search, Edit3, Trash2,
  Building, CheckCircle2, AlertCircle, X, ExternalLink
} from 'lucide-react';
import { universityCmsService, ExtendedUniversityData } from '@/services/universityCmsService';
import { Scholarship } from '@/types';

export default function ScholarshipsTab({ isSuperAdmin = true }: { isSuperAdmin?: boolean }) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [universities, setUniversities] = useState<ExtendedUniversityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uniFilter, setUniFilter] = useState('all');

  // Edit / Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSch, setEditingSch] = useState<Partial<Scholarship> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [sList, unis] = await Promise.all([
        universityCmsService.getScholarships(),
        universityCmsService.getUniversities(),
      ]);
      setScholarships(sList);
      setUniversities(unis);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingSch({
      id: `sch-${Date.now()}`,
      universityId: universities[0]?.id || '',
      name: '',
      eligibility: 'Merit-based (HSC GPA 4.5+)',
      gpaRequirement: 4.5,
      percentage: 50,
      applicationProcess: 'Awarded automatically upon admission interview verification.',
      source: 'Registrar Scholarship Policy',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Scholarship) => {
    setEditingSch({ ...s });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSch?.name || !editingSch.universityId || !editingSch.id) return;
    try {
      setSubmitting(true);
      setMsg(null);
      await universityCmsService.saveScholarship(editingSch as any);
      setMsg({ type: 'success', text: 'Scholarship saved successfully.' });
      setIsModalOpen(false);
      setEditingSch(null);
      await loadData();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error saving scholarship' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scholarship?')) return;
    try {
      await universityCmsService.deleteScholarship(id);
      setScholarships((prev) => prev.filter((s) => s.id !== id));
      setMsg({ type: 'success', text: 'Scholarship deleted.' });
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error deleting scholarship' });
    }
  };

  const filtered = scholarships.filter((s) => {
    const uni = universities.find((u) => u.id === s.universityId);
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      uni?.name.toLowerCase().includes(search.toLowerCase()) ||
      uni?.shortName.toLowerCase().includes(search.toLowerCase());
    const matchUni = uniFilter === 'all' || s.universityId === uniFilter;
    return matchSearch && matchUni;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Scholarships &amp; Financial Aid</h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            Manage tuition waivers, merit scholarships, and financial aid schemes by university.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Add New Scholarship
        </button>
      </div>

      {msg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {msg.text}
        </div>
      )}

      {/* Filter and Search */}
      <div className="card p-3 bg-white border border-ink-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search scholarships by title or university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 text-xs py-2"
          />
        </div>

        <div>
          <select
            value={uniFilter}
            onChange={(e) => setUniFilter(e.target.value)}
            className="input-field text-xs py-2"
          >
            <option value="all">All Universities</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.shortName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden !p-0 bg-white border border-ink-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[600px]">
            <thead className="bg-ink-50 text-left text-ink-500 border-b border-ink-100">
              <tr>
                <th className="p-3.5 font-semibold">University</th>
                <th className="p-3.5 font-semibold">Scholarship Title</th>
                <th className="p-3.5 font-semibold">Waiver Percentage</th>
                <th className="p-3.5 font-semibold">Eligibility Requirements</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ink-400">
                    No scholarships found.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const uni = universities.find((u) => u.id === s.universityId);
                  return (
                    <tr key={s.id} className="hover:bg-ink-50/50 transition">
                      <td className="p-3.5 font-semibold text-ink-900">
                        <p>{uni?.name || s.universityId}</p>
                        <span className="text-[10px] text-ink-400">{uni?.shortName}</span>
                      </td>
                      <td className="p-3.5 font-medium text-ink-800">{s.name}</td>
                      <td className="p-3.5">
                        <span className="chip-primary text-[10px] font-bold">{s.percentage}% Tuition Waiver</span>
                      </td>
                      <td className="p-3.5 text-ink-600 max-w-xs truncate">{s.eligibility}</td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg transition"
                          title="Edit Scholarship"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Scholarship"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingSch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-ink-200 p-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <h3 className="font-bold text-sm text-ink-900">
                {editingSch.name ? 'Edit Scholarship' : 'Add New Scholarship'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ink-400 hover:text-ink-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-ink-700">Select University *</label>
                <select
                  required
                  value={editingSch.universityId || ''}
                  onChange={(e) => setEditingSch({ ...editingSch, universityId: e.target.value })}
                  className="input-field text-xs mt-1"
                >
                  <option value="">-- Choose University --</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.shortName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Scholarship Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vice Chancellor Merit Scholarship"
                  value={editingSch.name}
                  onChange={(e) => setEditingSch({ ...editingSch, name: e.target.value })}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Waiver Percentage (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editingSch.percentage}
                    onChange={(e) => setEditingSch({ ...editingSch, percentage: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Min GPA Requirement</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingSch.gpaRequirement}
                    onChange={(e) => setEditingSch({ ...editingSch, gpaRequirement: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Eligibility Criteria</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Combined GPA 5.0 in SSC and HSC without 4th subject"
                  value={editingSch.eligibility}
                  onChange={(e) => setEditingSch({ ...editingSch, eligibility: e.target.value })}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Application URL / Source</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={editingSch.source || ''}
                  onChange={(e) => setEditingSch({ ...editingSch, source: e.target.value })}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-ink-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary !py-1.5 !px-3 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary !py-1.5 !px-4 text-xs"
                >
                  {submitting ? 'Saving...' : 'Save Scholarship'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

