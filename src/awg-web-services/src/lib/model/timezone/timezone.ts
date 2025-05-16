export const TIME_ZONE = {
    EST: 'Eastern',
    MST: 'Mountain',
    CST: 'Central',
    PST: 'Pacific',
} as const;

export type TimeZone = keyof typeof TIME_ZONE;
