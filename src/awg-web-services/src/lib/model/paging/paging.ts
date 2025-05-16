export type SortDirection = 'asc' | 'desc';

export type SortOption<T extends string> = {
    sortBy: T;
    sortDirection: SortDirection;
};

export type PagedQuery<TSort extends string = string> = {
    page: number;
    pageSize: number;
    search?: string;
    sort?: SortOption<TSort>;
};

export type PagedResult<T> = {
    data: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
};
