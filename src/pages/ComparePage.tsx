import { Link } from 'react-router-dom';
import { GitCompare, Share2, Bookmark, X, Trophy, ArrowRight } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { getUniversityById, getOfferingsByUniversity, formatBDT, formatBDTFull } from '@/data/sampleData';
import { UniversityLogo, RatingStars, EmptyState, VerificationBadge } from '@/components/ui';

export default function ComparePage() {
  const { selectedIds, remove, clear } = useCompare();
  const unis = selectedIds.map((id) => getUniversityById(id)).filter(Boolean);

  if (unis.length === 0) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="No universities selected for comparison"
          message="Browse universities and click the Compare button to add them here. You can compare up to 4 universities at once."
          icon={<GitCompare size={32} />}
        />
        <div className="text-center mt-4">
          <Link to="/universities" className="btn-primary">Browse Universities</Link>
        </div>
      </div>
    );
  }

  // Build comparison rows
  const rows: { label: string; getValue: (u: NonNullable<typeof unis[number]>) => React.ReactNode; bestIsLow?: boolean; numeric?: (u: NonNullable<typeof unis[number]>) => number }[] = [
    { label: 'Location', getValue: (u) => `${u.location}, ${u.division}` },
    { label: 'Established', getValue: (u) => u.established, numeric: (u) => u.established, bestIsLow: false },
    { label: 'Number of Programs', getValue: (u) => u.programCount, numeric: (u) => u.programCount, bestIsLow: false },
    { label: 'Min GPA (HSC)', getValue: (u) => u.minGPA.toFixed(1), numeric: (u) => u.minGPA, bestIsLow: false },
    { label: 'Admission Test', getValue: (u) => (u.admissionTestRequired ? 'Required' : 'Not Required') },
    { label: 'Tuition Range', getValue: (u) => `${formatBDT(u.tuitionMin)} – ${formatBDT(u.tuitionMax)}` },
    { label: 'Min Tuition (est.)', getValue: (u) => formatBDT(u.tuitionMin), numeric: (u) => u.tuitionMin, bestIsLow: true },
    { label: 'Max Tuition (est.)', getValue: (u) => formatBDT(u.tuitionMax), numeric: (u) => u.tuitionMax, bestIsLow: true },
    { label: 'Scholarship', getValue: (u) => (u.scholarshipAvailable ? 'Available' : 'Not Available') },
    { label: 'Student Rating', getValue: (u) => <RatingStars rating={u.rating} />, numeric: (u) => u.rating, bestIsLow: false },
    { label: 'Reviews', getValue: (u) => u.reviewCount, numeric: (u) => u.reviewCount, bestIsLow: false },
    { label: 'Campus Facilities', getValue: (u) => <span className="text-xs">{u.facilities.length} facilities</span> },
    { label: 'Verification', getValue: (u) => <VerificationBadge status={u.verification} size="xs" /> },
  ];

  // Find best value per numeric row
  const bestValues: Record<string, string> = {};
  rows.forEach((row) => {
    if (row.numeric) {
      const vals = unis.map((u) => ({ id: u!.id, n: row.numeric!(u!) }));
      const best = row.bestIsLow
        ? vals.reduce((min, v) => (v.n < min.n ? v : min))
        : vals.reduce((max, v) => (v.n > max.n ? v : max));
      bestValues[row.label] = best.id;
    }
  });

  return (
    <div className="container-page py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-ink-900">Compare Universities</h1>
          <p className="text-ink-500 mt-2">Side-by-side comparison of {unis.length} universities. Best values are highlighted.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm"><Share2 size={15} /> Share</button>
          <button className="btn-secondary text-sm"><Bookmark size={15} /> Save</button>
          <button onClick={clear} className="btn-ghost text-sm">Clear all</button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-50">
                <th className="text-left p-4 text-sm font-semibold text-ink-600 sticky left-0 bg-ink-50 z-10 min-w-[140px]">Criteria</th>
                {unis.map((u) => (
                  <th key={u!.id} className="p-4 text-left min-w-[200px] border-l border-ink-100">
                    <div className="flex items-start gap-3">
                      <UniversityLogo uni={u!} size="sm" />
                      <div className="flex-1 min-w-0">
                        <Link to={`/universities/${u!.slug}`} className="font-semibold text-ink-900 hover:text-brand-700 block leading-tight">{u!.shortName}</Link>
                        <p className="text-xs text-ink-500 mt-0.5">{u!.name}</p>
                      </div>
                      <button onClick={() => remove(u!.id)} className="text-ink-400 hover:text-rose-600"><X size={16} /></button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-ink-50/30'}>
                  <td className="p-4 text-sm font-medium text-ink-600 sticky left-0 bg-inherit z-10">{row.label}</td>
                  {unis.map((u) => {
                    const isBest = bestValues[row.label] === u!.id;
                    return (
                      <td key={u!.id} className={`p-4 text-sm border-l border-ink-100 ${isBest ? 'bg-emerald-50/60' : ''}`}>
                        <div className={`flex items-center gap-1.5 ${isBest ? 'font-bold text-emerald-700' : 'text-ink-700'}`}>
                          {row.getValue(u!)}
                          {isBest && <Trophy size={14} className="text-emerald-600" />}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-ink-50">
                <td className="p-4 sticky left-0 bg-ink-50 z-10"></td>
                {unis.map((u) => (
                  <td key={u!.id} className="p-4 border-l border-ink-100">
                    <Link to={`/universities/${u!.slug}`} className="btn-secondary text-xs w-full">
                      View Profile <ArrowRight size={13} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {unis.map((u) => {
          const offerings = getOfferingsByUniversity(u!.id);
          const minTuition = offerings.length ? Math.min(...offerings.map((o) => o.totalTuitionEstimate)) : u!.tuitionMin;
          return (
            <div key={u!.id} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <UniversityLogo uni={u!} size="sm" />
                <p className="font-semibold text-sm">{u!.shortName}</p>
              </div>
              <p className="text-xs text-ink-500">Lowest program tuition:</p>
              <p className="text-lg font-bold text-brand-700">{formatBDTFull(minTuition)}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Link to="/universities" className="btn-secondary">Add more universities</Link>
      </div>
    </div>
  );
}
