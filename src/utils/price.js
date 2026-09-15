// ============================================================
// LUMORA — Pricing helpers
// ============================================================

export const TAX_RATE = 0.05; // 5% simulated GST
export const DELIVERY_FLAT = 149;
export const FREE_DELIVERY_THRESHOLD = 4999;

export function calculateAddonsTotal(addons = []) {
  return addons.reduce((sum, a) => sum + (a.price || 0) * (a.quantity || 1), 0);
}

export function calculateBookingTotal({ basePrice = 0, people = 1, addons = [] }) {
  const peopleSurcharge = people > 1 ? (people - 1) * Math.round(basePrice * 0.15) : 0;
  const addonsTotal = calculateAddonsTotal(addons);
  const subtotal = basePrice + peopleSurcharge + addonsTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  return {
    basePrice,
    peopleSurcharge,
    addonsTotal,
    subtotal,
    tax,
    total: subtotal + tax,
  };
}

export function calculatePrintPrice({ base = 999, size, frame, material, quantity = 1 }) {
  const sizeMultiplier = { Small: 1, Medium: 1.5, Large: 2.2, 'Extra Large': 3.1 }[size] || 1;
  const framePrice = { None: 0, 'Classic Wood': 899, 'Modern Black': 749, Minimal: 599 }[frame] || 0;
  const materialAdd = { Standard: 0, Premium: 499, 'Museum Grade': 1299 }[material] || 0;
  const unit = Math.round(base * sizeMultiplier) + framePrice + materialAdd;
  return unit * quantity;
}

export function calculateCartTotals(items = [], { discountRate = 0 } = {}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const discount = Math.round(subtotal * discountRate);
  const afterDiscount = subtotal - discount;
  const delivery = items.length === 0 || afterDiscount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FLAT;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const total = afterDiscount + delivery + tax;
  return { subtotal, discount, delivery, tax, total };
}

const COUPONS = {
  LUMORA10: 0.1,
  FIRSTSHOOT: 0.15,
  WELCOME5: 0.05,
};

export function applyCoupon(code) {
  const rate = COUPONS[String(code || '').toUpperCase().trim()];
  return rate || 0;
}
