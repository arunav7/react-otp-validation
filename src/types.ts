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
