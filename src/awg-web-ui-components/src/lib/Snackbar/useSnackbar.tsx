import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AwgSnackbar } from './Snackbar';

export function useSnackbar() {
    const [snackbarDisplay, setSnackbarDisplay] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.snackbar) {
            setSnackbarDisplay(location.state.snackbar);

            // Replace the history so that the snackbar doesn't show again when they refresh or navigate back.
            const url = window.location.pathname + window.location.search + window.location.hash;
            window.history.replaceState(null, '', url);
        }
    }, [location.state]);

    const snackbar = snackbarDisplay ? (
        <AwgSnackbar
            variant="alert"
            alertSeverity={snackbarDisplay?.type}
            displayText={snackbarDisplay?.text ?? ''}
            onClose={() => setSnackbarDisplay(null)}
            open={true}
            autoHideDuration={3000}
        />
    ) : null;

    return {
        setSnackbarDisplay,
        snackbar,
    };
}
