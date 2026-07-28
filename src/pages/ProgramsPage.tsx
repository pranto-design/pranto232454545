import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { programs, universities, formatBDT } from '@/data/sampleData';
import { EmptyState } from '@/components/ui';
import type { ProgramCategory } from '@/types';

const categories: (ProgramCategory | 'All')[] = [
  'All', 'Engineering', 'Computer Science', 'Business', 'Pharmacy',
  'Life Sciences', 'Social Sciences', 'Arts & Humanities', 'Law', 'Architecture', 'Other',
];

export default function ProgramsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('All');

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category]);

  return (
    <div className="container-page py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink-900">Academic Programs</h1>
        <p className="text-ink-500 mt-2">Search across {programs.length}+ programs offered by private universities in Bangladesh.</p>
      </div>

      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs..."
              className="input pl-10"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`chip transition ${category === c ? 'bg-brand-600 text-white border-brand-600' : 'chip-muted hover:bg-ink-200'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-ink-500 mb-4">{filtered.length} programs found</p>

      {filtered.length === 0 ? (
        <EmptyState title="No programs found" message="Try a different search or category." icon={<BookOpen size={28} />} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link key={p.id} to={`/programs/${p.slug}`} className="card card-hover p-5 group flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white">
                  <BookOpen size={20} />
                </div>
                <span className="chip-accent">{p.category}</span>
              </div>
              <h3 className="font-semibold text-ink-900 group-hover:text-brand-700 leading-tight">{p.name}</h3>
              <p className="text-sm text-ink-600 mt-2 line-clamp-2 flex-1">{p.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div><p className="text-ink-500">Universities</p><p className="font-semibold text-ink-800">{p.offeringUniversityIds.length}</p></div>
                <div><p className="text-ink-500">Avg Credits</p><p className="font-semibold text-ink-800">{p.avgCredits}</p></div>
                <div><p className="text-ink-500">Duration</p><p className="font-semibold text-ink-800">{p.avgDurationYears} yrs</p></div>
                <div><p className="text-ink-500">Avg Tuition</p><p className="font-semibold text-ink-800">{formatBDT(p.avgTuitionMin)} – {formatBDT(p.avgTuitionMax)}</p></div>
              </div>
              <span className="mt-4 text-sm font-medium text-brand-600 group-hover:underline flex items-center gap-1">
                Explore Programs <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
