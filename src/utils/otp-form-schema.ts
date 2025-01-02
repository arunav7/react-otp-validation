import { z } from 'zod';

export const createSchema = (t: (key: string) => string) => {
  return z.object({
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, t('invalid.phoneNumber'))
      .optional()
      .nullable(),
    email: z.string().email(t('invalid.email')).optional().nullable(),
  });
};

export type OtpFormType = z.infer<ReturnType<typeof createSchema>>;
