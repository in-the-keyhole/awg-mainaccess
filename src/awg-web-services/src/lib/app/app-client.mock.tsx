import { createLogger } from '../logger/logger';
import { PagedQuery, PagedResult } from '../model/paging/paging';
import { Store } from '../model/store/store';
import { StoreListing, StoreSortField } from '../model/store/store-listing';
import { AppClient, Failure, Success } from './app-client';

const APP_BASE = '/app';
const loginRoute = '/auth';

const logger = createLogger();
export const ServerAppClient: AppClient = {
    async getSupportCenters(): Promise<{ name: string; id: string }[] | null> {
        const res = await fetch(`${APP_BASE}/support-centers`, {
            credentials: 'include',
        });
        if (res.status === 403) {
            window.location.href = loginRoute;
        }
        if (!res.ok) return null;
        return await res.json();
    },

    async getSupportStores(
        paging: PagedQuery<StoreSortField>,
        supportCenterId?: string
    ): Promise<PagedResult<StoreListing> | null> {
        const params = new URLSearchParams();

        Object.entries(paging).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (typeof value === 'object' && !Array.isArray(value)) {
                Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                    if (nestedValue !== undefined && nestedValue !== null) {
                        params.append(nestedKey, String(nestedValue));
                    }
                });
            } else {
                params.append(key, String(value));
            }
        });
        if (supportCenterId) {
            params.append('supportCenterId', supportCenterId);
        }

        const url = supportCenterId ? `${APP_BASE}/support-stores?${params.toString()}` : `${APP_BASE}/support-stores`;
        const res = await fetch(url, {
            credentials: 'include',
        });

        if (res.status === 403) {
            window.location.href = loginRoute;
        }
        if (!res.ok) return null;
        return await res.json();
    },

    getStore: async function (storeId?: string): Promise<Store[] | null> {
        const url = storeId ? `${APP_BASE}/stores?storeId=${encodeURIComponent(storeId)}` : `${APP_BASE}/stores`;
        const res = await fetch(url, {
            credentials: 'include',
        });

        if (res.status === 403) {
            window.location.href = loginRoute;
        }
        if (!res.ok) {
            return null;
        }
        return await res.json();
    },

    putStore: async function (storeRequest: Partial<Store>): Promise<Success<Store> | Failure> {
        try {
            const url = `${APP_BASE}/store/storeRequest.id ?? ''`;
            const res = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storeRequest),
            });

            if (!res.ok) {
                const error = await res.json();
                return { success: false, error };
            }

            const data = await res.json();
            return { success: true, data };
        } catch (err) {
            logger.error(err);
            return {
                success: false,
                error: {
                    message: 'Network or unknown error',
                    errors: {},
                },
            };
        }
    },

    postStore: async function (storeRequest: Partial<Store>): Promise<Success<Store> | Failure> {
        try {
            const url = `${APP_BASE}/store`;
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storeRequest),
            });

            if (!res.ok) {
                const error = await res.json();
                return { success: false, error };
            }

            const data = await res.json();
            return { success: true, data };
        } catch (err) {
            logger.error(err);
            return {
                success: false,
                error: {
                    message: 'Network or unknown error',
                    errors: {},
                },
            };
        }
    },
    logger: logger,
};
