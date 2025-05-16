import { ReactNode } from 'react';

import styles from './Button.module.scss';

export type ButtonProps = {
    type: 'link' | 'button';
    styleVariant: 'primary';
    children: ReactNode;
    href?: string;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
};

export function AwgButton(props: ButtonProps) {
    if (props.type === 'link') {
        return (
            <a href={props.href ?? ''} className={`${styles['button']} ${styles[props.type]} ${props.className ?? ''}`}>
                {props.children}
            </a>
        );
    }
    return (
        <button
            className={`${styles['button']} ${styles[props.type]} ${props.className ?? ''}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
