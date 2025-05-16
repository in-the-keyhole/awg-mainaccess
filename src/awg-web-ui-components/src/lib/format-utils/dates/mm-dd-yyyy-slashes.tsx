const slashDateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
});

// Accept a string representing an ISO 8601 date
// and return it formatted as MM/DD/YYYY.
export function formatDateMMDDYYYYSlashes(input?: string | Date) {
    if (!input) {
        return '';
    }
    const date: Date = new Date((input as Date) ? input : isoFormatDate(input as string));
    const formattedDate = slashDateFormatter.format(date);
    return `${formattedDate}`;
}

// clean up date represented as '2023-12-20 19:50:20 UTC' which chrome can handle, but safari cannot.
export const isoFormatDate = (inputDate: string) => {
    return inputDate.replace(' ', 'T').replace(' UTC', 'Z');
};
