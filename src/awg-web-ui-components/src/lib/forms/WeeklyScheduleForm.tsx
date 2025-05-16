import { daysOfWeek } from '@awg/web-services';
import { Grid } from '@mui/material';

import { AwgFieldLabel } from '../input-fields/FieldLabel';
import { DayScheduleInput } from './DayScheduleInput';

export type WeeklyScheduleFormProps = {
    scheduleSchemaName: string;
    timezoneDisplay: string;
    disabled?: boolean;
    label?: string;
};

export function AwgWeeklyScheduleForm(props: WeeklyScheduleFormProps) {
    return (
        <>
            {props.label && <AwgFieldLabel id={`${props.scheduleSchemaName}-group`}>{props.label}</AwgFieldLabel>}
            <Grid
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: { lg: 2, xs: 0 },
                    flexDirection: { lg: 'row', xs: 'column' },
                }}
            >
                <Grid
                    sx={{
                        display: 'flex',
                        minWidth: '150px',
                        flexDirection: { lg: 'column', xs: 'row' },
                        flex: { lg: '0 0 auto' },
                    }}
                >
                    <Grid
                        sx={{
                            flex: { lg: '1', xs: '0 0 auto' },
                            display: 'flex',
                            alignItems: 'end',
                            minWidth: '120px',
                        }}
                    >
                        <AwgFieldLabel id={`${props.scheduleSchemaName}-days`}>Days</AwgFieldLabel>
                    </Grid>
                    <Grid
                        sx={{
                            flex: { lg: '1', xs: '1 1 auto' },
                            display: 'flex',
                            alignItems: { lg: 'end', xs: 'start' },
                            flexDirection: { lg: 'row', xs: 'column' },
                        }}
                    >
                        <AwgFieldLabel id={`${props.scheduleSchemaName}-windows`}>
                            Windows<span>{props.timezoneDisplay ? `(${props.timezoneDisplay})` : ''}</span>
                        </AwgFieldLabel>
                    </Grid>
                </Grid>
                <Grid sx={{ width: '100%', display: 'flex', gap: 1, flexDirection: { lg: 'row', xs: 'column' } }}>
                    {daysOfWeek.map((day, idx) => (
                        <Grid key={`${props.scheduleSchemaName}-${idx}`} sx={{ flex: 1 }}>
                            <DayScheduleInput
                                day={day}
                                schemaName={props.scheduleSchemaName}
                                disabled={props.disabled}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}
