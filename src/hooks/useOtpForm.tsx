import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { OtpFormType, createSchema } from '@/utils/otp-form-schema';
import { OTPVerificationModes } from '@/types';

export function useOtpForm(mode: OTPVerificationModes | null, t?: any) {
  const schema = createSchema(t);
  const {
    register,
    unregister,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OtpFormType>({
    defaultValues: {
      phoneNumber: '',
      email: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (mode === OTPVerificationModes.PHONE) {
      unregister('email');
      setValue('phoneNumber', '');
    } else if (mode === OTPVerificationModes.EMAIL) {
      unregister('phoneNumber');
      setValue('email', '');
    }
  }, [mode, unregister, setValue]);

  return { register, handleSubmit, reset, errors };
}
