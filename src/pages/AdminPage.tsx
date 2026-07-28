import { useState } from 'react';
import {
  LayoutDashboard, GraduationCap, BookOpen, Users, Award, Bell,
  MessageSquare, Star, UserCog, FileText, TrendingUp, CheckCircle2,
  XCircle, Clock, ShieldCheck,
} from 'lucide-react';
import { universities, programs, communityPosts, reviews, admissionNotices, scholarships, studentLeads, getUniversityById } from '@/data/sampleData';

const sidebarItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'universities', label: 'Universities', icon: GraduationCap },
  { id: 'programs', label: 'Programs', icon: BookOpen },
  { id: 'admissions', label: 'Admission Notices', icon: Bell },
  { id: 'scholarships', label: 'Scholarships', icon: Award },
  { id: 'community', label: 'Community Posts', icon: MessageSquare },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'reps', label: 'University Reps', icon: UserCog },
  { id: 'leads', label: 'Student Inquiries', icon: FileText },
];

export default function AdminPage() {
  const [active, setActive] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '12,450', change: '+8.2%', icon: Users, color: 'from-brand-500 to-brand-600' },
    { label: 'Monthly Active', value: '3,210', change: '+12.5%', icon: TrendingUp, color: 'from-brand-500 to-brand-600' },
    { label: 'Universities', value: universities.length.toString(), change: '+2', icon: GraduationCap, color: 'from-accent-500 to-accent-600' },
    { label: 'Programs', value: programs.length.toString(), change: '+5', icon: BookOpen, color: 'from-gold-400 to-gold-600' },
    { label: 'Community Posts', value: communityPosts.length.toString(), change: '+18', icon: MessageSquare, color: 'from-accent-500 to-accent-700' },
    { label: 'Student Inquiries', value: studentLeads.length.toString(), change: '+3', icon: FileText, color: 'from-brand-400 to-accent-500' },
  ];

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-ink-300 shrink-0 hidden lg:flex flex-col">
        <div className="p-5 border-b border-ink-800">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Admin Dashboard</p>
              <p className="text-[10px] text-ink-500">UniVara Control Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active === item.id ? 'bg-brand-600 text-white' : 'text-ink-400 hover:bg-navy-800 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-ink-800">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-800">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span className="text-xs text-ink-400">Logged in as Admin</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <div className="lg:hidden bg-navy-900 p-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-1">
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className={`chip whitespace-nowrap ${active === item.id ? 'bg-brand-600 text-white' : 'bg-navy-800 text-ink-400'}`}>
                <item.icon size={13} /> {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {active === 'overview' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-1">Dashboard Overview</h1>
              <p className="text-sm text-ink-500 mb-6">Platform statistics and activity summary.</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="card p-5">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-3`}>
                      <s.icon size={20} />
                    </div>
                    <p className="text-2xl font-bold font-display text-ink-900">{s.value}</p>
                    <p className="text-xs text-ink-500">{s.label}</p>
                    <p className="text-xs text-emerald-600 mt-1">{s.change} this month</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card p-5">
                  <h3 className="font-semibold mb-3">Pending Moderation</h3>
                  <div className="space-y-3">
                    {reviews.slice(0, 3).map((r) => (
                      <div key={r.id} className="flex items-center justify-between text-sm">
                        <span className="text-ink-700 truncate">{r.authorName} — {r.programName}</span>
                        <div className="flex gap-1">
                          <button className="text-emerald-600 hover:bg-emerald-50 p-1 rounded"><CheckCircle2 size={16} /></button>
                          <button className="text-rose-600 hover:bg-rose-50 p-1 rounded"><XCircle size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-3">Rep Verification Requests</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-700">Claim: North South University</span>
                      <span className="chip-warn"><Clock size={11} /> Pending</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-700">Claim: AIUB</span>
                      <span className="chip-warn"><Clock size={11} /> Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === 'universities' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Manage Universities</h1>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-ink-500">
                    <tr><th className="p-3 font-medium">University</th><th className="p-3 font-medium">Location</th><th className="p-3 font-medium">Programs</th><th className="p-3 font-medium">Rating</th><th className="p-3 font-medium">Status</th></tr>
                  </thead>
                  <tbody>
                    {universities.map((u) => (
                      <tr key={u.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                        <td className="p-3 font-medium text-ink-800">{u.name}</td>
                        <td className="p-3">{u.location}</td>
                        <td className="p-3">{u.programCount}</td>
                        <td className="p-3">★ {u.rating}</td>
                        <td className="p-3"><span className="chip-success text-[10px]">Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'programs' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Manage Programs</h1>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-ink-500">
                    <tr><th className="p-3 font-medium">Program</th><th className="p-3 font-medium">Category</th><th className="p-3 font-medium">Universities</th><th className="p-3 font-medium">Avg Credits</th></tr>
                  </thead>
                  <tbody>
                    {programs.map((p) => (
                      <tr key={p.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                        <td className="p-3 font-medium text-ink-800">{p.name}</td>
                        <td className="p-3">{p.category}</td>
                        <td className="p-3">{p.offeringUniversityIds.length}</td>
                        <td className="p-3">{p.avgCredits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'admissions' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Admission Notices</h1>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-ink-500">
                    <tr><th className="p-3 font-medium">University</th><th className="p-3 font-medium">Title</th><th className="p-3 font-medium">Deadline</th><th className="p-3 font-medium">Status</th></tr>
                  </thead>
                  <tbody>
                    {admissionNotices.map((a) => {
                      const uni = getUniversityById(a.universityId);
                      return (
                        <tr key={a.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                          <td className="p-3 font-medium text-ink-800">{uni?.shortName}</td>
                          <td className="p-3">{a.title}</td>
                          <td className="p-3">{a.deadline}</td>
                          <td className="p-3"><span className="chip-success text-[10px]">Published</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'scholarships' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Scholarships</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {scholarships.map((s) => {
                  const uni = getUniversityById(s.universityId);
                  return <div key={s.id} className="card p-4"><p className="font-semibold text-sm">{s.name}</p><p className="text-xs text-ink-500 mt-1">{uni?.name} • {s.percentage}%</p></div>;
                })}
              </div>
            </div>
          )}

          {active === 'community' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Community Posts</h1>
              <div className="space-y-3">
                {communityPosts.map((p) => (
                  <div key={p.id} className="card p-4 flex items-center justify-between">
                    <div><p className="font-semibold text-sm">{p.title}</p><p className="text-xs text-ink-500">by {p.authorName} • {p.category}</p></div>
                    <div className="flex gap-1"><button className="text-emerald-600 p-1"><CheckCircle2 size={16} /></button><button className="text-rose-600 p-1"><XCircle size={16} /></button></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 'reviews' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Review Moderation</h1>
              <div className="space-y-3">
                {reviews.map((r) => {
                  const uni = getUniversityById(r.universityId);
                  return (
                    <div key={r.id} className="card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{r.authorName} — {uni?.shortName}</p>
                        <div className="flex gap-1">
                          <button className="btn text-xs bg-emerald-600 text-white px-3 py-1.5">Approve</button>
                          <button className="btn text-xs bg-rose-600 text-white px-3 py-1.5">Reject</button>
                        </div>
                      </div>
                      <p className="text-xs text-ink-600 line-clamp-2">{r.writtenReview}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {active === 'users' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Users</h1>
              <div className="card p-5"><p className="text-sm text-ink-500">User management interface — verify students, alumni, and manage roles.</p></div>
            </div>
          )}

          {active === 'reps' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">University Representatives</h1>
              <div className="space-y-3">
                <div className="card p-4 flex items-center justify-between">
                  <div><p className="font-semibold text-sm">Dr. Rahman — North South University</p><p className="text-xs text-ink-500">Claim request • Submitted 2026-07-15</p></div>
                  <div className="flex gap-2"><button className="btn text-xs bg-emerald-600 text-white px-3 py-1.5">Verify</button><button className="btn text-xs bg-ink-200 text-ink-700 px-3 py-1.5">Reject</button></div>
                </div>
                <div className="card p-4 flex items-center justify-between">
                  <div><p className="font-semibold text-sm">Prof. Karim — AIUB</p><p className="text-xs text-ink-500">Claim request • Submitted 2026-07-18</p></div>
                  <div className="flex gap-2"><button className="btn text-xs bg-emerald-600 text-white px-3 py-1.5">Verify</button><button className="btn text-xs bg-ink-200 text-ink-700 px-3 py-1.5">Reject</button></div>
                </div>
              </div>
            </div>
          )}

          {active === 'leads' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Student Inquiries (Leads)</h1>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-ink-500">
                    <tr><th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Contact</th><th className="p-3 font-medium">Interest</th><th className="p-3 font-medium">Date</th></tr>
                  </thead>
                  <tbody>
                    {studentLeads.map((l) => {
                      const uni = l.preferredUniversityId ? getUniversityById(l.preferredUniversityId) : null;
                      return (
                        <tr key={l.id} className="border-t border-ink-100">
                          <td className="p-3 font-medium">{l.name}</td>
                          <td className="p-3 text-xs">{l.phone}<br />{l.email}</td>
                          <td className="p-3">{uni?.shortName || 'Any'}</td>
                          <td className="p-3">{l.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
