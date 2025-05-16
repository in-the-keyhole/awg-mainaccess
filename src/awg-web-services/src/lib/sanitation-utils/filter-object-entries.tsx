/**
 * Given an object, filter out any entry that doesn't match the provided condition.
 * This uses recursion to also filter out nested entries.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterObjectEntries<T extends Record<string, any>>(
    obj: T,
    condition: (key: keyof T, value: T[keyof T]) => boolean
): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).flatMap(([key, value]) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const nested = filterObjectEntries(value as any, condition);
                return Object.keys(nested).length ? [[key, nested]] : [];
            }

            return condition(key as keyof T, value) ? [[key, value]] : [];
        })
    ) as Partial<T>;
}
