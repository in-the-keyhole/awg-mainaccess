import { styled, Tab, Tabs, Typography } from '@mui/material';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    minHeight: '1rem',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
    minWidth: 0,
    width: 'auto',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    textAlign: 'center',
    textTransform: 'none',
    display: 'block',
    textUnderlineOffset: '4px',
}));

export type AwgSubTabPanelProps = {
    prefix?: string;
    tabs: { key: string; display: string }[];
    activeTab: string;
    onChange: (activeTab: string) => void;
    ariaLabel: string;
};
/**
 * Tabs for sub navigation. These are smaller than the standard tabs, wrap when the page size is decreased,
 */
export function AwgSubTabPanel(props: AwgSubTabPanelProps) {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        props.onChange(props.tabs[newValue].key);
    };

    return (
        <StyledTabs
            variant="standard"
            value={props.tabs.findIndex((t) => t.key === props.activeTab)}
            aria-label={props.ariaLabel}
            allowScrollButtonsMobile
            onChange={handleChange}
        >
            {props.tabs.map((tab, idx) => (
                <StyledTab
                    key={`store-tab-${idx}`}
                    onClick={() => {
                        // Mui doesn't trigger onChange for the active tab. Doing so manually.
                        if (props.activeTab === tab.key) {
                            props.onChange(tab.key);
                        }
                    }}
                    label={
                        <StyledTypography
                            variant="body2"
                            sx={{
                                fontWeight: props.activeTab === tab.key ? '500' : 'normal',
                                textDecoration: props.activeTab === tab.key ? 'underline' : 'none',
                            }}
                        >
                            {tab.display}
                        </StyledTypography>
                    }
                />
            ))}
        </StyledTabs>
    );
}
