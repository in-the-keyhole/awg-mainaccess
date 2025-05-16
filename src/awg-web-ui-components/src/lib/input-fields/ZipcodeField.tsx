import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import { AwgFieldLabel } from './FieldLabel';

export type AwgZipcodeFieldProps<T extends FieldValues> = {
    label: string;
    schemaName: Path<T>;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
};

const zipPattern = /^\d{5}(-\d{4})?$/;

export function AwgZipcodeField<T extends FieldValues>(props: AwgZipcodeFieldProps<T>) {
    const register = props.register(props.schemaName);

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
                disabled={props.disabled}
                {...register}
                inputProps={{
                    'aria-labelledby': `${props.schemaName}-label`,
                    'aria-required': props.required,
                    maxLength: 10,
                    pattern: zipPattern.source,
                    onInput: (e: React.FormEvent<HTMLInputElement>) => {
                        const input = e.currentTarget;
                        const value = input.value;

                        const digits = value.replace(/\D/g, '');
                        const hasDash = value.includes('-');

                        if (digits.length > 9) {
                            input.value = value.slice(0, -1);
                            return;
                        }

                        if (hasDash && !/^\d{5}-\d{0,4}$/.test(value)) {
                            input.value = value.slice(0, -1);
                            return;
                        }

                        if (!/^\d*-?\d*$/.test(value)) {
                            input.value = value.slice(0, -1);
                            return;
                        }

                        props.setValue(props.schemaName, input.value as PathValue<T, typeof props.schemaName>, {
                            shouldValidate: false,
                            shouldDirty: true,
                        });
                    },
                }}
            />

            {props.error && <FormHelperText>{props.error}</FormHelperText>}
        </FormControl>
    );
}
