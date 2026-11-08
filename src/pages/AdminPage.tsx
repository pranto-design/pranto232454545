import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, GraduationCap, PlusCircle, BookOpen, Bell,
  Award, FileText, UserCog, Settings as SettingsIcon, ShieldCheck,
  TrendingUp, Building2, Search, Filter, Edit3, Eye, LogOut,
  ExternalLink, CheckCircle2, ChevronRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
  universityCmsService,
  ExtendedUniversityData
} from '@/services/universityCmsService';

// Module components
import UniversityEditor from '@/components/admin/UniversityEditor';
import AddUniversityModal from '@/components/admin/AddUniversityModal';
import ProgramsManagementTab from '@/components/admin/ProgramsManagementTab';
import AdmissionNoticesTab from '@/components/admin/AdmissionNoticesTab';
import ScholarshipsTab from '@/components/admin/ScholarshipsTab';
import StudentLeadsTab from '@/components/admin/StudentLeadsTab';
import AdminManagementTab from '@/components/admin/AdminManagementTab';
import SettingsTab from '@/components/admin/SettingsTab';

export default function AdminPage() {
  const navigate = useNavigate();

  // Navigation state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'universities' | 'editor' | 'programs' | 'admissions' | 'scholarships' | 'leads' | 'admins' | 'settings'
  >('overview');

  // Role and Identity
  const [userRole, setUserRole] = useState<'super_admin' | 'admin'>('super_admin');
  const [userEmail, setUserEmail] = useState('admin@univara.com');
  const [assignedUniIds, setAssignedUniIds] = useState<string[]>([]);

  // Universities State
  const [universities, setUniversities] = useState<ExtendedUniversityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUniId, setSelectedUniId] = useState<string>('');
  const [isAddUniModalOpen, setIsAddUniModalOpen] = useState(false);

  // Search & Filter for My Universities
  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Dashboard Stats State
  const [stats, setStats] = useState({
    totalUnis: 0,
    publicUnis: 0,
    privateUnis: 0,
    totalPrograms: 0,
    totalNotices: 0,
    totalScholarships: 0,
    totalLeads: 0,
  });

  useEffect(() => {
    initDashboard();
  }, []);

  async function initDashboard() {
    try {
      setLoading(true);
      const user = await universityCmsService.getCurrentUser();
      if (user?.email) setUserEmail(user.email);

      const role = await universityCmsService.getUserRole(user?.id);
      const isSuper = role === 'super_admin';
      setUserRole(isSuper ? 'super_admin' : 'admin');

      let assignedIds: string[] = [];
      if (!isSuper && user?.id) {
        assignedIds = await universityCmsService.getAssignedUniversityIds(user.id);
        setAssignedUniIds(assignedIds);
      }

      // Fetch all core datasets
      const [allUnis, allProgs, allNotices, allSchs, allLeads] = await Promise.all([
        universityCmsService.getUniversities(),
        universityCmsService.getPrograms(),
        universityCmsService.getAdmissionNotices(),
        universityCmsService.getScholarships(),
        universityCmsService.getStudentLeads(),
      ]);

      // Filter universities for regular Admin
      const visibleUnis = isSuper
        ? allUnis
        : allUnis.filter((u) => assignedIds.includes(u.id));

      setUniversities(visibleUnis);

      if (visibleUnis.length > 0 && !selectedUniId) {
        setSelectedUniId(visibleUnis[0].id);
      }

      // Compute live overview numbers
      const pubCount = visibleUnis.filter((u) => u.type === 'Public').length;
      const privCount = visibleUnis.filter((u) => u.type === 'Private' || !u.type).length;

      setStats({
        totalUnis: visibleUnis.length,
        publicUnis: pubCount,
        privateUnis: privCount,
        totalPrograms: allProgs.length,
        totalNotices: allNotices.length,
        totalScholarships: allSchs.length,
        totalLeads: allLeads.length,
      });
    } catch (err) {
      console.error('Dashboard init error:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenEditor = (uniId: string) => {
    setSelectedUniId(uniId);
    setActiveTab('editor');
  };

  const handleUniversityCreated = (newUni: ExtendedUniversityData) => {
    setUniversities((prev) => [newUni, ...prev]);
    setSelectedUniId(newUni.id);
    setActiveTab('editor');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isSuperAdmin = userRole === 'super_admin';

  // Navigation Items according to role
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'universities', label: 'My Universities', icon: GraduationCap },
    { id: 'editor', label: 'University Editor', icon: Edit3 },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'admissions', label: 'Admission Notices', icon: Bell },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'leads', label: 'Student Leads', icon: FileText },
    ...(isSuperAdmin
      ? [{ id: 'admins', label: 'Admin Management', icon: UserCog }]
      : []),
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ] as const;

  // Filtered universities list for "My Universities"
  const filteredUniversities = universities.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDiv = divisionFilter === 'all' || u.division === divisionFilter;
    const matchType = typeFilter === 'all' || (u.type || 'Private') === typeFilter;
    return matchSearch && matchDiv && matchType;
  });

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col lg:flex-row">
      {/* ── Desktop Sidebar ── */}
      <aside className="w-64 bg-navy-950 text-ink-300 shrink-0 hidden lg:flex flex-col border-r border-navy-900">
        <div className="p-5 border-b border-navy-900">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white shadow-md">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="font-bold text-white text-sm tracking-tight">UniVara CMS</p>
              <p className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">
                {isSuperAdmin ? 'Super Admin Console' : 'University Admin'}
              </p>
            </div>
          </div>
        </div>

        {/* Super Admin Quick Action */}
        {isSuperAdmin && (
          <div className="p-3">
            <button
              onClick={() => setIsAddUniModalOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-sm transition"
            >
              <PlusCircle size={15} /> Add University
            </button>
          </div>
        )}

        {/* Sidebar Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === item.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-ink-400 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Identity & Logout */}
        <div className="p-3 border-t border-navy-900 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-navy-900 text-xs">
            <div className="min-w-0 pr-2">
              <p className="font-semibold text-white truncate">{userEmail}</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck size={11} /> {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-ink-400 hover:text-rose-400 transition"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Header & Nav ── */}
      <div className="lg:hidden bg-navy-950 text-white p-3 sticky top-0 z-40 border-b border-navy-900">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold">
              <GraduationCap size={16} />
            </div>
            <span className="font-bold text-sm">UniVara Admin</span>
          </div>

          <div className="flex items-center gap-2">
            {isSuperAdmin && (
              <button
                onClick={() => setIsAddUniModalOpen(true)}
                className="btn-primary !py-1 !px-2.5 text-[11px]"
              >
                + Add Uni
              </button>
            )}
            <button
              onClick={handleLogout}
              className="p-1.5 text-ink-300 hover:text-white"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === item.id ? 'bg-brand-600 text-white' : 'bg-navy-900 text-ink-400'
              }`}
            >
              <item.icon size={13} /> {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Platform Overview</h1>
                <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
                  Live metrics, university directory statistics, and management summaries.
                </p>
              </div>

              {isSuperAdmin && (
                <button
                  onClick={() => setIsAddUniModalOpen(true)}
                  className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
                >
                  <PlusCircle size={15} /> Add New University
                </button>
              )}
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="card p-4 sm:p-5 bg-white border border-ink-200">
                <div className="flex items-center justify-between text-brand-600 mb-2">
                  <span className="text-xs font-semibold text-ink-500">Universities</span>
                  <Building2 size={18} />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-ink-900">{stats.totalUnis}</p>
                <p className="text-[11px] text-ink-400 mt-1">
                  {stats.publicUnis} Public • {stats.privateUnis} Private
                </p>
              </div>

              <div className="card p-4 sm:p-5 bg-white border border-ink-200">
                <div className="flex items-center justify-between text-accent-600 mb-2">
                  <span className="text-xs font-semibold text-ink-500">Total Programs</span>
                  <BookOpen size={18} />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-ink-900">{stats.totalPrograms}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">Across all departments</p>
              </div>

              <div className="card p-4 sm:p-5 bg-white border border-ink-200">
                <div className="flex items-center justify-between text-gold-600 mb-2">
                  <span className="text-xs font-semibold text-ink-500">Admission Notices</span>
                  <Bell size={18} />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-ink-900">{stats.totalNotices}</p>
                <p className="text-[11px] text-ink-400 mt-1">Ongoing intakes & circulars</p>
              </div>

              <div className="card p-4 sm:p-5 bg-white border border-ink-200">
                <div className="flex items-center justify-between text-emerald-600 mb-2">
                  <span className="text-xs font-semibold text-ink-500">Student Leads</span>
                  <FileText size={18} />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-ink-900">{stats.totalLeads}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">Verified Inquiries</p>
              </div>
            </div>

            {/* Quick Actions & Recent Universities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card p-5 bg-white border border-ink-200 space-y-4">
                <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                  <h3 className="font-bold text-sm text-ink-900">Manage Universities</h3>
                  <button
                    onClick={() => setActiveTab('universities')}
                    className="text-xs text-brand-600 hover:underline font-semibold"
                  >
                    View All ({universities.length}) →
                  </button>
                </div>

                <div className="space-y-2">
                  {universities.slice(0, 5).map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-ink-50/60 hover:bg-ink-100/60 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-3">
                        <div className="h-9 w-9 rounded-xl bg-brand-50 text-brand-700 font-bold flex items-center justify-center shrink-0">
                          {u.logoInitials || u.shortName.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-ink-900 truncate">{u.name}</p>
                          <p className="text-[10px] text-ink-500">
                            {u.shortName} • {u.location} • {u.established}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditor(u.id)}
                          className="btn-secondary !py-1 !px-2.5 text-xs flex items-center gap-1"
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        <a
                          href={`/universities/${u.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-ink-400 hover:text-ink-700 rounded-lg"
                          title="Open public page"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="card p-5 bg-white border border-ink-200 space-y-3">
                <h3 className="font-bold text-sm text-ink-900 border-b border-ink-100 pb-2">Quick Navigation</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('programs')}
                    className="w-full text-left p-3 rounded-xl bg-ink-50 hover:bg-brand-50 hover:text-brand-700 text-xs font-semibold text-ink-700 flex items-center justify-between transition"
                  >
                    <span>Manage Degree Programs</span>
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="w-full text-left p-3 rounded-xl bg-ink-50 hover:bg-brand-50 hover:text-brand-700 text-xs font-semibold text-ink-700 flex items-center justify-between transition"
                  >
                    <span>Admission Circulars</span>
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => setActiveTab('scholarships')}
                    className="w-full text-left p-3 rounded-xl bg-ink-50 hover:bg-brand-50 hover:text-brand-700 text-xs font-semibold text-ink-700 flex items-center justify-between transition"
                  >
                    <span>Scholarship Schemes</span>
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="w-full text-left p-3 rounded-xl bg-ink-50 hover:bg-brand-50 hover:text-brand-700 text-xs font-semibold text-ink-700 flex items-center justify-between transition"
                  >
                    <span>Student Inquiries ({stats.totalLeads})</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY UNIVERSITIES */}
        {activeTab === 'universities' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-ink-900">
                  {isSuperAdmin ? 'All Universities' : 'My Assigned Universities'}
                </h1>
                <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
                  Select a university to edit its full profile details, programs, and facilities.
                </p>
              </div>

              {isSuperAdmin && (
                <button
                  onClick={() => setIsAddUniModalOpen(true)}
                  className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
                >
                  <PlusCircle size={15} /> Add University
                </button>
              )}
            </div>

            {/* Search & Filters */}
            <div className="card p-3 bg-white border border-ink-200 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  placeholder="Search by university name, short code, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-9 text-xs py-2"
                />
              </div>

              <div>
                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value)}
                  className="input-field text-xs py-2"
                >
                  <option value="all">All Divisions</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="input-field text-xs py-2"
                >
                  <option value="all">All Types</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="International">International</option>
                  <option value="Specialized">Specialized</option>
                </select>
              </div>
            </div>

            {/* University Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUniversities.map((u) => (
                <div
                  key={u.id}
                  className="card p-5 bg-white border border-ink-200/90 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white font-bold flex items-center justify-center shrink-0 shadow-sm text-sm">
                          {u.logoUrl ? (
                            <img src={u.logoUrl} alt={u.shortName} className="h-full w-full object-contain rounded-xl p-1" />
                          ) : (
                            u.logoInitials || u.shortName.slice(0, 3)
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-ink-900 leading-snug line-clamp-1">{u.name}</h3>
                          <span className="chip-primary text-[10px] mt-0.5">{u.shortName}</span>
                        </div>
                      </div>
                      <span className="chip-success text-[10px] shrink-0 font-semibold">{u.type || 'Private'}</span>
                    </div>

                    <p className="text-xs text-ink-500 line-clamp-2">{u.description || 'No description added yet.'}</p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-ink-600 pt-2 border-t border-ink-100">
                      <div>
                        <span className="text-ink-400 block text-[10px]">Location</span>
                        <span className="font-medium truncate block">{u.location}</span>
                      </div>
                      <div>
                        <span className="text-ink-400 block text-[10px]">Established</span>
                        <span className="font-medium">{u.established}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-ink-100">
                    <button
                      onClick={() => handleOpenEditor(u.id)}
                      className="btn-primary !py-1.5 !px-3 text-xs flex-1 flex items-center justify-center gap-1.5"
                    >
                      <Edit3 size={14} /> Edit University
                    </button>
                    <a
                      href={`/universities/${u.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-1.5 !px-3 text-xs flex items-center justify-center gap-1"
                    >
                      <Eye size={14} /> Public
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: UNIVERSITY EDITOR */}
        {activeTab === 'editor' && (
          <div className="space-y-4 animate-fade-in">
            {/* University Selector dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-ink-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-ink-700">Currently Editing:</span>
                <select
                  value={selectedUniId || (universities[0]?.id ?? '')}
                  onChange={(e) => setSelectedUniId(e.target.value)}
                  className="input-field text-xs py-1.5 font-semibold text-brand-700 bg-brand-50/50 border-brand-200"
                >
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.shortName})
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-[11px] text-ink-400">
                Switch university to edit its profile, faculties, and departments.
              </span>
            </div>

            <UniversityEditor
              key={selectedUniId || (universities[0]?.id ?? '')}
              universityId={selectedUniId || (universities[0]?.id ?? '')}
              onBack={() => setActiveTab('universities')}
              isSuperAdmin={isSuperAdmin}
            />
          </div>
        )}

        {/* TAB 4: PROGRAMS */}
        {activeTab === 'programs' && (
          <div className="animate-fade-in">
            <ProgramsManagementTab isSuperAdmin={isSuperAdmin} />
          </div>
        )}

        {/* TAB 5: ADMISSION NOTICES */}
        {activeTab === 'admissions' && (
          <div className="animate-fade-in">
            <AdmissionNoticesTab isSuperAdmin={isSuperAdmin} />
          </div>
        )}

        {/* TAB 6: SCHOLARSHIPS */}
        {activeTab === 'scholarships' && (
          <div className="animate-fade-in">
            <ScholarshipsTab isSuperAdmin={isSuperAdmin} />
          </div>
        )}

        {/* TAB 7: STUDENT LEADS */}
        {activeTab === 'leads' && (
          <div className="animate-fade-in">
            <StudentLeadsTab isSuperAdmin={isSuperAdmin} />
          </div>
        )}

        {/* TAB 8: ADMIN MANAGEMENT (Super Admin Only) */}
        {activeTab === 'admins' && isSuperAdmin && (
          <div className="animate-fade-in">
            <AdminManagementTab />
          </div>
        )}

        {/* TAB 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in">
            <SettingsTab isSuperAdmin={isSuperAdmin} />
          </div>
        )}
      </main>

      {/* Add University Modal */}
      <AddUniversityModal
        isOpen={isAddUniModalOpen}
        onClose={() => setIsAddUniModalOpen(false)}
        onCreated={handleUniversityCreated}
      />
    </div>
  );
}
