import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Globe, Mail, Phone, MapPin, Building2, Award, Calendar, Users,
  CheckCircle2, ExternalLink, GraduationCap, BookOpen, CreditCard,
  FileText, HandCoins, Home, MessageSquare, Phone as PhoneIcon,
  ThumbsUp, Flag, Star, ChevronRight, ChevronDown, Search, Filter,
  SlidersHorizontal, Clock, Coins, School, Landmark,
  TrendingUp, Trophy, Shield, Target, Zap, Sparkles,
  Share2, Download, BarChart3, PieChart, Camera, User,
  Briefcase, Microscope, HelpCircle, ArrowRight, Leaf, Wifi, Cpu,
  Utensils, Activity, BookMarked, GraduationCap as CapIcon,
  Map, Send, Bookmark, GitCompare, PlayCircle, Quote, CircleDollarSign,
  Percent, Languages, Globe2, Gauge, Layers, Binary, Network,
  UserCog, FileCheck, PenLine,
} from 'lucide-react';
import {
  getUniversity, getOfferingsByUniversity, getReviewsByUniversity,
  getScholarshipsByUniversity, getNoticesByUniversity, getPostsByUniversity,
  getProgramById, formatBDT, formatBDTFull, universities,
} from '@/data/sampleData';
import {
  RatingStars, VerificationBadge, CompareButton, SaveButton, EmptyState,
} from '@/components/ui';
import LeadForm from '@/components/LeadForm';
import type { ReviewCategoryRating } from '@/types';
import { useCountUp, useInView } from '@/hooks/useAnimations';

const ratingLabels: { key: keyof ReviewCategoryRating; label: string }[] = [
  { key: 'academics', label: 'Academics' },
  { key: 'faculty', label: 'Faculty' },
  { key: 'campus', label: 'Campus' },
  { key: 'studentLife', label: 'Student Life' },
  { key: 'career', label: 'Career Opp.' },
  { key: 'costValue', label: 'Cost vs Value' },
  { key: 'facilities', label: 'Facilities' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.06 },
  }),
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

function StatCard({ value, suffix, label, icon: Icon, color = 'primary', delay = 0 }: {
  value: number; suffix?: string; label: string; icon: LucideIcon;
  color?: 'primary' | 'emerald' | 'blue' | 'amber'; delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const count = useCountUp(value, 1600, inView);
  const colorMap = {
    primary: 'from-primary-50 to-white text-primary-600 border-primary-100',
    emerald: 'from-emeraldAccent-50 to-white text-emeraldAccent-600 border-emeraldAccent-100',
    blue: 'from-blueSaaS-50 to-white text-blueSaaS-600 border-blueSaaS-100',
    amber: 'from-warningSaaS-50 to-white text-warningSaaS-600 border-warningSaaS-100',
  };
  const iconBg = {
    primary: 'bg-primary-500/10 text-primary-600',
    emerald: 'bg-emeraldAccent-500/10 text-emeraldAccent-600',
    blue: 'bg-blueSaaS-500/10 text-blueSaaS-600',
    amber: 'bg-warningSaaS-500/10 text-warningSaaS-600',
  };
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className={`stat-card bg-gradient-to-br ${colorMap[color]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
            {count.toLocaleString()}
            {suffix && <span className="text-lg font-semibold text-ink-400 ml-0.5">{suffix}</span>}
          </p>
        </div>
        <div className={`p-2.5 rounded-2xl ${iconBg[color]}`}>
          <Icon size={20} strokeWidth={2.2} />
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'border-primary-200 bg-primary-50/40 shadow-sm' : 'border-borderLine bg-white'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left ring-focus"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-ink-900 pr-4">{q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="shrink-0">
          <ChevronDown size={18} className="text-ink-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UniversityProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'tuition' | 'admission' | 'scholarships' | 'campus' | 'reviews' | 'community' | 'contact'>('overview');
  const [programSearch, setProgramSearch] = useState('');
  const [programDeptFilter, setProgramDeptFilter] = useState('all');
  const [programTuitionFilter, setProgramTuitionFilter] = useState('all');
  const [programDurationFilter, setProgramDurationFilter] = useState('all');
  const [programScholarshipFilter, setProgramScholarshipFilter] = useState('all');
  const [programSort, setProgramSort] = useState('popularity');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const uni = slug ? getUniversity(slug) : undefined;
  const offerings = useMemo(() => (uni ? getOfferingsByUniversity(uni.id) : []), [uni]);
  const uniReviews = useMemo(() => (uni ? getReviewsByUniversity(uni.id) : []), [uni]);
  const uniScholarships = useMemo(() => (uni ? getScholarshipsByUniversity(uni.id) : []), [uni]);
  const uniNotices = useMemo(() => (uni ? getNoticesByUniversity(uni.id) : []), [uni]);
  const uniPosts = useMemo(() => (uni ? getPostsByUniversity(uni.id) : []), [uni]);

  const avgRatings: ReviewCategoryRating = {
    academics: 0, faculty: 0, campus: 0, studentLife: 0, career: 0, costValue: 0, facilities: 0,
  };
  if (uniReviews.length > 0) {
    (Object.keys(avgRatings) as (keyof ReviewCategoryRating)[]).forEach((k) => {
      avgRatings[k] = uniReviews.reduce((s, r) => s + r.ratings[k], 0) / uniReviews.length;
    });
  }

  const filteredOfferings = useMemo(() => {
    let list = [...offerings];
    if (programSearch.trim()) {
      const q = programSearch.toLowerCase();
      list = list.filter((o) => {
        const p = getProgramById(o.programId);
        return p?.name.toLowerCase().includes(q) || p?.slug.toLowerCase().includes(q) || o.degree.toLowerCase().includes(q);
      });
    }
    if (programScholarshipFilter === 'yes') list = list.filter((o) => o.scholarshipAvailable);
    if (programScholarshipFilter === 'no') list = list.filter((o) => !o.scholarshipAvailable);
    if (programDurationFilter !== 'all') {
      const y = Number(programDurationFilter);
      list = list.filter((o) => o.durationYears === y);
    }
    if (programTuitionFilter === 'under8') list = list.filter((o) => o.totalTuitionEstimate < 800000);
    if (programTuitionFilter === '8-12') list = list.filter((o) => o.totalTuitionEstimate >= 800000 && o.totalTuitionEstimate <= 1200000);
    if (programTuitionFilter === 'over12') list = list.filter((o) => o.totalTuitionEstimate > 1200000);

    switch (programSort) {
      case 'tuition_asc': list.sort((a, b) => a.totalTuitionEstimate - b.totalTuitionEstimate); break;
      case 'tuition_desc': list.sort((a, b) => b.totalTuitionEstimate - a.totalTuitionEstimate); break;
      case 'credits': list.sort((a, b) => b.totalCredits - a.totalCredits); break;
      case 'popularity':
      default:
        list.sort((a, b) => {
          const pa = getProgramById(a.programId);
          const pb = getProgramById(b.programId);
          return (pb?.offeringUniversityIds.length || 0) - (pa?.offeringUniversityIds.length || 0);
        });
    }
    return list;
  }, [offerings, programSearch, programTuitionFilter, programDurationFilter, programScholarshipFilter, programSort]);

  const relatedUnis = useMemo(() => universities.filter((u) => u.id !== uni?.id).slice(0, 3), [uni]);

  if (!uni) {
    return (
      <div className="container-page py-24">
        <EmptyState title="University not found" message="The university you are looking for does not exist." icon={<GraduationCap size={28} />} />
        <div className="text-center mt-6">
          <Link to="/universities" className="btn-primary">Back to Universities</Link>
        </div>
      </div>
    );
  }

  const faqs = [
    { q: `What is the minimum GPA required for admission to ${uni.name}?`, a: `The minimum HSC GPA requirement is ${uni.minGPA.toFixed(1)} out of 5.0. Some programs such as engineering may require additional subject prerequisites like Physics, Chemistry, and Mathematics with strong individual grades.` },
    { q: `Does ${uni.name} require an admission test?`, a: uni.admissionTestRequired ? `Yes — ${uni.name} requires all undergraduate applicants to sit for a written admission test covering relevant subjects (e.g., Physics, Math, English for engineering programs). Final selection is based on a combination of HSC results and test scores.` : `No — ${uni.name} does not require a separate admission test. Selection is based primarily on your HSC/equivalent GPA and document verification.` },
    { q: `Are scholarships available and how do I apply?`, a: uni.scholarshipAvailable ? `Yes — ${uni.name} offers multiple merit-based scholarships. Eligibility typically requires a GPA of 4.5+ and a strong performance on the admission test. Scholarships are awarded automatically upon admission — no separate application is needed for most categories.` : `Scholarship information for ${uni.name} is limited. Please contact the admissions office directly for the latest scholarship opportunities.` },
    { q: `What is the typical total tuition cost?`, a: `Total estimated tuition ranges from ${formatBDT(uni.tuitionMin)} to ${formatBDT(uni.tuitionMax)} depending on the program. This includes tuition per credit, admission fees, and semester fees. Lab fees and other charges may add approximately 8–12% to the total. Use our Cost Calculator for a personalized estimate.` },
    { q: `How long does the typical undergraduate program take?`, a: `Most undergraduate programs at ${uni.name} are 4 years (8 semesters). Architecture programs are typically 5 years. Timelines may vary slightly based on credit load, summer semesters, and individual progress.` },
    { q: `Is ${uni.name} accredited by UGC?`, a: `Yes — ${uni.name} is fully approved and accredited by the University Grants Commission (UGC) of Bangladesh. ${uni.accreditation}` },
  ];

  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* PREMIUM HERO SECTION */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden">
        {/* Cover Image Layer */}
        <div className="absolute inset-0 h-[520px] sm:h-[560px]">
          <img
            src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`modern university campus building with glass facade, green courtyard, students walking, professional photography, golden hour lighting, wide angle, hyperrealistic`)}&image_size=landscape_16_9`}
            alt={`${uni.name} campus`}
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.1),transparent_55%)]" />
        </div>

        <div className="relative">
          {/* Breadcrumb */}
          <div className="container-page pt-8 sm:pt-10">
            <nav aria-label="Breadcrumb" className="text-sm text-white/60 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="opacity-50" />
              <Link to="/universities" className="hover:text-white transition-colors">Universities</Link>
              <ChevronRight size={14} className="opacity-50" />
              <span className="text-white">{uni.name}</span>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="container-page pt-8 sm:pt-10 pb-12 sm:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
            >
              {/* Logo + Info */}
              <div className="lg:col-span-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="relative shrink-0">
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
                      className={`h-24 w-24 sm:h-28 sm:w-28 rounded-[28px] bg-gradient-to-br ${uni.logoColor} text-white flex items-center justify-center font-bold text-3xl sm:text-4xl font-display shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] ring-4 ring-white/10`}
                    >
                      {uni.logoInitials}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.35, type: 'spring' }}
                      className="absolute -bottom-2 -right-2 h-9 w-9 rounded-2xl bg-emeraldAccent-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white/20"
                    >
                      <Shield size={16} strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <VerificationBadge status={uni.verification} />
                      {uni.featured && (
                        <span className="chip bg-warningSaaS-500/15 text-warningSaaS-300 border border-warningSaaS-400/30">
                          <Sparkles size={12} /> Featured
                        </span>
                      )}
                      <span className="chip bg-white/10 text-white/80 border border-white/15">
                        <Award size={12} /> Ranked #{universities.findIndex(u => u.id === uni.id) + 1} in BD
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                      {uni.name}
                    </h1>
                    <p className="mt-2 text-base sm:text-lg text-white/70 font-medium">
                      {uni.shortName} • Established {uni.established} • {uni.accreditation.split('.')[0]}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/75">
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center h-8 w-8 rounded-xl bg-white/10 border border-white/10">
                          <MapPin size={15} />
                        </span>
                        {uni.location}, {uni.division}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center h-8 w-8 rounded-xl bg-white/10 border border-white/10">
                          <Landmark size={15} />
                        </span>
                        {uni.established} Years of Excellence
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center h-8 w-8 rounded-xl bg-white/10 border border-white/10">
                          <GraduationCap size={15} />
                        </span>
                        {uni.programCount} Programs
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center h-8 w-8 rounded-xl bg-white/10 border border-white/10">
                          <Users size={15} />
                        </span>
                        {uni.reviewCount.toLocaleString()}+ Students
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <button className="btn-primary text-base px-7 py-3.5">
                    <Send size={16} strokeWidth={2.2} /> Apply Now
                  </button>
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-base px-7 py-3.5 !bg-white/10 !text-white !border-white/20 hover:!bg-white/15"
                  >
                    <Globe size={16} /> Visit Website <ExternalLink size={13} />
                  </a>
                  <SaveButton universityId={uni.id} />
                  <CompareButton universityId={uni.id} />
                  <button className="btn-secondary !px-4 !py-3" aria-label="Share">
                    <Share2 size={17} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STICKY TABS NAV */}
      {/* ================================================================ */}
      <div className="sticky top-16 z-30 border-y border-borderLine bg-white/85 backdrop-blur-xl shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="container-page">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'programs', label: 'Programs', icon: GraduationCap },
              { id: 'tuition', label: 'Tuition & Fees', icon: CreditCard },
              { id: 'admission', label: 'Admission', icon: FileCheck },
              { id: 'scholarships', label: 'Scholarships', icon: Award },
              { id: 'campus', label: 'Campus', icon: Home },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'community', label: 'Community', icon: MessageSquare },
              { id: 'contact', label: 'Contact', icon: PhoneIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab !px-4 !py-2.5 flex items-center gap-2 ${activeTab === tab.id ? 'tab-active' : ''}`}
              >
                <tab.icon size={15} strokeWidth={2.2} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MAIN CONTENT + STICKY SIDEBAR */}
      {/* ================================================================ */}
      <div className="container-page py-10 sm:py-14">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ==================== 70% MAIN CONTENT ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="xl:col-span-8 space-y-14 sm:space-y-20"
          >
            {/* ================= OVERVIEW TAB ================= */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-14 sm:space-y-20"
                >
                  {/* About */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                    <div className="section-header">
                      <span className="section-eyebrow"><Leaf size={14} /> About the University</span>
                      <h2 className="section-title text-3xl sm:text-4xl">About {uni.name}</h2>
                      <p className="section-sub max-w-2xl text-lg mt-3 leading-relaxed">
                        Discover the history, mission, and values that shape one of Bangladesh's leading private institutions.
                      </p>
                    </div>
                    <div className="card p-8 sm:p-10">
                      <p className="text-ink-600 leading-[1.9] text-base">
                        {uni.description}
                      </p>
                    </div>
                  </motion.section>

                  {/* Faculties & Departments */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                    <div className="section-header">
                      <span className="section-eyebrow"><Layers size={14} /> Academic Structure</span>
                      <h2 className="section-title text-3xl sm:text-4xl">Faculties &amp; Departments</h2>
                      <p className="section-sub max-w-2xl text-lg mt-3">
                        Explore the academic schools and departments that offer cutting-edge programs.
                      </p>
                    </div>

                    <div className="space-y-8">
                      {uni.faculties.map((fac, fi) => {
                        const FacultyIcon: LucideIcon = fi === 0 ? Cpu : fi === 1 ? Briefcase : fi === 2 ? Languages : fi === 3 ? Microscope : BookOpen;
                        return (
                          <motion.div key={fac.id} variants={fadeUp} custom={fi} className="card p-6 sm:p-8 overflow-hidden relative">
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary-50 to-emeraldAccent-50 opacity-60" />
                            <div className="relative">
                              <div className="flex items-start gap-4 mb-6">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-500 to-emeraldAccent-500 text-white flex items-center justify-center shrink-0 shadow-[0_12px_24px_-8px_rgba(15,118,110,0.4)]">
                                  <FacultyIcon size={26} strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="chip-primary">Faculty {fi + 1}</span>
                                    <span className="chip-muted">{fac.departments.length} Departments</span>
                                  </div>
                                  <h3 className="text-xl font-bold tracking-tight text-ink-900 mt-2">{fac.name}</h3>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {fac.departments.map((deptName, di) => {
                                  const offering = offerings.find((o) => {
                                    const prog = getProgramById(o.programId);
                                    return (
                                      prog?.name.toLowerCase().includes(deptName.toLowerCase()) ||
                                      prog?.slug.toLowerCase() === deptName.toLowerCase() ||
                                      deptName.toLowerCase().includes(prog?.slug.toLowerCase() || '')
                                    );
                                  });

                                  if (offering) {
                                    const prog = getProgramById(offering.programId);
                                    return (
                                      <motion.div
                                        key={deptName}
                                        variants={fadeUp}
                                        custom={di}
                                        className="group relative p-5 rounded-2xl bg-white border border-borderLine hover:border-primary-200 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                      >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-50 via-primary-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10">
                                          <div className="flex items-start justify-between gap-3 mb-4">
                                            <h4 className="font-bold text-ink-900 text-base leading-snug group-hover:text-primary-700 transition-colors">
                                              {prog?.name || deptName}
                                            </h4>
                                            <span className="shrink-0 text-xs font-black text-primary-700 bg-gradient-to-br from-primary-50 to-emeraldAccent-50 px-2.5 py-1.5 rounded-xl border border-primary-100 shadow-sm">
                                              {formatBDT(offering.totalTuitionEstimate)}
                                            </span>
                                          </div>
                                          <div className="grid grid-cols-2 gap-2.5 mb-4">
                                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ink-50/70 border border-ink-100/60">
                                              <BookOpen size={13} className="text-primary-600" strokeWidth={2.3} />
                                              <div className="min-w-0">
                                                <p className="text-[9px] font-bold uppercase tracking-wide text-ink-400 leading-none">Credits</p>
                                                <p className="text-xs font-bold text-ink-900">{offering.totalCredits}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ink-50/70 border border-ink-100/60">
                                              <Clock size={13} className="text-blueSaaS-600" strokeWidth={2.3} />
                                              <div className="min-w-0">
                                                <p className="text-[9px] font-bold uppercase tracking-wide text-ink-400 leading-none">Duration</p>
                                                <p className="text-xs font-bold text-ink-900">{offering.durationYears} Yrs</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex flex-wrap gap-1.5">
                                            {offering.admissionRequirements.slice(0, 3).map((r) => (
                                              <span key={r} className="px-2.5 py-1 bg-ink-50 border border-ink-200/70 rounded-lg text-[10px] font-semibold text-ink-600">
                                                {r}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      </motion.div>
                                    );
                                  }

                                  return (
                                    <div key={deptName} className="p-5 rounded-2xl bg-ink-50/50 border border-dashed border-ink-200">
                                      <div className="h-9 w-9 rounded-xl bg-white border border-ink-100 flex items-center justify-center text-ink-400 mb-3">
                                        <BookMarked size={16} />
                                      </div>
                                      <p className="font-semibold text-ink-500 text-sm">{deptName}</p>
                                      <p className="text-[11px] text-ink-400 mt-1 italic">Details coming soon</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.section>

                </motion.div>
              )}

              {/* ================= PROGRAMS TAB ================= */}
              {activeTab === 'programs' && (
                <motion.div
                  key="programs"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <div className="section-header">
                    <span className="section-eyebrow"><GraduationCap size={14} /> Academic Offerings</span>
                    <h2 className="section-title text-3xl sm:text-4xl">Programs at {uni.name}</h2>
                    <p className="section-sub max-w-2xl text-lg mt-3">
                      {offerings.length} undergraduate programs across {uni.faculties.length} faculties — find the path that's right for you.
                    </p>
                  </div>

                  {/* Filters Bar */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="card p-5 sm:p-6"
                  >
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                        <input
                          type="text"
                          placeholder="Search programs (e.g. CSE, BBA, Architecture...)"
                          value={programSearch}
                          onChange={(e) => setProgramSearch(e.target.value)}
                          className="input pl-12"
                        />
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        <select
                          value={programDeptFilter}
                          onChange={(e) => setProgramDeptFilter(e.target.value)}
                          className="input-sm min-w-[150px]"
                        >
                          <option value="all">All Departments</option>
                          {uni.faculties.map((f) => <option key={f.id} value={f.id}>{f.departments[0]}</option>)}
                        </select>
                        <select
                          value={programTuitionFilter}
                          onChange={(e) => setProgramTuitionFilter(e.target.value)}
                          className="input-sm min-w-[160px]"
                        >
                          <option value="all">All Tuition</option>
                          <option value="under8">Under ৳8L</option>
                          <option value="8-12">৳8L – ৳12L</option>
                          <option value="over12">Over ৳12L</option>
                        </select>
                        <select
                          value={programDurationFilter}
                          onChange={(e) => setProgramDurationFilter(e.target.value)}
                          className="input-sm min-w-[140px]"
                        >
                          <option value="all">All Durations</option>
                          <option value="4">4 Years</option>
                          <option value="5">5 Years</option>
                        </select>
                        <select
                          value={programScholarshipFilter}
                          onChange={(e) => setProgramScholarshipFilter(e.target.value)}
                          className="input-sm min-w-[150px]"
                        >
                          <option value="all">All</option>
                          <option value="yes">Scholarship</option>
                          <option value="no">No Scholarship</option>
                        </select>
                        <select
                          value={programSort}
                          onChange={(e) => setProgramSort(e.target.value)}
                          className="input-sm min-w-[180px]"
                        >
                          <option value="popularity">Sort: Popularity</option>
                          <option value="tuition_asc">Tuition: Low to High</option>
                          <option value="tuition_desc">Tuition: High to Low</option>
                          <option value="credits">Most Credits</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-ink-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm text-ink-500">
                        <Filter size={14} />
                        <span>Showing <span className="font-bold text-ink-900">{filteredOfferings.length}</span> of {offerings.length} programs</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        {(programSearch || programTuitionFilter !== 'all' || programDurationFilter !== 'all' || programScholarshipFilter !== 'all') && (
                          <button
                            onClick={() => { setProgramSearch(''); setProgramTuitionFilter('all'); setProgramDurationFilter('all'); setProgramScholarshipFilter('all'); setProgramDeptFilter('all'); }}
                            className="chip-rose hover:bg-rose-100 cursor-pointer transition-colors"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Programs Grid */}
                  {filteredOfferings.length === 0 ? (
                    <EmptyState title="No programs match your filters" message="Try adjusting your search criteria." icon={<SlidersHorizontal size={28} />} />
                  ) : (
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-40px' }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                      {filteredOfferings.map((o, i) => {
                        const prog = getProgramById(o.programId);
                        return (
                          <motion.article
                            key={o.id}
                            variants={fadeUp}
                            custom={i}
                            className="card card-hover overflow-hidden group"
                          >
                            {/* Header gradient */}
                            <div className="relative p-6 sm:p-7 bg-gradient-to-br from-ink-50 via-white to-primary-50/40 border-b border-borderLine">
                              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-100/60 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity" />
                              <div className="relative flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                                    <span className="chip-primary">{o.degree}</span>
                                    <span className="chip-blue">{prog?.category || 'Program'}</span>
                                    {o.scholarshipAvailable && (
                                      <span className="chip-warning"><Award size={11} /> Scholarship</span>
                                    )}
                                  </div>
                                  <Link to={`/programs/${prog?.slug}`} className="block group/link">
                                    <h3 className="text-xl font-bold tracking-tight text-ink-900 leading-tight group-hover/link:text-primary-700 transition-colors">
                                      {prog?.name}
                                    </h3>
                                  </Link>
                                </div>
                                <div className="shrink-0 text-right">
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Est. Total</p>
                                  <p className="text-lg font-black text-primary-700 mt-0.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-xl border border-primary-100 shadow-sm">
                                    {formatBDT(o.totalTuitionEstimate)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="p-6 sm:p-7 space-y-5">
                              {/* Key Stats */}
                              <div className="grid grid-cols-4 gap-3">
                                {[
                                  { label: 'Duration', value: `${o.durationYears} Yrs`, icon: Clock, color: 'text-primary-600 bg-primary-50' },
                                  { label: 'Credits', value: o.totalCredits, icon: BookOpen, color: 'text-blueSaaS-600 bg-blueSaaS-50' },
                                  { label: 'Per Credit', value: formatBDTFull(o.tuitionPerCredit).replace('৳', '৳'), icon: Coins, color: 'text-emeraldAccent-600 bg-emeraldAccent-50' },
                                  { label: 'Admission', value: formatBDTFull(o.admissionFee).replace('৳', '৳'), icon: FileText, color: 'text-warningSaaS-600 bg-warningSaaS-50' },
                                ].map((s) => (
                                  <div key={s.label} className="text-center p-3 rounded-2xl bg-ink-50/60 border border-ink-100/80 group-hover:bg-white group-hover:border-ink-200 transition-colors">
                                    <div className={`mx-auto h-8 w-8 rounded-xl ${s.color} flex items-center justify-center mb-2`}>
                                      <s.icon size={14} strokeWidth={2.3} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{s.label}</p>
                                    <p className="text-xs font-bold text-ink-900 mt-1">{s.value}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Breakdown */}
                              <div className="p-4 rounded-2xl bg-gradient-to-r from-ink-50 to-primary-50/30 border border-ink-100 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-ink-500">Tuition ({o.totalCredits} cr × {formatBDTFull(o.tuitionPerCredit)})</span>
                                  <span className="font-semibold text-ink-800">{formatBDT(o.totalCredits * o.tuitionPerCredit)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-ink-500">Admission Fee</span>
                                  <span className="font-semibold text-ink-800">{formatBDTFull(o.admissionFee)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-ink-500">Other Fees (approx)</span>
                                  <span className="font-semibold text-ink-800">{formatBDTFull(o.labFee + o.otherFees + o.semesterFee)}</span>
                                </div>
                                <div className="pt-2 mt-2 border-t border-borderLine flex items-center justify-between">
                                  <span className="text-sm font-bold text-ink-900">Estimated Total</span>
                                  <span className="text-lg font-black text-primary-700">{formatBDT(o.totalTuitionEstimate)}</span>
                                </div>
                              </div>

                              {/* Requirements */}
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400 mb-2.5 flex items-center gap-1.5">
                                  <CheckCircle2 size={12} className="text-primary-500" /> Admission Requirements
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {o.admissionRequirements.map((r) => (
                                    <span key={r} className="pill bg-ink-50 text-ink-700 border border-ink-200 hover:border-primary-200 hover:bg-primary-50/50 transition-colors">
                                      {r}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* CTAs */}
                              <div className="pt-2 flex items-center gap-3">
                                <Link to={`/programs/${prog?.slug}`} className="btn-primary flex-1 !py-2.5">
                                  View Details <ChevronRight size={15} />
                                </Link>
                                <button className="btn-outline-primary !py-2.5 !px-4" aria-label="Save program">
                                  <Bookmark size={16} />
                                </button>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ================= TUITION TAB ================= */}
              {activeTab === 'tuition' && (
                <motion.div
                  key="tuition"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <div className="section-header">
                    <span className="section-eyebrow"><CircleDollarSign size={14} /> Financial Transparency</span>
                    <h2 className="section-title text-3xl sm:text-4xl">Tuition &amp; Fees</h2>
                    <p className="section-sub max-w-2xl text-lg mt-3">
                      A complete breakdown of program costs so you can plan your investment with confidence.
                    </p>
                  </div>

                  <div className="card p-6 sm:p-7 bg-gradient-to-r from-warningSaaS-50 via-warningSaaS-50/60 to-white border-warningSaaS-200 flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-warningSaaS-500/15 text-warningSaaS-600 flex items-center justify-center shrink-0">
                      <Shield size={20} strokeWidth={2.2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-ink-900">Data Disclaimer</h3>
                      <p className="mt-1 text-sm text-ink-600 leading-relaxed">
                        Fees shown are estimates based on our latest review. Actual fees may vary by intake, scholarship, and program updates.
                        Always confirm current rates directly with the university.
                      </p>
                      <p className="mt-2 text-xs text-ink-500">Last Updated: {uni.lastUpdated} • Source: {uni.source}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="card p-6 sm:p-7">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400 mb-1">Visualized</p>
                          <h3 className="text-xl font-bold text-ink-900">Program Cost Comparison</h3>
                        </div>
                        <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600">
                          <BarChart3 size={20} />
                        </div>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={tuitionChartData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                            <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} width={50} />
                            <Tooltip
                              contentStyle={{ borderRadius: 14, border: '1px solid #E5E7EB', boxShadow: '0 20px 40px -12px rgba(15,23,42,0.15)', padding: 12 }}
                            />
                            <Bar dataKey="Tuition" fill="#0F766E" radius={[0, 6, 6, 0]} barSize={20} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="card p-6 sm:p-7">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400 mb-1">Components</p>
                          <h3 className="text-xl font-bold text-ink-900">Typical Cost Split</h3>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emeraldAccent-50 text-emeraldAccent-600">
                          <PieChart size={20} />
                        </div>
                      </div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={64}
                              outerRadius={92}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', padding: 10, fontSize: 12 }} />
                          </RePieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2.5">
                        {pieData.map((d) => (
                          <div key={d.name} className="p-3 rounded-xl bg-ink-50 border border-ink-100 flex items-center gap-3">
                            <div className="h-3.5 w-3.5 rounded-md shrink-0" style={{ background: d.color }} />
                            <div className="min-w-0">
                              <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400 leading-none">{d.name}</p>
                              <p className="text-sm font-bold text-ink-900 mt-0.5">{d.value}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card overflow-hidden border-0 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]">
                    <div className="px-6 sm:px-8 py-5 border-b border-borderLine bg-gradient-to-r from-white to-ink-50 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-ink-900">Complete Cost Breakdown by Program</h3>
                        <p className="text-sm text-ink-500 mt-0.5">All figures in BDT unless otherwise noted</p>
                      </div>
                      <div className="hidden sm:block chip-primary">
                        {offerings.length} Programs
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-ink-50/80 text-ink-500">
                            <th className="text-left font-semibold px-6 sm:px-8 py-4 whitespace-nowrap">Program</th>
                            <th className="text-right font-semibold px-4 py-4 whitespace-nowrap">Degree</th>
                            <th className="text-right font-semibold px-4 py-4 whitespace-nowrap">Duration</th>
                            <th className="text-right font-semibold px-4 py-4 whitespace-nowrap">Credits</th>
                            <th className="text-right font-semibold px-4 py-4 whitespace-nowrap">Per Credit</th>
                            <th className="text-right font-semibold px-4 py-4 whitespace-nowrap">Admission</th>
                            <th className="text-right font-semibold px-4 py-4 whitespace-nowrap">Other/Sem</th>
                            <th className="text-right font-semibold px-6 sm:px-8 py-4 whitespace-nowrap">Est. Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offerings.map((o, i) => {
                            const prog = getProgramById(o.programId);
                            return (
                              <tr
                                key={o.id}
                                className={`border-t border-ink-100 transition-colors hover:bg-primary-50/30 ${i % 2 === 1 ? 'bg-ink-50/30' : 'bg-white'}`}
                              >
                                <td className="text-left px-6 sm:px-8 py-4">
                                  <p className="font-semibold text-ink-900">{prog?.name}</p>
                                  <p className="text-xs text-ink-400 mt-0.5">{prog?.category}</p>
                                </td>
                                <td className="text-right px-4 py-4 font-medium text-ink-700">{o.degree}</td>
                                <td className="text-right px-4 py-4 font-medium text-ink-700">{o.durationYears} yrs</td>
                                <td className="text-right px-4 py-4 font-semibold text-ink-800">{o.totalCredits}</td>
                                <td className="text-right px-4 py-4 text-ink-700">{formatBDTFull(o.tuitionPerCredit)}</td>
                                <td className="text-right px-4 py-4 text-ink-700">{formatBDTFull(o.admissionFee)}</td>
                                <td className="text-right px-4 py-4 text-ink-700">{formatBDTFull(o.labFee + o.otherFees + o.semesterFee)}</td>
                                <td className="text-right px-6 sm:px-8 py-4">
                                  <span className="inline-flex items-center justify-end px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 font-bold border border-primary-100">
                                    {formatBDT(o.totalTuitionEstimate)}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <Link to="/calculator" className="btn-primary !px-8 !py-3.5 text-base">
                      <CreditCard size={16} /> Calculate Your Personalized Cost
                    </Link>
                    <a href={uni.website} target="_blank" rel="noopener noreferrer" className="btn-outline-primary !py-3.5">
                      Official Fee Chart <ExternalLink size={13} />
                    </a>
                  </div>
                </motion.div>
              )}

              {/* ================= ADMISSION TAB ================= */}
              {activeTab === 'admission' && (
                <motion.div
                  key="admission"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-10 sm:space-y-12"
                >
                  <div className="section-header">
                    <span className="section-eyebrow"><FileCheck size={14} /> Admission Guide</span>
                    <h2 className="section-title text-3xl sm:text-4xl">Get into {uni.name}</h2>
                    <p className="section-sub max-w-2xl text-lg mt-3">
                      Everything you need to know about requirements, deadlines, and the application process.
                    </p>
                  </div>

                  {/* Requirements Grid */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}>
                    <h3 className="text-2xl font-bold text-ink-900 mb-6 flex items-center gap-3">
                      <span className="h-9 w-9 rounded-xl bg-primary-500 text-white flex items-center justify-center">
                        <CheckCircle2 size={18} />
                      </span>
                      Eligibility &amp; Requirements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { title: 'Minimum HSC GPA', value: `${uni.minGPA.toFixed(1)} / 5.0`, desc: 'Across all subjects with relevant group', icon: Target, color: 'primary' },
                        { title: 'SSC Background', value: 'GPA 3.5+', desc: 'Science/Math required for engineering', icon: BookOpen, color: 'blue' },
                        { title: 'HSC Group Match', value: 'Relevant Track', desc: 'Science for engineering; business for BBA', icon: GraduationCap, color: 'emerald' },
                        { title: 'O/A Level Equivalent', value: '5 O + 2 A', desc: 'Minimum C grades across subjects', icon: Globe2, color: 'amber' },
                        { title: 'Admission Test', value: uni.admissionTestRequired ? 'Required' : 'Not Required', desc: uni.admissionTestRequired ? 'Written exam: Physics, Math, English' : 'GPA-based selection', icon: PenLine, color: 'primary' },
                        { title: 'Age Limit', value: 'Flexible', desc: 'No strict age limit at most private unis', icon: Calendar, color: 'blue' },
                      ].map((r, i) => {
                        const bgColor = {
                          primary: 'from-primary-50 to-white border-primary-100',
                          blue: 'from-blueSaaS-50 to-white border-blueSaaS-100',
                          emerald: 'from-emeraldAccent-50 to-white border-emeraldAccent-100',
                          amber: 'from-warningSaaS-50 to-white border-warningSaaS-100',
                        }[r.color];
                        const iconBg = {
                          primary: 'bg-primary-500 text-white',
                          blue: 'bg-blueSaaS-500 text-white',
                          emerald: 'bg-emeraldAccent-500 text-white',
                          amber: 'bg-warningSaaS-500 text-white',
                        }[r.color];
                        return (
                          <motion.div
                            key={r.title}
                            variants={fadeUp}
                            custom={i}
                            className={`p-6 rounded-3xl bg-gradient-to-br ${bgColor} border shadow-card hover:shadow-card-hover transition-all duration-300`}
                          >
                            <div className={`h-11 w-11 rounded-2xl ${iconBg} flex items-center justify-center mb-4 shadow-md`}>
                              <r.icon size={20} strokeWidth={2.2} />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{r.title}</p>
                            <p className="mt-1.5 text-2xl font-black text-ink-900 tracking-tight">{r.value}</p>
                            <p className="mt-2 text-sm text-ink-600 leading-relaxed">{r.desc}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.section>

                  {/* Process Timeline */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}>
                    <h3 className="text-2xl font-bold text-ink-900 mb-6 flex items-center gap-3">
                      <span className="h-9 w-9 rounded-xl bg-emeraldAccent-500 text-white flex items-center justify-center">
                        <Zap size={18} />
                      </span>
                      Application Process Timeline
                    </h3>
                    <div className="relative pl-4 sm:pl-6">
                      <div className="absolute left-[18px] sm:left-[26px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-emeraldAccent-400 to-transparent" />
                      <div className="space-y-6">
                        {[
                          { step: 1, title: 'Submit Online Application', desc: 'Complete the online form on the official university admissions portal with accurate personal and academic details.', duration: '~30 min' },
                          { step: 2, title: 'Upload Documents & Pay Fee', desc: 'Upload scanned copies of SSC/HSC certificates, transcripts, photos, and pay the non-refundable application fee online.', duration: '1–2 days' },
                          { step: 3, title: 'Admission Test (if required)', desc: uni.admissionTestRequired ? 'Appear for the written admission test at the scheduled venue. Arrive early with your admit card and original certificates.' : 'No written test. Your GPA and documents will be verified.' , duration: uni.admissionTestRequired ? '3 hours' : 'Instant' },
                          { step: 4, title: 'Check Merit List', desc: 'Results are published on the university website. If selected, complete the admission confirmation within the deadline.', duration: '2–4 weeks' },
                        ].map((s, i) => (
                          <motion.div
                            key={s.step}
                            variants={fadeUp}
                            custom={i}
                            className="relative pl-12 sm:pl-16"
                          >
                            <div className="absolute left-0 top-0 h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-500 to-emeraldAccent-500 text-white flex items-center justify-center font-bold text-lg shadow-[0_10px_24px_-6px_rgba(15,118,110,0.5)] ring-4 ring-white">
                              {s.step}
                            </div>
                            <div className="card p-5 sm:p-6 hover:shadow-card-hover transition-shadow">
                              <div className="flex items-start justify-between gap-4 flex-wrap">
                                <h4 className="text-lg font-bold text-ink-900">{s.title}</h4>
                                <span className="chip-blue shrink-0">
                                  <Clock size={12} /> {s.duration}
                                </span>
                              </div>
                              <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.section>

                  {/* Required Documents */}
                  <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <h3 className="text-2xl font-bold text-ink-900 mb-6 flex items-center gap-3">
                      <span className="h-9 w-9 rounded-xl bg-blueSaaS-500 text-white flex items-center justify-center">
                        <FileText size={18} />
                      </span>
                      Required Documents Checklist
                    </h3>
                    <div className="card p-6 sm:p-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                          'SSC Certificate & Marksheet',
                          'HSC Certificate & Marksheet',
                          'Passport-size Photographs (4 copies)',
                          'Birth Certificate / NID',
                          'Application Fee Receipt',
                          'Character Certificate',
                          'Testimonial from Last Institution',
                          'Nationality / Citizenship Certificate',
                        ].map((d) => (
                          <div key={d} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary-50/50 transition-colors group cursor-default">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emeraldAccent-100 to-primary-100 text-emeraldAccent-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <CheckCircle2 size={18} strokeWidth={2.5} />
                            </div>
                            <span className="font-medium text-ink-800 text-sm leading-snug">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                </motion.div>
              )}

              {/* ================= SCHOLARSHIPS TAB ================= */}
              {activeTab === 'scholarships' && (
                <motion.div
                  key="scholarships"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-10"
                >
                  <div className="section-header">
                    <span className="section-eyebrow"><Percent size={14} /> Financial Aid</span>
                    <h2 className="section-title text-3xl sm:text-4xl">Scholarships at {uni.name}</h2>
                    <p className="section-sub max-w-2xl text-lg mt-3">
                      {uni.scholarshipAvailable ? 'Merit-based awards and need-based assistance to support your academic journey.' : 'Scholarship information for this university is currently limited — check the official site for updates.'}
                    </p>
                  </div>

                  {uniScholarships.length === 0 ? (
                    <EmptyState title="No scholarships listed" message="Scholarship details will be updated soon. Please check the university website in the meantime." icon={<Award size={28} />} />
                  ) : (
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-40px' }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                    >
                      {uniScholarships.map((s, i) => (
                        <motion.article
                          key={s.id}
                          variants={fadeUp}
                          custom={i}
                          className="card card-hover overflow-hidden relative"
                        >
                          <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-br from-warningSaaS-400/20 to-primary-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
                          <div className="relative p-6 sm:p-8">
                            <div className="flex items-start justify-between gap-4 mb-5">
                              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-warningSaaS-400 via-warningSaaS-500 to-warningSaaS-600 text-white flex items-center justify-center shadow-[0_12px_28px_-8px_rgba(245,158,11,0.55)]">
                                <Trophy size={26} strokeWidth={2} />
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Discount</p>
                                <p className="text-3xl font-black text-warningSaaS-600 mt-1 leading-none">{s.percentage}%</p>
                                <p className="text-xs text-ink-400 mt-1">off tuition</p>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-ink-900 tracking-tight">{s.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.eligibility}</p>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-primary-500">Min GPA Required</p>
                                <p className="mt-1.5 text-2xl font-black text-primary-700">{s.gpaRequirement.toFixed(1)}+</p>
                              </div>
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-blueSaaS-50 to-white border border-blueSaaS-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-blueSaaS-500">Application</p>
                                <p className="mt-1.5 text-sm font-bold text-blueSaaS-700 leading-snug">{s.applicationProcess}</p>
                              </div>
                            </div>
                            <div className="mt-5 pt-5 border-t border-borderLine flex items-center justify-between flex-wrap gap-3">
                              <VerificationBadge status={s.verification} />
                              <span className="text-xs text-ink-500">Updated: {s.lastUpdated}</span>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </motion.div>
                  )}

                  <div className="card p-6 sm:p-8 bg-gradient-to-br from-primary-500 via-primary-600 to-emeraldAccent-600 text-white overflow-hidden relative border-primary-600">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.3),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(37,99,235,0.2),transparent_50%)]" />
                    <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Not sure about your scholarship eligibility?</h3>
                        <p className="mt-2 text-white/80 leading-relaxed text-base max-w-2xl">
                          Our advisors can help you understand which scholarships you may qualify for — and how to strengthen your application.
                        </p>
                      </div>
                      <div className="flex gap-3 flex-wrap shrink-0">
                        <button className="btn !bg-white !text-primary-700 hover:!bg-white/95 !px-6 !py-3.5">
                          <Bookmark size={16} /> Get Scholarship Alert
                        </button>
                        <button className="btn !bg-white/10 !text-white !border-white/20 hover:!bg-white/15 !px-6 !py-3.5">
                          Talk to Advisor
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ================= CAMPUS TAB ================= */}
              {activeTab === 'campus' && (
                <motion.div
                  key="campus"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-10"
                >
                  <div className="section-header">
                    <span className="section-eyebrow"><Home size={14} /> Campus Experience</span>
                    <h2 className="section-title text-3xl sm:text-4xl">Campus Life &amp; Facilities</h2>
                    <p className="section-sub max-w-2xl text-lg mt-3">
                      A modern campus equipped to support academic excellence, personal growth, and community.
                    </p>
                  </div>

                  {/* Campus Info + Map */}
                  <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                    <div className="lg:col-span-3 card p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="h-11 w-11 rounded-2xl bg-primary-500/10 text-primary-600 flex items-center justify-center">
                          <Building2 size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-ink-900">About the Campus</h3>
                      </div>
                      <p className="text-ink-600 leading-[1.9] text-base">{uni.campusInfo}</p>
                      <div className="mt-6 pt-6 border-t border-borderLine">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400 mb-2">Full Address</p>
                        <p className="font-semibold text-ink-900 flex items-start gap-3 leading-relaxed">
                          <MapPin size={18} className="text-primary-600 shrink-0 mt-0.5" />
                          {uni.address}
                        </p>
                      </div>
                    </div>

                    {/* Map Preview */}
                    <div className="lg:col-span-2 card overflow-hidden p-0 group">
                      <div className="relative h-full min-h-[300px] bg-gradient-to-br from-primary-500 to-emeraldAccent-500">
                        <img
                          src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`aerial campus map view modern university with buildings roads green courtyards trees parking minimal flat design vector style`)}&image_size=portrait_4_3`}
                          alt="Campus map"
                          className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center">
                              <Map size={15} />
                            </div>
                            <span className="text-sm font-semibold">Campus Map Preview</span>
                          </div>
                          <p className="text-xs text-white/80 mb-4">{uni.location}, {uni.division}</p>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(uni.address + ', ' + uni.location + ', Bangladesh')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 rounded-xl hover:bg-white/25 transition-colors"
                          >
                            Open in Google Maps <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Gallery */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <h3 className="text-2xl font-bold text-ink-900 mb-6 flex items-center gap-3">
                      <span className="h-9 w-9 rounded-xl bg-emeraldAccent-500 text-white flex items-center justify-center">
                        <Camera size={18} />
                      </span>
                      Campus Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { p: 'modern university library interior study spaces natural lighting', t: 'Library & Study', c: 'from-primary-500 to-emeraldAccent-500' },
                        { p: 'contemporary science research laboratory glassware university', t: 'Science Labs', c: 'from-blueSaaS-500 to-primary-500' },
                        { p: 'university cafeteria modern interior students dining area', t: 'Cafeteria', c: 'from-warningSaaS-500 to-primary-500' },
                        { p: 'university sports complex indoor basketball gymnasium', t: 'Sports Complex', c: 'from-emeraldAccent-500 to-blueSaaS-500' },
                      ].map((g, i) => (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          custom={i}
                          className={`relative group rounded-3xl overflow-hidden aspect-[4/5] shadow-card ${i === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-auto' : ''}`}
                        >
                          <img
                            src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(g.p + ', professional photography, warm lighting')}&image_size=portrait_4_3`}
                            alt={g.t}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${g.c} opacity-30 group-hover:opacity-20 transition-opacity duration-500`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                            <h4 className="text-lg font-bold tracking-tight">{g.t}</h4>
                            <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              <div className="h-8 w-8 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                <PlayCircle size={15} />
                              </div>
                              <span className="text-xs font-semibold text-white/90">View photos</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>

                  {/* Facilities */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <h3 className="text-2xl font-bold text-ink-900 mb-6 flex items-center gap-3">
                      <span className="h-9 w-9 rounded-xl bg-blueSaaS-500 text-white flex items-center justify-center">
                        <Sparkles size={18} />
                      </span>
                      Available Facilities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      {uni.facilities.map((f, i) => {
                        const iconMap: Record<string, LucideIcon> = { Library: BookOpen, 'Computer Labs': Cpu, Cafeteria: Utensils, 'Sports Complex': Activity, Auditorium: Building2, 'Medical Center': Shield, 'Wi-Fi Campus': Wifi, 'Wi-Fi': Wifi };
                        const Icon = iconMap[f] || CheckCircle2;
                        return (
                          <motion.div
                            key={f}
                            variants={fadeUp}
                            custom={i}
                            className="group p-5 sm:p-6 rounded-3xl bg-white border border-borderLine hover:border-primary-200 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                          >
                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-50 to-emeraldAccent-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-primary-100 group-hover:to-emeraldAccent-100 transition-transform duration-300">
                              <Icon size={20} strokeWidth={2.2} />
                            </div>
                            <p className="font-bold text-ink-900 leading-snug">{f}</p>
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              Available <CheckCircle2 size={12} />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.section>
                </motion.div>
              )}

              {/* ================= REVIEWS TAB ================= */}
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-10"
                >
                  <div className="flex items-end justify-between gap-4 section-header">
                    <div>
                      <span className="section-eyebrow"><Star size={14} /> Student Voices</span>
                      <h2 className="section-title text-3xl sm:text-4xl">Reviews &amp; Testimonials</h2>
                      <p className="section-sub max-w-2xl text-lg mt-3">
                        Honest feedback from {uni.reviewCount.toLocaleString()}+ current students and alumni.
                      </p>
                    </div>
                    <button className="btn-primary shrink-0 hidden sm:inline-flex">
                      <PenLine size={15} /> Write a Review
                    </button>
                  </div>

                  {/* Summary */}
                  <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <div className="card p-6 sm:p-8 lg:p-10 overflow-hidden relative bg-gradient-to-br from-white via-white to-primary-50/40">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
                        <div className="lg:col-span-2 text-center lg:text-left">
                          <div className="inline-flex items-center justify-center">
                            <p className="text-7xl sm:text-8xl font-black tracking-tight text-ink-900 leading-none bg-gradient-to-br from-ink-900 to-ink-500 bg-clip-text text-transparent">
                              {uni.rating.toFixed(1)}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-center lg:justify-start gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} size={22} className={i <= Math.round(uni.rating) ? 'fill-warningSaaS-400 text-warningSaaS-400' : 'fill-ink-100 text-ink-200'} />
                            ))}
                          </div>
                          <p className="mt-3 text-sm text-ink-500">Based on {uni.reviewCount.toLocaleString()} verified reviews</p>
                          <button className="btn-outline-primary mt-6 !py-3 w-full lg:w-auto hidden sm:inline-flex">
                            <PenLine size={14} /> Share Your Experience
                          </button>
                        </div>
                        <div className="lg:col-span-3 space-y-3.5">
                          {ratingLabels.map(({ key, label }) => (
                            <div key={key} className="group">
                              <div className="flex items-center justify-between gap-4 mb-1.5">
                                <span className="text-sm font-semibold text-ink-700 w-32 shrink-0">{label}</span>
                                <div className="flex-1 h-3 rounded-full bg-ink-100 overflow-hidden relative">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(avgRatings[key] / 5) * 100}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.1, ease: 'easeOut' }}
                                    className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-emeraldAccent-400 shadow-[0_0_10px_rgba(15,118,110,0.25)]"
                                  />
                                </div>
                                <span className="text-sm font-bold text-ink-900 w-10 text-right">{avgRatings[key].toFixed(1)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Review Cards */}
                  {uniReviews.length === 0 ? (
                    <EmptyState title="No reviews yet" message="Be the first to share your experience and help future students." icon={<Star size={28} />} />
                  ) : (
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-40px' }}
                      className="space-y-5"
                    >
                      {uniReviews.map((r, i) => (
                        <motion.article
                          key={r.id}
                          variants={fadeUp}
                          custom={i}
                          className="card p-6 sm:p-8 relative overflow-hidden group hover:shadow-card-hover transition-shadow"
                        >
                          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex items-start gap-4">
                                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${uni.logoColor} text-white flex items-center justify-center font-bold text-xl shadow-md`}>
                                  {r.authorName.charAt(0)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-lg font-bold text-ink-900">{r.authorName}</h4>
                                    {r.verified && (
                                      <span className="badge-verified"><Shield size={11} /> Verified {r.authorType}</span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-ink-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <span className="flex items-center gap-1.5"><BookOpen size={13} /> {r.programName}</span>
                                    <span className="flex items-center gap-1.5"><GraduationCap size={13} /> Class of {r.graduationYear}</span>
                                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {r.date}</span>
                                  </p>
                                </div>
                              </div>
                              <div className="shrink-0">
                                <RatingStars rating={r.overall} size={16} />
                              </div>
                            </div>

                            <blockquote className="mt-6 relative">
                              <Quote size={28} className="absolute -top-1 -left-1 text-primary-100" strokeWidth={1.5} />
                              <p className="relative pl-8 text-base leading-[1.9] text-ink-700">
                                {r.writtenReview}
                              </p>
                            </blockquote>

                            <div className="mt-6 pt-5 border-t border-borderLine flex items-center justify-between flex-wrap gap-4">
                              <div className="flex gap-2 flex-wrap">
                                {Object.entries(r.ratings).slice(0, 3).map(([k, v]) => (
                                  <span key={k} className="chip-muted text-[11px] capitalize">
                                    {k}: {Number(v).toFixed(1)}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-5">
                                <button className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-primary-600 transition-colors group/btn">
                                  <ThumbsUp size={14} className="group-hover/btn:scale-110 transition-transform" />
                                  Helpful ({r.helpfulVotes})
                                </button>
                                <button className="flex items-center gap-1.5 text-sm font-medium text-ink-400 hover:text-rose-500 transition-colors">
                                  <Flag size={14} /> Report
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ================= COMMUNITY TAB ================= */}
              {activeTab === 'community' && (
                <motion.div
                  key="community"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <div className="flex items-end justify-between gap-4 section-header">
                    <div>
                      <span className="section-eyebrow"><MessageSquare size={14} /> Community Hub</span>
                      <h2 className="section-title text-3xl sm:text-4xl">{uni.name} Community</h2>
                      <p className="section-sub max-w-2xl text-lg mt-3">
                        Join the conversation — ask questions, share insights, and connect with current students.
                      </p>
                    </div>
                    <Link to="/community" className="btn-primary shrink-0 hidden sm:inline-flex">
                      <MessageSquare size={15} /> Ask a Question
                    </Link>
                  </div>

                  {uniPosts.length === 0 ? (
                    <EmptyState title="No discussions yet" message="Be the first to kick off the conversation about this university." icon={<MessageSquare size={28} />} />
                  ) : (
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-40px' }}
                      className="space-y-4"
                    >
                      {uniPosts.map((post, i) => (
                        <motion.article
                          key={post.id}
                          variants={fadeUp}
                          custom={i}
                        >
                          <Link to="/community" className="card card-hover p-5 sm:p-7 block group">
                            <div className="flex items-start gap-4">
                              <div className={`h-12 w-12 shrink-0 rounded-2xl ${post.authorAvatarColor || 'bg-primary-600'} text-white flex items-center justify-center font-bold shadow-md`}>
                                {post.authorName.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                  <span className="chip-primary">{post.category}</span>
                                  <span className={`${post.type === 'question' ? 'chip-blue' : 'chip-emerald'}`}>
                                    {post.type === 'question' ? 'Question' : 'Discussion'}
                                  </span>
                                  {post.verifiedBadge && (
                                    <span className="badge-verified capitalize">{post.verifiedBadge}</span>
                                  )}
                                </div>
                                <h3 className="text-xl font-bold text-ink-900 leading-snug group-hover:text-primary-700 transition-colors">
                                  {post.title}
                                </h3>
                                <p className="mt-3 text-base text-ink-600 leading-relaxed line-clamp-3">
                                  {post.content}
                                </p>
                                <div className="mt-5 pt-4 border-t border-borderLine flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                                  <span className="flex items-center gap-1.5 text-ink-500 font-medium">
                                    <TrendingUp size={14} /> {post.upvotes} upvotes
                                  </span>
                                  <span className="flex items-center gap-1.5 text-ink-500 font-medium">
                                    <MessageSquare size={14} /> {post.comments.length} comments
                                  </span>
                                  <span className="flex items-center gap-1.5 text-ink-500 font-medium">
                                    <User size={14} /> {post.authorName}
                                  </span>
                                  <span className="flex items-center gap-1.5 text-ink-400 ml-auto">
                                    <Calendar size={13} /> {post.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ================= CONTACT TAB ================= */}
              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <div className="section-header">
                    <span className="section-eyebrow"><PhoneIcon size={14} /> Get in Touch</span>
                    <h2 className="section-title text-3xl sm:text-4xl">Contact {uni.name}</h2>
                    <p className="section-sub max-w-2xl text-lg mt-3">
                      Reach the admissions office directly — or share your details and we'll help coordinate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      <div className="card p-6 sm:p-8">
                        <h3 className="text-xl font-bold text-ink-900 mb-6 flex items-center gap-3">
                          <span className="h-10 w-10 rounded-2xl bg-primary-500/10 text-primary-600 flex items-center justify-center">
                            <Mail size={20} />
                          </span>
                          Contact Information
                        </h3>
                        <div className="space-y-4">
                          {[
                            { label: 'Address', value: uni.address, icon: MapPin, color: 'primary' },
                            { label: 'Phone', value: uni.phone, icon: Phone, color: 'emerald' },
                            { label: 'Email', value: uni.email, icon: Mail, color: 'blue' },
                            { label: 'Website', value: uni.website, icon: Globe, color: 'amber', isLink: true },
                          ].map((c) => {
                            const colorMap: Record<string, string> = {
                              primary: 'bg-primary-500 text-white',
                              emerald: 'bg-emeraldAccent-500 text-white',
                              blue: 'bg-blueSaaS-500 text-white',
                              amber: 'bg-warningSaaS-500 text-white',
                            };
                            return (
                              <div key={c.label} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-ink-50 transition-colors">
                                <div className={`h-11 w-11 shrink-0 rounded-2xl ${colorMap[c.color]} flex items-center justify-center shadow-md`}>
                                  <c.icon size={18} strokeWidth={2.2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">{c.label}</p>
                                  {c.isLink ? (
                                    <a href={c.value} target="_blank" rel="noopener noreferrer" className="mt-0.5 text-base font-semibold text-primary-600 hover:text-primary-700 hover:underline break-all">
                                      {c.value}
                                    </a>
                                  ) : (
                                    <p className="mt-0.5 text-base font-semibold text-ink-900 break-words leading-relaxed">{c.value}</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mini Map */}
                      <div className="card overflow-hidden p-0 rounded-[28px]">
                        <div className="relative aspect-[16/9] bg-gradient-to-br from-primary-500 to-emeraldAccent-600">
                          <img
                            src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`clean street map of Dhaka city area with pin marker flat modern design pastel colors`)}&image_size=landscape_16_9`}
                            alt="Map location"
                            className="w-full h-full object-cover mix-blend-overlay opacity-90"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                            <motion.div
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                              className="relative"
                            >
                              <div className="h-14 w-14 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-[0_15px_40px_-8px_rgba(15,118,110,0.6)] ring-4 ring-white/40">
                                <MapPin size={24} strokeWidth={2.5} />
                              </div>
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary-600 rotate-45" />
                            </motion.div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                            <p className="font-bold text-lg">{uni.location}, {uni.division}</p>
                            <p className="text-sm text-white/80 mt-1">{uni.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <LeadForm defaultUniversityId={uni.id} />
                  </div>
                </motion.div>
              )}

              {/* ================================================================ */}
              {/* SHARED BOTTOM SECTIONS (visible on overview & always below tabs) */}
              {/* ================================================================ */}
              {activeTab === 'overview' && (
                <div className="space-y-14 sm:space-y-20 pt-8">
                  {/* Alumni Stories */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                    <div className="section-header">
                      <span className="section-eyebrow"><Briefcase size={14} /> Where Graduates Go</span>
                      <h2 className="section-title text-3xl sm:text-4xl">Alumni Success Stories</h2>
                      <p className="section-sub max-w-2xl text-lg mt-3">
                        Our graduates build careers at leading companies across Bangladesh and beyond.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {[
                        { name: 'Sadia Rahman', role: 'Software Engineer', company: 'Google', prog: 'CSE, 2021', story: 'The rigorous CSE curriculum gave me the foundation to land my dream job. The faculty pushed me to think critically.', avatar: 'from-primary-500 to-blueSaaS-500' },
                        { name: 'Rafiq Hasan', role: 'Senior Product Manager', company: 'bKash', prog: 'BBA, 2020', story: 'The case study approach and student clubs prepared me for real-world leadership from day one.', avatar: 'from-emeraldAccent-500 to-primary-500' },
                        { name: 'Nusrat Jahan', role: 'Architecture Lead', company: 'Bashundhara Group', prog: 'Architecture, 2019', story: 'Studio culture and critique sessions shaped my design thinking. I won my first international award as a student.', avatar: 'from-warningSaaS-500 to-rose-500' },
                      ].map((a, i) => (
                        <motion.article
                          key={a.name}
                          variants={fadeUp}
                          custom={i}
                          className="card card-hover p-6 sm:p-7 relative overflow-hidden"
                        >
                          <Quote size={44} className="absolute -top-1 right-4 text-primary-50 opacity-80" strokeWidth={1.2} />
                          <div className="flex items-center gap-4 mb-5">
                            <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${a.avatar} text-white flex items-center justify-center font-bold text-xl shadow-md`}>
                              {a.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-ink-900 text-lg">{a.name}</h4>
                              <p className="text-sm text-ink-500">{a.prog}</p>
                            </div>
                          </div>
                          <p className="text-ink-600 leading-[1.85] text-sm italic">"{a.story}"</p>
                          <div className="mt-6 pt-5 border-t border-borderLine flex items-center justify-between">
                            <div>
                              <p className="font-bold text-ink-900 text-sm leading-none">{a.role}</p>
                              <p className="text-xs text-primary-600 font-semibold mt-1.5">@ {a.company}</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-ink-50 border border-ink-100 text-ink-500 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:border-primary-100 transition-all">
                              <ArrowRight size={16} />
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </motion.section>

                  {/* FAQ */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                    <div className="section-header">
                      <span className="section-eyebrow"><HelpCircle size={14} /> All Your Questions</span>
                      <h2 className="section-title text-3xl sm:text-4xl">Frequently Asked Questions</h2>
                      <p className="section-sub max-w-2xl text-lg mt-3">
                        Everything prospective students commonly ask about {uni.shortName}.
                      </p>
                    </div>
                    <div className="space-y-3 max-w-4xl mx-auto">
                      {faqs.map((f, i) => (
                        <FAQItem
                          key={i}
                          q={f.q}
                          a={f.a}
                          isOpen={faqOpen === i}
                          onToggle={() => setFaqOpen(faqOpen === i ? null : i)}
                        />
                      ))}
                    </div>
                  </motion.section>

                  {/* Related Universities */}
                  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                    <div className="section-header">
                      <span className="section-eyebrow"><GitCompare size={14} /> You Might Also Like</span>
                      <h2 className="section-title text-3xl sm:text-4xl">Related Universities</h2>
                      <p className="section-sub max-w-2xl text-lg mt-3">
                        Explore similar institutions based on location, programs, and rating.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {relatedUnis.map((ru, i) => (
                        <motion.article
                          key={ru.id}
                          variants={fadeUp}
                          custom={i}
                          whileHover={{ y: -4 }}
                          className="card card-hover overflow-hidden group"
                        >
                          <div className="h-36 relative overflow-hidden bg-gradient-to-br from-primary-500 to-emeraldAccent-600">
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${ru.logoColor} text-white flex items-center justify-center font-bold text-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] ring-4 ring-white/20`}>
                                {ru.logoInitials}
                              </div>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="min-w-0">
                                <Link to={`/universities/${ru.slug}`} className="block">
                                  <h3 className="text-lg font-bold text-ink-900 leading-tight group-hover:text-primary-700 transition-colors line-clamp-2">
                                    {ru.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-ink-500 mt-1">{ru.location} • Est. {ru.established}</p>
                              </div>
                              <div className="shrink-0 text-right">
                                <div className="flex items-center gap-1">
                                  <Star size={13} className="fill-warningSaaS-400 text-warningSaaS-400" />
                                  <span className="text-sm font-bold text-ink-900">{ru.rating.toFixed(1)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {ru.popularPrograms.slice(0, 3).map((p) => (
                                <span key={p} className="chip-muted text-[11px]">{p}</span>
                              ))}
                            </div>
                            <div className="mt-5 pt-5 border-t border-borderLine flex items-center justify-between">
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Tuition from</p>
                                <p className="text-lg font-black text-primary-700 mt-0.5">{formatBDT(ru.tuitionMin)}</p>
                              </div>
                              <Link to={`/universities/${ru.slug}`} className="btn-outline-primary !px-4 !py-2 text-xs">
                                View <ChevronRight size={13} />
                              </Link>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </motion.section>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ==================== 30% STICKY SIDEBAR ==================== */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="xl:col-span-4"
            >
              <div className="xl:sticky xl:top-32 space-y-5">
                {/* Quick Actions Card */}
                <div className="card p-6 overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-emeraldAccent-600 text-white border-primary-600 relative">
                  <div className="absolute top-0 right-0 w-44 h-44 bg-emeraldAccent-400/25 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={18} className="text-warningSaaS-300" />
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">Fast Actions</span>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full btn !bg-white !text-primary-700 hover:!bg-white/95 !py-3.5 text-base justify-start">
                        <Send size={17} /> Apply for Admission
                      </button>
                      <button className="w-full btn !bg-white/15 !text-white !border-white/25 hover:!bg-white/20 !py-3 justify-start">
                        <Download size={16} strokeWidth={2.1} /> Download Brochure (PDF)
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <SaveButton universityId={uni.id} />
                        <CompareButton universityId={uni.id} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deadline Card */}
                {uniNotices.length > 0 && (() => {
                  const nextDeadline = uniNotices[0];
                  const deadlineDate = new Date(nextDeadline.deadline);
                  const daysLeft = Math.max(0, Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                  return (
                    <div className="card overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-emeraldAccent-500 to-warningSaaS-500" />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={16} className="text-primary-600" />
                          <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Upcoming Deadline</p>
                        </div>
                        <h4 className="text-lg font-bold text-ink-900 mt-2 mb-1 leading-tight">{nextDeadline.title}</h4>
                        <p className="text-sm text-ink-500 mb-4">{nextDeadline.intake}</p>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="bg-ink-50 border border-borderLine rounded-2xl p-3 text-center">
                            <p className="text-[10px] font-bold uppercase text-ink-400 tracking-wider">Apply By</p>
                            <p className="text-sm font-bold text-ink-900 mt-1">{deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                          <div className="bg-gradient-to-br from-primary-50 to-emeraldAccent-50 border border-primary-100 rounded-2xl p-3 text-center">
                            <p className="text-[10px] font-bold uppercase text-primary-600 tracking-wider">Days Left</p>
                            <p className="text-2xl font-black text-primary-700 mt-0.5 leading-none">{daysLeft}</p>
                          </div>
                        </div>
                        {nextDeadline.testDate && (
                          <div className="flex items-center gap-2 text-xs text-ink-600 mb-4 bg-ink-50 px-3 py-2 rounded-xl border border-borderLine">
                            <Target size={13} className="text-blueSaaS-600 shrink-0" />
                            <span className="font-medium">Admission Test: <span className="font-bold">{new Date(nextDeadline.testDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></span>
                          </div>
                        )}
                        <a href={nextDeadline.applyLink || '#'} className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2.5">
                          <Send size={15} /> Apply Now
                        </a>
                      </div>
                    </div>
                  );
                })()}

                {/* Estimated Cost Card */}
                <div className="card p-6 bg-gradient-to-br from-primary-50 via-white to-blueSaaS-50 border-primary-100">
                  <div className="flex items-center gap-2 mb-4">
                    <CircleDollarSign size={18} className="text-primary-600" />
                    <h3 className="text-base font-bold text-ink-900">Est. Yearly Cost</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-3xl font-black text-ink-900 leading-none bg-gradient-to-r from-primary-700 to-blueSaaS-700 bg-clip-text text-transparent inline-block">
                      ৳{Math.round(((uni.tuitionMin + uni.tuitionMax) / 2) / 4).toLocaleString('en-BD')}
                    </p>
                    <p className="text-xs text-ink-500 mt-1.5 font-medium">Per year, estimated</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white border border-borderLine overflow-hidden mb-3">
                    <div className="h-full w-2/3 bg-gradient-to-r from-primary-500 to-emeraldAccent-500 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-ink-500">
                    <span>Low: ৳{Math.round(uni.tuitionMin / 4).toLocaleString('en-BD')}</span>
                    <span>High: ৳{Math.round(uni.tuitionMax / 4).toLocaleString('en-BD')}</span>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-4 px-1">
                    <Layers size={16} className="text-primary-600" />
                    <h3 className="text-sm font-bold text-ink-900">Quick Links</h3>
                  </div>
                  <nav className="space-y-1" aria-label="Quick navigation">
                    {[
                      { label: 'Programs', icon: BookOpen, tab: 'programs' },
                      { label: 'Tuition & Fees', icon: CreditCard, tab: 'tuition' },
                      { label: 'Admission', icon: FileCheck, tab: 'admission' },
                      { label: 'Scholarships', icon: HandCoins, tab: 'scholarships' },
                      { label: 'Campus Life', icon: Home, tab: 'campus' },
                      { label: 'Student Reviews', icon: MessageSquare, tab: 'reviews' },
                    ].map((l) => (
                      <button
                        key={l.tab}
                        onClick={() => { setActiveTab(l.tab as typeof activeTab); document.getElementById('tabs-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                        className={activeTab === l.tab ? 'w-full group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 bg-primary-50 text-primary-700 shadow-sm' : 'w-full group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-ink-50 text-ink-700 hover:text-ink-900'}
                      >
                        <span className="flex items-center gap-2.5 text-sm font-semibold">
                          <l.icon size={15} className={activeTab === l.tab ? 'text-primary-600' : 'text-ink-400 group-hover:text-primary-500'} />
                          {l.label}
                        </span>
                        <ChevronRight size={15} className={`transition-transform duration-200 ${activeTab === l.tab ? 'text-primary-500 translate-x-0' : 'text-ink-300 -translate-x-0.5 group-hover:translate-x-0 group-hover:text-primary-400'}`} />
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Brochure & Contact */}
                <div className="space-y-4">
                  <div className="card p-5">
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <Phone size={16} className="text-primary-600" />
                      <h3 className="text-sm font-bold text-ink-900">Contact Info</h3>
                    </div>
                    <div className="space-y-3">
                      {uni.phone && (
                        <a href={`tel:${uni.phone}`} className="flex items-center gap-3 text-sm group p-2 -mx-2 rounded-xl hover:bg-ink-50 transition-colors">
                          <div className="w-9 h-9 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                            <Phone size={14} className="text-primary-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase text-ink-400 tracking-wider">Call</p>
                            <p className="text-ink-900 font-semibold truncate">{uni.phone}</p>
                          </div>
                        </a>
                      )}
                      {uni.email && (
                        <a href={`mailto:${uni.email}`} className="flex items-center gap-3 text-sm group p-2 -mx-2 rounded-xl hover:bg-ink-50 transition-colors">
                          <div className="w-9 h-9 rounded-xl bg-emeraldAccent-50 border border-emeraldAccent-100 flex items-center justify-center shrink-0 group-hover:bg-emeraldAccent-100 transition-colors">
                            <Mail size={14} className="text-emeraldAccent-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase text-ink-400 tracking-wider">Email</p>
                            <p className="text-ink-900 font-semibold truncate">{uni.email}</p>
                          </div>
                        </a>
                      )}
                      {uni.location && (
                        <div className="flex items-start gap-3 text-sm p-2 -mx-2 rounded-xl hover:bg-ink-50 transition-colors cursor-pointer group">
                          <div className="w-9 h-9 rounded-xl bg-blueSaaS-50 border border-blueSaaS-100 flex items-center justify-center shrink-0 group-hover:bg-blueSaaS-100 transition-colors mt-0.5">
                            <MapPin size={14} className="text-blueSaaS-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase text-ink-400 tracking-wider">Address</p>
                            <p className="text-ink-900 font-semibold leading-snug">{uni.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mini Map */}
                  <div className="card overflow-hidden p-0 relative group">
                    <div className="aspect-[5/3] w-full bg-gradient-to-br from-primary-100 via-blueSaaS-100 to-emeraldAccent-100 relative overflow-hidden">
                      <img
                        src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent('minimalist modern campus map aerial view with streets buildings green parks soft pastel palette')}&image_size=landscape_4_3`}
                        alt="Campus Map"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        onError={(e) => { const t = e.currentTarget; t.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-ink-900/10" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-borderLine flex items-center gap-1.5 shadow-sm">
                        <Map size={12} className="text-primary-600" />
                        <span className="text-[10px] font-bold text-ink-800 uppercase tracking-wider">Campus</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative"
                        >
                          <div className="absolute inset-0 -m-3 rounded-full bg-primary-500/25 animate-ping" />
                          <div className="relative w-12 h-12 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center">
                            <MapPin size={20} className="text-primary-600" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    <a href={uni.website || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border-t border-borderLine group-hover:bg-ink-50 transition-colors">
                      <div>
                        <p className="text-xs font-bold uppercase text-ink-400 tracking-wider">Get Directions</p>
                        <p className="text-sm font-bold text-ink-900 mt-0.5">View on Google Maps</p>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-ink-900 text-white flex items-center justify-center group-hover:bg-primary-600 transition-colors shrink-0">
                        <ExternalLink size={15} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
  );
}