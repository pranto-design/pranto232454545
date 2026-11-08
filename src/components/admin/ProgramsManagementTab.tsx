import React, { useState, useEffect } from 'react';
import {
  BookOpen, Plus, Search, Edit3, Trash2, GraduationCap,
  Building, CheckCircle2, AlertCircle, X, ExternalLink
} from 'lucide-react';
import { universityCmsService, ExtendedUniversityData } from '@/services/universityCmsService';
import { Program } from '@/types';

export default function ProgramsManagementTab({ isSuperAdmin = true }: { isSuperAdmin?: boolean }) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [universities, setUniversities] = useState<ExtendedUniversityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uniFilter, setUniFilter] = useState('all');

  // Edit/Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProg, setEditingProg] = useState<Partial<Program> & { universityId?: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [progs, unis] = await Promise.all([
        universityCmsService.getPrograms(),
        universityCmsService.getUniversities(),
      ]);
      setPrograms(progs);
      setUniversities(unis);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingProg({
      id: `prog-${Date.now()}`,
      name: '',
      slug: '',
      category: 'Computer Science',
      description: '',
      careerOpportunities: [],
      avgTuitionMin: 600000,
      avgTuitionMax: 1100000,
      avgCredits: 140,
      avgDurationYears: 4,
      universityId: universities[0]?.id || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prog: Program) => {
    setEditingProg({
      ...prog,
      universityId: prog.offeringUniversityIds[0] || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg?.name || !editingProg.id) return;
    try {
      setSubmitting(true);
      setMsg(null);
      await universityCmsService.saveProgram(editingProg as any);
      setMsg({ type: 'success', text: 'Program saved successfully.' });
      setIsModalOpen(false);
      setEditingProg(null);
      await loadData();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error saving program' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      await universityCmsService.deleteProgram(id);
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      setMsg({ type: 'success', text: 'Program deleted.' });
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error deleting program' });
    }
  };

  const filtered = programs.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchUni =
      uniFilter === 'all' || p.offeringUniversityIds.includes(uniFilter);
    return matchSearch && matchUni;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Programs Management</h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            Manage academic degree programs, tuition ranges, credit loads, and university offerings.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Add New Program
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
            placeholder="Search programs by name or category..."
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

      {/* Programs Table */}
      <div className="card overflow-hidden !p-0 bg-white border border-ink-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[600px]">
            <thead className="bg-ink-50 text-left text-ink-500 border-b border-ink-100">
              <tr>
                <th className="p-3.5 font-semibold">Program Name</th>
                <th className="p-3.5 font-semibold">Category</th>
                <th className="p-3.5 font-semibold">Duration / Credits</th>
                <th className="p-3.5 font-semibold">Estimated Tuition</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ink-400">
                    No programs found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-ink-50/50 transition">
                    <td className="p-3.5 font-semibold text-ink-900">
                      <p>{p.name}</p>
                      <p className="text-[10px] text-ink-400 font-normal">Slug: {p.slug}</p>
                    </td>
                    <td className="p-3.5">
                      <span className="chip-muted text-[10px]">{p.category}</span>
                    </td>
                    <td className="p-3.5 text-ink-600">
                      {p.avgDurationYears} Years • {p.avgCredits} Credits
                    </td>
                    <td className="p-3.5 font-medium text-ink-800">
                      ৳{p.avgTuitionMin.toLocaleString()} – ৳{p.avgTuitionMax.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg transition"
                        title="Edit Program"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete Program"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Add / Edit Modal */}
      {isModalOpen && editingProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-ink-200 p-5 space-y-4 my-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <h3 className="font-bold text-sm text-ink-900">
                {editingProg.name ? 'Edit Program' : 'Add New Program'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ink-400 hover:text-ink-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-ink-700">Program Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Sc. in Computer Science and Engineering"
                  value={editingProg.name}
                  onChange={(e) => setEditingProg({ ...editingProg, name: e.target.value })}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Offering University</label>
                  <select
                    value={editingProg.universityId || ''}
                    onChange={(e) => setEditingProg({ ...editingProg, universityId: e.target.value })}
                    className="input-field text-xs mt-1"
                  >
                    <option value="">-- Global / Unassigned --</option>
                    {universities.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.shortName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Category</label>
                  <select
                    value={editingProg.category}
                    onChange={(e) => setEditingProg({ ...editingProg, category: e.target.value as any })}
                    className="input-field text-xs mt-1"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Law">Law</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Duration (Years)</label>
                  <input
                    type="number"
                    value={editingProg.avgDurationYears}
                    onChange={(e) => setEditingProg({ ...editingProg, avgDurationYears: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Total Credits</label>
                  <input
                    type="number"
                    value={editingProg.avgCredits}
                    onChange={(e) => setEditingProg({ ...editingProg, avgCredits: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Tuition Min (BDT)</label>
                  <input
                    type="number"
                    value={editingProg.avgTuitionMin}
                    onChange={(e) => setEditingProg({ ...editingProg, avgTuitionMin: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Tuition Max (BDT)</label>
                  <input
                    type="number"
                    value={editingProg.avgTuitionMax}
                    onChange={(e) => setEditingProg({ ...editingProg, avgTuitionMax: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Description</label>
                <textarea
                  rows={2}
                  value={editingProg.description}
                  onChange={(e) => setEditingProg({ ...editingProg, description: e.target.value })}
                  className="input-field text-xs mt-1"
                  placeholder="Overview of the degree curriculum..."
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
                  {submitting ? 'Saving...' : 'Save Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

