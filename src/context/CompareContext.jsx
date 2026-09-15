import { createContext, useContext, useState, useCallback } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const CompareContext = createContext(null);

const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState(() => loadJSON(STORAGE_KEYS.COMPARE_LIST, []));

  const persist = useCallback((next) => {
    setCompareIds(next);
    saveJSON(STORAGE_KEYS.COMPARE_LIST, next);
  }, []);

  const toggleCompare = useCallback(
    (id) => {
      setCompareIds((prev) => {
        let next;
        if (prev.includes(id)) {
          next = prev.filter((c) => c !== id);
        } else if (prev.length >= MAX_COMPARE) {
          return prev;
        } else {
          next = [...prev, id];
        }
        saveJSON(STORAGE_KEYS.COMPARE_LIST, next);
        return next;
      });
    },
    []
  );

  const clearCompare = useCallback(() => persist([]), [persist]);
  const isComparing = useCallback((id) => compareIds.includes(id), [compareIds]);

  const value = { compareIds, toggleCompare, clearCompare, isComparing, maxReached: compareIds.length >= MAX_COMPARE };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
