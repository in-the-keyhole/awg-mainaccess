import { Stack } from '@mui/material';
import ForbiddenImage from '../assets/401.svg?react';

export const Forbidden = () => {
    return (
        <Stack alignItems="center" justifyContent="center" spacing={4} sx={{ mt: 4 }}>
            <ForbiddenImage height="400" alt="Forbidden" />
        </Stack>
    );
};
