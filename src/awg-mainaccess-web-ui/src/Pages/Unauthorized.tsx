import { Stack, Typography, Button, } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ForbiddenImage from '../assets/403.svg?react';

export const Unauthorized = () => {
    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ mt: 4 }}>
            <Typography variant="h3" component="h3">
                Authentication Required
            </Typography>
            <Typography variant="h5" component="h5">
                Welcome to AWG. Please log in to continue.
            </Typography>
            <ForbiddenImage height="200" alt="Forbidden" />
            <Button size="large" variant="outlined" startIcon={<LoginIcon />} onClick={() => {}}>
                Log In
            </Button>
        </Stack>
    );
};
