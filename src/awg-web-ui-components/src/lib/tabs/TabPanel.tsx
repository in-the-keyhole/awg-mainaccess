import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export type AwgTabPanelProps = {
    prefix?: string;
    tabs: { key: string; display: string }[];
    activeTab: string;
    onChange: (activeTab: string) => void;
    ariaLabel: string;
};

export function AwgTabPanel(props: AwgTabPanelProps) {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        props.onChange(props.tabs[newValue].key);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <Tabs
                variant="scrollable"
                value={props.tabs.findIndex((t) => t.key === props.activeTab)}
                onChange={handleChange}
                aria-label={props.ariaLabel}
                allowScrollButtonsMobile
                scrollButtons="auto"
            >
                {props.tabs.map((tab, idx) => (
                    <Tab
                        key={`${props.prefix ?? ''}-tab-${idx}`}
                        label={tab.display}
                        onClick={() => {
                            // Mui doesn't trigger onChange for the active tab. Doing so manually.
                            if (props.activeTab === tab.key) {
                                props.onChange(tab.key);
                            }
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
