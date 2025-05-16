import { Box, Button } from '@mui/material';

interface FormActionBarProps {
    saving: boolean;
    isDirty: boolean;
    onCancel: () => void;
}

export function FormActionBar(props: FormActionBarProps) {
    const handleCancelClick = () => {
        if (props.isDirty) {
            props.onCancel();
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, pt: 5 }}>
            <Button disabled={props.saving} variant="outlined" size="small" onClick={handleCancelClick}>
                Cancel
            </Button>
            <Button
                disabled={props.saving}
                color="secondary"
                variant="contained"
                size="small"
                type="submit"
                sx={{ color: 'white' }}
            >
                Save
            </Button>
        </Box>
    );
}
