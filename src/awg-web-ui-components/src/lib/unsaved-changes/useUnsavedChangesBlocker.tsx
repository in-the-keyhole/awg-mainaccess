import { useCallback, useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

import { UnsavedChangesDialog } from './UnsavedChangesDialog';

export function useUnsavedChangesBlocker(
    isDirty: boolean,
    saveAndContinue?: (destination?: Location) => Promise<boolean>
) {
    const blocker = useBlocker(isDirty);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setOpen(true);
        }
    }, [blocker]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isDirty || open) return;
            e.preventDefault();
            e.returnValue = ''; // This is needed for chromium, ignore deprecation
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty, open]);

    const handleDecision = useCallback(
        async (decision: 'stay' | 'leave' | 'save') => {
            setOpen(false);
            if (decision === 'leave') {
                blocker.proceed?.();
            } else if (decision === 'save') {
                const saveSuccess = await saveAndContinue?.();
                if (saveSuccess) {
                    blocker.proceed?.();
                }
            } else {
                blocker.reset?.();
            }
        },
        [blocker, saveAndContinue]
    );

    const dialog = open ? (
        <UnsavedChangesDialog
            open
            title="Unsaved Changes"
            onDecision={handleDecision}
            showSaveOption={!!saveAndContinue}
        />
    ) : null;

    return { dialog, blocker };
}
