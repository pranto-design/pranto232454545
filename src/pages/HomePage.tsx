import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, GraduationCap, BookOpen, GitCompare, Calculator,
  Users, ArrowRight, Star, MapPin, TrendingUp, Bell, Quote,
  CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Award,
  Clock, Building2, Layers, Wallet, MessageSquare, BadgeCheck,
  TrendingDown, Target, Lightbulb, Compass, BarChart3,
} from 'lucide-react';
import {
  universities, programs, communityPosts, reviews, admissionNotices, scholarships,
  formatBDT, getUniversityById, getOfferingsByProgram,
} from '@/data/sampleData';
import { UniversityCard, SectionHeader, RatingStars, UniversityLogo, VerificationBadge } from '@/components/ui';
import { useCountUp, useInView } from '@/hooks/useAnimations';

// ============================================================
// Animated stat counter
// ============================================================
function StatCounter({ value, suffix, label, icon: Icon }: { value: number; suffix: string; label: string; icon: any }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const count = useCountUp(value, 2200, inView);
  return (
    <div ref={ref} className="text-center group">
      <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        <Icon size={24} />
      </div>
      <div className="text-3xl sm:text-4xl font-bold font-display tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-brand-200 mt-1">{label}</div>
    </div>
  );
}

// ============================================================
// Live search autocomplete
// ============================================================
function HeroSearch() {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const uniMatches = universities
      .filter((u) => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q))
      .slice(0, 3)
      .map((u) => ({ type: 'University', label: u.name, sub: u.shortName, to: `/universities/${u.slug}`, icon: Building2 }));
    const progMatches = programs
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 3)
      .map((p) => ({ type: 'Program', label: p.name, sub: `${p.offeringUniversityIds.length} universities`, to: `/programs/${p.slug}`, icon: BookOpen }));
    return [...uniMatches, ...progMatches];
  }, [search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setFocused(false);
  };

  const popularSearches = ['CSE in Dhaka', 'BBA scholarship', 'Low tuition EEE', 'Architecture'];

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center bg-white rounded-2xl shadow-2xl p-2 transition-all duration-300 ${focused ? 'ring-4 ring-brand-400/30 scale-[1.02]' : ''}`}>
          <Search size={20} className="text-ink-400 ml-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search universities, programs, subjects..."
            className="flex-1 px-3 py-3 text-ink-800 bg-transparent focus:outline-none text-sm sm:text-base"
          />
          <button type="submit" className="btn-primary px-5 sm:px-8 py-3">
            Search
          </button>
        </div>
      </form>

      {/* Autocomplete dropdown */}
      {focused && search.trim() && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-ink-200 overflow-hidden z-20 animate-slide-down">
          {suggestions.map((s, i) => (
            <Link
              key={i}
              to={s.to}
              className="flex items-center gap-3 px-4 py-3 hover:bg-brand-50 transition-colors border-b border-ink-50 last:border-0"
            >
              <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                <s.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-800 truncate">{s.label}</p>
                <p className="text-xs text-ink-500">{s.sub}</p>
              </div>
              <span className="chip-muted text-[10px]">{s.type}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Popular searches */}
      {!search && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-brand-200">Popular:</span>
          {popularSearches.map((p) => (
            <button
              key={p}
              onClick={() => navigate(`/search?q=${encodeURIComponent(p)}`)}
              className="text-xs text-brand-100 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full px-3 py-1 transition"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Realistic student photo collage (hero visual)
// ============================================================
const heroPhotos = [
  'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
  'https://images.pexels.com/photos/207694/pexels-photo-207694.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
  'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
];

function HeroPhotoCollage() {
  return (
    <div className="relative hidden lg:block h-full min-h-[460px]">
      {/* Main photo grid */}
      <div className="grid grid-cols-3 gap-3 h-full">
        {/* Left column - tall */}
        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl overflow-hidden flex-1 group" style={{ minHeight: '200px' }}>
            <img src={heroPhotos[0]} alt="Student" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </div>
          <div className="relative rounded-2xl overflow-hidden flex-1 group" style={{ minHeight: '140px' }}>
            <img src={heroPhotos[1]} alt="Campus" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
          </div>
        </div>
        {/* Center column - mixed */}
        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl overflow-hidden flex-1 group" style={{ minHeight: '140px' }}>
            <img src={heroPhotos[2]} alt="Student" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
          </div>
          <div className="relative rounded-2xl overflow-hidden flex-1 group" style={{ minHeight: '200px' }}>
            <img src={heroPhotos[3]} alt="Campus" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </div>
        </div>
        {/* Right column - tall */}
        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl overflow-hidden flex-1 group" style={{ minHeight: '200px' }}>
            <img src={heroPhotos[4]} alt="Student" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </div>
          <div className="relative rounded-2xl overflow-hidden flex-1 group" style={{ minHeight: '140px' }}>
            <img src={heroPhotos[5]} alt="Campus" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Floating stat badge */}
      <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white">
            <Users size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-ink-900 leading-none">50K+</p>
            <p className="text-[11px] text-ink-500">Students helped</p>
          </div>
        </div>
      </div>

      {/* Floating rating badge */}
      <div className="absolute -top-4 -right-4 glass rounded-2xl p-3 shadow-2xl animate-float-slow">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-ink-900">4.9</span>
        </div>
        <p className="text-[10px] text-ink-500 mt-0.5">Student rating</p>
      </div>
    </div>
  );
}

// ============================================================
// Interactive Program Explorer
// ============================================================
function ProgramExplorer() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(programs.map((p) => p.category)))];

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return programs;
    return programs.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`chip whitespace-nowrap transition-all ${activeCategory === c ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-105' : 'chip-muted hover:bg-ink-200'}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <Link
            key={p.id}
            to={`/programs/${p.slug}`}
            className="card card-hover p-5 group animate-fade-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
              <BookOpen size={20} />
            </div>
            <h3 className="font-semibold text-ink-900 group-hover:text-brand-700 leading-tight text-sm">{p.name}</h3>
            <p className="text-xs text-ink-500 mt-1">{p.offeringUniversityIds.length} universities</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-ink-600 font-medium">
                ৳{(p.avgTuitionMin / 100000).toFixed(1)}L – ৳{(p.avgTuitionMax / 100000).toFixed(1)}L
              </span>
              <span className="text-xs font-medium text-brand-600 group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Tuition cost visualization chart
// ============================================================
function CostChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const chartData = useMemo(() => {
    const cseOfferings = getOfferingsByProgram('p1').slice(0, 8);
    return cseOfferings
      .map((o) => {
        const uni = getUniversityById(o.universityId);
        return uni ? { uni, total: o.totalTuitionEstimate, color: uni.logoColor } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a!.total - b!.total) as { uni: typeof universities[number]; total: number; color: string }[];
  }, []);

  const maxVal = Math.max(...chartData.map((d) => d.total));
  const minVal = Math.min(...chartData.map((d) => d.total));

  return (
    <div ref={ref} className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-ink-900 flex items-center gap-2"><BarChart3 size={18} className="text-brand-600" /> CSE Tuition Comparison</h3>
          <p className="text-xs text-ink-500 mt-0.5">Estimated total tuition for Computer Science & Engineering</p>
        </div>
        <Link to="/programs/cse" className="text-xs text-brand-600 hover:underline">View full comparison →</Link>
      </div>
      <div className="space-y-3">
        {chartData.map((d, i) => {
          const pct = (d.total / maxVal) * 100;
          const isMin = d.total === minVal;
          return (
            <div key={d.uni.id} className="flex items-center gap-3">
              <div className="w-20 shrink-0 text-right">
                <p className="text-xs font-semibold text-ink-700 truncate">{d.uni.shortName}</p>
              </div>
              <div className="flex-1 h-7 bg-ink-100 rounded-lg overflow-hidden relative">
                <div
                  className={`h-full rounded-lg bg-gradient-to-r ${d.color} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                  style={{ width: inView ? `${pct}%` : '0%', transitionDelay: `${i * 80}ms` }}
                >
                  {isMin && <span className="text-[10px] text-white font-bold">Best Value</span>}
                </div>
              </div>
              <div className="w-20 shrink-0">
                <span className={`text-xs font-bold ${isMin ? 'text-emerald-600' : 'text-ink-700'}`}>{formatBDT(d.total)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-ink-100 flex items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5"><TrendingDown size={13} className="text-emerald-600" /> Lowest: {formatBDT(minVal)}</span>
        <span className="flex items-center gap-1.5"><TrendingUp size={13} className="text-rose-600" /> Highest: {formatBDT(maxVal)}</span>
        <span className="flex items-center gap-1.5 ml-auto"><Clock size={13} /> Sample data</span>
      </div>
    </div>
  );
}

// ============================================================
// Testimonials carousel
// ============================================================
function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const items = reviews.slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  const review = items[index];
  const uni = review ? getUniversityById(review.universityId) : null;
  if (!review || !uni) return null;

  return (
    <div className="relative">
      <div className="card p-8 lg:p-10 overflow-hidden relative">
        <Quote size={48} className="absolute top-6 right-6 text-brand-100" />
        <div className="flex flex-col lg:flex-row gap-6 items-start relative">
          <div className="flex gap-4 items-center shrink-0">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
              {review.authorName.charAt(0)}
            </div>
          </div>
          <div className="flex-1">
            <RatingStars rating={review.overall} size={18} />
            <p className="mt-3 text-lg text-ink-700 leading-relaxed font-medium text-balance">
              "{review.writtenReview}"
            </p>
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-ink-900">{review.authorName}</span>
              {review.verified && <span className="badge-verified"><BadgeCheck size={11} /> Verified {review.authorType}</span>}
              <span className="text-sm text-ink-500">• {review.programName}, {uni.shortName}</span>
              <span className="text-sm text-ink-400">• Class of {review.graduationYear}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-brand-600' : 'w-2 bg-ink-300 hover:bg-ink-400'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="btn-secondary p-2.5"><ChevronLeft size={16} /></button>
          <button onClick={next} className="btn-secondary p-2.5"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Admission countdown timeline
// ============================================================
function AdmissionTimeline() {
  const now = new Date('2026-07-26');
  const sorted = [...admissionNotices]
    .map((n) => ({ ...n, daysLeft: Math.ceil((new Date(n.deadline).getTime() - now.getTime()) / 86400000) }))
    .filter((n) => n.daysLeft > 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-300 via-brand-200 to-transparent" />
      <div className="space-y-5">
        {sorted.map((notice, i) => {
          const uni = getUniversityById(notice.universityId);
          if (!uni) return null;
          const urgency = notice.daysLeft <= 14 ? 'rose' : notice.daysLeft <= 30 ? 'amber' : 'emerald';
          const urgencyCls = {
            rose: 'bg-rose-50 text-rose-700 border-rose-200',
            amber: 'bg-amber-50 text-amber-700 border-amber-200',
            emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          }[urgency];
          return (
            <div key={notice.id} className="relative flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="relative z-10 shrink-0">
                <div className={`h-10 w-10 rounded-full border-2 ${urgencyCls} flex items-center justify-center font-bold text-xs`}>
                  {notice.daysLeft}
                </div>
              </div>
              <Link to={`/universities/${uni.slug}`} className="card card-hover p-4 flex-1 flex items-center gap-3">
                <UniversityLogo uni={uni} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-ink-900 truncate">{notice.title}</p>
                  <p className="text-xs text-ink-500">{uni.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xs font-bold ${urgency === 'rose' ? 'text-rose-600' : urgency === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {notice.daysLeft} days left
                  </p>
                  <p className="text-[10px] text-ink-400">{notice.deadline}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// How it works steps
// ============================================================
const steps = [
  { icon: Search, title: 'Search & Discover', desc: 'Find universities and programs that match your interests, GPA, and budget.', color: 'from-brand-500 to-brand-600' },
  { icon: GitCompare, title: 'Compare Options', desc: 'Side-by-side compare tuition, credits, admission requirements, and scholarships.', color: 'from-accent-500 to-accent-700' },
  { icon: Calculator, title: 'Calculate Costs', desc: 'Estimate your total tuition including fees and scholarship discounts.', color: 'from-brand-500 to-brand-700' },
  { icon: Users, title: 'Ask the Community', desc: 'Connect with current students and alumni to get real, verified answers.', color: 'from-gold-400 to-gold-600' },
];

// ============================================================
// Featured university spotlight
// ============================================================
function FeaturedSpotlight() {
  const uni = universities[0]; // BRACU
  const offerings = getOfferingsByProgram('p1').filter((o) => o.universityId === uni.id);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-brand-900 text-white">
      <div className="absolute top-0 right-0 h-64 w-64 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-accent-500/20 rounded-full blur-3xl" />
      <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-300/30 px-3 py-1 text-xs font-medium text-amber-200">
            <Sparkles size={13} /> Featured University
          </span>
          <div className="mt-5 flex items-center gap-4">
            <UniversityLogo uni={uni} size="lg" />
            <div>
              <h3 className="text-2xl font-bold font-display">{uni.name}</h3>
              <p className="text-brand-200 text-sm">{uni.location} • Est. {uni.established}</p>
            </div>
          </div>
          <p className="mt-4 text-ink-300 leading-relaxed text-sm">{uni.description}</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
              <p className="text-2xl font-bold">{uni.rating.toFixed(1)}</p>
              <p className="text-[10px] text-ink-400">Rating</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
              <p className="text-2xl font-bold">{uni.programCount}</p>
              <p className="text-[10px] text-ink-400">Programs</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
              <p className="text-2xl font-bold">{uni.reviewCount}</p>
              <p className="text-[10px] text-ink-400">Reviews</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {uni.popularPrograms.map((p) => (
              <span key={p} className="text-xs bg-white/10 rounded-full px-3 py-1 border border-white/10">{p}</span>
            ))}
          </div>
          <Link to={`/universities/${uni.slug}`} className="btn-primary mt-6">
            View Full Profile <ArrowRight size={15} />
          </Link>
        </div>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 backdrop-blur-sm">
          <h4 className="font-semibold mb-4 flex items-center gap-2"><Layers size={16} className="text-brand-300" /> Popular Programs & Tuition</h4>
          <div className="space-y-3">
            {offerings.slice(0, 4).map((o) => {
              const prog = programs.find((p) => p.id === o.programId);
              return (
                <div key={o.id} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{prog?.name}</p>
                    <p className="text-[11px] text-ink-400">{o.totalCredits} credits • {o.durationYears} yrs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-brand-300">{formatBDT(o.totalTuitionEstimate)}</p>
                    <p className="text-[10px] text-ink-400">est. total</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN HOMEPAGE
// ============================================================
const stats = [
  { label: 'Universities', value: 100, suffix: '+', icon: GraduationCap },
  { label: 'Programs', value: 1000, suffix: '+', icon: BookOpen },
  { label: 'Student Discussions', value: 10000, suffix: '+', icon: Users },
  { label: 'Students Reached', value: 50000, suffix: '+', icon: TrendingUp },
];

const quickActions = [
  { label: 'Find a University', to: '/universities', icon: GraduationCap, color: 'from-brand-500 to-brand-600' },
  { label: 'Find a Program', to: '/programs', icon: BookOpen, color: 'from-brand-500 to-brand-600' },
  { label: 'Compare Universities', to: '/compare', icon: GitCompare, color: 'from-accent-500 to-accent-600' },
  { label: 'Calculate Tuition', to: '/calculator', icon: Calculator, color: 'from-gold-400 to-gold-600' },
  { label: 'Ask Students', to: '/community', icon: Users, color: 'from-accent-500 to-accent-700' },
];

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        {/* Realistic campus background photo */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
            alt="University campus"
            className="h-full w-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-800/75" />
          <div className="absolute inset-0 bg-dot-navy opacity-30" style={{ backgroundSize: '32px 32px' }} />
        </div>
        {/* Glow accents */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl animate-float" />

        <div className="container-page relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
                Fall 2026 Admissions Now Open
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] text-balance">
                Find the Right University for Your Future
              </h1>
              <p className="mt-5 text-lg text-ink-200 leading-relaxed">
                Compare private universities in Bangladesh by tuition fees, programs, credits, scholarships, admission requirements, campus life, and student experiences.
              </p>

              <div className="mt-8">
                <HeroSearch />
              </div>

              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
                {quickActions.map((a) => (
                  <Link
                    key={a.to}
                    to={a.to}
                    className="group inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 text-sm font-medium transition backdrop-blur-sm hover:scale-105"
                  >
                    <span className={`h-6 w-6 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center`}>
                      <a.icon size={13} />
                    </span>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            <HeroPhotoCollage />
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s) => <StatCounter key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="container-page py-16">
        <SectionHeader title="How UniVara Works" subtitle="Four simple steps to find your perfect university match." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div key={step.title} className="relative card p-6 group hover:shadow-card-hover transition-all">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <step.icon size={22} />
              </div>
              <span className="absolute top-5 right-5 text-5xl font-bold font-display text-ink-100 group-hover:text-brand-100 transition-colors">
                {i + 1}
              </span>
              <h3 className="font-semibold text-ink-900">{step.title}</h3>
              <p className="text-sm text-ink-500 mt-1.5 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED SPOTLIGHT ===== */}
      <section className="container-page pb-16">
        <FeaturedSpotlight />
      </section>

      {/* ===== POPULAR UNIVERSITIES ===== */}
      <section className="container-page pb-16">
        <SectionHeader
          title="Popular Universities"
          subtitle="Top-rated private universities in Bangladesh, chosen by students."
          action={<Link to="/universities" className="btn-secondary text-sm">View all <ArrowRight size={15} /></Link>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {universities.filter((u) => u.featured).slice(0, 6).map((uni) => <UniversityCard key={uni.id} uni={uni} />)}
        </div>
      </section>

      {/* ===== INTERACTIVE PROGRAM EXPLORER ===== */}
      <section className="bg-ink-100 py-16">
        <div className="container-page">
          <SectionHeader
            title="Explore Programs"
            subtitle="Browse by category and find the right program for your career goals."
            action={<Link to="/programs" className="btn-secondary text-sm">All programs <ArrowRight size={15} /></Link>}
          />
          <ProgramExplorer />
        </div>
      </section>

      {/* ===== TUITION VISUALIZATION ===== */}
      <section className="container-page py-16">
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            <span className="chip-brand"><Wallet size={13} /> Cost Transparency</span>
            <h2 className="text-3xl font-bold font-display">See the Real Cost of Studying</h2>
            <p className="text-ink-500 leading-relaxed">
              Don't just look at per-credit fees. UniVara shows you the estimated total tuition for each program at every university, so you can find the best value for your budget.
            </p>
            <ul className="space-y-2.5">
              {['Total cost breakdown including all fees', 'Scholarship-adjusted estimates', 'Side-by-side program comparison', 'Best-value highlighting'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink-700"><CheckCircle2 size={16} className="text-emerald-600" /> {f}</li>
              ))}
            </ul>
            <div className="flex gap-2 pt-2">
              <Link to="/calculator" className="btn-primary"><Calculator size={16} /> Try Calculator</Link>
              <Link to="/compare" className="btn-secondary"><GitCompare size={16} /> Compare</Link>
            </div>
          </div>
          <div className="lg:col-span-3">
            <CostChart />
          </div>
        </div>
      </section>

      {/* ===== ADMISSION TIMELINE + COMMUNITY ===== */}
      <section className="bg-ink-100 py-16">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <SectionHeader title="Admission Countdown" subtitle="Deadlines are approaching. Don't miss out." />
              <AdmissionTimeline />
              <Link to="/admission" className="btn-secondary mt-5 text-sm">View all admission notices <ArrowRight size={14} /></Link>
            </div>
            <div>
              <SectionHeader
                title="Student Community"
                subtitle="Real questions from Bangladeshi students."
                action={<Link to="/community" className="btn-secondary text-sm">Join <ArrowRight size={14} /></Link>}
              />
              <div className="space-y-3">
                {communityPosts.slice(0, 4).map((post) => (
                  <Link key={post.id} to="/community" className="card card-hover p-4 group block">
                    <div className="flex items-start gap-3">
                      <div className={`h-9 w-9 rounded-full ${post.authorAvatarColor} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>
                        {post.authorName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium text-ink-800">{post.authorName}</span>
                          {post.verifiedBadge && <span className="badge-verified text-[10px]"><BadgeCheck size={9} /> {post.verifiedBadge}</span>}
                          <span className="chip-brand text-[10px]">{post.category}</span>
                        </div>
                        <h3 className="mt-1 font-semibold text-sm text-ink-900 group-hover:text-brand-700 line-clamp-1">{post.title}</h3>
                        <div className="mt-1 flex items-center gap-3 text-[11px] text-ink-500">
                          <span>▲ {post.upvotes}</span>
                          <span><MessageSquare size={10} className="inline" /> {post.comments.length}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section className="container-page py-16">
        <SectionHeader
          title="What Students Say"
          subtitle="Verified reviews from current students and alumni across Bangladesh."
          action={<Link to="/community" className="btn-secondary text-sm">More reviews <ArrowRight size={15} /></Link>}
        />
        <TestimonialsCarousel />
      </section>

      {/* ===== SCHOLARSHIPS STRIP ===== */}
      <section className="bg-gradient-to-br from-brand-600 to-accent-700 text-white py-16">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium">
                <Award size={13} /> Scholarships Available
              </span>
              <h2 className="mt-4 text-3xl font-bold font-display">Find Scholarships That Fit You</h2>
              <p className="mt-3 text-brand-100 leading-relaxed max-w-xl">
                From full merit scholarships to need-based financial aid — discover {scholarships.length}+ scholarship opportunities at private universities across Bangladesh. Filter by GPA, program, and university.
              </p>
              <Link to="/scholarships" className="btn bg-white text-brand-700 hover:bg-brand-50 mt-6">
                <Award size={16} /> Browse Scholarships
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {scholarships.slice(0, 4).map((s) => {
                const uni = getUniversityById(s.universityId);
                return (
                  <Link key={s.id} to="/scholarships" className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 border border-white/10 transition backdrop-blur-sm">
                    <p className="text-xs text-brand-100">{uni?.shortName}</p>
                    <p className="text-lg font-bold mt-1">{s.percentage}%</p>
                    <p className="text-[10px] text-brand-200 truncate">{s.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container-page py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-brand-800 to-navy-900 text-white p-10 lg:p-16 text-center">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl animate-float" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-400/20 blur-2xl animate-float-slow" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Compass size={13} /> Your University Journey Starts Here
            </span>
            <h2 className="mt-5 text-3xl lg:text-4xl font-bold font-display text-balance">Not sure which university is right for you?</h2>
            <p className="mt-4 text-brand-100 max-w-xl mx-auto">
              Let UniVara guide you. Compare, calculate, and connect with current students to make the best decision for your future.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/universities" className="btn bg-brand-500 text-white hover:bg-brand-600 px-7 py-3 shadow-green-glow">
                Get Started <ChevronRight size={18} />
              </Link>
              <Link to="/calculator" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-7 py-3">
                <Calculator size={16} /> Estimate Your Cost
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
