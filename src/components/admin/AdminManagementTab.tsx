import React, { useState, useEffect } from 'react';
import {
  Users, UserPlus, Shield, Check, Trash2, Search,
  Building, CheckCircle2, AlertCircle, X
} from 'lucide-react';
import { universityCmsService, AdminAssignment, ExtendedUniversityData } from '@/services/universityCmsService';

export default function AdminManagementTab() {
  const [assignments, setAssignments] = useState<AdminAssignment[]>([]);
  const [universities, setUniversities] = useState<ExtendedUniversityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal / form states for assigning
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');
  const [targetUniId, setTargetUniId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [assigns, unis] = await Promise.all([
        universityCmsService.getAdminAssignments(),
        universityCmsService.getUniversities(),
      ]);
      setAssignments(assigns);
      setUniversities(unis);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetEmail.trim() || !targetUniId) return;

    try {
      setSubmitting(true);
      setMsg(null);
      // In Supabase, the email represents the admin user. We generate or associate their ID:
      const pseudoUserId = `user-${targetEmail.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      await universityCmsService.assignUniversityToAdmin(pseudoUserId, targetUniId);

      setMsg({ type: 'success', text: `Assigned university successfully to ${targetEmail}.` });
      setIsModalOpen(false);
      setTargetEmail('');
      setTargetUniId('');
      await loadData();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error creating assignment' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (assignmentId: string) => {
    if (!confirm('Are you sure you want to remove this university assignment?')) return;
    try {
      await universityCmsService.removeAdminAssignment({ id: assignmentId });
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
      setMsg({ type: 'success', text: 'Assignment removed.' });
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error removing assignment' });
    }
  };

  const filtered = assignments.filter((a) => {
    const uni = universities.find((u) => u.id === a.universityId);
    return (
      a.userId.toLowerCase().includes(search.toLowerCase()) ||
      uni?.name.toLowerCase().includes(search.toLowerCase()) ||
      uni?.shortName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Admin Account &amp; University Assignments</h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            Super Admin control panel: Assign multiple universities to Admins and manage scopes.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 shadow-sm"
        >
          <UserPlus size={15} /> Assign University to Admin
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

      {/* Search */}
      <div className="card p-3 bg-white border border-ink-200 shadow-sm flex items-center gap-2 max-w-md">
        <Search size={16} className="text-ink-400" />
        <input
          type="text"
          placeholder="Search by admin email or university..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs outline-hidden"
        />
      </div>

      {/* Assignments Table */}
      <div className="card overflow-hidden !p-0 bg-white border border-ink-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[550px]">
            <thead className="bg-ink-50 text-left text-ink-500 border-b border-ink-100">
              <tr>
                <th className="p-3.5 font-semibold">Admin Account</th>
                <th className="p-3.5 font-semibold">Assigned University</th>
                <th className="p-3.5 font-semibold">Assigned Date</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-ink-400">
                    No admin university assignments found. Click "Assign University to Admin" to grant an Admin access to specific universities.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => {
                  const uni = universities.find((u) => u.id === a.universityId);
                  return (
                    <tr key={a.id} className="hover:bg-ink-50/50 transition">
                      <td className="p-3.5 font-medium text-ink-800 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                          <Shield size={14} />
                        </div>
                        <div>
                          <p className="font-semibold text-ink-900">{a.userId}</p>
                          <p className="text-[10px] text-ink-400">Role: Admin</p>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-medium text-ink-800">{uni?.name || a.universityId}</span>
                        {uni?.shortName && <span className="text-[10px] text-ink-400 ml-1">({uni.shortName})</span>}
                      </td>
                      <td className="p-3.5 text-ink-500">
                        {a.createdAt ? a.createdAt.split('T')[0] : 'Active'}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleRemove(a.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Revoke Assignment"
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

      {/* Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-ink-200 p-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <h3 className="font-bold text-sm text-ink-900">Assign University to Admin</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ink-400 hover:text-ink-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAssign} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-ink-700">Admin Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="admin@univara.com"
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Select University *</label>
                <select
                  required
                  value={targetUniId}
                  onChange={(e) => setTargetUniId(e.target.value)}
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
                  {submitting ? 'Assigning...' : 'Confirm Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

