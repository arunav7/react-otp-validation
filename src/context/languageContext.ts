import { LanguageContextType } from '@/types';
import { createContext, useContext } from 'react';

export const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};
