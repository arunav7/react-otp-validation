import { createListCollection } from '@chakra-ui/react';

export const BARRED_OTP = ['0000', '0001', '1111'];

export enum LanguageModeEnum {
  English = 'en',
  Hindi = 'hi',
}

// export const LanguageModeOptions = [
//   { label: 'English', value: LanguageModeEnum.English },
//   { label: 'Hindi', value: LanguageModeEnum.Hindi },
// ];

export const LanguageModeOptions = (label: { hindi: string; english: string }) => {
  return createListCollection({
    items: [
      { label: label.english, value: LanguageModeEnum.English },
      { label: label.hindi, value: LanguageModeEnum.Hindi },
    ],
  });
};
