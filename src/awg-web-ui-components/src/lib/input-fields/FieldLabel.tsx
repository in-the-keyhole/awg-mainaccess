import { ReactNode } from 'react';
import { InputLabel } from '@mui/material';

type AwgFieldLabelProps = {
    required?: boolean;
    id: string;
    children: ReactNode;
};
export function AwgFieldLabel(props: AwgFieldLabelProps) {
    return (
        <InputLabel id={props.id} sx={{ display: 'flex', gap: '2px' }}>
            {props.children}
            {props.required ? (
                <sup aria-hidden="true" style={{ color: '#d32f2f' }}>
                    *
                </sup>
            ) : (
                ''
            )}
        </InputLabel>
    );
}
