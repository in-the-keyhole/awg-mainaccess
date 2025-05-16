import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Box, FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import { AwgFieldLabel } from './FieldLabel';

export type AwgTextFieldProps<T extends FieldValues> = {
    label: string;
    schemaName: Path<T>;
    register: UseFormRegister<T>;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    hiddenLabel?: boolean;
    placeholder?: string;
};

export function AwgTextField<T extends FieldValues>(props: AwgTextFieldProps<T>) {
    const register = props.register(props.schemaName);

    return (
        <FormControl
            variant="outlined"
            size="small"
            error={!!props.error}
            disabled={props.disabled}
            hiddenLabel={props.hiddenLabel}
            fullWidth
            sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}
        >
            {!props.hiddenLabel && (
                <AwgFieldLabel id={`${props.schemaName}-label`} required={props.required}>
                    {props.label}
                </AwgFieldLabel>
            )}

            <OutlinedInput
                id={`${props.schemaName}-input`}
                inputRef={register.ref}
                {...register}
                inputProps={{
                    'aria-labelledby': `${props.schemaName}-label`,
                    'aria-required': props.required,
                }}
                placeholder={props.placeholder}
            />

            {props.error && <FormHelperText id={`${props.schemaName}-error`}>{props.error}</FormHelperText>}
        </FormControl>
    );
}
