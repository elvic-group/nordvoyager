'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale } from './translations';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'nb',
  setLocale: () => {},
  toggleLocale: () => {},
});

export function LocaleProvider({
  children,
  initialLocale = 'nb',
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'nb' ? 'en' : 'nb'));
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
