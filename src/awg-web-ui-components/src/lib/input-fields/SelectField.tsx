import { Control, Controller, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { AwgFieldLabel } from './FieldLabel';

export type AwgSelectFieldProps<T extends FieldValues> = {
    label: string;
    schemaName: Path<T>;
    control: Control<T>;
    register: UseFormRegister<T>;
    options: { id: string; display: string }[];
    error?: string;
    required?: boolean;
    disabled?: boolean;
};

export function AwgSelectField<T extends FieldValues>(props: AwgSelectFieldProps<T>) {
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
            <Controller
                name={props.schemaName}
                control={props.control}
                render={({ field }) => (
                    <Select
                        labelId={`${props.schemaName}-label`}
                        id={`${props.schemaName}-input`}
                        {...field}
                        inputRef={register.ref}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        inputProps={{
                            'aria-required': props.required,
                        }}
                        disabled={props.disabled}
                    >
                        {props.options.map((option: { id: string; display: string }, idx: number) => (
                            <MenuItem
                                key={`${props.schemaName}-option-${idx}`}
                                value={option.id}
                                disabled={props.required && option.id === ''}
                            >
                                {option.display}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {props.error && <FormHelperText>{props.error}</FormHelperText>}
        </FormControl>
    );
}
