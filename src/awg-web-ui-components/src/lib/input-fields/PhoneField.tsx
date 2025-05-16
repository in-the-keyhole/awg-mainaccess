import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Box, FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import { AwgFieldLabel } from './FieldLabel';

export type AwgPhoneFieldProps<T extends FieldValues> = {
    label: string;
    schemaName: Path<T>;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
};

export function formatPhoneNumber(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : raw;
}

const phoneProgressPattern = /^(\(?\d{0,3}\)?[\s-]?)?(\d{0,3}[-]?)?(\d{0,4})?$/;

/**
 * Phone input field. Currently limited to US phone number formats.
 */
export function AwgPhoneField<T extends FieldValues>(props: AwgPhoneFieldProps<T>) {
    const register = {
        ...props.register(props.schemaName, {
            onBlur: (e) => {
                const formatted = formatPhoneNumber(e.target.value);
                props.setValue(props.schemaName, formatted as PathValue<T, typeof props.schemaName>, {
                    shouldValidate: true,
                });
            },
        }),
    };

    return (
        <FormControl
            variant="outlined"
            size="small"
            fullWidth
            error={!!props.error}
            sx={{ display: 'flex', flexDirection: 'column' }}
        >
            <AwgFieldLabel id={`${props.schemaName}-label`} required={props.required}>
                {props.label}
            </AwgFieldLabel>

            <OutlinedInput
                id={`${props.schemaName}-input`}
                inputRef={register.ref}
                {...register}
                disabled={props.disabled}
                inputProps={{
                    'aria-labelledby': `${props.schemaName}-label`,
                    'aria-required': props.required,
                    maxLength: 14,
                    inputMode: 'tel',
                    onInput: (e: React.FormEvent<HTMLInputElement>) => {
                        const input = e.currentTarget;
                        const value = input.value;
                        const digits = value.replace(/\D/g, '');

                        if (digits.length > 10) {
                            input.value = input.value.slice(0, -1);
                            return;
                        }

                        if (!phoneProgressPattern.test(value)) {
                            input.value = input.value.slice(0, -1);
                        }

                        props.setValue(props.schemaName, input.value as PathValue<T, typeof props.schemaName>, {
                            shouldValidate: false,
                            shouldDirty: true,
                        });
                    },
                }}
            />

            {props.error && <FormHelperText id={`${props.schemaName}-error`}>{props.error}</FormHelperText>}
        </FormControl>
    );
}
