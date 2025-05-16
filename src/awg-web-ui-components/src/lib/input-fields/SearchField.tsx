import { MdSearch } from 'react-icons/md';
import { Box, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';

export type AwgSearchFieldProps = {
    value: string;
    onChange?: (val: string) => void;
    onSearch?: () => void;
};

export function AwgSearchField(props: AwgSearchFieldProps) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                '&:focus-within': {
                    borderColor: theme.palette.primary.main,
                },
            }}
        >
            <InputBase
                sx={{ flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                value={props.value}
                onChange={(e) => props.onChange?.(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '4px' }} aria-label="search" onClick={props.onSearch}>
                <MdSearch />
            </IconButton>
        </Box>
    );
}
