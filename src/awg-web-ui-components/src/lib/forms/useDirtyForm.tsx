import { useCallback, useRef, useState } from 'react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { useUnsavedChangesBlocker } from '../unsaved-changes/useUnsavedChangesBlocker';

interface UseDirtyFormProps<T extends FieldValues = FieldValues> {
    isDirty: boolean;
    handleSubmit: UseFormHandleSubmit<T>;
    onSubmit: (data: T) => unknown;
    reset: () => void;
}

export function useDirtyForm<T extends FieldValues = FieldValues>(props: UseDirtyFormProps<T>) {
    const [cancelConfirmOpen, setCancelConfirmOpen] = useState<boolean>(false);
    const blockedSubmission = useRef(false);
    const submittedSuccess = useRef(false);
    const reset = props.reset;

    const { dialog: unsavedChangesDialog } = useUnsavedChangesBlocker(props.isDirty, async () => {
        const didSubmit = await wrappedSubmit();
        return didSubmit;
    });
    const wrappedSubmit = async () => {
        blockedSubmission.current = true;
        submittedSuccess.current = false;
        try {
            await props.handleSubmit(props.onSubmit)();
        } finally {
            blockedSubmission.current = false;
        }
        return submittedSuccess.current;
    };

    const handleCancelDecision = useCallback(
        async (decision: 'no' | 'yes') => {
            setCancelConfirmOpen(false);
            if (decision === 'yes') {
                reset();
            }
        },
        [reset]
    );

    const confirmationDialog = cancelConfirmOpen ? (
        <ConfirmationDialog
            open={cancelConfirmOpen}
            onDecision={handleCancelDecision}
            description="Are you sure you want to cancel your changes?"
        />
    ) : null;

    return {
        setCancelConfirmOpen,
        blockedSubmission,
        submittedSuccess,
        unsavedChangesDialog,
        confirmationDialog,
    };
}
