import { z } from 'zod';

export const schema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, 'Invalid Phone number, Must be 10 digits')
    .optional()
    .nullable(),
  email: z.string().email('Invalid email address').optional().nullable(),
});

export type OtpFormType = z.infer<typeof schema>;
