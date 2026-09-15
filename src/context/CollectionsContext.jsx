import { createContext, useContext, useState, useCallback } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const CollectionsContext = createContext(null);

const seedCollections = () => [
  { id: 'col-1', name: 'Dream Photoshoot', items: [], createdAt: new Date().toISOString() },
  { id: 'col-2', name: 'Wedding Ideas', items: [], createdAt: new Date().toISOString() },
];

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState(() => loadJSON(STORAGE_KEYS.COLLECTIONS, seedCollections()));

  const persist = useCallback((next) => {
    setCollections(next);
    saveJSON(STORAGE_KEYS.COLLECTIONS, next);
  }, []);

  const createCollection = useCallback(
    (name) => {
      const next = [...collections, { id: `col-${Date.now()}`, name, items: [], createdAt: new Date().toISOString() }];
      persist(next);
    },
    [collections, persist]
  );

  const renameCollection = useCallback(
    (id, name) => persist(collections.map((c) => (c.id === id ? { ...c, name } : c))),
    [collections, persist]
  );

  const deleteCollection = useCallback(
    (id) => persist(collections.filter((c) => c.id !== id)),
    [collections, persist]
  );

  const addToCollection = useCallback(
    (id, item) =>
      persist(
        collections.map((c) => (c.id === id && !c.items.some((i) => i.id === item.id) ? { ...c, items: [...c.items, item] } : c))
      ),
    [collections, persist]
  );

  const removeFromCollection = useCallback(
    (id, itemId) => persist(collections.map((c) => (c.id === id ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c))),
    [collections, persist]
  );

  const value = { collections, createCollection, renameCollection, deleteCollection, addToCollection, removeFromCollection };

  return <CollectionsContext.Provider value={value}>{children}</CollectionsContext.Provider>;
}

export function useCollections() {
  const ctx = useContext(CollectionsContext);
  if (!ctx) throw new Error('useCollections must be used within CollectionsProvider');
  return ctx;
}
