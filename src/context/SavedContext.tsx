import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface SavedContextValue {
  savedUniversityIds: string[];
  savedProgramIds: string[];
  toggleUniversity: (id: string) => void;
  toggleProgram: (id: string) => void;
  isUniversitySaved: (id: string) => boolean;
  isProgramSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedUniversityIds, setSavedUniversityIds] = useState<string[]>([]);
  const [savedProgramIds, setSavedProgramIds] = useState<string[]>([]);

  const toggleUniversity = useCallback((id: string) => {
    setSavedUniversityIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const toggleProgram = useCallback((id: string) => {
    setSavedProgramIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const isUniversitySaved = useCallback(
    (id: string) => savedUniversityIds.includes(id),
    [savedUniversityIds],
  );
  const isProgramSaved = useCallback(
    (id: string) => savedProgramIds.includes(id),
    [savedProgramIds],
  );

  return (
    <SavedContext.Provider
      value={{
        savedUniversityIds, savedProgramIds,
        toggleUniversity, toggleProgram,
        isUniversitySaved, isProgramSaved,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}
