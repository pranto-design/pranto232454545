import { Link } from 'react-router-dom';
import { X, GitCompare, BookOpen } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { getUniversityById, getProgramById, getOfferingById } from '@/data/sampleData';

export default function CompareBar() {
  const { selectedOfferingIds, removeOffering, clear, count } = useCompare();
  if (count === 0) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-3xl animate-fade-up">
      <div className="rounded-2xl bg-navy-900/85 backdrop-blur-xl text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold shrink-0">
          <GitCompare size={16} className="text-brand-400" />
          <span className="hidden xs:inline">Compare</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0">
          {selectedOfferingIds.map((id) => {
            const offering = getOfferingById(id);
            if (!offering) return null;
            const program = getProgramById(offering.programId);
            const uni = getUniversityById(offering.universityId);
            if (!program || !uni) return null;
            return (
              <div key={id} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-xl pl-2 pr-2 py-1 sm:py-1.5 shrink-0 min-w-0 border border-white/10">
                <div className="flex items-center justify-center h-6 w-6 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white shrink-0 shadow-sm">
                  <BookOpen size={12} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-[11px] font-semibold max-w-[80px] sm:max-w-[110px] truncate">{program.name.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="text-[10px] text-white/70 truncate">{uni.shortName}</span>
                </div>
                <button onClick={() => removeOffering(id)} className="text-white/50 hover:text-white ml-0.5 sm:ml-1" aria-label="Remove">
                  <X size={13} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button onClick={clear} className="text-[11px] sm:text-xs text-white/60 hover:text-white transition-colors">Clear</button>
          <Link to="/compare" className="btn-primary text-xs px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap shadow-md shadow-brand-600/30">
            Compare ({count})
          </Link>
        </div>
      </div>
    </div>
  );
}
