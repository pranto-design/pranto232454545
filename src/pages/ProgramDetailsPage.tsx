import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen, Briefcase, GraduationCap, Award, ArrowRight, CheckCircle2,
} from 'lucide-react';
import {
  getProgram, getOfferingsByProgram, getUniversityById, formatBDT, formatBDTFull, programs,
} from '@/data/sampleData';
import { UniversityLogo, EmptyState, CompareButton, VerificationBadge } from '@/components/ui';
import LeadForm from '@/components/LeadForm';

export default function ProgramDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [showLead, setShowLead] = useState(false);
  const program = slug ? getProgram(slug) : undefined;

  if (!program) {
    return (
      <div className="container-page py-20">
        <EmptyState title="Program not found" message="The program you are looking for does not exist." icon={<BookOpen size={28} />} />
        <div className="text-center mt-4">
          <Link to="/programs" className="btn-primary">Back to Programs</Link>
        </div>
      </div>
    );
  }

  const offerings = getOfferingsByProgram(program.id);
  const sorted = [...offerings].sort((a, b) => a.totalTuitionEstimate - b.totalTuitionEstimate);
  const cheapest = sorted[0];

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-700 to-accent-700 text-white">
        <div className="container-page py-12">
          <nav className="text-sm text-brand-200 mb-6">
            <Link to="/" className="hover:text-white">Home</Link> <span className="mx-1">/</span>
            <Link to="/programs" className="hover:text-white">Programs</Link> <span className="mx-1">/</span>
            <span className="text-white">{program.name}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <BookOpen size={28} />
            </div>
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium">{program.category}</span>
              <h1 className="text-3xl lg:text-4xl font-bold font-display mt-3">{program.name}</h1>
              <p className="mt-3 text-brand-100 max-w-2xl leading-relaxed">{program.description}</p>
              <div className="mt-5 flex flex-wrap gap-5 text-sm">
                <span><strong className="text-white">{program.offeringUniversityIds.length}</strong> universities offer this</span>
                <span>Avg credits: <strong className="text-white">{program.avgCredits}</strong></span>
                <span>Duration: <strong className="text-white">{program.avgDurationYears} years</strong></span>
                <span>Avg tuition: <strong className="text-white">{formatBDT(program.avgTuitionMin)} – {formatBDT(program.avgTuitionMax)}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-3">Program Overview</h2>
            <p className="text-ink-600 leading-relaxed">{program.description}</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-ink-50">
                <p className="text-2xl font-bold text-ink-900">{program.offeringUniversityIds.length}</p>
                <p className="text-xs text-ink-500">Universities</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-ink-50">
                <p className="text-2xl font-bold text-ink-900">{program.avgCredits}</p>
                <p className="text-xs text-ink-500">Avg Credits</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-ink-50">
                <p className="text-2xl font-bold text-ink-900">{program.avgDurationYears}</p>
                <p className="text-xs text-ink-500">Years</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-ink-50">
                <p className="text-2xl font-bold text-ink-900">{formatBDT(program.avgTuitionMin)}</p>
                <p className="text-xs text-ink-500">Min Tuition</p>
              </div>
            </div>
          </div>

          {/* Career opportunities */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><Briefcase size={20} className="text-brand-600" /> Career Opportunities</h2>
            <div className="flex flex-wrap gap-2">
              {program.careerOpportunities.map((c) => (
                <span key={c} className="chip-brand">{c}</span>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><GraduationCap size={20} className="text-brand-600" /> Universities Offering This Program</h2>
            {cheapest && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800">
                <strong>Best value:</strong> {getUniversityById(cheapest.universityId)?.name} offers the lowest estimated total tuition at {formatBDT(cheapest.totalTuitionEstimate)}.
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-left text-ink-500">
                    <th className="py-2 pr-3 font-medium">University</th>
                    <th className="py-2 px-3 font-medium">Credits</th>
                    <th className="py-2 px-3 font-medium">Tuition/Credit</th>
                    <th className="py-2 px-3 font-medium">Est. Total</th>
                    <th className="py-2 px-3 font-medium">Duration</th>
                    <th className="py-2 px-3 font-medium">Scholarship</th>
                    <th className="py-2 pl-3 font-medium">Compare</th>
                  </tr>
                </thead>
                <tbody>
                  {offerings.map((o) => {
                    const uni = getUniversityById(o.universityId);
                    if (!uni) return null;
                    const isCheapest = cheapest && o.id === cheapest.id;
                    return (
                      <tr key={o.id} className={`border-b border-ink-100 hover:bg-ink-50/50 ${isCheapest ? 'bg-emerald-50/40' : ''}`}>
                        <td className="py-3 pr-3">
                          <Link to={`/universities/${uni.slug}`} className="flex items-center gap-2 hover:text-brand-700">
                            <UniversityLogo uni={uni} size="sm" />
                            <span className="font-medium text-ink-800">{uni.shortName}</span>
                          </Link>
                        </td>
                        <td className="py-3 px-3">{o.totalCredits}</td>
                        <td className="py-3 px-3">{formatBDTFull(o.tuitionPerCredit)}</td>
                        <td className={`py-3 px-3 font-bold ${isCheapest ? 'text-emerald-700' : 'text-brand-700'}`}>
                          {formatBDT(o.totalTuitionEstimate)} {isCheapest && '✓'}
                        </td>
                        <td className="py-3 px-3">{o.durationYears} yrs</td>
                        <td className="py-3 px-3">{o.scholarshipAvailable ? <span className="chip-success text-[10px]">Yes</span> : <span className="chip-muted text-[10px]">No</span>}</td>
                        <td className="py-3 pl-3"><CompareButton universityId={uni.id} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admission requirements */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-3">General Admission Requirements</h2>
            <ul className="space-y-2 text-sm text-ink-600">
              {['HSC or equivalent with required GPA (varies by university)', 'Science background with Physics & Math for engineering programs', 'Some universities require an admission test', 'O/A Level students need equivalent qualifications', 'Application form, transcripts, and photos required'].map((r) => (
                <li key={r} className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5" /> {r}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/compare" className="btn-secondary w-full text-sm">Compare Universities</Link>
              <Link to="/calculator" className="btn-secondary w-full text-sm">Calculate Tuition</Link>
              <button onClick={() => setShowLead((v) => !v)} className="btn-primary w-full text-sm">
                <Award size={15} /> Request Information
              </button>
            </div>
          </div>
          {showLead && <LeadForm defaultProgramId={program.id} />}
          <div className="card p-5">
            <h3 className="font-semibold mb-3">Related Programs</h3>
            <div className="space-y-2">
              {programs.filter((p) => p.category === program.category && p.id !== program.id).slice(0, 4).map((p) => (
                <Link key={p.id} to={`/programs/${p.slug}`} className="flex items-center justify-between text-sm text-ink-700 hover:text-brand-700 group">
                  <span>{p.name}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
