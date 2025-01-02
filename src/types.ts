import { LanguageModeEnum } from './constants';

export type OtpVerificationProps = {
  length: number;
  onSuccessfulVerification: (otp: string) => void;
  onReset: () => void;
  mode: OTPVerificationModes | null;
};

export enum OTPVerificationModes {
  PHONE = 'phone',
  EMAIL = 'email',
}

export type VeifyOtpType = {
  error: boolean | null;
  message: string | null;
};

export type LanguageContextType = {
  language: LanguageModeEnum | null;
  setLanguage: (mode: LanguageModeEnum) => void;
};
