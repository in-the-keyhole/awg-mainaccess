import React, { useState } from 'react';
import { MdAccountCircle, MdArrowDropDown, MdMoreVert } from 'react-icons/md';
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import styles from './UserMenu.module.scss';

export type AwgUserMenuProps = {
    name: string;
    onLogout?: () => void;
};
export function AwgUserMenu(props: AwgUserMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        props.onLogout?.();
        handleMenuClose();
    };

    return (
        <div className={styles.userMenu}>
            <div className={styles.avatar}>
                <MdAccountCircle />
            </div>
            <div className={styles.dropdownLabel}>
                <Button disableFocusRipple className={styles.menuButton} onClick={handleMenuOpen}>
                    <Typography variant="body1" className={styles.userName}>
                        {props.name}
                    </Typography>
                    <MdArrowDropDown className={styles.dropdownArrow} />
                </Button>
            </div>
            <div className={styles.kebab} onClick={handleMenuOpen}>
                <IconButton>
                    <MdMoreVert />
                </IconButton>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
