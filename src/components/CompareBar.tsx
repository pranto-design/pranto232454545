import { Link } from 'react-router-dom';
import { X, GitCompare } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { getUniversityById } from '@/data/sampleData';
import { UniversityLogo } from '@/components/ui';

export default function CompareBar() {
  const { selectedIds, remove, clear, count } = useCompare();
  if (count === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl animate-fade-up">
      <div className="rounded-2xl bg-navy-900 text-white shadow-2xl border border-navy-800 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold shrink-0">
          <GitCompare size={16} /> Compare
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1">
          {selectedIds.map((id) => {
            const uni = getUniversityById(id);
            if (!uni) return null;
            return (
              <div key={id} className="flex items-center gap-1.5 bg-navy-800 rounded-lg pl-1.5 pr-2 py-1 shrink-0">
                <UniversityLogo uni={uni} size="sm" />
                <span className="text-xs font-medium max-w-[100px] truncate">{uni.shortName}</span>
                <button onClick={() => remove(id)} className="text-ink-400 hover:text-white">
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={clear} className="text-xs text-ink-400 hover:text-white">Clear</button>
          <Link to="/compare" className="btn-primary text-xs px-4 py-2">
            Compare Now ({count})
          </Link>
        </div>
      </div>
    </div>
  );
}
