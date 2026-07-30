import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface CompareContextValue {
  selectedOfferingIds: string[];
  toggleOffering: (offeringId: string) => void;
  removeOffering: (offeringId: string) => void;
  clear: () => void;
  isOfferingSelected: (offeringId: string) => boolean;
  count: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedOfferingIds, setSelected] = useState<string[]>([]);

  const toggleOffering = useCallback((id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const removeOffering = useCallback((id: string) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setSelected([]), []);
  const isOfferingSelected = useCallback((id: string) => selectedOfferingIds.includes(id), [selectedOfferingIds]);

  return (
    <CompareContext.Provider
      value={{ selectedOfferingIds, toggleOffering, removeOffering, clear, isOfferingSelected, count: selectedOfferingIds.length }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
