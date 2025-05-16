import { z } from 'zod';

import { zGetRequiredFieldMap } from './zod-required-field-map';

const addressSchema = z.object({
    addressLine1: z.string().nonempty(),
    addressLine2: z.string().optional(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    zip: z.string().nonempty(),
});

const mySchema = z
    .object({
        name: z.string().nonempty(),
        email: z.string().nonempty(),
        mailingAddress: addressSchema,
        billingAddress: addressSchema.optional(),
        copyBillingAddressFromMailing: z.boolean(),
        contacts: z
            .array(
                z.object({
                    name: z.string().nonempty(),
                    phone: z.string().optional(),
                })
            )
            .nonempty(),
    })
    .superRefine((data, ctx) => {
        if (!data.copyBillingAddressFromMailing) {
            const billingResult = addressSchema.safeParse(data.billingAddress);
            if (!billingResult.success) {
                for (const issue of billingResult.error.issues) {
                    ctx.addIssue({
                        ...issue,
                        path: ['billingAddress', ...issue.path],
                    });
                }
            }
        }
    });

const getDefaultValues = () => {
    return {
        name: '',
        nickname: '',
        email: '',
        mailingAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip: '',
        },
        copyBillingAddressFromMailing: true,
        contacts: [{ name: '', phone: '' }],
    };
};

describe('zGetRequiredFieldMap', () => {
    it('should identify all required fields correctly', () => {
        const result = zGetRequiredFieldMap(mySchema, getDefaultValues());

        expect(result).toEqual({
            name: true,
            email: true,
            'mailingAddress.addressLine1': true,
            'mailingAddress.city': true,
            'mailingAddress.state': true,
            'mailingAddress.zip': true,
            'contacts.0.name': true,
        });
    });
});
