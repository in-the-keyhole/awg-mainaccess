import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';

import { AwgFieldLabel } from './FieldLabel';

export type AwgCheckboxGroupProps<T extends FieldValues> = {
    label?: string;
    schemaName: Path<T>;
    control: Control<T>;
    error?: string;
    required?: boolean;
    options: { id: string; display: string }[];
    singleOption?: boolean;
    inlineOption?: boolean;
    disabled?: boolean;
};

export function AwgCheckboxGroup<T extends FieldValues>(props: AwgCheckboxGroupProps<T>) {
    return (
        <FormControl component="fieldset" error={!!props.error}>
            {props.label && (
                <FormLabel component="legend" sx={{ width: '100%' }}>
                    <AwgFieldLabel id={`${props.schemaName}-label`} required={props.required}>
                        {props.label}
                    </AwgFieldLabel>
                </FormLabel>
            )}
            <FormGroup row sx={{ pt: props.inlineOption ? 2 : 0 }}>
                {props.options.map((option, idx) => (
                    <Controller
                        key={`${props.schemaName}-${idx}`}
                        name={props.singleOption ? props.schemaName : (`${props.schemaName}.${option.id}` as Path<T>)}
                        control={props.control}
                        render={({ field: ctrlField }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox {...ctrlField} checked={ctrlField.value} disabled={props.disabled} />
                                }
                                label={option.display}
                            />
                        )}
                    />
                ))}
            </FormGroup>
            <FormHelperText>{props.error}</FormHelperText>
        </FormControl>
    );
}
