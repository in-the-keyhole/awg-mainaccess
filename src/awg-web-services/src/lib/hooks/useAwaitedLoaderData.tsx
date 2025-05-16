import { useEffect, useState } from 'react';

type UseAwaitedLoaderDataOptions<T> = {
    promise?: Promise<T | null> | null | undefined;
};

export function useAwaitedLoaderData<T>({ promise }: UseAwaitedLoaderDataOptions<T>) {
    // undefined = loading, null = valid to handle null promises
    const [data, setData] = useState<T | null | undefined>(undefined);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        setData(undefined);

        if (promise) {
            Promise.resolve(promise)
                .then((res) => {
                    if (!cancelled) {
                        setData(res);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    if (!cancelled) {
                        setError(err);
                        setLoading(false);
                    }
                });
        } else {
            setLoading(false);
            setError(null);
            setData(null);
        }

        return () => {
            cancelled = true;
        };
    }, [promise]);

    useEffect(() => {
        return () => {
            setLoading(true);
            setError(null);
            setData(null);
        };
    }, []);

    return { data, loading, error };
}
