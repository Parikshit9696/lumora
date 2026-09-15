import { createContext, useContext, useState, useCallback } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';
import { generateOrderId } from '../utils/formatters';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => loadJSON(STORAGE_KEYS.BOOKINGS, []));
  const [orders, setOrders] = useState(() => loadJSON(STORAGE_KEYS.ORDERS, []));

  const persistBookings = useCallback((next) => {
    setBookings(next);
    saveJSON(STORAGE_KEYS.BOOKINGS, next);
  }, []);

  const persistOrders = useCallback((next) => {
    setOrders(next);
    saveJSON(STORAGE_KEYS.ORDERS, next);
  }, []);

  const createBookingsAndOrder = useCallback(
    (cartItems, customerInfo, paymentMethod) => {
      const orderId = generateOrderId('LUM');
      const photoshootItems = cartItems.filter((i) => i.type === 'photoshoot');
      const productItems = cartItems.filter((i) => i.type !== 'photoshoot');

      const newBookings = photoshootItems.map((item) => ({
        id: generateOrderId('BK'),
        orderId,
        photoshootId: item.meta?.photoshootId,
        photoshootTitle: item.name,
        photographerName: item.meta?.photographerName,
        image: item.image,
        date: item.meta?.date,
        time: item.meta?.time,
        location: item.meta?.location,
        people: item.meta?.people,
        addons: item.meta?.addons || [],
        amount: item.price * item.quantity,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        customerInfo,
      }));

      let newOrder = null;
      if (productItems.length > 0) {
        newOrder = {
          id: orderId,
          items: productItems,
          amount: productItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
          status: 'Processing',
          paymentMethod,
          createdAt: new Date().toISOString(),
          customerInfo,
        };
      }

      if (newBookings.length) persistBookings([...bookings, ...newBookings]);
      if (newOrder) persistOrders([...orders, newOrder]);

      return { orderId, bookings: newBookings, order: newOrder };
    },
    [bookings, orders, persistBookings, persistOrders]
  );

  const updateBookingStatus = useCallback(
    (id, status) => {
      persistBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
    },
    [bookings, persistBookings]
  );

  const rescheduleBooking = useCallback(
    (id, date, time) => {
      persistBookings(bookings.map((b) => (b.id === id ? { ...b, date, time, status: 'Pending' } : b)));
    },
    [bookings, persistBookings]
  );

  const cancelBooking = useCallback(
    (id) => updateBookingStatus(id, 'Cancelled'),
    [updateBookingStatus]
  );

  const value = { bookings, orders, createBookingsAndOrder, updateBookingStatus, rescheduleBooking, cancelBooking };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used within BookingProvider');
  return ctx;
}
