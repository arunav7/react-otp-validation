import { useCallback } from 'react';
import { LanguageModeEnum } from '@/constants';

import englishjson from '../translations/en.json';
import hindijson from '../translations/hi.json';

interface TranslationJson {
  [key: string]: string;
}

const english: TranslationJson = englishjson;
const hindi: TranslationJson = hindijson;

export const useTranslation = (language: LanguageModeEnum) => {
  const englishJson = english;
  const hindiJson = hindi;

  const t = useCallback(
    (key: string, values?: Record<string, string>) => {
      let translation = '';
      if (language === LanguageModeEnum.Hindi) {
        translation = hindiJson[key] || key;
      } else if (language === LanguageModeEnum.English) {
        translation = englishJson[key] || key;
      } else {
        return key;
      }

      if (values) {
        Object.keys(values).forEach((placeholder) => {
          const regex = new RegExp(`{${placeholder}}`, 'g');
          translation = translation.replace(regex, values[placeholder]);
        });
      }

      return translation;
    },
    [englishJson, hindiJson, language]
  );

  return { t };
};
