import { AwgBrandedHeader, AwgCardButton, useAuth } from '@awg/web-ui-components';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import styles from './MainAccessPage.module.scss';

const applications = [
    { name: 'Store Master', destination: '/store-master' },
    { name: 'Example 2', destination: '/store-master' },
    { name: 'Example 3', destination: '/store-master' },
    { name: 'Example 4', destination: '/store-master' },
];

export function MainAccessPage() {
    const { logout, user } = useAuth();

    return (
        <div className={styles['main-page']}>
            <AwgBrandedHeader title="AWG Main Access" onLogout={logout} userName={user?.name ?? ''} />
            <Box className={styles.content}>
                <Typography variant="h4" component="h2" align="left" gutterBottom>
                    Applications
                </Typography>

                <Box className={styles.appListingContainer}>
                    <Stack className={styles.appListing} direction={'row'}>
                        {applications.map((app, idx) => (
                            <Link
                                key={`app-${idx}-card`}
                                href={app.destination}
                                className={styles.cardLink}
                                underline="none"
                            >
                                <AwgCardButton className={styles.appCard}>
                                    <Typography>{app.name}</Typography>
                                </AwgCardButton>
                            </Link>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </div>
    );
}

if (import.meta.vitest) {
    const { it, expect, beforeEach } = import.meta.vitest;
    let render: typeof import('@testing-library/react').render;

    beforeEach(async () => {
        render = (await import('@testing-library/react')).render;
    });

    it('should render successfully', () => {
        const { baseElement } = render(<MainAccessPage />);
        expect(baseElement).toBeTruthy();
    });
}
