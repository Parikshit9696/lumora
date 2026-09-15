import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';
import { calculateCartTotals, applyCoupon } from '../utils/price';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadJSON(STORAGE_KEYS.CART, []));
  const [savedForLater, setSavedForLater] = useState(() => loadJSON(STORAGE_KEYS.SAVED_FOR_LATER, []));
  const [couponCode, setCouponCode] = useState('');

  const persist = useCallback((next) => {
    setItems(next);
    saveJSON(STORAGE_KEYS.CART, next);
  }, []);

  const persistSaved = useCallback((next) => {
    setSavedForLater(next);
    saveJSON(STORAGE_KEYS.SAVED_FOR_LATER, next);
  }, []);

  const addItem = useCallback(
    (item) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.cartId === item.cartId);
        let next;
        if (existingIndex >= 0 && item.type !== 'photoshoot') {
          next = prev.map((i, idx) => (idx === existingIndex ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i));
        } else {
          next = [...prev, { ...item, quantity: item.quantity || 1, addedAt: Date.now() }];
        }
        saveJSON(STORAGE_KEYS.CART, next);
        return next;
      });
    },
    []
  );

  const removeItem = useCallback(
    (cartId) => {
      persist(items.filter((i) => i.cartId !== cartId));
    },
    [items, persist]
  );

  const updateQuantity = useCallback(
    (cartId, quantity) => {
      persist(items.map((i) => (i.cartId === cartId ? { ...i, quantity: Math.max(1, quantity) } : i)));
    },
    [items, persist]
  );

  const clearCart = useCallback(() => persist([]), [persist]);

  const saveForLater = useCallback(
    (cartId) => {
      const item = items.find((i) => i.cartId === cartId);
      if (!item) return;
      persist(items.filter((i) => i.cartId !== cartId));
      persistSaved([...savedForLater, item]);
    },
    [items, savedForLater, persist, persistSaved]
  );

  const moveToCart = useCallback(
    (cartId) => {
      const item = savedForLater.find((i) => i.cartId === cartId);
      if (!item) return;
      persistSaved(savedForLater.filter((i) => i.cartId !== cartId));
      persist([...items, item]);
    },
    [items, savedForLater, persist, persistSaved]
  );

  const applyCode = useCallback((code) => setCouponCode(code), []);

  const totals = useMemo(() => {
    const discountRate = applyCoupon(couponCode);
    return { ...calculateCartTotals(items, { discountRate }), discountRate };
  }, [items, couponCode]);

  const value = {
    items,
    savedForLater,
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    saveForLater,
    moveToCart,
    couponCode,
    applyCode,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
