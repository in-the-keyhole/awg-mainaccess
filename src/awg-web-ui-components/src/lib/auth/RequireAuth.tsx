import { ReactNode, useEffect } from 'react';

import { useAuth } from './authContext';

type Props = {
    children: ReactNode;
    roles?: string[];
};

export function RequireAuth(props: Props) {
    const { isAuthenticated, loading, user, unauthorizedRoute, loginRoute } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            const current = window.location.href;
            const loginUrl = `${loginRoute}?redirect_uri=${encodeURIComponent(current)}`;
            window.location.href = loginUrl;
        }
    }, [loading, isAuthenticated, loginRoute]);

    if (loading || !isAuthenticated) return null;

    if (props.roles && !props.roles.includes(user?.role || '')) {
        window.location.href = unauthorizedRoute;
        return null;
    }

    return props.children;
}
