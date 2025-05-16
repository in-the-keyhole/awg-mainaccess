import { useEffect, useState } from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';

interface AwgDelayedSpinnerProps {
    delayMs?: number; // Time before showing spinner (ms)
    size?: number;
}

export function AwgDelayedSpinner({ delayMs: delay = 500, size = 40 }: AwgDelayedSpinnerProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    if (!visible) return null;

    return (
        <Fade className="page-spinner" data-testid="page-spinner" in timeout={300}>
            <Box display="flex" justifyContent="center" alignItems="center" py={2}>
                <CircularProgress size={size} />
            </Box>
        </Fade>
    );
}
