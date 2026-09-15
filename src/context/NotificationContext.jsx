import { createContext, useContext, useState, useCallback } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const NotificationContext = createContext(null);

const seedNotifications = () => [
  {
    id: 'n1',
    title: 'Welcome to LUMORA',
    message: 'Explore curated photographers and premium photoshoot packages near you.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'n2',
    title: 'New photographers available',
    message: 'Five new photographers just joined LUMORA in your city.',
    type: 'update',
    read: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => loadJSON(STORAGE_KEYS.NOTIFICATIONS, seedNotifications()));

  const persist = useCallback((next) => {
    setNotifications(next);
    saveJSON(STORAGE_KEYS.NOTIFICATIONS, next);
  }, []);

  const addNotification = useCallback(
    (notification) => {
      const next = [
        { id: `n-${Date.now()}`, read: false, createdAt: new Date().toISOString(), ...notification },
        ...notifications,
      ];
      persist(next);
    },
    [notifications, persist]
  );

  const markAsRead = useCallback(
    (id) => persist(notifications.map((n) => (n.id === id ? { ...n, read: true } : n))),
    [notifications, persist]
  );

  const markAllAsRead = useCallback(
    () => persist(notifications.map((n) => ({ ...n, read: true }))),
    [notifications, persist]
  );

  const deleteNotification = useCallback(
    (id) => persist(notifications.filter((n) => n.id !== id)),
    [notifications, persist]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = { notifications, addNotification, markAsRead, markAllAsRead, deleteNotification, unreadCount };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
