import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Globe, Mail, Phone, MapPin, Building2, Award, Calendar, Users,
  CheckCircle2, ExternalLink, GraduationCap, BookOpen, CreditCard,
  FileText, HandCoins, Home, MessageSquare, Phone as PhoneIcon,
  ThumbsUp, Flag, Star,
} from 'lucide-react';
import {
  getUniversity, getOfferingsByUniversity, getReviewsByUniversity,
  getScholarshipsByUniversity, getNoticesByUniversity, getPostsByUniversity,
  getProgramById, formatBDT, formatBDTFull,
} from '@/data/sampleData';
import {
  UniversityLogo, RatingStars, VerificationBadge, CompareButton, SaveButton, EmptyState,
} from '@/components/ui';
import LeadForm from '@/components/LeadForm';
import type { ReviewCategoryRating } from '@/types';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'programs', label: 'Programs', icon: GraduationCap },
  { id: 'tuition', label: 'Tuition & Fees', icon: CreditCard },
  { id: 'admission', label: 'Admission', icon: FileText },
  { id: 'scholarships', label: 'Scholarships', icon: Award },
  { id: 'campus', label: 'Campus', icon: Home },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'community', label: 'Community', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: PhoneIcon },
];

const ratingLabels: { key: keyof ReviewCategoryRating; label: string }[] = [
  { key: 'academics', label: 'Academics' },
  { key: 'faculty', label: 'Faculty' },
  { key: 'campus', label: 'Campus' },
  { key: 'studentLife', label: 'Student Life' },
  { key: 'career', label: 'Career Opp.' },
  { key: 'costValue', label: 'Cost vs Value' },
  { key: 'facilities', label: 'Facilities' },
];

export default function UniversityProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const uni = slug ? getUniversity(slug) : undefined;

  if (!uni) {
    return (
      <div className="container-page py-20">
        <EmptyState title="University not found" message="The university you are looking for does not exist." icon={<GraduationCap size={28} />} />
        <div className="text-center mt-4">
          <Link to="/universities" className="btn-primary">Back to Universities</Link>
        </div>
      </div>
    );
  }

  const offerings = getOfferingsByUniversity(uni.id);
  const uniReviews = getReviewsByUniversity(uni.id);
  const uniScholarships = getScholarshipsByUniversity(uni.id);
  const uniNotices = getNoticesByUniversity(uni.id);
  const uniPosts = getPostsByUniversity(uni.id);

  const avgRatings: ReviewCategoryRating = {
    academics: 0, faculty: 0, campus: 0, studentLife: 0, career: 0, costValue: 0, facilities: 0,
  };
  if (uniReviews.length > 0) {
    (Object.keys(avgRatings) as (keyof ReviewCategoryRating)[]).forEach((k) => {
      avgRatings[k] = uniReviews.reduce((s, r) => s + r.ratings[k], 0) / uniReviews.length;
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-ink-900 to-brand-900 text-white">
        <div className="container-page py-10">
          <nav className="text-sm text-ink-400 mb-6">
            <Link to="/" className="hover:text-white">Home</Link> <span className="mx-1">/</span>
            <Link to="/universities" className="hover:text-white">Universities</Link> <span className="mx-1">/</span>
            <span className="text-white">{uni.name}</span>
          </nav>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <UniversityLogo uni={uni} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold font-display text-white">{uni.name}</h1>
                <VerificationBadge status={uni.verification} />
              </div>
              <p className="text-ink-300 mt-1">{uni.shortName} • Est. {uni.established}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-ink-200">
                <span className="flex items-center gap-1.5"><MapPin size={15} /> {uni.location}, {uni.division}</span>
                <span className="flex items-center gap-1.5"><Building2 size={15} /> {uni.programCount} programs</span>
                <span className="flex items-center gap-1.5"><Users size={15} /> {uni.reviewCount} reviews</span>
                <span className="flex items-center gap-1.5"><Star size={15} className="fill-amber-400 text-amber-400" /> {uni.rating.toFixed(1)} rating</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                <a href={uni.website} target="_blank" rel="noopener noreferrer" className="btn bg-white text-brand-700 hover:bg-brand-50 text-sm">
                  <Globe size={16} /> Official Website <ExternalLink size={13} />
                </a>
                <CompareButton universityId={uni.id} />
                <SaveButton universityId={uni.id} />
                <button className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 text-sm">
                  <HandCoins size={16} /> Claim This University
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-ink-200">
        <div className="container-page">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab flex items-center gap-1.5 ${activeTab === tab.id ? 'tab-active' : ''}`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-3">About {uni.name}</h2>
                <p className="text-ink-600 leading-relaxed">{uni.description}</p>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold mb-3">Campus Information</h3>
                <p className="text-ink-600 text-sm leading-relaxed">{uni.campusInfo}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {uni.facilities.map((f) => (
                    <span key={f} className="chip-success"><CheckCircle2 size={12} /> {f}</span>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold mb-3">Faculties & Departments</h3>
                <div className="space-y-3">
                  {uni.faculties.map((fac) => (
                    <div key={fac.id} className="border-l-2 border-brand-300 pl-3">
                      <p className="font-medium text-ink-800 text-sm">{fac.name}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {fac.departments.map((d) => <span key={d} className="chip-muted text-[11px]">{d}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold mb-3">Quick Facts</h3>
                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><dt className="text-ink-500">Established</dt><dd className="font-medium">{uni.established}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Location</dt><dd className="font-medium">{uni.location}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Programs</dt><dd className="font-medium">{uni.programCount}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Min GPA</dt><dd className="font-medium">{uni.minGPA.toFixed(1)}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Admission Test</dt><dd className="font-medium">{uni.admissionTestRequired ? 'Required' : 'Not Required'}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Tuition Range</dt><dd className="font-medium">{formatBDT(uni.tuitionMin)} – {formatBDT(uni.tuitionMax)}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-500">Scholarship</dt><dd className="font-medium">{uni.scholarshipAvailable ? 'Available' : 'N/A'}</dd></div>
                </dl>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold mb-2">Accreditation</h3>
                <p className="text-sm text-ink-600">{uni.accreditation}</p>
              </div>
              <div className="card p-5 bg-amber-50/50 border-amber-200">
                <div className="flex items-center gap-2 text-xs text-ink-500">
                  <Calendar size={13} /> Last Updated: {uni.lastUpdated}
                </div>
                <p className="text-xs text-ink-500 mt-1">Source: {uni.source}</p>
              </div>
            </div>
          </div>
        )}

        {/* PROGRAMS */}
        {activeTab === 'programs' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Programs at {uni.name}</h2>
            {offerings.length === 0 ? (
              <EmptyState title="No programs listed" message="Program data for this university is not yet available." icon={<BookOpen size={28} />} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {offerings.map((o) => {
                  const prog = getProgramById(o.programId);
                  return (
                    <div key={o.id} className="card p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-ink-900">{prog?.name}</h3>
                          <p className="text-xs text-ink-500 mt-0.5">{o.degree} • {o.durationYears} years • {o.totalCredits} credits</p>
                        </div>
                        {o.scholarshipAvailable && <span className="chip-success"><Award size={11} /> Scholarship</span>}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div><p className="text-xs text-ink-500">Tuition/Credit</p><p className="font-medium">{formatBDTFull(o.tuitionPerCredit)}</p></div>
                        <div><p className="text-xs text-ink-500">Admission Fee</p><p className="font-medium">{formatBDTFull(o.admissionFee)}</p></div>
                        <div><p className="text-xs text-ink-500">Est. Total Tuition</p><p className="font-bold text-brand-700">{formatBDT(o.totalTuitionEstimate)}</p></div>
                        <div><p className="text-xs text-ink-500">Lab Fee/Sem</p><p className="font-medium">{formatBDTFull(o.labFee)}</p></div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-ink-500 mb-1">Admission Requirements:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {o.admissionRequirements.map((r) => <span key={r} className="chip-muted text-[11px]">{r}</span>)}
                        </div>
                      </div>
                      <Link to={`/programs/${prog?.slug}`} className="btn-secondary text-xs mt-4 w-full">View Program Details</Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TUITION */}
        {activeTab === 'tuition' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Tuition & Fees</h2>
            <div className="card p-6 mb-4 bg-amber-50/40 border-amber-200">
              <p className="text-sm text-ink-600">
                <strong>Disclaimer:</strong> Fees are estimates based on sample data and may change. Always verify current fees with the university.
              </p>
              <p className="text-xs text-ink-500 mt-2">Last Updated: {uni.lastUpdated} • Source: {uni.source}</p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Cost Breakdown by Program</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 text-left text-ink-500">
                      <th className="py-2 pr-4 font-medium">Program</th>
                      <th className="py-2 px-4 font-medium">Credits</th>
                      <th className="py-2 px-4 font-medium">Tuition/Credit</th>
                      <th className="py-2 px-4 font-medium">Admission Fee</th>
                      <th className="py-2 px-4 font-medium">Lab Fee/Sem</th>
                      <th className="py-2 px-4 font-medium">Est. Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offerings.map((o) => {
                      const prog = getProgramById(o.programId);
                      return (
                        <tr key={o.id} className="border-b border-ink-100 hover:bg-ink-50/50">
                          <td className="py-3 pr-4 font-medium text-ink-800">{prog?.name}</td>
                          <td className="py-3 px-4">{o.totalCredits}</td>
                          <td className="py-3 px-4">{formatBDTFull(o.tuitionPerCredit)}</td>
                          <td className="py-3 px-4">{formatBDTFull(o.admissionFee)}</td>
                          <td className="py-3 px-4">{formatBDTFull(o.labFee)}</td>
                          <td className="py-3 px-4 font-bold text-brand-700">{formatBDT(o.totalTuitionEstimate)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/calculator" className="btn-primary"><CreditCard size={16} /> Calculate Your Total Cost</Link>
            </div>
          </div>
        )}

        {/* ADMISSION */}
        {activeTab === 'admission' && (
          <div className="animate-fade-in grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="card p-6">
                <h3 className="font-semibold mb-3">Admission Requirements</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5" /><div><p className="font-medium">Minimum HSC GPA</p><p className="text-ink-500">{uni.minGPA.toFixed(1)} out of 5.0</p></div></div>
                  <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5" /><div><p className="font-medium">SSC Requirements</p><p className="text-ink-500">GPA 3.5+ with Science/Math for engineering</p></div></div>
                  <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5" /><div><p className="font-medium">HSC Requirements</p><p className="text-ink-500">GPA {uni.minGPA.toFixed(1)}+ relevant subjects</p></div></div>
                  <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5" /><div><p className="font-medium">O/A Level</p><p className="text-ink-500">5 O-Level + 2 A-Level subjects with minimum C grades</p></div></div>
                  <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5" /><div><p className="font-medium">Admission Test</p><p className="text-ink-500">{uni.admissionTestRequired ? 'Required — written exam on Physics, Math, English' : 'Not required — admission based on HSC GPA'}</p></div></div>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold mb-3">Application Process</h3>
                <ol className="space-y-3">
                  {['Fill out the online application form on the university website', 'Submit required documents and pay application fee', 'Appear for admission test (if applicable)', 'Check merit list and complete admission'].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="h-6 w-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      <span className="text-ink-600 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold mb-3">Required Documents</h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-ink-600">
                  {['SSC & HSC certificates', 'SSC & HSC transcripts', 'Passport-size photos (4 copies)', 'Birth certificate / NID', 'Application fee receipt', 'Character certificate'].map((d) => (
                    <li key={d} className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-600" /> {d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold mb-3">Admission Deadlines</h3>
                {uniNotices.length === 0 ? (
                  <p className="text-sm text-ink-500">No admission notices available.</p>
                ) : (
                  uniNotices.map((n) => (
                    <div key={n.id} className="border-l-2 border-brand-300 pl-3 mb-3">
                      <p className="text-sm font-medium text-ink-800">{n.title}</p>
                      <p className="text-xs text-ink-500 mt-1">Deadline: {n.deadline}</p>
                      {n.admissionTestDate && <p className="text-xs text-ink-500">Test: {n.admissionTestDate}</p>}
                      <a href={n.applicationLink} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline mt-1 inline-block">Apply here →</a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCHOLARSHIPS */}
        {activeTab === 'scholarships' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Scholarships at {uni.name}</h2>
            {uniScholarships.length === 0 ? (
              <EmptyState title="No scholarships listed" message="Scholarship information for this university is not yet available." icon={<Award size={28} />} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {uniScholarships.map((s) => (
                  <div key={s.id} className="card p-5">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-ink-900">{s.name}</h3>
                      <span className="chip-success font-bold">{s.percentage}% off</span>
                    </div>
                    <p className="text-sm text-ink-600 mt-2">{s.eligibility}</p>
                    <div className="mt-3 space-y-1.5 text-sm">
                      <p><span className="text-ink-500">GPA Required:</span> <span className="font-medium">{s.gpaRequirement.toFixed(1)}+</span></p>
                      <p><span className="text-ink-500">How to Apply:</span> <span className="text-ink-600">{s.applicationProcess}</span></p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <VerificationBadge status={s.verification} size="xs" />
                      <span className="text-[11px] text-ink-400">Updated: {s.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CAMPUS */}
        {activeTab === 'campus' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Campus & Facilities</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-semibold mb-3">Campus Information</h3>
                <p className="text-ink-600 text-sm leading-relaxed">{uni.campusInfo}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Address</p>
                  <p className="text-sm text-ink-600 flex items-start gap-2"><MapPin size={16} className="text-ink-400 mt-0.5" /> {uni.address}</p>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold mb-3">Facilities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {uni.facilities.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-ink-700">
                      <CheckCircle2 size={16} className="text-emerald-600" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Student Reviews</h2>
              <button className="btn-primary text-sm">Write a Review</button>
            </div>
            {uniReviews.length > 0 && (
              <div className="card p-6 mb-4">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold font-display text-ink-900">{uni.rating.toFixed(1)}</p>
                    <RatingStars rating={uni.rating} />
                    <p className="text-xs text-ink-500 mt-1">{uni.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {ratingLabels.map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-xs text-ink-500 w-24 shrink-0">{label}</span>
                        <div className="flex-1 h-2 bg-ink-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(avgRatings[key] / 5) * 100}%` }} />
                        </div>
                        <span className="text-xs font-medium w-8 text-right">{avgRatings[key].toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {uniReviews.length === 0 ? (
                <EmptyState title="No reviews yet" message="Be the first to review this university." icon={<Star size={28} />} />
              ) : (
                uniReviews.map((r) => (
                  <div key={r.id} className="card p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                          {r.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-ink-900 text-sm flex items-center gap-1.5">
                            {r.authorName}
                            {r.verified && <span className="badge-verified">✓ Verified {r.authorType}</span>}
                          </p>
                          <p className="text-xs text-ink-500">{r.programName} • Class of {r.graduationYear} • {r.date}</p>
                        </div>
                      </div>
                      <RatingStars rating={r.overall} />
                    </div>
                    <p className="mt-3 text-sm text-ink-600 leading-relaxed">{r.writtenReview}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
                      <button className="flex items-center gap-1 hover:text-brand-600"><ThumbsUp size={13} /> Helpful ({r.helpfulVotes})</button>
                      <button className="flex items-center gap-1 hover:text-rose-600"><Flag size={13} /> Report</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* COMMUNITY */}
        {activeTab === 'community' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{uni.name} Community</h2>
              <Link to="/community" className="btn-primary text-sm">Ask a Question</Link>
            </div>
            {uniPosts.length === 0 ? (
              <EmptyState title="No discussions yet" message="Start the conversation — ask a question about this university." icon={<MessageSquare size={28} />} />
            ) : (
              <div className="space-y-4">
                {uniPosts.map((post) => (
                  <Link key={post.id} to="/community" className="card card-hover p-5 block">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="chip-brand">{post.category}</span>
                      <span className="chip-muted">{post.type}</span>
                    </div>
                    <h3 className="font-semibold text-ink-900">{post.title}</h3>
                    <p className="text-sm text-ink-600 mt-1 line-clamp-2">{post.content}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
                      <span>▲ {post.upvotes}</span>
                      <span>{post.comments.length} comments</span>
                      <span>by {post.authorName}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACT */}
        {activeTab === 'contact' && (
          <div className="animate-fade-in grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><MapPin size={18} className="text-ink-400 mt-0.5" /><div><p className="font-medium">Address</p><p className="text-ink-600">{uni.address}</p></div></div>
                <div className="flex items-start gap-3"><Phone size={18} className="text-ink-400 mt-0.5" /><div><p className="font-medium">Phone</p><p className="text-ink-600">{uni.phone}</p></div></div>
                <div className="flex items-start gap-3"><Mail size={18} className="text-ink-400 mt-0.5" /><div><p className="font-medium">Email</p><p className="text-ink-600">{uni.email}</p></div></div>
                <div className="flex items-start gap-3"><Globe size={18} className="text-ink-400 mt-0.5" /><div><p className="font-medium">Website</p><a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">{uni.website}</a></div></div>
              </div>
            </div>
            <LeadForm defaultUniversityId={uni.id} />
          </div>
        )}
      </div>
    </div>
  );
}
