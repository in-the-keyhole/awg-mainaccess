import { Button } from '@mui/material';
import { styled } from '@mui/system';

/**
 * A card that is styled to serve as a button. It will
 * bold the text on hover and enhance the shadow.
 */
export const AwgCardButton = styled(Button)(({ theme }) => {
    const shadows = theme.shadows as Record<string, string>;

    return {
        width: '100%',
        display: 'block',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,

        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        boxShadow: shadows[2],
        textTransform: 'none',
        transition: 'all 0.3s ease',
        '.MuiLink-root': {
            color: theme.palette.text.primary,
        },
        '&:hover': {
            boxShadow: shadows[4],
            '.MuiTypography-root': {
                transition: 'font-weight 0.3s ease',
                fontWeight: 700,
            },
        },
    };
});
