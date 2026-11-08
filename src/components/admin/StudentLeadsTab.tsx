import React, { useState, useEffect } from 'react';
import {
  FileText, Search, Mail, Phone, Building,
  GraduationCap, Calendar, Lock, CheckCircle2
} from 'lucide-react';
import { universityCmsService, ExtendedUniversityData } from '@/services/universityCmsService';
import { StudentLead } from '@/types';

export default function StudentLeadsTab({ isSuperAdmin = true }: { isSuperAdmin?: boolean }) {
  const [leads, setLeads] = useState<StudentLead[]>([]);
  const [universities, setUniversities] = useState<ExtendedUniversityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uniFilter, setUniFilter] = useState('all');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [lList, unis] = await Promise.all([
          universityCmsService.getStudentLeads(),
          universityCmsService.getUniversities(),
        ]);
        setLeads(lList);
        setUniversities(unis);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = leads.filter((l) => {
    const uni = universities.find((u) => u.id === l.preferredUniversityId);
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (uni?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchUni = uniFilter === 'all' || l.preferredUniversityId === uniFilter;
    return matchSearch && matchUni;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Student Inquiries &amp; Leads</h1>
            <span className="chip-warn text-[10px] flex items-center gap-1 font-semibold">
              <Lock size={11} /> Private Data
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            Prospective student inquiries submitted via university profiles. Restricted to authorized administrators.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-3 bg-white border border-ink-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search leads by student name, email, phone, or university..."
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
            <option value="all">All Preferred Universities</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.shortName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card overflow-hidden !p-0 bg-white border border-ink-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[650px]">
            <thead className="bg-ink-50 text-left text-ink-500 border-b border-ink-100">
              <tr>
                <th className="p-3.5 font-semibold">Student Name</th>
                <th className="p-3.5 font-semibold">Contact Info</th>
                <th className="p-3.5 font-semibold">Preferred University</th>
                <th className="p-3.5 font-semibold">Inquiry / Background</th>
                <th className="p-3.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-ink-400">
                    No student inquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => {
                  const uni = universities.find((u) => u.id === l.preferredUniversityId);
                  return (
                    <tr key={l.id} className="hover:bg-ink-50/50 transition">
                      <td className="p-3.5 font-bold text-ink-900">{l.name}</td>
                      <td className="p-3.5 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-ink-700">
                          <Mail size={12} className="text-brand-600" />
                          <span>{l.email}</span>
                        </div>
                        {l.phone && (
                          <div className="flex items-center gap-1.5 text-ink-500 text-[11px]">
                            <Phone size={12} className="text-emerald-600" />
                            <span>{l.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 font-medium text-ink-800">
                        {uni?.name || 'Any University'}
                        {uni?.shortName && <span className="text-[10px] text-ink-400 block font-normal">{uni.shortName}</span>}
                      </td>
                      <td className="p-3.5 text-ink-600 max-w-xs truncate">{l.background}</td>
                      <td className="p-3.5 text-ink-500 whitespace-nowrap">{l.date}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

