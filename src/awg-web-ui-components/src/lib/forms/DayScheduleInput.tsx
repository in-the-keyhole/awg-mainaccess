import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';

import { toUpperCase } from '../format-utils/toUpperCase';
import { AwgCheckboxGroup } from '../input-fields/CheckboxGroup';
import { AwgTextField } from '../input-fields/TextField';

export type DayScheduleInputProps = {
    schemaName: string;
    day: string;
    disabled?: boolean;
};

export function DayScheduleInput(props: DayScheduleInputProps) {
    const base = `${props.schemaName}.${props.day}`;

    const { register, control } = useFormContext();

    const display = `${toUpperCase(props.day)}`;

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', lg: 'column' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
                <AwgCheckboxGroup
                    schemaName={`${base}.enabled`}
                    control={control}
                    singleOption
                    options={[
                        {
                            id: props.day,
                            display: display,
                        },
                    ]}
                    disabled={props.disabled}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <AwgTextField
                    label={`${props.day} windows`}
                    schemaName={`${base}.windows`}
                    register={register}
                    disabled={props.disabled}
                    hiddenLabel={true}
                    placeholder={display}
                />
            </Box>
        </Box>
    );
}
