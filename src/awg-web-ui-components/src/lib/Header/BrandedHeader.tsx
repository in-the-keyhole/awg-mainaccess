import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import logo from './assets/AWGLogo2.png';
import styles from './BrandedHeader.module.scss';
import { AwgUserMenu } from './UserMenu';

export type BrandedHeaderProps = {
    title: string;
    userName: string;
    onLogout?: () => void;
};

export function AwgBrandedHeader(props: BrandedHeaderProps) {
    return (
        <AppBar id={'awg-page-header'} position="sticky" className={styles.header}>
            <img className={styles.logo} alt="American Wholesale Grocers Logo" src={logo} />
            <Toolbar className={styles.toolbar}>
                <Typography variant="h2" component="h1" className={styles.title}>
                    {props.title}
                </Typography>
                <div className={styles.menu}>
                    <AwgUserMenu name={props.userName} onLogout={props.onLogout} />
                </div>
            </Toolbar>
        </AppBar>
    );
}
