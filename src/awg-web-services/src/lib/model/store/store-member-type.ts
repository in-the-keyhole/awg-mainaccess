export const STORE_MEMBER_TYPE = {
    M: 'Member',
    N: 'Non-Member',
} as const;

export type StoreMemberType = keyof typeof STORE_MEMBER_TYPE;
