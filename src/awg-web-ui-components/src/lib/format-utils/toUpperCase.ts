export function toUpperCase(value: string) {
    if (!value || !value.trim()) {
        return value;
    }
    return (value as string).trim().charAt(0).toUpperCase() + (value as string).slice(1);
}
