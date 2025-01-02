import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { LanguageContext } from './languageContext';
import { LanguageModeEnum } from '@/constants';

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<LanguageModeEnum | null>(LanguageModeEnum.English);
  const setLanguageMode = useCallback((mode: LanguageModeEnum) => {
    setLanguage(mode);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage: setLanguageMode }),
    [language, setLanguageMode]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
