import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedCallback<T>(callback: (value: T) => void, delay: number) {
    const timeoutRef = useRef<number | null>(null);

    const debouncedCallback = useCallback(
        (value: T) => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                callback(value);
            }, delay);
        },
        [callback, delay]
    );

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedCallback;
}
