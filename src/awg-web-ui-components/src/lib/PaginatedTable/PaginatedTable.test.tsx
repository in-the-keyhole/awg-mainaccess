import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AwgPaginatedTable, TableColumn } from './PaginatedTable';

const columns: TableColumn[] = [
    {
        id: 'col1',
        label: 'Column 1',
        minWidth: 100,
        width: '33%',
        format: (value: number | string | ReactElement) => {
            return <div className="col1">{value}</div>;
        },
    },
    {
        id: 'col2',
        label: 'Column 2',
        width: '10%',
    },
    {
        id: 'col3',
        label: 'Column 3',
    },
];

type TableTestRow = {
    col1: string;
    col2: number;
    col3: ReactElement;
};

const generateRows = (count: number): TableTestRow[] => {
    return Array.from({ length: count }, (_, i) => ({
        col1: `Col1 ${i}`,
        col2: i,
        col3: <span data-testid={`Col3-${i}`}>Element!</span>,
    }));
};
const rows = generateRows(13);

afterEach(() => {
    // always reset real time so that the search test is cleaned up if it fails.
    jest.useRealTimers();
});

test('shows the load indicator and hides paging on load', async () => {
    render(<AwgPaginatedTable title={'Test'} columns={columns} loading={true} pagedResult={null} />);
    const loadSpinner = await screen.findByTestId('page-spinner');
    expect(loadSpinner).toBeInTheDocument();
});

test('renders a table with null results', async () => {
    render(<AwgPaginatedTable title={'Test'} columns={columns} pagedResult={null} />);
    const emptyMessage = await screen.findByText(/no results/i);
    expect(emptyMessage).toBeInTheDocument();

    const rowCountText = screen.queryByText(/Rows per page:/i);
    expect(rowCountText).not.toBeInTheDocument();
});

test('renders a table with empty results', async () => {
    render(
        <AwgPaginatedTable
            title={'Test'}
            columns={columns}
            pagedResult={{ data: [], page: 0, totalItems: 0, totalPages: 0 }}
        />
    );
    const emptyMessage = await screen.findByText(/no results/i);
    expect(emptyMessage).toBeInTheDocument();

    const rowCountText = screen.queryByText(/Rows per page:/i);
    expect(rowCountText).not.toBeInTheDocument();
});

test('renders a table with a single page of results', async () => {
    render(
        <AwgPaginatedTable
            title={'Test Table'}
            columns={columns}
            paging={{ pageSize: 5 }}
            pagedResult={{ data: rows.slice(0, 5), page: 0, totalItems: 5, totalPages: 1 }}
        />
    );
    expect(screen.getByText('Test Table')).toBeInTheDocument();

    await assertPaginationBar('5', '1\u20135 of 5', false, false);

    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('Column 2')).toBeInTheDocument();
    expect(screen.getByText('Column 3')).toBeInTheDocument();
    const col1Cell = screen.getByText('Col1 0');
    expect(col1Cell).toBeInTheDocument();
    expect(col1Cell).toHaveClass('col1');

    expect(screen.getByText('0')).toBeInTheDocument();

    const col3Span = screen.getByTestId('Col3-0');
    expect(col3Span).toHaveTextContent('Element!');
});

test('renders a table with multiple pages of results and shows the first page', async () => {
    render(
        <AwgPaginatedTable
            title={'Test'}
            columns={columns}
            paging={{ pageSize: 5 }}
            pagedResult={{ data: rows, page: 0, totalItems: 13, totalPages: 3 }}
        />
    );
    await assertPaginationBar('5', '1\u20135 of 13', false, true);
});

test('renders a table with multiple pages of results and shows the middle page', async () => {
    render(
        <AwgPaginatedTable
            title={'Test'}
            columns={columns}
            paging={{ pageSize: 5 }}
            pagedResult={{ data: rows, page: 1, totalItems: 13, totalPages: 3 }}
        />
    );
    await assertPaginationBar('5', '6\u201310 of 13', true, true);
});

test('renders a table with multiple pages of results and shows the last page', async () => {
    render(
        <AwgPaginatedTable
            title={'Test'}
            columns={columns}
            paging={{ pageSize: 5 }}
            pagedResult={{ data: rows, page: 2, totalItems: 13, totalPages: 3 }}
        />
    );
    await assertPaginationBar('5', '11\u201313 of 13', true, false);
});

test('pagination triggered by navigation', async () => {
    const mockOnPageChange = jest.fn();
    render(
        <AwgPaginatedTable
            title={'Test'}
            columns={columns}
            paging={{ pageSize: 5 }}
            pagedResult={{ data: rows, page: 1, totalItems: 13, totalPages: 3 }}
            onPageChange={mockOnPageChange}
        />
    );

    const prevButton = getPrevButton();
    await userEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(0);

    const nextButton = getNextButton();
    await userEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
});

test('page size changed triggered by menu', async () => {
    const mockOnPageSizeChange = jest.fn();
    render(
        <AwgPaginatedTable
            title={'Test'}
            columns={columns}
            paging={{ pageSize: 5 }}
            pagedResult={{ data: rows, page: 1, totalItems: 13, totalPages: 3 }}
            onPageSizeChange={mockOnPageSizeChange}
        />
    );

    const dropdown = screen.getByLabelText('Rows per page:');
    await userEvent.click(dropdown);
    const option = await screen.findByRole('option', { name: '10' });
    await userEvent.click(option);

    expect(mockOnPageSizeChange).toHaveBeenCalledWith(10);
});

test('search triggered from input with debounce', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    try {
        const mockOnSearch = jest.fn();
        render(
            <AwgPaginatedTable
                title={'Test'}
                columns={columns}
                paging={{ pageSize: 5 }}
                pagedResult={{ data: rows, page: 1, totalItems: 13, totalPages: 3 }}
                onSearch={mockOnSearch}
            />
        );
        const input = screen.getByPlaceholderText(/search/i);
        await user.type(input, 'filter');
        expect(input).toHaveValue('filter');

        jest.advanceTimersByTime(299);
        expect(mockOnSearch).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);
        expect(mockOnSearch).toHaveBeenCalledWith('filter');
    } finally {
        jest.useRealTimers();
    }
});

test('sort triggered by column click', async () => {
    const mockOnSort = jest.fn();
    render(
        <AwgPaginatedTable
            title={'Test'}
            columns={columns}
            paging={{ pageSize: 5, sort: { sortBy: 'col1', sortDirection: 'asc' } }}
            pagedResult={{ data: rows, page: 1, totalItems: 13, totalPages: 3 }}
            onSort={mockOnSort}
        />
    );

    const col1 = await screen.findByRole('button', { name: /Column 1/i });
    await userEvent.click(col1);

    expect(mockOnSort).toHaveBeenCalledWith({ sortBy: 'col1', sortDirection: 'desc' });

    const col2 = await screen.findByRole('button', { name: /Column 2/i });
    await userEvent.click(col2);

    expect(mockOnSort).toHaveBeenCalledWith({ sortBy: 'col2', sortDirection: 'asc' });
});

function getNextButton() {
    return screen.getByRole('button', { name: /go to next page/i });
}

function getPrevButton() {
    return screen.getByRole('button', { name: /go to previous page/i });
}

async function assertPaginationBar(rowsPerPage: string, totals: string, prevState: boolean, nextState: boolean) {
    const rowCountText = await screen.findByText(/Rows per page:/i);
    expect(rowCountText).toBeInTheDocument();
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveTextContent(rowsPerPage);

    const paginationText = screen.getByText(/of \d+/i);
    expect(paginationText).toHaveTextContent(totals);

    const prevButton = getPrevButton();
    prevState ? expect(prevButton).toBeEnabled() : expect(prevButton).toBeDisabled();

    const nextButton = getNextButton();
    nextState ? expect(nextButton).toBeEnabled() : expect(nextButton).toBeDisabled();
}
