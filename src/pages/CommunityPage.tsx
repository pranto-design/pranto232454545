import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, TrendingUp, MessageSquare, Plus, ThumbsUp, Share2, Bookmark,
  BadgeCheck, Flame,
} from 'lucide-react';
import {
  communityPosts, getCommunityCategories, getUniversityById, universities,
} from '@/data/sampleData';
import { EmptyState } from '@/components/ui';

const helpfulMembers = [
  { name: 'Tanvir Ahmed', uni: 'BRACU', points: 1240, color: 'bg-emerald-600', badge: 'alumni' as const },
  { name: 'Nusrat Jahan', uni: 'NSU', points: 980, color: 'bg-rose-600', badge: 'student' as const },
  { name: 'Rakib Hasan', uni: 'NSU', points: 870, color: 'bg-indigo-600', badge: 'alumni' as const },
  { name: 'Imran Khan', uni: 'AIUB', points: 720, color: 'bg-cyan-600', badge: 'alumni' as const },
];

export default function CommunityPage() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<'trending' | 'latest' | 'top'>('trending');
  const categories = ['All', ...getCommunityCategories()];

  const filtered = useMemo(() => {
    let list = [...communityPosts];
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (sort === 'latest') list.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === 'top') list.sort((a, b) => b.upvotes - a.upvotes);
    else list.sort((a, b) => b.upvotes + b.comments.length * 2 - (a.upvotes + a.comments.length * 2));
    return list;
  }, [category, sort]);

  return (
    <div className="container-page py-10 overflow-x-hidden">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink-900 flex items-center gap-2 flex-wrap">
            <Users className="text-brand-600 shrink-0" /> <span>Student Community</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-2">Ask questions, share experiences, and connect with fellow Bangladeshi students.</p>
        </div>
        <button className="btn-primary text-xs sm:text-sm"><Plus size={16} /> Ask the Community</button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-3 min-w-0">

          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1 w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`chip whitespace-nowrap shrink-0 transition ${category === c ? 'bg-brand-600 text-white border-brand-600' : 'chip-muted hover:bg-ink-200'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No discussions found" message="Try a different category or search term." icon={<MessageSquare size={28} />} />
          ) : (
            <div className="space-y-4">
              {filtered.map((post) => {
                const uni = post.universityId ? getUniversityById(post.universityId) : undefined;
                return (
                  <div key={post.id} className="card card-hover p-5 overflow-hidden">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`h-11 w-11 rounded-full ${post.authorAvatarColor} flex items-center justify-center text-white font-semibold shrink-0`}>
                        {post.authorName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-ink-900 text-sm">{post.authorName}</span>
                          {post.universityAffiliation && <span className="text-xs text-ink-500">• {post.universityAffiliation}</span>}
                          {post.verifiedBadge && (
                            <span className="badge-verified">
                              <BadgeCheck size={11} /> {post.verifiedBadge}
                            </span>
                          )}
                          <span className="text-xs text-ink-400 ml-auto">{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="chip-brand truncate max-w-[120px]">{post.category}</span>
                          <span className="chip-muted truncate max-w-[80px]">{post.type}</span>
                          {uni && <Link to={`/community/university/${uni.slug}`} className="chip-accent hover:underline truncate max-w-[80px]">{uni.shortName}</Link>}
                        </div>
                        <h3 className="mt-3 font-semibold text-ink-900 leading-tight break-words">{post.title}</h3>
                        <p className="mt-1.5 text-sm text-ink-600 leading-relaxed break-words">{post.content}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {post.tags.map((t) => <span key={t} className="text-xs text-brand-600">#{t}</span>)}
                        </div>

                        {/* Comments preview */}
                        {post.comments.length > 0 && (
                          <div className="mt-4 pl-3 border-l-2 border-ink-100 space-y-3">
                            {post.comments.slice(0, 2).map((c) => (
                              <div key={c.id} className="flex items-start gap-2">
                                <div className={`h-7 w-7 rounded-full ${c.authorAvatarColor} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                                  {c.authorName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-xs font-semibold text-ink-800">{c.authorName}</span>
                                    {c.verifiedBadge && <span className="badge-verified text-[10px]"><BadgeCheck size={9} /> {c.verifiedBadge}</span>}
                                    <span className="text-[10px] text-ink-400">{c.date}</span>
                                  </div>
                                  <p className="text-sm text-ink-600 mt-0.5 break-words">{c.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 flex items-center gap-3 sm:gap-5 text-xs text-ink-500 flex-wrap">
                          <button className="flex items-center gap-1.5 hover:text-brand-600 font-medium"><ThumbsUp size={14} /> {post.upvotes}</button>
                          <button className="flex items-center gap-1.5 hover:text-brand-600"><MessageSquare size={14} /> {post.comments.length} Comments</button>
                          <button className="flex items-center gap-1.5 hover:text-brand-600"><Share2 size={14} /> Share</button>
                          <button className="flex items-center gap-1.5 hover:text-brand-600"><Bookmark size={14} /> Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 min-w-0">
          <div className="card p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Flame size={18} className="text-amber-500" /> Trending Topics</h3>
            <div className="space-y-2">
              {['Fall 2026 Admission', 'CSE vs EEE', 'NSU vs BRACU', 'Scholarship for GPA 5', 'Bashundhara housing'].map((t, i) => (
                <div key={t} className="flex items-center gap-2 text-sm text-ink-600 hover:text-brand-700 cursor-pointer">
                  <span className="text-xs font-bold text-ink-400 w-4">{i + 1}</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp size={18} className="text-brand-600" /> Most Helpful Members</h3>
            <div className="space-y-3">
              {helpfulMembers.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-full ${m.color} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>{m.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink-800 flex items-center gap-1 truncate">{m.name} <BadgeCheck size={12} className="text-brand-600 shrink-0" /></p>
                    <p className="text-xs text-ink-500">{m.uni} • {m.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold mb-3">Popular Universities</h3>
            <div className="space-y-2">
              {universities.slice(0, 5).map((u) => (
                <Link key={u.id} to={`/community/university/${u.slug}`} className="flex items-center justify-between text-sm hover:text-brand-700 group">
                  <span className="text-ink-700 truncate">{u.shortName}</span>
                  <span className="text-xs text-ink-400 group-hover:text-brand-600 shrink-0 ml-2">Join →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
