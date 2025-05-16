import { z } from 'zod';

export const USPhoneSchema = z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 0 || /^\d{10}$/.test(val), {
        message: 'Please provide a 10 digit phone number',
    });
