import React, { useState, useEffect } from 'react';
import {
  Bell, Plus, Search, Edit3, Trash2, Calendar,
  Building, CheckCircle2, AlertCircle, X, ExternalLink
} from 'lucide-react';
import { universityCmsService, ExtendedUniversityData } from '@/services/universityCmsService';
import { AdmissionNotice } from '@/types';

export default function AdmissionNoticesTab({ isSuperAdmin = true }: { isSuperAdmin?: boolean }) {
  const [notices, setNotices] = useState<AdmissionNotice[]>([]);
  const [universities, setUniversities] = useState<ExtendedUniversityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uniFilter, setUniFilter] = useState('all');

  // Edit / Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Partial<AdmissionNotice> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [nList, unis] = await Promise.all([
        universityCmsService.getAdmissionNotices(),
        universityCmsService.getUniversities(),
      ]);
      setNotices(nList);
      setUniversities(unis);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingNotice({
      id: `notice-${Date.now()}`,
      universityId: universities[0]?.id || '',
      title: '',
      applicationStart: new Date().toISOString().split('T')[0],
      deadline: '',
      admissionTestDate: '',
      applicationLink: '',
      officialSource: 'Admissions Circular',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n: AdmissionNotice) => {
    setEditingNotice({ ...n });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice?.title || !editingNotice.universityId || !editingNotice.id) return;
    try {
      setSubmitting(true);
      setMsg(null);
      await universityCmsService.saveAdmissionNotice(editingNotice as any);
      setMsg({ type: 'success', text: 'Admission notice saved successfully.' });
      setIsModalOpen(false);
      setEditingNotice(null);
      await loadData();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error saving admission notice' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      await universityCmsService.deleteAdmissionNotice(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
      setMsg({ type: 'success', text: 'Notice deleted.' });
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error deleting notice' });
    }
  };

  const filtered = notices.filter((n) => {
    const uni = universities.find((u) => u.id === n.universityId);
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      uni?.name.toLowerCase().includes(search.toLowerCase()) ||
      uni?.shortName.toLowerCase().includes(search.toLowerCase());
    const matchUni = uniFilter === 'all' || n.universityId === uniFilter;
    return matchSearch && matchUni;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Admission Notices Management</h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            Create, update, and publish circulars, intake schedules, and test dates for universities.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Add Admission Notice
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

      {/* Filter and Search Bar */}
      <div className="card p-3 bg-white border border-ink-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search notices by title or university..."
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
                <th className="p-3.5 font-semibold">Notice Title</th>
                <th className="p-3.5 font-semibold">Application Dates</th>
                <th className="p-3.5 font-semibold">Test Date</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ink-400">
                    No admission notices found.
                  </td>
                </tr>
              ) : (
                filtered.map((n) => {
                  const uni = universities.find((u) => u.id === n.universityId);
                  return (
                    <tr key={n.id} className="hover:bg-ink-50/50 transition">
                      <td className="p-3.5 font-semibold text-ink-900">
                        <p>{uni?.name || n.universityId}</p>
                        <span className="text-[10px] text-ink-400">{uni?.shortName}</span>
                      </td>
                      <td className="p-3.5 font-medium text-ink-800">
                        {n.title}
                        {n.applicationLink && (
                          <a
                            href={n.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-600 ml-1.5 inline-flex items-center"
                          >
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </td>
                      <td className="p-3.5 text-ink-600">
                        <span className="text-emerald-700">{n.applicationStart || 'Open'}</span>
                        {' → '}
                        <span className="text-rose-700 font-semibold">{n.deadline || 'Ongoing'}</span>
                      </td>
                      <td className="p-3.5 text-ink-600">{n.admissionTestDate || 'N/A'}</td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(n)}
                          className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg transition"
                          title="Edit Notice"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(n.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Notice"
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
      {isModalOpen && editingNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-ink-200 p-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <h3 className="font-bold text-sm text-ink-900">
                {editingNotice.title ? 'Edit Admission Notice' : 'Add Admission Notice'}
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
                  value={editingNotice.universityId || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, universityId: e.target.value })}
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
                <label className="text-xs font-semibold text-ink-700">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Undergraduate Admission Notice - Fall 2026"
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Application Start</label>
                  <input
                    type="date"
                    value={editingNotice.applicationStart || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, applicationStart: e.target.value })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Deadline</label>
                  <input
                    type="date"
                    value={editingNotice.deadline || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, deadline: e.target.value })}
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Admission Test Date</label>
                  <input
                    type="date"
                    value={editingNotice.admissionTestDate || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, admissionTestDate: e.target.value })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Online Application URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editingNotice.applicationLink || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, applicationLink: e.target.value })}
                    className="input-field text-xs mt-1"
                  />
                </div>
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
                  {submitting ? 'Saving...' : 'Save Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

