import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen, Briefcase, GraduationCap, Award, ArrowRight, CheckCircle2,
  ChevronDown, ChevronUp, ExternalLink, Receipt, Info, Building2
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

  const offerings = program ? getOfferingsByProgram(program.id) : [];
  const sorted = [...offerings].sort((a, b) => a.totalTuitionEstimate - b.totalTuitionEstimate);
  const cheapest = sorted[0];

  const [expandedOfferings, setExpandedOfferings] = useState<Record<string, boolean>>(() => {
    return sorted[0] ? { [sorted[0].id]: true } : {};
  });

  const toggleOffering = (id: string) => {
    setExpandedOfferings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-700 to-accent-700 text-white w-full max-w-full">
        <div className="container-page py-6 sm:py-12 min-w-0 max-w-full">
          <nav className="text-xs sm:text-sm text-brand-200 mb-3 sm:mb-6 flex flex-wrap items-center gap-1 min-w-0 max-w-full">
            <Link to="/" className="hover:text-white shrink-0">Home</Link>
            <span className="text-brand-300">/</span>
            <Link to="/programs" className="hover:text-white shrink-0">Programs</Link>
            <span className="text-brand-300">/</span>
            <span className="text-white font-medium truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">{program.name}</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 min-w-0 max-w-full">
            <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <BookOpen size={20} className="sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0 flex-1 max-w-full">
              <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium">{program.category}</span>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold font-display mt-2 sm:mt-3 leading-tight break-words">{program.name}</h1>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-brand-100 max-w-2xl leading-relaxed break-words">{program.description}</p>
              <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm min-w-0 max-w-full">
                <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium break-words"><strong className="text-white">{program.offeringUniversityIds.length}</strong> universities offer this</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium break-words">Avg credits: <strong className="text-white">{program.avgCredits}</strong></span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium break-words">Duration: <strong className="text-white">{program.avgDurationYears} yrs</strong></span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium break-words">Avg tuition: <strong className="text-white">{formatBDT(program.avgTuitionMin)} – {formatBDT(program.avgTuitionMax)}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-6 sm:py-8 grid lg:grid-cols-3 gap-5 sm:gap-6 min-w-0 max-w-full">
        <div className="lg:col-span-2 space-y-5 sm:space-y-6 min-w-0 max-w-full">
          {/* Overview */}
          <div className="card p-3.5 sm:p-6 overflow-hidden min-w-0 max-w-full">
            <h2 className="text-base sm:text-xl font-bold mb-3 text-ink-900 leading-snug">Program Overview</h2>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed break-words">{program.description}</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 min-w-0 max-w-full">
              <div className="text-center p-2 sm:p-3 rounded-xl bg-ink-50 border border-ink-100 min-w-0 overflow-hidden">
                <p className="text-sm sm:text-2xl font-bold text-ink-900 truncate">{program.offeringUniversityIds.length}</p>
                <p className="text-[10px] sm:text-[11px] text-ink-500 font-medium truncate">Universities</p>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-xl bg-ink-50 border border-ink-100 min-w-0 overflow-hidden">
                <p className="text-sm sm:text-2xl font-bold text-ink-900 truncate">{program.avgCredits}</p>
                <p className="text-[10px] sm:text-[11px] text-ink-500 font-medium truncate">Avg Credits</p>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-xl bg-ink-50 border border-ink-100 min-w-0 overflow-hidden">
                <p className="text-sm sm:text-2xl font-bold text-ink-900 truncate">{program.avgDurationYears} yrs</p>
                <p className="text-[10px] sm:text-[11px] text-ink-500 font-medium truncate">Duration</p>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-xl bg-ink-50 border border-ink-100 min-w-0 overflow-hidden">
                <p className="text-sm sm:text-2xl font-bold text-ink-900 truncate">{formatBDT(program.avgTuitionMin)}</p>
                <p className="text-[10px] sm:text-[11px] text-ink-500 font-medium truncate">Min Tuition</p>
              </div>
            </div>
          </div>

          {/* Career opportunities */}
          <div className="card p-3.5 sm:p-6 overflow-hidden min-w-0 max-w-full">
            <h2 className="text-base sm:text-xl font-bold mb-3 flex items-center gap-2 text-ink-900 leading-snug">
              <Briefcase size={18} className="text-brand-600 shrink-0" />
              <span>Career Opportunities</span>
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 min-w-0 max-w-full">
              {program.careerOpportunities.map((c) => (
                <span key={c} className="inline-flex items-center bg-brand-50 text-brand-700 border border-brand-100 text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full max-w-full break-words">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Comparison table / Mobile list */}
          <div className="card p-3.5 sm:p-6 overflow-hidden min-w-0 max-w-full">
            <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4 flex items-start sm:items-center gap-2 text-ink-900 leading-snug">
              <GraduationCap size={20} className="text-brand-600 shrink-0 mt-0.5 sm:mt-0" />
              <span>Universities Offering This Program</span>
            </h2>
            {cheapest && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 leading-relaxed break-words">
                <strong>Best value:</strong> {getUniversityById(cheapest.universityId)?.name} offers the lowest estimated total tuition at {formatBDT(cheapest.totalTuitionEstimate)}.
              </div>
            )}

            {/* Mobile Card Layout */}
            <div className="space-y-3 sm:hidden min-w-0 max-w-full">
              {offerings.map((o) => {
                const uni = getUniversityById(o.universityId);
                if (!uni) return null;
                const isCheapest = cheapest && o.id === cheapest.id;
                return (
                  <div
                    key={o.id}
                    className={`p-3.5 rounded-2xl border min-w-0 max-w-full ${
                      isCheapest ? 'bg-emerald-50/60 border-emerald-300' : 'bg-ink-50/50 border-ink-200/80'
                    } space-y-3 overflow-hidden`}
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <Link to={`/universities/${uni.slug}`} className="flex items-center gap-2 hover:text-brand-700 min-w-0 flex-1 overflow-hidden">
                        <UniversityLogo uni={uni} size="sm" />
                        <span className="font-bold text-ink-900 text-xs sm:text-sm truncate">{uni.name} ({uni.shortName})</span>
                      </Link>
                      {isCheapest && <span className="chip-emerald text-[10px] shrink-0 whitespace-nowrap">Best Value</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs min-w-0">
                      <div className="p-2 rounded-xl bg-white border border-ink-100 min-w-0 overflow-hidden">
                        <p className="text-[9px] font-bold text-ink-400 uppercase truncate">Est. Total</p>
                        <p className={`font-bold text-xs truncate ${isCheapest ? 'text-emerald-700' : 'text-brand-700'}`}>{formatBDT(o.totalTuitionEstimate)}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-ink-100 min-w-0 overflow-hidden">
                        <p className="text-[9px] font-bold text-ink-400 uppercase truncate">Tuition / Credit</p>
                        <p className="font-bold text-xs text-ink-800 truncate">{formatBDTFull(o.tuitionPerCredit)}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-ink-100 min-w-0 overflow-hidden">
                        <p className="text-[9px] font-bold text-ink-400 uppercase truncate">Credits / Duration</p>
                        <p className="font-bold text-xs text-ink-800 truncate">{o.totalCredits} cr • {o.durationYears} yrs</p>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-ink-100 min-w-0 overflow-hidden">
                        <p className="text-[9px] font-bold text-ink-400 uppercase truncate">Scholarship</p>
                        <p className="font-bold text-xs text-ink-800 truncate">{o.scholarshipAvailable ? 'Available' : 'No'}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-ink-200/60 gap-2 min-w-0">
                      <div className="text-[11px] text-ink-500 font-medium truncate">
                        Degree: <span className="text-ink-800 font-semibold">{o.degree}</span>
                      </div>
                      <CompareButton offeringId={o.id} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto no-scrollbar">
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
                        <td className="py-3 pl-3"><CompareButton offeringId={o.id} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Subject & Fee Breakdown per University (Exact Layout from Reference Image) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-ink-900 flex items-center gap-2">
                  <Receipt size={20} className="text-brand-600 shrink-0" />
                  <span>Itemized Fee Breakdown by University</span>
                </h2>
                <p className="text-xs text-ink-500 mt-0.5">
                  Complete breakdown of tuition, admission, term charges, and lab fees per university
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {offerings.map((o) => {
                const uni = getUniversityById(o.universityId);
                if (!uni) return null;
                const isExpanded = !!expandedOfferings[o.id];
                const isCheapest = cheapest && o.id === cheapest.id;

                const admissionFee = o.admissionFee || 25000;
                const verificationFee = o.otherFees || 2000;
                const termActivityFee = o.semesterFee || 12500;
                const labFee = o.labFee || 2500;
                const computedTotal = o.totalTuitionEstimate;

                return (
                  <div
                    key={o.id}
                    className="card overflow-hidden border border-ink-200/90 shadow-sm transition-all"
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => toggleOffering(o.id)}
                      className="p-4 sm:p-5 bg-white hover:bg-ink-50/50 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink-100"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            to={`/universities/${uni.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 font-bold text-ink-900 hover:text-brand-700"
                          >
                            <UniversityLogo uni={uni} size="sm" />
                            <span>{uni.name}</span>
                          </Link>
                          {isCheapest && <span className="chip-emerald text-[10px]">Best Value</span>}
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-ink-900 mt-1">
                          {o.degree} in {program.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-xs text-ink-500 font-medium">Local</span>
                          <span className="text-ink-300">•</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-brand-50 text-brand-700 border border-brand-200">
                            Per credit
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-ink-100 text-ink-700 border border-ink-200">
                            Effective: FALL_2026
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink-100">
                        <div className="text-right">
                          <span className="text-xs text-ink-500 font-medium block">Total Estimate</span>
                          <span className="text-base sm:text-xl font-bold text-ink-900 font-display">
                            {formatBDTFull(computedTotal)}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-800 transition"
                          aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Breakdown Body */}
                    {isExpanded && (
                      <div className="p-4 sm:p-6 bg-white space-y-6">
                        {/* Summary key-value rows */}
                        <div className="divide-y divide-ink-100 text-xs sm:text-sm">
                          <div className="py-2.5 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                            <span className="font-semibold text-ink-500 sm:col-span-1">Applies to</span>
                            <span className="text-ink-800 sm:col-span-3">
                              Incoming freshmen, transferees and readmissions from the Fall 2026-27 semester (fee page: 'Effective from FALL 2026-27 Semester')
                            </span>
                          </div>
                          <div className="py-2.5 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                            <span className="font-semibold text-ink-500 sm:col-span-1">Per credit</span>
                            <span className="text-ink-800 font-bold sm:col-span-3">
                              {formatBDTFull(o.tuitionPerCredit)}
                            </span>
                          </div>
                          <div className="py-2.5 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                            <span className="font-semibold text-ink-500 sm:col-span-1">Credits</span>
                            <span className="text-ink-800 font-bold sm:col-span-3">
                              {o.totalCredits}
                            </span>
                          </div>
                          <div className="py-2.5 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                            <span className="font-semibold text-ink-500 sm:col-span-1">Admission fee</span>
                            <span className="text-ink-800 font-bold sm:col-span-3">
                              {formatBDTFull(admissionFee)}
                            </span>
                          </div>
                          <div className="py-2.5 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                            <span className="font-semibold text-ink-500 sm:col-span-1">Computed total</span>
                            <span className="text-ink-900 font-bold sm:col-span-3 text-sm sm:text-base">
                              {formatBDTFull(computedTotal)}
                            </span>
                          </div>
                          <div className="py-2.5 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 items-center">
                            <span className="font-semibold text-ink-500 sm:col-span-1">Fee page</span>
                            <span className="sm:col-span-3">
                              <a
                                href={uni.website ? (uni.website.startsWith('http') ? uni.website : `https://${uni.website}`) : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-600 hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                <span>{uni.website || `www.${uni.slug}.edu/tuition-fee`}</span>
                                <ExternalLink size={13} />
                              </a>
                            </span>
                          </div>
                        </div>

                        {/* FEE LINES Section */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-3">
                            Fee Lines
                          </h4>
                          <div className="overflow-x-auto rounded-xl border border-ink-100 bg-ink-50/30">
                            <table className="w-full text-xs sm:text-sm">
                              <thead>
                                <tr className="border-b border-ink-200/80 text-left text-ink-500 font-semibold uppercase text-[11px] tracking-wider bg-ink-50/80">
                                  <th className="py-2.5 px-3 sm:px-4">Item</th>
                                  <th className="py-2.5 px-3 sm:px-4">Category</th>
                                  <th className="py-2.5 px-3 sm:px-4">Amount</th>
                                  <th className="py-2.5 px-3 sm:px-4">Frequency</th>
                                  <th className="py-2.5 px-3 sm:px-4"></th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-ink-100">
                                <tr>
                                  <td className="py-2.5 px-3 sm:px-4 font-medium text-ink-800">Admission</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Admission</td>
                                  <td className="py-2.5 px-3 sm:px-4 font-bold text-ink-800">{formatBDTFull(admissionFee)}</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">One-time</td>
                                  <td className="py-2.5 px-3 sm:px-4"></td>
                                </tr>
                                <tr>
                                  <td className="py-2.5 px-3 sm:px-4 font-medium text-ink-800">Verification</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Verification</td>
                                  <td className="py-2.5 px-3 sm:px-4 font-bold text-ink-800">{formatBDTFull(verificationFee)}</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">One-time</td>
                                  <td className="py-2.5 px-3 sm:px-4"></td>
                                </tr>
                                <tr>
                                  <td className="py-2.5 px-3 sm:px-4 font-medium text-ink-800">Student activity</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Student activity</td>
                                  <td className="py-2.5 px-3 sm:px-4 font-bold text-ink-800">{formatBDTFull(termActivityFee)}</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Per term</td>
                                  <td className="py-2.5 px-3 sm:px-4"></td>
                                </tr>
                                <tr>
                                  <td className="py-2.5 px-3 sm:px-4 font-medium text-ink-800">Tuition Fee</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Tuition</td>
                                  <td className="py-2.5 px-3 sm:px-4 font-bold text-ink-800">{formatBDTFull(o.tuitionPerCredit)}</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Per credit ({o.totalCredits} cr)</td>
                                  <td className="py-2.5 px-3 sm:px-4"></td>
                                </tr>
                                <tr>
                                  <td className="py-2.5 px-3 sm:px-4 font-medium text-ink-800">Lab & Practical</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Lab</td>
                                  <td className="py-2.5 px-3 sm:px-4 font-bold text-ink-800">{formatBDTFull(labFee)}</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Per course</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-right">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                      Not included in total
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-2.5 px-3 sm:px-4 font-medium text-ink-800">Computer & Simulation Lab</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Lab</td>
                                  <td className="py-2.5 px-3 sm:px-4 font-bold text-ink-800">৳2,000</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-ink-600">Per course</td>
                                  <td className="py-2.5 px-3 sm:px-4 text-right">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                      Not included in total
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="pt-2 text-xs text-ink-600 leading-relaxed border-t border-ink-100 flex gap-2">
                          <span className="font-bold text-ink-700 shrink-0">Notes:</span>
                          <span>
                            Lab and studio fees are listed on the official fee schedule as 'Applicable as per curriculum' depending on practical coursework taken each semester. The Student Activities and Facilities Fee is charged per regular semester. Each optional Summer semester a student registers for follows standard credit fees.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Admission requirements */}
          <div className="card p-3.5 sm:p-6 min-w-0 max-w-full">
            <h2 className="text-base sm:text-xl font-bold mb-3 text-ink-900 leading-snug">General Admission Requirements</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-600 min-w-0 max-w-full">
              {['HSC or equivalent with required GPA (varies by university)', 'Science background with Physics & Math for engineering programs', 'Some universities require an admission test', 'O/A Level students need equivalent qualifications', 'Application form, transcripts, and photos required'].map((r) => (
                <li key={r} className="flex items-start gap-2 min-w-0"><CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" /> <span className="leading-relaxed min-w-0 break-words flex-1">{r}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 min-w-0 max-w-full">
          <div className="card p-4 sm:p-5 min-w-0 max-w-full">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-ink-900">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/compare" className="btn-secondary w-full text-xs sm:text-sm">Compare Universities</Link>
              <Link to="/calculator" className="btn-secondary w-full text-xs sm:text-sm">Calculate Tuition</Link>
              <button onClick={() => setShowLead((v) => !v)} className="btn-primary w-full text-xs sm:text-sm">
                <Award size={15} /> Request Information
              </button>
            </div>
          </div>
          {showLead && <LeadForm defaultProgramId={program.id} />}
          <div className="card p-4 sm:p-5 min-w-0 max-w-full">
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-ink-900">Related Programs</h3>
            <div className="space-y-2 min-w-0">
              {programs.filter((p) => p.category === program.category && p.id !== program.id).slice(0, 4).map((p) => (
                <Link key={p.id} to={`/programs/${p.slug}`} className="flex items-center justify-between text-xs sm:text-sm text-ink-700 hover:text-brand-700 group py-1 min-w-0">
                  <span className="truncate pr-2 flex-1 min-w-0">{p.name}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
