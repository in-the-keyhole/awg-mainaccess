import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { Loading, AuthProvider, type AuthContextType, useAuth, ProtectedRoute } from '@awg/web-ui-components';
import { muiTheme } from '@awg/web-ui-styles';
import '@awg/web-ui-components/index.css';
import '@awg/mainaccess-web-ui-lib/index.css';

import { ConfigProvider, type ConfigContextType, useConfig } from './config.tsx';
import App from './App/App.tsx';
import { Forbidden } from './Pages/Forbidden.tsx';
import { Unauthorized } from './Pages/Unauthorized.tsx';
import { NotFound } from './Pages/NotFound.tsx';

/**
 * Page to show when a user is not authorized.
 * @param auth
 * @param children
 * @constructor
 */
const UnauthorizedPage = ({
    auth
} : {
    auth: AuthContextType
}) => {
    return (
        <Unauthorized onSignIn={async returnUrl => await auth.signIn(returnUrl)} />
    );
};

const Body = ({
    auth
} : {
    config: ConfigContextType,
    auth: AuthContextType
}) => {
    return (
        <Routes>
            <Route index element={
                <ProtectedRoute forbidden={<Forbidden />} unauthorized={<UnauthorizedPage auth={auth} />}>
                    <App />
                </ProtectedRoute>
            } />
            <Route path="*" element={
                <NotFound />
            } />
        </Routes>
    );
}

/**
 * Adds components that require the authentication context to be present.
 * @returns 
 */
const WithAuth = ({
    config
} : {
    config: ConfigContextType
}) => {
    const auth = useAuth();
    if (auth) {
        return <Body config={config} auth={auth} />;
    } else {
        throw new Error("Missing authentication.");
    }
};

/**
 * Adds components that require the router context to be present.
 * @returns
 */
const WithRouter = ({
    config
} : {
    config: ConfigContextType
}) => {
    const navigate = useNavigate();

    /**
     * Invoked when the authentication provider completes an authentication action and must return to a location.
     * @param url
     */
    const onNavigate = (url: string) => {
        navigate(url);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <AuthProvider oidc={config.auth.oidc} msal={config.auth.msal} baseUri={config.baseUri} onNavigate={onNavigate} loadingElement={<Loading />}>
                <WithAuth config={config} />
            </AuthProvider>
        </ThemeProvider>
    );
}

/**
 * Adds components that require the configuration context to be present.
 * @returns
 */
const WithConfig = () => {
    const config = useConfig();
    if (config) {
        return (
            <BrowserRouter>
                <WithRouter config={config} />
            </BrowserRouter>
        );
    } else {
        throw new Error("Missing configuration.");
    }
};

const Root = () => {
    return (
        <React.StrictMode>
            <React.Suspense fallback={<Loading />}>
                <QueryClientProvider client={new QueryClient()}>
                    <ConfigProvider>
                        <WithConfig />
                    </ConfigProvider>
                </QueryClientProvider>
            </React.Suspense>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
