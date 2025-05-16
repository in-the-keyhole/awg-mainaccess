export const STORE_TYPE_OTHER = {
    I: 'Internal Store',
    DC: 'Distribution Center',
    HZ: 'House Zone',
} as const;

export type StoreTypeOther = keyof typeof STORE_TYPE_OTHER;
