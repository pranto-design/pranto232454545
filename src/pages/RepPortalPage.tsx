import { useState } from 'react';
import {
  LayoutDashboard, GraduationCap, BookOpen, CreditCard, Award,
  MessageSquare, BarChart3, Mail, ShieldCheck, Building2,
} from 'lucide-react';
import { universities, programs, communityPosts, studentLeads } from '@/data/sampleData';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'University Profile', icon: Building2 },
  { id: 'programs', label: 'Programs', icon: BookOpen },
  { id: 'tuition', label: 'Tuition Fees', icon: CreditCard },
  { id: 'admission', label: 'Admission Info', icon: GraduationCap },
  { id: 'scholarships', label: 'Scholarships', icon: Award },
  { id: 'questions', label: 'Student Questions', icon: MessageSquare },
  { id: 'inquiries', label: 'Student Inquiries', icon: Mail },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function RepPortalPage() {
  const [active, setActive] = useState('overview');
  const [claimedUni] = useState(universities[1]); // NSU as example

  return (
    <div className="min-h-screen bg-ink-50 flex">
      <aside className="w-64 bg-navy-900 text-ink-300 shrink-0 hidden lg:flex flex-col">
        <div className="p-5 border-b border-ink-800">
          <div className="flex items-center gap-2">
            <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${claimedUni.logoColor} flex items-center justify-center text-white font-bold`}>
              {claimedUni.logoInitials}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Rep Portal</p>
              <p className="text-[10px] text-ink-500">{claimedUni.shortName}</p>
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
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-900/30">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span className="text-xs text-emerald-300">Verified Representative</span>
          </div>
        </div>
      </aside>

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
              <h1 className="text-2xl font-bold text-ink-900 mb-1">Welcome, Representative</h1>
              <p className="text-sm text-ink-500 mb-6">Manage {claimedUni.name}'s profile and engage with students.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Profile Views', value: '4,210', icon: BarChart3 },
                  { label: 'Programs Listed', value: claimedUni.programCount.toString(), icon: BookOpen },
                  { label: 'Student Inquiries', value: studentLeads.length.toString(), icon: Mail },
                  { label: 'Community Replies', value: '12', icon: MessageSquare },
                ].map((s) => (
                  <div key={s.label} className="card p-5">
                    <s.icon size={20} className="text-brand-600 mb-2" />
                    <p className="text-2xl font-bold font-display">{s.value}</p>
                    <p className="text-xs text-ink-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="card p-5">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setActive('profile')} className="btn-secondary text-sm">Update Profile</button>
                  <button onClick={() => setActive('tuition')} className="btn-secondary text-sm">Update Tuition</button>
                  <button onClick={() => setActive('admission')} className="btn-secondary text-sm">Update Admission Info</button>
                  <button onClick={() => setActive('questions')} className="btn-primary text-sm">Answer Questions</button>
                </div>
              </div>
            </div>
          )}

          {active === 'profile' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Edit University Profile</h1>
              <div className="card p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-ink-600 mb-1 block">University Name</label><input className="input" defaultValue={claimedUni.name} /></div>
                  <div><label className="text-xs font-medium text-ink-600 mb-1 block">Short Name</label><input className="input" defaultValue={claimedUni.shortName} /></div>
                  <div><label className="text-xs font-medium text-ink-600 mb-1 block">Location</label><input className="input" defaultValue={claimedUni.location} /></div>
                  <div><label className="text-xs font-medium text-ink-600 mb-1 block">Website</label><input className="input" defaultValue={claimedUni.website} /></div>
                </div>
                <div><label className="text-xs font-medium text-ink-600 mb-1 block">Description</label><textarea className="input min-h-[100px]" defaultValue={claimedUni.description} /></div>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {active === 'programs' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Manage Programs</h1>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-ink-500"><tr><th className="p-3 font-medium">Program</th><th className="p-3 font-medium">Credits</th><th className="p-3 font-medium">Tuition/Credit</th><th className="p-3 font-medium">Actions</th></tr></thead>
                  <tbody>
                    {programs.slice(0, 6).map((p) => (
                      <tr key={p.id} className="border-t border-ink-100"><td className="p-3 font-medium">{p.name}</td><td className="p-3">{p.avgCredits}</td><td className="p-3">৳{p.avgTuitionMin.toLocaleString()}</td><td className="p-3"><button className="text-xs text-brand-600 hover:underline">Edit</button></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(active === 'tuition' || active === 'admission' || active === 'scholarships') && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">{sidebarItems.find((i) => i.id === active)?.label}</h1>
              <div className="card p-6">
                <p className="text-sm text-ink-500 mb-4">Update {claimedUni.name}'s {active} information. Changes will be marked as "University Verified" after saving.</p>
                <div className="space-y-3">
                  <div><label className="text-xs font-medium text-ink-600 mb-1 block">Field Name</label><input className="input" placeholder="Enter value" /></div>
                  <div><label className="text-xs font-medium text-ink-600 mb-1 block">Field Value</label><input className="input" placeholder="Enter value" /></div>
                  <button className="btn-primary">Save Update</button>
                </div>
              </div>
            </div>
          )}

          {active === 'questions' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Student Questions</h1>
              <div className="space-y-3">
                {communityPosts.filter((p) => p.type === 'question').slice(0, 4).map((p) => (
                  <div key={p.id} className="card p-4">
                    <p className="font-semibold text-sm">{p.title}</p>
                    <p className="text-xs text-ink-500 mt-1">by {p.authorName} • {p.date}</p>
                    <button className="btn-secondary text-xs mt-3">Reply as {claimedUni.shortName}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 'inquiries' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Student Inquiries</h1>
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-ink-500"><tr><th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Contact</th><th className="p-3 font-medium">Background</th><th className="p-3 font-medium">Date</th></tr></thead>
                  <tbody>
                    {studentLeads.map((l) => (
                      <tr key={l.id} className="border-t border-ink-100"><td className="p-3 font-medium">{l.name}</td><td className="p-3 text-xs">{l.phone}</td><td className="p-3">{l.background}</td><td className="p-3">{l.date}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'analytics' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-ink-900 mb-4">Analytics</h1>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Profile Views (30d)', value: '4,210' },
                  { label: 'Program Page Views', value: '2,890' },
                  { label: 'Inquiry Rate', value: '8.2%' },
                  { label: 'Avg Time on Page', value: '3m 42s' },
                  { label: 'Compare Inclusions', value: '1,240' },
                  { label: 'Review Count', value: claimedUni.reviewCount.toString() },
                ].map((s) => (
                  <div key={s.label} className="card p-5">
                    <p className="text-2xl font-bold font-display">{s.value}</p>
                    <p className="text-xs text-ink-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
