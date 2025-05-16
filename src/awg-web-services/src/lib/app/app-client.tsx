import { Logger } from '../logger/logger';
import { PagedQuery, PagedResult } from '../model/paging/paging';
import { Store } from '../model/store/store';
import { StoreListing, StoreSortField } from '../model/store/store-listing';
import { ValidationErrorResponse } from '../model/validation/ValidationErrorResponse';

export type Success<T> = { success: true; data: T };
export type Failure = { success: false; error: ValidationErrorResponse };

export interface AppClient {
    putStore: (storeRequest: Partial<Store>) => Promise<Success<Store> | Failure>;
    postStore: (storeRequest: Partial<Store>) => Promise<Success<Store> | Failure>;
    getSupportCenters: () => Promise<{ name: string; id: string }[] | null>;
    getSupportStores: (
        paging: PagedQuery<StoreSortField>,
        supportCenterId?: string
    ) => Promise<PagedResult<StoreListing> | null>;
    getStore: (storeId?: string) => Promise<Store[] | null>;
    logger: Logger;
}
