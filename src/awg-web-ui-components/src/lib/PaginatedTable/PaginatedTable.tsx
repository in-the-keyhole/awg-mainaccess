import { ReactElement, useEffect, useState } from 'react';
import { PagedQuery, PagedResult, SortOption, useDebouncedCallback } from '@awg/web-services';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { AwgDelayedSpinner } from '../DelayedSpinner/DelayedSpinner';
import { AwgSearchField } from '../input-fields/SearchField';

export interface TableRowData {
    [key: string]: string | number | ReactElement;
}

export interface TableColumn {
    id: string;
    label: string;
    minWidth?: number;
    width?: string;
    align?: 'right';
    format?: (value: unknown) => string | ReactElement;
}

export type AwgPaginatedTableProps<T extends TableRowData> = {
    title?: string;
    columns: TableColumn[];
    emptyResultMessage?: string;
    loading?: boolean;
    paging?: PagedQuery;
    pagedResult: PagedResult<T> | null;
    onSearch?: (searchTerm: string) => void;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (count: number) => void;
    onSort?: (sort: SortOption<string>) => void;
};

const ROWS_PER_PAGE = [5, 10, 25];

export function AwgPaginatedTable<T extends TableRowData>(props: AwgPaginatedTableProps<T>) {
    const orderBy = props.paging?.sort?.sortBy;
    const order = props.paging?.sort?.sortDirection;
    const rowsPerPage = props.pagedResult?.pageSize ?? props.paging?.pageSize ?? 10;

    const [searchInputValue, setSearchInputValue] = useState('');
    const debouncedSearch = useDebouncedCallback<string>((value) => {
        props.onSearch?.(value);
    }, 300);

    useEffect(() => {
        if (!props.paging?.search) {
            setSearchInputValue('');
        }
    }, [props.paging?.search]);

    const handleChangePage = (event: unknown, newPage: number) => {
        props.onPageChange?.(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onPageSizeChange?.(+event.target.value);
    };

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';

        props.onSort?.({ sortBy: property, sortDirection: isAsc ? 'desc' : 'asc' });
    };

    const handleInputChange = (value: string) => {
        setSearchInputValue(value);
        debouncedSearch(value);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        (props.pagedResult?.page ?? 0) > 0 ? Math.max(0, rowsPerPage - (props.pagedResult?.data.length ?? 0)) : 0;
    const tableBody =
        !props.pagedResult?.data || props.pagedResult?.data?.length === 0 ? (
            <TableRow>
                <TableCell colSpan={999} align="center">
                    <Typography variant="caption">{props.emptyResultMessage ?? 'No results'}</Typography>
                </TableCell>
            </TableRow>
        ) : (
            <>
                {(props.pagedResult?.data ?? []).map((row, idx) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={`${row.storeNumber}-${idx}`}>
                            {props.columns.map((column, idx) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={`col-${idx}`} align={column.align}>
                                        {column.format ? column.format(value) : value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow
                        style={{
                            height: 33 * emptyRows,
                        }}
                    >
                        <TableCell colSpan={4} />
                    </TableRow>
                )}
            </>
        );

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                }}
            >
                {props.title && (
                    <Typography variant="h4" component="h3" sx={{ pb: 1 }}>
                        {props.title}
                    </Typography>
                )}
                {props.onSearch && (
                    <Box
                        sx={{
                            pb: 1,
                            width: '200px',
                            alignSelf: 'end',
                            display: 'flex',
                            justifySelf: 'end',
                        }}
                    >
                        <AwgSearchField value={searchInputValue} onChange={handleInputChange} />
                    </Box>
                )}
            </Box>
            <TableContainer sx={{ borderRadius: 1 }}>
                <Table stickyHeader aria-label="sticky table" size={'small'}>
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, width: column.width }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={(event) => handleRequestSort(event, column.id)}
                                    >
                                        {column.label}
                                        {orderBy === column.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.loading ? (
                            <TableRow
                                style={{
                                    height: 33 * rowsPerPage,
                                }}
                            >
                                <TableCell colSpan={999} align="center">
                                    <AwgDelayedSpinner delayMs={0} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableBody
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {props.pagedResult && props.pagedResult.totalItems > 0 && (
                <TablePagination
                    rowsPerPageOptions={ROWS_PER_PAGE}
                    component="div"
                    count={props.pagedResult?.totalItems ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={props.pagedResult?.page ?? 0}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </>
    );
}
