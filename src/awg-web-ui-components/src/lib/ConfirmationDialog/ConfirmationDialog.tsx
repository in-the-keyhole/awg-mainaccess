import { createPortal } from 'react-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export type ConfirmationDialogProps = {
    open: boolean;
    onDecision: (decision: 'yes' | 'no') => void;
    title?: string;
    description?: string;
    yesLabel?: string;
    noLabel?: string;
};

export function ConfirmationDialog({
    open,
    title = 'Confirmation',
    description = 'Are you sure you want to continue?',
    yesLabel = 'Yes',
    noLabel = 'No',
    onDecision,
    ...props
}: ConfirmationDialogProps) {
    const dialog = (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onDecision('no')}>{noLabel}</Button>
                <Button variant="contained" color="secondary" sx={{ color: 'white' }} onClick={() => onDecision('yes')}>
                    {yesLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );

    return createPortal(dialog, document.body);
}
