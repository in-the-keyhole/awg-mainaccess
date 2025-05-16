import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import { AwgFieldLabel } from './FieldLabel';

export type AwgNumericTextFieldProps<T extends FieldValues> = {
    label: string;
    schemaName: Path<T>;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    error?: string | null;
    maxLength?: number;
    required?: boolean;
    disabled?: boolean;
};

/**
 * Built in fields of type numeric can have inconsistent behaviors on mobile phones and in some browsers add unwanted spinners.
 * Instead, using a text field and giving it a numeric type.
 */
export function AwgNumericTextField<T extends FieldValues>(props: AwgNumericTextFieldProps<T>) {
    const register = props.register(props.schemaName);

    return (
        <FormControl
            variant="outlined"
            size="small"
            error={!!props.error}
            fullWidth
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
                    inputMode: 'numeric' as React.HTMLAttributes<HTMLInputElement>['inputMode'],
                    maxLength: props.maxLength,
                    onInput: (e: React.FormEvent<HTMLInputElement>) => {
                        const input = e.currentTarget;
                        let sanitized = input.value.replace(/[^\d]/g, '');
                        if (props.maxLength) {
                            sanitized = sanitized.slice(0, props.maxLength);
                        }
                        input.value = sanitized;

                        props.setValue(props.schemaName, sanitized as PathValue<T, typeof props.schemaName>, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    },
                }}
            />

            {props.error && <FormHelperText id={`${props.schemaName}-error`}>{props.error}</FormHelperText>}
        </FormControl>
    );
}
