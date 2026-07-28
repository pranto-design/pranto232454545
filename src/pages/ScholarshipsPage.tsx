import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Award, Filter, GraduationCap } from 'lucide-react';
import { scholarships, getUniversityById, programs } from '@/data/sampleData';
import { UniversityLogo, VerificationBadge, EmptyState } from '@/components/ui';

export default function ScholarshipsPage() {
  const [gpaFilter, setGpaFilter] = useState(0);
  const [programFilter, setProgramFilter] = useState('');
  const [uniFilter, setUniFilter] = useState('');

  const filtered = useMemo(() => {
    return scholarships.filter((s) => {
      if (gpaFilter > 0 && s.gpaRequirement > gpaFilter) return false;
      if (uniFilter && s.universityId !== uniFilter) return false;
      return true;
    });
  }, [gpaFilter, uniFilter]);

  return (
    <div className="container-page py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink-900 flex items-center gap-2"><Award className="text-brand-600" /> Scholarships</h1>
        <p className="text-ink-500 mt-2">Find scholarships available at private universities in Bangladesh. Filter by GPA and university.</p>
      </div>

      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center gap-2 text-sm text-ink-500"><Filter size={16} /> Filters:</div>
          <select value={gpaFilter} onChange={(e) => setGpaFilter(Number(e.target.value))} className="input sm:w-48">
            <option value={0}>Any GPA</option>
            <option value={3.5}>GPA 3.5+ eligible</option>
            <option value={4.0}>GPA 4.0+ eligible</option>
            <option value={4.5}>GPA 4.5+ eligible</option>
            <option value={5.0}>GPA 5.0 eligible</option>
          </select>
          <select value={uniFilter} onChange={(e) => setUniFilter(e.target.value)} className="input sm:w-64">
            <option value="">All Universities</option>
            {[...new Set(scholarships.map((s) => s.universityId))].map((id) => {
              const u = getUniversityById(id);
              return u ? <option key={id} value={id}>{u.name}</option> : null;
            })}
          </select>
        </div>
      </div>

      <p className="text-sm text-ink-500 mb-4">{filtered.length} scholarships found</p>

      {filtered.length === 0 ? (
        <EmptyState title="No scholarships found" message="Try adjusting your filters." icon={<Award size={28} />} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => {
            const uni = getUniversityById(s.universityId);
            if (!uni) return null;
            return (
              <div key={s.id} className="card card-hover p-5 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <UniversityLogo uni={uni} size="sm" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/universities/${uni.slug}`} className="text-xs text-ink-500 hover:text-brand-700">{uni.name}</Link>
                    <h3 className="font-semibold text-ink-900 leading-tight">{s.name}</h3>
                  </div>
                  <span className="chip-success font-bold">{s.percentage}%</span>
                </div>
                <p className="text-sm text-ink-600 flex-1">{s.eligibility}</p>
                <div className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-ink-500">GPA Required</span><span className="font-medium">{s.gpaRequirement.toFixed(1)}+</span></div>
                  <div><p className="text-ink-500">How to Apply</p><p className="text-ink-600 text-xs mt-0.5">{s.applicationProcess}</p></div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <VerificationBadge status={s.verification} size="xs" />
                  <span className="text-[10px] text-ink-400">Updated: {s.lastUpdated}</span>
                </div>
                <Link to={`/universities/${uni.slug}`} className="btn-secondary text-xs mt-4 w-full">View University</Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
