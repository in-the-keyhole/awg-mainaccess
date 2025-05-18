import { Stack, Typography, } from '@mui/material';
import ForbiddenImage from '../assets/401.svg?react';

export const Forbidden = () => {
    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ mt: 4 }}>
            <Typography variant="h3" component="h3">
                Authorization Required
            </Typography>
            <Typography variant="h5" component="h5">
                Access to this page is denied.
            </Typography>
            <ForbiddenImage height="200" alt="Forbidden" />
        </Stack>
    );
};
