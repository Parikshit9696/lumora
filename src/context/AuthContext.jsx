import { createContext, useContext, useState, useCallback } from 'react';
import { loadJSON, saveJSON, removeKey, STORAGE_KEYS } from '../utils/storage';

const AuthContext = createContext(null);

export const DEMO_ACCOUNT = { email: 'demo@lumora.com', password: 'demo123' };

const defaultProfile = (email, name) => ({
  id: `user-${Date.now()}`,
  name: name || 'Guest Explorer',
  email,
  phone: '',
  avatar: null,
  city: '',
  joinedAt: new Date().toISOString(),
  isAdmin: email === 'admin@lumora.com',
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON(STORAGE_KEYS.AUTH, null));

  const login = useCallback(({ email, password }) => {
    const isDemo = email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password;
    const isAdmin = email === 'admin@lumora.com';
    if (!isDemo && !isAdmin && password.length < 6) {
      return { success: false, message: 'Incorrect email or password.' };
    }
    const existing = loadJSON(STORAGE_KEYS.AUTH, null);
    const profile =
      existing && existing.email === email ? existing : defaultProfile(email, isDemo ? 'Demo Explorer' : undefined);
    setUser(profile);
    saveJSON(STORAGE_KEYS.AUTH, profile);
    return { success: true };
  }, []);

  const register = useCallback(({ name, email, password }) => {
    if (!name || !email || password.length < 6) {
      return { success: false, message: 'Please fill every field correctly.' };
    }
    const profile = defaultProfile(email, name);
    setUser(profile);
    saveJSON(STORAGE_KEYS.AUTH, profile);
    return { success: true };
  }, []);

  const loginWithDemo = useCallback(() => login(DEMO_ACCOUNT), [login]);

  const logout = useCallback(() => {
    setUser(null);
    removeKey(STORAGE_KEYS.AUTH);
  }, []);

  const updateProfile = useCallback((patch) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      saveJSON(STORAGE_KEYS.AUTH, next);
      return next;
    });
  }, []);

  const value = { user, isAuthenticated: !!user, login, register, logout, updateProfile, loginWithDemo };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
