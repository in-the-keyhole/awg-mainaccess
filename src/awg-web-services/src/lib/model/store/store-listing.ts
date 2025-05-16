import { StoreMemberType } from './store-member-type';

export type StoreSortField = 'storeNumber' | 'physicalName' | 'equityNumber' | 'memberType';

export type StoreListing = {
    id: string;
    storeNumber: string;
    physicalName: string;
    equityNumber: string;
    memberType: StoreMemberType;
};
