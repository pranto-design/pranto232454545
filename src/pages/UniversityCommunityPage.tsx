import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, MessageSquare, Plus, Star, Calendar, ThumbsUp, BadgeCheck } from 'lucide-react';
import { getUniversity, getPostsByUniversity, getReviewsByUniversity, communityPosts } from '@/data/sampleData';
import { UniversityLogo, RatingStars, EmptyState } from '@/components/ui';

const subTabs = [
  { id: 'discussions', label: 'Discussions' },
  { id: 'questions', label: 'Questions' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'events', label: 'Events' },
];

export default function UniversityCommunityPage() {
  const { slug } = useParams<{ slug: string }>();
  const [tab, setTab] = useState('discussions');
  const uni = slug ? getUniversity(slug) : undefined;

  if (!uni) {
    return (
      <div className="container-page py-20">
        <EmptyState title="Community not found" message="This university community does not exist." icon={<Users size={28} />} />
        <div className="text-center mt-4"><Link to="/community" className="btn-primary">Back to Community</Link></div>
      </div>
    );
  }

  const posts = getPostsByUniversity(uni.id);
  const questions = posts.filter((p) => p.type === 'question');
  const discussions = posts.filter((p) => p.type === 'discussion');
  const reviews = getReviewsByUniversity(uni.id);
  const events = [
    { id: 'e1', title: 'Fall 2026 Orientation', date: '2026-08-20', location: 'Main Campus' },
    { id: 'e2', title: 'Career Fair 2026', date: '2026-09-15', location: 'Auditorium' },
  ];

  return (
    <div>
      <div className="bg-gradient-to-br from-brand-700 to-accent-700 text-white">
        <div className="container-page py-10">
          <nav className="text-sm text-brand-200 mb-6">
            <Link to="/community" className="hover:text-white">Community</Link> <span className="mx-1">/</span>
            <span className="text-white">{uni.name}</span>
          </nav>
          <div className="flex items-center gap-4">
            <UniversityLogo uni={uni} size="lg" />
            <div>
              <h1 className="text-3xl font-bold font-display">{uni.name} Community</h1>
              <p className="text-brand-100 mt-1">{posts.length} discussions • {reviews.length} reviews • {uni.reviewCount} members</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex gap-1">
            {subTabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`tab ${tab === t.id ? 'tab-active' : ''}`}>{t.label}</button>
            ))}
          </div>
          <button className="btn-primary text-sm"><Plus size={15} /> Ask a Question</button>
        </div>

        {tab === 'discussions' && (
          <div className="space-y-4">
            {discussions.length === 0 ? (
              <EmptyState title="No discussions yet" message="Start a discussion about this university." icon={<MessageSquare size={28} />} />
            ) : (
              discussions.map((p) => <PostCard key={p.id} post={p} />)
            )}
          </div>
        )}
        {tab === 'questions' && (
          <div className="space-y-4">
            {questions.length === 0 ? (
              <EmptyState title="No questions yet" message="Be the first to ask a question." icon={<MessageSquare size={28} />} />
            ) : (
              questions.map((p) => <PostCard key={p.id} post={p} />)
            )}
          </div>
        )}
        {tab === 'reviews' && (
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <EmptyState title="No reviews yet" message="No reviews for this university yet." icon={<Star size={28} />} />
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-semibold">{r.authorName.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-sm flex items-center gap-1.5">{r.authorName} {r.verified && <span className="badge-verified">✓ Verified {r.authorType}</span>}</p>
                      <p className="text-xs text-ink-500">{r.programName} • Class of {r.graduationYear}</p>
                    </div>
                    <div className="ml-auto"><RatingStars rating={r.overall} /></div>
                  </div>
                  <p className="text-sm text-ink-600">{r.writtenReview}</p>
                </div>
              ))
            )}
          </div>
        )}
        {tab === 'events' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {events.map((e) => (
              <div key={e.id} className="card p-5">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-700 flex flex-col items-center justify-center">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-900">{e.title}</h3>
                    <p className="text-xs text-ink-500">{e.date} • {e.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: typeof communityPosts[number] }) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start gap-3">
        <div className={`h-10 w-10 rounded-full ${post.authorAvatarColor} flex items-center justify-center text-white font-semibold shrink-0`}>{post.authorName.charAt(0)}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-ink-900">{post.authorName}</span>
            {post.verifiedBadge && <span className="badge-verified"><BadgeCheck size={10} /> {post.verifiedBadge}</span>}
            <span className="text-xs text-ink-400 ml-auto">{post.date}</span>
          </div>
          <span className="chip-brand mt-1.5">{post.category}</span>
          <h3 className="mt-2 font-semibold text-ink-900">{post.title}</h3>
          <p className="mt-1 text-sm text-ink-600 line-clamp-3">{post.content}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
            <span className="flex items-center gap-1"><ThumbsUp size={13} /> {post.upvotes}</span>
            <span className="flex items-center gap-1"><MessageSquare size={13} /> {post.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
