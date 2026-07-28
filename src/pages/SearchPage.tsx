import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, GraduationCap, BookOpen, MessageSquare, Award, Bell, Star } from 'lucide-react';
import { universities, programs, communityPosts, reviews, admissionNotices, scholarships, getUniversityById } from '@/data/sampleData';
import { UniversityLogo, RatingStars } from '@/components/ui';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [input, setInput] = useState(q);
  const [activeTab, setActiveTab] = useState<'all' | 'universities' | 'programs' | 'community' | 'reviews' | 'admissions' | 'scholarships'>('all');

  const results = useMemo(() => {
    if (!q) return { universities: [], programs: [], community: [], reviews: [], admissions: [], scholarships: [] };
    const query = q.toLowerCase();
    return {
      universities: universities.filter((u) => u.name.toLowerCase().includes(query) || u.shortName.toLowerCase().includes(query) || u.popularPrograms.some((p) => p.toLowerCase().includes(query))),
      programs: programs.filter((p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)),
      community: communityPosts.filter((p) => p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query) || p.tags.some((t) => t.includes(query))),
      reviews: reviews.filter((r) => r.writtenReview.toLowerCase().includes(query) || r.programName.toLowerCase().includes(query)),
      admissions: admissionNotices.filter((a) => a.title.toLowerCase().includes(query)),
      scholarships: scholarships.filter((s) => s.name.toLowerCase().includes(query) || s.eligibility.toLowerCase().includes(query)),
    };
  }, [q]);

  const total = Object.values(results).reduce((s, arr) => s + arr.length, 0);

  const tabs = [
    { id: 'all', label: 'All', count: total, icon: Search },
    { id: 'universities', label: 'Universities', count: results.universities.length, icon: GraduationCap },
    { id: 'programs', label: 'Programs', count: results.programs.length, icon: BookOpen },
    { id: 'community', label: 'Community', count: results.community.length, icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', count: results.reviews.length, icon: Star },
    { id: 'admissions', label: 'Admissions', count: results.admissions.length, icon: Bell },
    { id: 'scholarships', label: 'Scholarships', count: results.scholarships.length, icon: Award },
  ] as const;

  const show = (id: string) => activeTab === 'all' || activeTab === id;

  return (
    <div className="container-page py-10">
      <form onSubmit={(e) => { e.preventDefault(); setParams({ q: input }); }} className="relative max-w-2xl mb-6">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search universities, programs, subjects..." className="input pl-10 text-base" autoFocus />
        <button type="submit" className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 text-sm">Search</button>
      </form>

      {q && (
        <>
          <p className="text-sm text-ink-500 mb-4">{total} results for "<strong className="text-ink-800">{q}</strong>"</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`chip whitespace-nowrap ${activeTab === t.id ? 'bg-brand-600 text-white border-brand-600' : 'chip-muted hover:bg-ink-200'}`}>
                <t.icon size={13} /> {t.label} ({t.count})
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {show('universities') && results.universities.length > 0 && (
              <section>
                <h2 className="font-semibold text-ink-900 mb-3">Universities</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.universities.map((u) => (
                    <Link key={u.id} to={`/universities/${u.slug}`} className="card card-hover p-4 flex items-center gap-3">
                      <UniversityLogo uni={u} size="sm" />
                      <div className="min-w-0">
                        <p className="font-semibold text-ink-900 text-sm truncate">{u.name}</p>
                        <p className="text-xs text-ink-500">{u.location} • ★ {u.rating}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {show('programs') && results.programs.length > 0 && (
              <section>
                <h2 className="font-semibold text-ink-900 mb-3">Programs</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.programs.map((p) => (
                    <Link key={p.id} to={`/programs/${p.slug}`} className="card card-hover p-4">
                      <p className="font-semibold text-ink-900 text-sm">{p.name}</p>
                      <p className="text-xs text-ink-500 mt-1">{p.category} • {p.offeringUniversityIds.length} universities</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {show('community') && results.community.length > 0 && (
              <section>
                <h2 className="font-semibold text-ink-900 mb-3">Community Posts</h2>
                <div className="space-y-3">
                  {results.community.map((p) => (
                    <Link key={p.id} to="/community" className="card card-hover p-4 block">
                      <p className="font-semibold text-sm text-ink-900">{p.title}</p>
                      <p className="text-xs text-ink-500 mt-1 line-clamp-1">{p.content}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {show('reviews') && results.reviews.length > 0 && (
              <section>
                <h2 className="font-semibold text-ink-900 mb-3">Reviews</h2>
                <div className="space-y-3">
                  {results.reviews.map((r) => {
                    const uni = getUniversityById(r.universityId);
                    return (
                      <Link key={r.id} to={uni ? `/universities/${uni.slug}` : '/community'} className="card card-hover p-4 block">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm text-ink-900">{uni?.name} — {r.programName}</p>
                          <RatingStars rating={r.overall} />
                        </div>
                        <p className="text-xs text-ink-500 mt-1 line-clamp-2">{r.writtenReview}</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
            {show('admissions') && results.admissions.length > 0 && (
              <section>
                <h2 className="font-semibold text-ink-900 mb-3">Admission Notices</h2>
                <div className="space-y-3">
                  {results.admissions.map((a) => {
                    const uni = getUniversityById(a.universityId);
                    return <Link key={a.id} to="/admission" className="card card-hover p-4 block"><p className="font-semibold text-sm">{a.title}</p><p className="text-xs text-ink-500">{uni?.name} • Deadline: {a.deadline}</p></Link>;
                  })}
                </div>
              </section>
            )}
            {show('scholarships') && results.scholarships.length > 0 && (
              <section>
                <h2 className="font-semibold text-ink-900 mb-3">Scholarships</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {results.scholarships.map((s) => {
                    const uni = getUniversityById(s.universityId);
                    return <Link key={s.id} to="/scholarships" className="card card-hover p-4"><p className="font-semibold text-sm">{s.name}</p><p className="text-xs text-ink-500">{uni?.name} • {s.percentage}% off</p></Link>;
                  })}
                </div>
              </section>
            )}
            {total === 0 && <p className="text-center text-ink-500 py-10">No results found. Try different keywords.</p>}
          </div>
        </>
      )}
    </div>
  );
}
