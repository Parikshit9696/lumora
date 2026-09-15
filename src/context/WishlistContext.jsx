import { createContext, useContext, useState, useCallback } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => loadJSON(STORAGE_KEYS.WISHLIST, []));

  const persist = useCallback((next) => {
    setWishlist(next);
    saveJSON(STORAGE_KEYS.WISHLIST, next);
  }, []);

  const isWishlisted = useCallback((id) => wishlist.some((w) => w.id === id), [wishlist]);

  const toggleWishlist = useCallback(
    (item) => {
      setWishlist((prev) => {
        const exists = prev.some((w) => w.id === item.id);
        const next = exists ? prev.filter((w) => w.id !== item.id) : [...prev, { ...item, savedAt: Date.now() }];
        saveJSON(STORAGE_KEYS.WISHLIST, next);
        return next;
      });
    },
    []
  );

  const removeFromWishlist = useCallback(
    (id) => {
      persist(wishlist.filter((w) => w.id !== id));
    },
    [wishlist, persist]
  );

  const value = { wishlist, isWishlisted, toggleWishlist, removeFromWishlist, count: wishlist.length };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
