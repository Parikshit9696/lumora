// ============================================================
// LUMORA — LocalStorage helpers
// A tiny wrapper so every context can read/write consistently.
// ============================================================

const PREFIX = 'lumora:';

export function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — fail silently, app still works in-memory
  }
}

export function removeKey(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* no-op */
  }
}

export const STORAGE_KEYS = {
  AUTH: 'auth-user',
  CART: 'cart-items',
  SAVED_FOR_LATER: 'saved-for-later',
  WISHLIST: 'wishlist-items',
  BOOKINGS: 'bookings',
  ORDERS: 'orders',
  REVIEWS: 'reviews',
  NOTIFICATIONS: 'notifications',
  COLLECTIONS: 'collections',
  THEME: 'theme',
  NEWSLETTER: 'newsletter-subscribed',
  CONTACT_MESSAGES: 'contact-messages',
  ADMIN_PHOTOGRAPHERS: 'admin-photographers',
  ADMIN_PHOTOSHOOTS: 'admin-photoshoots',
  ADMIN_PRODUCTS: 'admin-products',
  COMPARE_LIST: 'compare-list',
};
