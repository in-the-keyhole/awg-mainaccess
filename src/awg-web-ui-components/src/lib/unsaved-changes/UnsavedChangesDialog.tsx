import { createPortal } from 'react-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export type UnsavedChangesDialogProps = {
    open: boolean;
    title: string;
    onDecision: (decision: 'stay' | 'leave' | 'save') => void;
    description?: string;
    showSaveOption?: boolean;
};

export function UnsavedChangesDialog({
    open,
    title = 'Unsaved Changes',
    description = 'You have unsaved changes. What would you like to do?',
    onDecision,
    ...props
}: UnsavedChangesDialogProps) {
    const dialog = (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onDecision('leave')}>Discard & Leave</Button>
                <Button variant="contained" color="primary" sx={{ color: 'white' }} onClick={() => onDecision('stay')}>
                    Stay
                </Button>
                {props.showSaveOption && (
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ color: 'white' }}
                        onClick={() => onDecision('save')}
                    >
                        Save & Continue
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );

    return createPortal(dialog, document.body);
}
