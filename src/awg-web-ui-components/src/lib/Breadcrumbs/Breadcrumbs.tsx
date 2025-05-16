import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

export type NavigationDestination = {
    display: string;
    destination: string;
};

export type AwgBreadcrumbsProps = {
    links: NavigationDestination[];
    lastActive?: boolean;
};

const StyledBreadcrumb = styled(Breadcrumbs)(() => ({
    fontSize: '0.85rem',
    '.MuiLink-root': {
        '&:hover': {
            transition: 'font-weight 0.3s ease',
            fontWeight: 600,
        },
    },
}));

export function AwgBreadcrumbs(props: AwgBreadcrumbsProps) {
    return (
        <div id="nav-breadcrumbs" role="presentation">
            <StyledBreadcrumb separator="›" aria-label="breadcrumb">
                {props.links.map((link, idx) => {
                    return (
                        <Link
                            key={`breadcrumb-${idx}`}
                            underline="none"
                            color={props.lastActive && idx === props.links.length - 1 ? 'text.primary' : 'inherit'}
                            href={link.destination}
                        >
                            {link.display}
                        </Link>
                    );
                })}
            </StyledBreadcrumb>
        </div>
    );
}
