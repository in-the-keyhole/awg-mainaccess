import { Stack } from '@mui/material';
import NotFoundImage from '../assets/404.svg?react';

export const NotFound = () => {
    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ mt: 4 }}>
            <NotFoundImage height="400" alt="Not Found" />
        </Stack>
    );
};
