import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => loadJSON(STORAGE_KEYS.THEME, 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveJSON(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
