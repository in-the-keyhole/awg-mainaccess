import { createTheme } from '@mui/material/styles';

const getStringValue = (value: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(value).trim() ?? '';
};

const getNumericValue = (value: string) => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue(value).trim(), 10);
};

export const muiTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    color: getStringValue('--color-text'),
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    disableRipple: true,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderRight: getStringValue('--table-border'),
                },
                head: {
                    fontWeight: 'bold',
                    backgroundColor: getStringValue('--color-table-header'),
                    borderRight: getStringValue('--table-border'), // Border for header cells
                },
                body: {
                    '&:first-of-type': {
                        borderLeft: '1px solid rgba(224, 224, 224, 1)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    disableRipple: true,
                    transition: 'none',
                    fontFamily: getStringValue('--font-family-headers'),
                    textTransform: 'none',
                    color: getStringValue('--color-text'),
                    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                    fontWeight: 'normal',
                    letterSpacing: 'normal',
                    fontSize: '1rem',
                    font: theme.typography.body1.font,
                }),
                contained: ({ theme }) => ({
                    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                    boxShadow: 'none',
                }),
                outlined: ({ theme }) => ({
                    borderWidth: 2,
                    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                }),
                sizeSmall: ({ theme }) => ({
                    padding: `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
                }),
                sizeLarge: ({ theme }) => ({
                    padding: `${theme.spacing(1.25)} ${theme.spacing(2.75)}`,
                }),
                outlinedSizeSmall: ({ theme }) => ({
                    padding: `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
                    borderWidth: 2,
                }),
                outlinedSizeLarge: ({ theme }) => ({
                    padding: `${theme.spacing(1.25)} ${theme.spacing(2.75)}`,
                    borderWidth: 2,
                }),
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    padding: '2px 4px',
                },
                input: {
                    padding: '2px 4px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        padding: '2px 4px',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        padding: '2px 4px',
                    },
                    input: {
                        '&.Mui-disabled': {
                            WebkitTextFillColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'rgba(0, 0, 0, 0.5)',
                            opacity: 1,
                        },
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'rgba(0, 0, 0, 0.6)',
                },
            },
        },

        MuiFilledInput: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        padding: '2px 4px',
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        padding: '2px 4px',
                    },
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: 'standard',
            },
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        ps: 0.5,
                        pe: 0,
                        py: 1,
                    },
                },
            },
        },
        MuiAutocomplete: {
            defaultProps: {
                fullWidth: true,
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    overflow: 'visible',
                    position: 'static',
                    transform: 'none',
                    marginBottom: '0.25',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&.Mui-disabled': {
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'rgba(0, 0, 0, 0.6)',
                    },
                },
                shrink: {
                    transform: 'none',
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    position: 'static',
                    transform: 'none',
                    marginBottom: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginTop: '0.25rem',
                    marginLeft: 0,
                },
            },
        },
    },
    palette: {
        primary: {
            main: getStringValue('--color-base-gray'),
        },
        secondary: {
            main: getStringValue('--color-secondary'),
        },
        text: {
            primary: getStringValue('--color-text'),
        },
    },
    typography: {
        fontWeightRegular: 400,
        fontFamily: getStringValue('--font-family-base'),
        h1: {
            fontFamily: getStringValue('--font-family-headers'),
            fontSize: '3.375rem',
            fontWeight: '700',
            lineHeight: '3.375rem',
        },
        h2: {
            fontFamily: getStringValue('--font-family-headers'),
            fontSize: '2.625rem',
            fontWeight: '700',
            lineHeight: '2.75rem',
        },
        h3: {
            fontFamily: getStringValue('--font-family-headers'),
            fontSize: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.875rem',
        },
        h4: {
            fontFamily: getStringValue('--font-family-headers'),
            fontSize: '1.25rem',
            fontWeight: '700',
            lineHeight: '1.5rem',
        },
    },

    breakpoints: {
        values: {
            xs: getNumericValue('--breakpoint-xs'),
            sm: getNumericValue('--breakpoint-sm'),
            md: getNumericValue('--breakpoint-md'),
            lg: getNumericValue('--breakpoint-lg'),
            xl: getNumericValue('--breakpoint-xl'),
        },
    },
});
