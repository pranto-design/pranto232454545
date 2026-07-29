import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, MapPin, Award, GraduationCap } from 'lucide-react';
import { universities, programs, formatBDT } from '@/data/sampleData';
import { UniversityCard, EmptyState } from '@/components/ui';
import type { Division } from '@/types';

const divisions: Division[] = ['Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Sylhet', 'Barishal', 'Rangpur', 'Mymensingh'];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'tuition-low', label: 'Lowest Tuition' },
  { value: 'tuition-high', label: 'Highest Tuition' },
  { value: 'newest', label: 'Newest' },
  { value: 'programs', label: 'Most Programs' },
];

export default function UniversitiesPage() {
  const [search, setSearch] = useState('');
  const [division, setDivision] = useState('');
  const [program, setProgram] = useState('');
  const [tuitionMax, setTuitionMax] = useState(0);
  const [sort, setSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...universities];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((u) =>
        u.name.toLowerCase().includes(q) ||
        u.shortName.toLowerCase().includes(q) ||
        u.popularPrograms.some((p) => p.toLowerCase().includes(q)),
      );
    }
    if (division) list = list.filter((u) => u.division === division);
    if (program) list = list.filter((u) => u.popularPrograms.includes(program));
    if (tuitionMax > 0) list = list.filter((u) => u.tuitionMin <= tuitionMax);

    switch (sort) {
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'tuition-low': list.sort((a, b) => a.tuitionMin - b.tuitionMin); break;
      case 'tuition-high': list.sort((a, b) => b.tuitionMax - a.tuitionMax); break;
      case 'newest': list.sort((a, b) => b.established - a.established); break;
      case 'programs': list.sort((a, b) => b.programCount - a.programCount); break;
      default: list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [search, division, program, tuitionMax, sort]);

  const resetFilters = () => {
    setSearch(''); setDivision(''); setProgram(''); setTuitionMax(0);
    setSort('popular');
  };

  const activeFilterCount = [division, program, tuitionMax > 0 ? 'x' : ''].filter(Boolean).length;

  return (
    <div className="container-page py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink-900">Private Universities in Bangladesh</h1>
        <p className="text-ink-500 mt-2">Browse and compare {universities.length}+ private universities. Filter by location, program, tuition, and more.</p>
      </div>

      {/* Search + sort bar */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or program..."
              className="input pl-10"
            />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input lg:w-56">
            {sortOptions.map((o) => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
          </select>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="btn-secondary lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {/* Desktop filters */}
        <div className={`mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 ${showFilters ? '' : 'hidden lg:grid'}`}>
          <select value={division} onChange={(e) => setDivision(e.target.value)} className="input text-sm">
            <option value="">All Divisions</option>
            {divisions.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select value={program} onChange={(e) => setProgram(e.target.value)} className="input text-sm">
            <option value="">Any Program</option>
            {programs.map((p) => <option key={p.id} value={p.name.split(' ')[0]}>{p.name}</option>)}
          </select>
          <select value={tuitionMax} onChange={(e) => setTuitionMax(Number(e.target.value))} className="input text-sm">
            <option value={0}>Any Tuition</option>
            <option value={500000}>Under ৳5L</option>
            <option value={800000}>Under ৳8L</option>
            <option value={1000000}>Under ৳10L</option>
            <option value={1500000}>Under ৳15L</option>
          </select>
        </div>
        {activeFilterCount > 0 && (
          <button onClick={resetFilters} className="mt-3 inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium">
            <X size={13} /> Clear all filters
          </button>
        )}
      </div>

      <p className="text-sm text-ink-500 mb-4">{filtered.length} universities found</p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No universities match your filters"
          message="Try adjusting your filters or search terms to find more universities."
          icon={<GraduationCap size={28} />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((uni) => <UniversityCard key={uni.id} uni={uni} />)}
        </div>
      )}
    </div>
  );
}
