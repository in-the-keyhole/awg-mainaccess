export const STORE_STATUS = {
    A: 'Active',
    X: 'Inactive',
} as const;

export type StoreStatus = keyof typeof STORE_STATUS;
