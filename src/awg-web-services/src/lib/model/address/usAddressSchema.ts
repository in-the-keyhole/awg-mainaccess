import { z } from 'zod';

export const USAddressEmpty = {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
};

export const USAddressSchema = z.object({
    addressLine1: z.string().min(1, `Required`).max(27, 'Address cannot exceed 27 characters'),
    addressLine2: z.string().max(27, 'Address cannot exceed 27 characters').optional(),
    city: z.string().min(1, `Required`).max(27, 'City cannot exceed 27 characters'),
    state: z.string().min(1, `Required`).max(2, 'State must be a two character code'),
    zip: z
        .string()
        .min(1, `Required`)
        .regex(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code'),
});

export const OptionalUSAddressSchema = z.object({
    addressLine1: z.string().max(27, 'Address cannot exceed 27 characters').or(z.literal('')),
    addressLine2: z.string().max(27, 'Address cannot exceed 27 characters').or(z.literal('')),
    city: z.string().max(27, 'City cannot exceed 27 characters').or(z.literal('')),
    state: z.string().max(2, 'State must be a two character code').or(z.literal('')),
    zip: z
        .string()
        .regex(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code')
        .or(z.literal('')),
});

const addressFields = ['addressLine1', 'addressLine2', 'city', 'state', 'zip'] as const;
export type AddressField = (typeof addressFields)[number];

export const areAddressesEqual = (
    a: Partial<Record<AddressField, string>> | undefined,
    b: Partial<Record<AddressField, string>> | undefined
): boolean => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return addressFields.every((key) => {
        const aValue = a[key]?.trim().toLowerCase() ?? '';
        const bValue = b[key]?.trim().toLowerCase() ?? '';
        return aValue === bValue;
    });
};
