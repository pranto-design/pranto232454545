import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, ExternalLink, Filter, AlertCircle } from 'lucide-react';
import { admissionNotices as sampleNotices, universities, getUniversityById } from '@/data/sampleData';
// Note: `admissionNotices` alias above is used as initial state; `noticesList` is the live reactive state
import { UniversityLogo, VerificationBadge, EmptyState } from '@/components/ui';
import { universityCmsService } from '@/services/universityCmsService';
import type { AdmissionNotice } from '@/types';

export default function AdmissionPage() {
  const [uniFilter, setUniFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [noticesList, setNoticesList] = useState<AdmissionNotice[]>(sampleNotices);

  useEffect(() => {
    let isMounted = true;
    async function loadNotices() {
      try {
        const live = await universityCmsService.getAdmissionNotices();
        if (live && live.length > 0 && isMounted) {
          setNoticesList(live);
        }
      } catch (err) {
        console.warn('Error loading dynamic admission notices:', err);
      }
    }
    loadNotices();

    const handleUpdate = () => loadNotices();
    window.addEventListener('univara_cms_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('univara_cms_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...noticesList];
    if (uniFilter) list = list.filter((n) => n.universityId === uniFilter);
    if (dateFilter) {
      const now = new Date('2026-07-26');
      list = list.filter((n) => {
        const d = new Date(n.deadline);
        if (dateFilter === 'soon') return (d.getTime() - now.getTime()) / 86400000 <= 30;
        if (dateFilter === 'open') return new Date(n.applicationStart) <= now && d >= now;
        return true;
      });
    }
    return list.sort((a, b) => a.deadline.localeCompare(b.deadline));
  }, [uniFilter, dateFilter, noticesList]);

  return (
    <div className="container-page py-10">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink-900 flex items-center gap-2 flex-wrap">
          <Bell className="text-brand-600 shrink-0" /> <span>Admission Hub</span>
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 mt-2">Latest admission notices, deadlines, and test dates for Fall 2026 intake.</p>
      </div>

      {/* Calendar strip */}
      <div className="card p-5 mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Calendar size={18} className="text-brand-600" /> Upcoming Deadlines</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {noticesList.slice(0, 6).map((n) => {
            const uni = getUniversityById(n.universityId);
            if (!uni) return null;
            const daysLeft = Math.ceil((new Date(n.deadline).getTime() - new Date('2026-07-26').getTime()) / 86400000);
            return (
              <div key={n.id} className="shrink-0 w-44 p-3 rounded-xl border border-ink-200 hover:border-brand-300 hover:bg-brand-50/40 transition cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <UniversityLogo uni={uni} size="sm" />
                  <span className="text-xs font-semibold text-ink-800 truncate">{uni.shortName}</span>
                </div>
                <p className="text-xs text-ink-600 line-clamp-2 mb-2">{n.title}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-500">{n.deadline}</span>
                  <span className={`font-semibold ${daysLeft <= 14 ? 'text-rose-600' : daysLeft <= 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {daysLeft > 0 ? `${daysLeft}d left` : 'Closed'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 text-sm text-ink-500"><Filter size={16} /> Filters:</div>
          <select value={uniFilter} onChange={(e) => setUniFilter(e.target.value)} className="input sm:w-64">
            <option value="">All Universities</option>
            {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="input sm:w-48">
            <option value="">All Deadlines</option>
            <option value="open">Currently Open</option>
            <option value="soon">Closing Soon (30 days)</option>
          </select>
        </div>
      </div>

      {/* Notices */}
      {filtered.length === 0 ? (
        <EmptyState title="No admission notices found" message="Try adjusting your filters." icon={<AlertCircle size={28} />} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((notice) => {
            const uni = getUniversityById(notice.universityId);
            if (!uni) return null;
            return (
              <div key={notice.id} className="card card-hover p-5">
                <div className="flex items-start gap-3">
                  <UniversityLogo uni={uni} size="md" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/universities/${uni.slug}`} className="text-xs text-ink-500 hover:text-brand-700">{uni.name}</Link>
                    <h3 className="font-semibold text-ink-900 mt-0.5 leading-tight">{notice.title}</h3>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div><p className="text-ink-500">Application Start</p><p className="font-medium text-ink-800">{notice.applicationStart}</p></div>
                      <div><p className="text-ink-500">Deadline</p><p className="font-medium text-rose-700">{notice.deadline}</p></div>
                      {notice.admissionTestDate && <div><p className="text-ink-500">Admission Test</p><p className="font-medium text-ink-800">{notice.admissionTestDate}</p></div>}
                      <div><p className="text-ink-500">Source</p><p className="font-medium text-ink-800 truncate">{notice.officialSource}</p></div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <VerificationBadge status={notice.verification} size="xs" />
                      <a href={notice.applicationLink} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline flex items-center gap-1">
                        Apply <ExternalLink size={11} />
                      </a>
                    </div>
                    <p className="text-[10px] text-ink-400 mt-2">Last updated: {notice.lastUpdated}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
