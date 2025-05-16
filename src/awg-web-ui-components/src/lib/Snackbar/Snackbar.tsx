import { Alert, Snackbar } from '@mui/material';

export type AwgSnackbarProps = {
    variant: 'message' | 'alert';
    displayText: string;
    autoHideDuration?: number;
    alertSeverity?: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
    onClose: () => void;
};

export function AwgSnackbar({ autoHideDuration = 6000, ...props }: AwgSnackbarProps) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={props.open}
            onClose={() => {
                props.onClose?.();
            }}
            autoHideDuration={autoHideDuration}
            message={props.variant === 'message' ? props.displayText : undefined}
        >
            {/* this ternary prevents a flash when the alert closes*/}
            {props.variant === 'alert' && props.open ? (
                <Alert severity={props.alertSeverity} onClose={() => props.onClose?.()}>
                    {props.displayText}
                </Alert>
            ) : (
                <div />
            )}
        </Snackbar>
    );
}
