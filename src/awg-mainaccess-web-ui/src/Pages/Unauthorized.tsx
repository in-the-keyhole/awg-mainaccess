import { Stack, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import UnauthorizedImage from '../assets/403.svg?react';

export const Unauthorized = () => {
    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ mt: 4 }}>
            <UnauthorizedImage height="400" alt="Unauthorized" />
            <Button size="large" variant="outlined" startIcon={<LoginIcon />} onClick={() => {}}>
                Sign In
            </Button>
        </Stack>
    );
};
