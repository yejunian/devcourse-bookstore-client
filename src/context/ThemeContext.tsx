import { createContext, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '../style/global';
import { getTheme, TThemeName } from '../style/theme';

interface State {
  themeName: TThemeName;
  toggleTheme: () => void;
}

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'bookstore_theme';

export const state: State = {
  themeName: DEFAULT_THEME_NAME,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

export function BookstoreThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<TThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    const nextThemeName = themeName === 'light' ? 'dark' : 'light';

    setThemeName(nextThemeName);
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, nextThemeName);
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY
    ) as TThemeName | null;

    if (savedThemeName) {
      setThemeName(savedThemeName);
    } else {
      localStorage.setItem(THEME_LOCALSTORAGE_KEY, DEFAULT_THEME_NAME);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
