import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GitCompare, X, Trophy, ArrowRight, School, Clock, CreditCard,
  BookOpen, Check, Shield, Plus, TrendingDown, Sparkles,
  Building2, MapPin, GraduationCap,
} from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import {
  getOfferingById, getProgramById, getUniversityById,
  formatBDT, formatBDTFull, programs, programOfferings,
} from '@/data/sampleData';
import { EmptyState, UniversityLogo } from '@/components/ui';

type Offering = NonNullable<ReturnType<typeof getOfferingById>>;
type Program = NonNullable<ReturnType<typeof getProgramById>>;

export default function ComparePage() {
  const { selectedOfferingIds, removeOffering, clear, count } = useCompare();
  const navigate = useNavigate();

  const offerings = selectedOfferingIds
    .map((id) => getOfferingById(id))
    .filter(Boolean) as Offering[];

  const grouped = useMemo(() => {
    const map = new Map<string, Offering[]>();
    offerings.forEach((o) => {
      const arr = map.get(o.programId) ?? [];
      arr.push(o);
      map.set(o.programId, arr);
    });
    return Array.from(map.entries()).map(([programId, list]) => ({
      program: getProgramById(programId),
      offerings: list,
    })).filter((g): g is { program: Program; offerings: Offering[] } => !!g.program);
  }, [offerings]);

  // Offerings from same program category (not in selection) that user can add
  const suggestedOfferings = useMemo(() => {
    const programIds = new Set(offerings.map((o) => o.programId));
    const categories = new Set(
      Array.from(programIds).map((id) => getProgramById(id)?.category).filter(Boolean) as string[],
    );
    return programOfferings
      .filter((o) => !selectedOfferingIds.includes(o.id))
      .filter((o) => {
        const prog = getProgramById(o.programId);
        return prog && (programIds.has(o.programId) || categories.has(prog.category));
      })
      .slice(0, 8);
  }, [offerings, selectedOfferingIds]);

  if (offerings.length === 0) {
    return <SubjectComparisonView />;
  }

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 flex items-center gap-2.5">
            <span className="h-9 w-9 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <GitCompare size={18} />
            </span>
            Compare Programs by Facilities
          </h1>
          <p className="text-ink-500 mt-2 text-sm sm:text-base">
            Side-by-side comparison of {offerings.length} program{offerings.length > 1 ? 's' : ''} — ranked by facilities, cost &amp; requirements.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={clear} className="btn-ghost text-sm">Clear all</button>
        </div>
      </div>

      {/* Program groups */}
      <div className="space-y-10 sm:space-y-12">
        {grouped.length === 0 && (
          <div className="card p-8">
            <p className="text-ink-600 text-center">No offerings loaded.</p>
          </div>
        )}
        {grouped.map(({ program, offerings: list }) => (
          <ProgramCompareGroup key={program.id} program={program} offerings={list} onRemove={removeOffering} />
        ))}
      </div>

      {/* Cross-program facilities comparison (when more than 1 program type selected) */}
      {grouped.length > 1 && (
        <section className="mt-10 sm:mt-14">
          <div className="section-header mb-6">
            <span className="section-eyebrow"><Sparkles size={13} /> Cross-Program</span>
            <h2 className="section-title text-2xl sm:text-3xl">All Selected Programs Overview</h2>
          </div>
          <OverviewTable offerings={offerings} onRemove={removeOffering} />
        </section>
      )}

      {/* Suggest more similar programs */}
      {suggestedOfferings.length > 0 && (
        <section className="mt-10 sm:mt-14">
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <span className="section-eyebrow"><Plus size={13} /> Add Similar</span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-900 mt-2">Suggested programs to compare</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedOfferings.map((o) => {
              const prog = getProgramById(o.programId)!;
              const uni = getUniversityById(o.universityId)!;
              const selected = selectedOfferingIds.includes(o.id);
              return (
                <div key={o.id} className="card p-4 sm:p-5 flex flex-col gap-3 hover:shadow-card-hover transition-shadow">
                  <div className="flex items-start gap-3">
                    <UniversityLogo uni={uni} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink-900 leading-tight line-clamp-2">{prog.name}</p>
                      <p className="text-xs text-ink-500 mt-0.5">{uni.shortName} • {o.degree}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-ink-600">
                    <span className="flex items-center gap-1"><Clock size={12} /> {o.durationYears} yrs</span>
                    <span className="flex items-center gap-1"><CreditCard size={12} /> {o.totalCredits} cr</span>
                  </div>
                  <div className="text-brand-700 font-bold text-lg">
                    {formatBDT(o.totalTuitionEstimate)}
                  </div>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-xs text-ink-500">{o.facilities.length} facilities</span>
                    <button
                      onClick={() => selected ? removeOffering(o.id) : navigate(`/universities/${uni.slug}`)}
                      className={`btn text-xs !px-3 !py-1.5 ${selected ? '!bg-brand-600 !text-white' : '!bg-brand-50 !text-brand-700 !border-brand-200'}`}
                    >
                      {selected ? '✓ Added' : 'View Uni'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-10 text-center">
        <Link to="/universities" className="btn-secondary">Browse more programs</Link>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   PROGRAM COMPARE GROUP — same program across universities
----------------------------------------------------------- */
function ProgramCompareGroup({
  program, offerings, onRemove,
}: { program: Program; offerings: Offering[]; onRemove: (id: string) => void }) {
  // Compute best values per numeric row
  const bestTuition = offerings.reduce((min, o) => (o.totalTuitionEstimate < min.totalTuitionEstimate ? o : min));
  const bestFacilities = offerings.reduce((max, o) => (o.facilities.length > max.facilities.length ? o : max));
  const bestCredits = offerings.reduce((min, o) => (o.totalCredits < min.totalCredits ? o : min));

  // Union of all facilities across the programs in this group
  const allFacilities = Array.from(new Set(offerings.flatMap((o) => o.facilities)));

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="chip-primary"><BookOpen size={12} /> {program.category}</span>
            <span className="chip-muted">{offerings.length} offering{offerings.length > 1 ? 's' : ''}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">{program.name}</h2>
          <p className="text-ink-500 mt-2 text-sm sm:text-base max-w-2xl">{program.description}</p>
        </div>
      </div>

      <div className="card overflow-hidden !p-0">
        {/* Cards header row */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-ink-50 to-brand-50/40">
                <th className="text-left p-4 sm:p-5 font-semibold text-ink-600 sticky left-0 bg-ink-50 z-10 min-w-[160px] border-r border-ink-100">
                  Criteria
                </th>
                {offerings.map((o) => {
                  const uni = getUniversityById(o.universityId)!;
                  const isBestFacility = bestFacilities.id === o.id;
                  return (
                    <th key={o.id} className="p-4 sm:p-5 text-left min-w-[240px] border-r border-ink-100 last:border-r-0">
                      <div className="flex items-start gap-3">
                        <UniversityLogo uni={uni} size="sm" />
                        <div className="flex-1 min-w-0">
                          <Link to={`/universities/${uni.slug}`} className="font-bold text-ink-900 hover:text-brand-700 block leading-tight">
                            {uni.shortName}
                          </Link>
                          <p className="text-xs text-ink-500 mt-0.5 flex items-center gap-1.5">
                            <Building2 size={11} /> {uni.name}
                          </p>
                          <p className="text-[11px] text-ink-400 mt-0.5 flex items-center gap-1.5">
                            <MapPin size={10} /> {uni.location}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemove(o.id)}
                          className="text-ink-400 hover:text-rose-600 shrink-0"
                          aria-label="Remove"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      {isBestFacility && offerings.length > 1 && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emeraldAccent-50 text-emeraldAccent-700 border border-emeraldAccent-200 rounded-full px-2.5 py-1">
                          <Trophy size={12} /> Best Facilities
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {/* University info */}
              <InfoRow label="University" offerings={offerings} getValue={(o) => {
                const uni = getUniversityById(o.universityId)!;
                return <span className="font-semibold">{uni.shortName}</span>;
              }} />
              <InfoRow label="Degree" offerings={offerings} getValue={(o) => o.degree} />
              <InfoRow label="Est. University" offerings={offerings} getValue={(o) => {
                const uni = getUniversityById(o.universityId)!;
                return <>Est. {uni.established}</>;
              }} />

              {/* Duration */}
              <InfoRow
                label="Duration"
                offerings={offerings}
                getValue={(o) => (
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Clock size={14} className="text-ink-400" /> {o.durationYears} yrs
                  </span>
                )}
              />

              {/* Credits */}
              <InfoRow
                label="Total Credits"
                offerings={offerings}
                getValue={(o) => `${o.totalCredits} credits`}
                numeric={(o) => o.totalCredits}
                bestIsLow
                highlightId={bestCredits.id}
              />

              {/* Tuition per credit */}
              <InfoRow
                label="Per Credit Fee"
                offerings={offerings}
                getValue={(o) => formatBDTFull(o.tuitionPerCredit)}
                numeric={(o) => o.tuitionPerCredit}
                bestIsLow
              />

              {/* Admission + semester fees */}
              <InfoRow
                label="Admission Fee"
                offerings={offerings}
                getValue={(o) => formatBDTFull(o.admissionFee)}
                numeric={(o) => o.admissionFee}
                bestIsLow
              />
              <InfoRow
                label="Other Fees / Sem"
                offerings={offerings}
                getValue={(o) => formatBDTFull(o.labFee + o.otherFees + o.semesterFee)}
                numeric={(o) => o.labFee + o.otherFees + o.semesterFee}
                bestIsLow
              />

              {/* Total tuition */}
              <InfoRow
                label="Est. Total Tuition"
                offerings={offerings}
                getValue={(o) => formatBDTFull(o.totalTuitionEstimate)}
                numeric={(o) => o.totalTuitionEstimate}
                bestIsLow
                highlightId={bestTuition.id}
                formatBest={(node) => (
                  <span className="inline-flex items-center gap-1.5">
                    {node}
                    <span className="text-[10px] font-bold text-emeraldAccent-700 bg-emeraldAccent-50 rounded-full px-2 py-0.5 border border-emeraldAccent-200 flex items-center gap-1">
                      <TrendingDown size={11} /> Cheapest
                    </span>
                  </span>
                )}
              />

              {/* Scholarship */}
              <InfoRow
                label="Scholarship"
                offerings={offerings}
                getValue={(o) => (
                  o.scholarshipAvailable
                    ? <span className="inline-flex items-center gap-1 text-emeraldAccent-700 font-semibold"><Check size={14} /> Available</span>
                    : <span className="text-ink-400">Not available</span>
                )}
              />

              {/* Admission Requirements */}
              <tr className="bg-ink-50/40">
                <td className="p-4 sm:p-5 sticky left-0 bg-ink-50/40 z-10 align-top border-r border-ink-100">
                  <span className="font-semibold text-ink-600 flex items-center gap-2">
                    <GraduationCap size={15} /> Admission Requirements
                  </span>
                </td>
                {offerings.map((o) => (
                  <td key={o.id} className="p-4 sm:p-5 align-top border-r border-ink-100 last:border-r-0">
                    <ul className="space-y-1.5">
                      {o.admissionRequirements.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-ink-700">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Facilities row — core of the comparison */}
              <tr className="bg-white">
                <td className="p-4 sm:p-5 sticky left-0 bg-white z-10 align-top border-r border-ink-100">
                  <div className="flex items-start gap-2">
                    <Shield size={15} className="mt-0.5 text-brand-600 shrink-0" />
                    <div>
                      <span className="font-semibold text-ink-600 block">Facilities</span>
                      <span className="text-xs text-ink-400 mt-1 block">Program-specific labs, centers &amp; amenities</span>
                    </div>
                  </div>
                </td>
                {offerings.map((o) => {
                  const isBest = bestFacilities.id === o.id && offerings.length > 1;
                  return (
                    <td key={o.id} className={`p-4 sm:p-5 align-top border-r border-ink-100 last:border-r-0 ${isBest ? 'bg-emeraldAccent-50/40' : ''}`}>
                      <div className="mb-2.5 flex items-center gap-2">
                        <span className={`chip font-semibold ${
                          isBest ? 'bg-emeraldAccent-600 !text-white border-emeraldAccent-600' : 'bg-brand-50 text-brand-700 border-brand-200'
                        }`}>
                          {o.facilities.length} facilities
                        </span>
                        {isBest && <span className="text-[11px] font-bold text-emeraldAccent-700">Most equipped</span>}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {allFacilities.map((f) => {
                          const has = o.facilities.includes(f);
                          return (
                            <span
                              key={f}
                              className={`text-[11px] sm:text-xs inline-flex items-center gap-1 px-2 py-1 rounded-lg border transition-colors ${
                                has
                                  ? 'bg-white text-ink-800 border-ink-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]'
                                  : 'bg-ink-50 text-ink-300 border-ink-100 !opacity-60'
                              }`}
                            >
                              {has ? <Check size={11} className="text-emeraldAccent-600" /> : <span className="w-[11px] h-[11px] rounded-sm bg-ink-200" />}
                              {f}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Summary action row */}
              <tr className="bg-ink-50/70">
                <td className="p-4 sm:p-5 sticky left-0 bg-ink-50/70 z-10 border-r border-ink-100"></td>
                {offerings.map((o) => {
                  const uni = getUniversityById(o.universityId)!;
                  return (
                    <td key={o.id} className="p-4 sm:p-5 border-r border-ink-100 last:border-r-0">
                      <Link to={`/universities/${uni.slug}`} className="btn-primary text-xs w-full">
                        View Profile <ArrowRight size={13} />
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Verdict */}
      {offerings.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VerdictCard
            title="Best Value"
            icon={<TrendingDown className="text-emeraldAccent-600" size={18} />}
            color="from-emeraldAccent-50 to-white border-emeraldAccent-200"
          >
            {(() => {
              const uni = getUniversityById(bestTuition.universityId)!;
              return <>
                <p className="font-bold text-ink-900 text-lg">{uni.shortName} {program.name.split(' ')[0]}</p>
                <p className="text-sm text-ink-600 mt-1">
                  Total {formatBDTFull(bestTuition.totalTuitionEstimate)} — saves{' '}
                  <b className="text-emeraldAccent-700">
                    {formatBDT(Math.max(...offerings.map(o => o.totalTuitionEstimate)) - bestTuition.totalTuitionEstimate)}
                  </b> vs. most expensive.
                </p>
              </>;
            })()}
          </VerdictCard>
          <VerdictCard
            title="Best Facilities"
            icon={<Trophy className="text-amber-600" size={18} />}
            color="from-amber-50 to-white border-amber-200"
          >
            {(() => {
              const uni = getUniversityById(bestFacilities.universityId)!;
              return <>
                <p className="font-bold text-ink-900 text-lg">{uni.shortName} {program.name.split(' ')[0]}</p>
                <p className="text-sm text-ink-600 mt-1">
                  {bestFacilities.facilities.length} program facilities — includes{' '}
                  <b className="text-amber-700">{bestFacilities.facilities.slice(0, 2).join(', ')}</b>
                  {bestFacilities.facilities.length > 2 && `, +${bestFacilities.facilities.length - 2} more`}.
                </p>
              </>;
            })()}
          </VerdictCard>
          <VerdictCard
            title="Fastest Track"
            icon={<Clock className="text-brand-600" size={18} />}
            color="from-brand-50 to-white border-brand-200"
          >
            {(() => {
              const uni = getUniversityById(bestCredits.universityId)!;
              return <>
                <p className="font-bold text-ink-900 text-lg">{uni.shortName} {program.name.split(' ')[0]}</p>
                <p className="text-sm text-ink-600 mt-1">
                  Only {bestCredits.totalCredits} credits required —{' '}
                  <b className="text-brand-700">
                    {Math.max(...offerings.map(o => o.totalCredits)) - bestCredits.totalCredits} credits less
                  </b> than the highest.
                </p>
              </>;
            })()}
          </VerdictCard>
        </div>
      )}
    </section>
  );
}

/* -----------------------------------------------------------
   Reusable table row
----------------------------------------------------------- */
function InfoRow({
  label, offerings, getValue, numeric, bestIsLow, highlightId, formatBest,
}: {
  label: string;
  offerings: Offering[];
  getValue: (o: Offering) => React.ReactNode;
  numeric?: (o: Offering) => number;
  bestIsLow?: boolean;
  highlightId?: string;
  formatBest?: (node: React.ReactNode) => React.ReactNode;
}) {
  const best = useMemo(() => {
    if (!numeric) return null;
    return offerings.reduce((best, o) => {
      const v = numeric!(o), b = numeric!(best);
      return bestIsLow ? (v < b ? o : best) : (v > b ? o : best);
    });
  }, [offerings, numeric, bestIsLow]);

  return (
    <tr>
      <td className="p-4 sm:p-5 font-medium text-ink-600 sticky left-0 bg-inherit z-10 border-r border-ink-100">
        {label}
      </td>
      {offerings.map((o) => {
        const isBest = best?.id === o.id || highlightId === o.id;
        const node = getValue(o);
        return (
          <td
            key={o.id}
            className={`p-4 sm:p-5 border-r border-ink-100 last:border-r-0 ${isBest ? 'bg-emeraldAccent-50/50' : ''}`}
          >
            <div className={`flex items-center gap-1.5 ${isBest ? 'font-bold text-emeraldAccent-800' : 'text-ink-800'}`}>
              {isBest && formatBest ? formatBest(node) : (
                <>
                  {node}
                  {isBest && offerings.length > 1 && (
                    <Trophy size={13} className="text-emeraldAccent-600 shrink-0" />
                  )}
                </>
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
}

/* -----------------------------------------------------------
   Verdict card
----------------------------------------------------------- */
function VerdictCard({
  title, icon, color, children,
}: { title: string; icon: React.ReactNode; color: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} border p-5 shadow-card`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center shadow-sm border border-white">
          {icon}
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* -----------------------------------------------------------
   Cross-program overview table (multi-program compare)
----------------------------------------------------------- */
function OverviewTable({ offerings, onRemove }: { offerings: Offering[]; onRemove: (id: string) => void }) {
  const bestFacilities = offerings.reduce((a, b) => (a.facilities.length > b.facilities.length ? a : b));
  const bestTuition = offerings.reduce((a, b) => (a.totalTuitionEstimate < b.totalTuitionEstimate ? a : b));
  return (
    <div className="card overflow-hidden !p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-50">
              <th className="p-4 text-left font-semibold text-ink-600 sticky left-0 bg-ink-50 z-10 min-w-[180px]">Program</th>
              {offerings.map((o) => {
                const uni = getUniversityById(o.universityId)!;
                const prog = getProgramById(o.programId)!;
                return (
                  <th key={o.id} className="p-4 text-left min-w-[220px] border-l border-ink-100">
                    <div className="flex items-start gap-3">
                      <UniversityLogo uni={uni} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-ink-900 leading-tight">{prog.name}</p>
                        <p className="text-xs text-ink-500 mt-0.5">{uni.shortName} • {o.degree}</p>
                      </div>
                      <button onClick={() => onRemove(o.id)} className="text-ink-400 hover:text-rose-600">
                        <X size={16} />
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            <tr>
              <td className="p-4 font-semibold text-ink-600 sticky left-0 bg-inherit z-10">Facilities</td>
              {offerings.map((o) => {
                const isBest = o.id === bestFacilities.id;
                return (
                  <td key={o.id} className={`p-4 border-l border-ink-100 ${isBest ? 'bg-emeraldAccent-50/50' : ''}`}>
                    <div className={`flex items-center gap-1.5 ${isBest ? 'font-bold text-emeraldAccent-800' : 'text-ink-800'}`}>
                      <Shield size={14} className={isBest ? 'text-emeraldAccent-600' : 'text-ink-400'} />
                      {o.facilities.length} facilities
                      {isBest && <Trophy size={13} className="text-emeraldAccent-600" />}
                    </div>
                    <p className="mt-1.5 text-[11px] text-ink-500 line-clamp-2">{o.facilities.slice(0, 3).join(' • ')}{o.facilities.length > 3 && ` +${o.facilities.length - 3}`}</p>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-ink-600 sticky left-0 bg-inherit z-10">Total Tuition</td>
              {offerings.map((o) => {
                const isBest = o.id === bestTuition.id;
                return (
                  <td key={o.id} className={`p-4 border-l border-ink-100 ${isBest ? 'bg-emeraldAccent-50/50' : ''}`}>
                    <div className={`flex items-center gap-1.5 ${isBest ? 'font-bold text-emeraldAccent-800' : 'text-ink-800'}`}>
                      {formatBDTFull(o.totalTuitionEstimate)}
                      {isBest && <Trophy size={13} className="text-emeraldAccent-600" />}
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-ink-600 sticky left-0 bg-inherit z-10">Duration / Credits</td>
              {offerings.map((o) => (
                <td key={o.id} className="p-4 border-l border-ink-100 text-ink-700">
                  {o.durationYears} yrs • {o.totalCredits} cr
                </td>
              ))}
            </tr>
            <tr className="bg-ink-50/50">
              <td className="p-4 sticky left-0 bg-ink-50/50 z-10"></td>
              {offerings.map((o) => {
                const uni = getUniversityById(o.universityId)!;
                return (
                  <td key={o.id} className="p-4 border-l border-ink-100">
                    <Link to={`/universities/${uni.slug}`} className="btn-secondary text-xs w-full">
                      View <ArrowRight size={12} />
                    </Link>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dummy use of School icon to prevent unused-import warnings (kept for future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _SchoolIcon = School;

/* -----------------------------------------------------------
   SUBJECT COMPARISON VIEW (Default View)
----------------------------------------------------------- */
function SubjectComparisonView() {
  const availablePrograms = useMemo(() => {
    // Only show programs that have at least one offering
    return programs.filter((p) => programOfferings.some((o) => o.programId === p.id));
  }, []);

  const [selectedProgramId, setSelectedProgramId] = useState(availablePrograms[0]?.id || '');

  const selectedProgram = getProgramById(selectedProgramId);
  const currentOfferings = useMemo(() => {
    return programOfferings.filter((o) => o.programId === selectedProgramId);
  }, [selectedProgramId]);

  if (!selectedProgram) return null;

  return (
    <div className="container-page py-10 sm:py-16">
      {/* Subject Selection */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">Compare Programs by Subject</h1>
          <p className="text-ink-500 mt-1">Select a subject to see a complete cost breakdown across universities.</p>
        </div>
        <div className="min-w-[240px]">
          <select
            className="input-field w-full bg-white shadow-sm"
            value={selectedProgramId}
            onChange={(e) => setSelectedProgramId(e.target.value)}
          >
            {availablePrograms.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* The Table */}
      <div className="card overflow-hidden !p-0 border border-ink-200 shadow-sm rounded-2xl">
        <div className="p-5 sm:p-6 border-b border-ink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <div>
            <h2 className="text-lg font-bold text-ink-900 tracking-tight">Complete Cost Breakdown by Program</h2>
            <p className="text-sm text-ink-500 mt-0.5">All figures in BDT unless otherwise noted</p>
          </div>
          <span className="text-sm font-semibold text-emeraldAccent-700 bg-emeraldAccent-50 px-3 py-1 rounded-full border border-emeraldAccent-100">
            {currentOfferings.length} Programs
          </span>
        </div>
        
        <div className="overflow-x-auto bg-white">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-ink-100 text-ink-500">
                <th className="py-4 px-5 font-medium whitespace-nowrap">
                  Program <span className="font-bold text-ink-900 ml-1">{selectedProgram.slug.toUpperCase()}</span>
                </th>
                <th className="py-4 px-5 font-medium whitespace-nowrap">Degree</th>
                <th className="py-4 px-5 font-medium whitespace-nowrap">Duration</th>
                <th className="py-4 px-5 font-medium whitespace-nowrap">Credits</th>
                <th className="py-4 px-5 font-medium whitespace-nowrap">Per Credit</th>
                <th className="py-4 px-5 font-medium whitespace-nowrap">Admission</th>
                <th className="py-4 px-5 font-medium whitespace-nowrap">Other/Sem</th>
                <th className="py-4 px-5 font-medium whitespace-nowrap text-right">Est. Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {currentOfferings.map((o) => {
                const uni = getUniversityById(o.universityId);
                if (!uni) return null;
                const otherPerSem = o.labFee + o.otherFees + o.semesterFee;
                
                return (
                  <tr key={o.id} className="hover:bg-ink-50/50 transition-colors">
                    <td className="py-5 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Link to={`/universities/${uni.slug}`} className="font-semibold text-ink-900 text-base hover:text-brand-600 transition-colors">
                          {uni.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-5 px-5 font-medium text-ink-700 whitespace-nowrap">{o.degree}</td>
                    <td className="py-5 px-5 text-ink-600 whitespace-nowrap">{o.durationYears} yrs</td>
                    <td className="py-5 px-5 font-medium text-ink-800 whitespace-nowrap">{o.totalCredits}</td>
                    <td className="py-5 px-5 text-ink-600 whitespace-nowrap">{formatBDTFull(o.tuitionPerCredit)}</td>
                    <td className="py-5 px-5 text-ink-600 whitespace-nowrap">{formatBDTFull(o.admissionFee)}</td>
                    <td className="py-5 px-5 text-ink-600 whitespace-nowrap">{formatBDTFull(otherPerSem)}</td>
                    <td className="py-5 px-5 text-right whitespace-nowrap">
                      <span className="inline-flex items-center justify-center font-bold text-emeraldAccent-800 bg-emeraldAccent-50/80 px-3 py-1.5 rounded-lg">
                        {formatBDT(o.totalTuitionEstimate)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {currentOfferings.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-ink-500">
                    No offerings found for this program.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
