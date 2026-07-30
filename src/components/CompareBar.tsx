import { Link } from 'react-router-dom';
import { X, GitCompare, BookOpen } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { getUniversityById, getProgramById, getOfferingById } from '@/data/sampleData';

export default function CompareBar() {
  const { selectedOfferingIds, removeOffering, clear, count } = useCompare();
  if (count === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl animate-fade-up">
      <div className="rounded-2xl bg-navy-900 text-white shadow-2xl border border-navy-800 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold shrink-0">
          <GitCompare size={16} /> Compare Programs
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1">
          {selectedOfferingIds.map((id) => {
            const offering = getOfferingById(id);
            if (!offering) return null;
            const program = getProgramById(offering.programId);
            const uni = getUniversityById(offering.universityId);
            if (!program || !uni) return null;
            return (
              <div key={id} className="flex items-center gap-1.5 bg-navy-800 rounded-lg pl-2 pr-2 py-1.5 shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br from-brand-500 to-brand-700">
                  <BookOpen size={12} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold max-w-[110px] truncate">{program.name.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="text-[10px] text-white/60">{uni.shortName} • {offering.degree}</span>
                </div>
                <button onClick={() => removeOffering(id)} className="text-ink-400 hover:text-white ml-1" aria-label="Remove">
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={clear} className="text-xs text-ink-400 hover:text-white">Clear</button>
          <Link to="/compare" className="btn-primary text-xs px-4 py-2">
            Compare ({count})
          </Link>
        </div>
      </div>
    </div>
  );
}
