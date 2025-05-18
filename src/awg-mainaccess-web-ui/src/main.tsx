import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useHref } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { Loading, AuthProvider, type AuthContextType, useAuth, ProtectedRoute } from '@awg/web-ui-components';
import { muiTheme } from '@awg/web-ui-styles';
import '@awg/web-ui-components/index.css';
import '@awg/mainaccess-web-ui-lib/index.css';

import { ConfigProvider, type ConfigContextType, useConfig } from './config/ConfigContext';
import App from './App/App';
import { Forbidden } from './Pages/Forbidden';
import { Unauthorized } from './Pages/Unauthorized';
import { NotFound } from './Pages/NotFound';

const Body = ({
    config,
    auth
} : {
    config: ConfigContextType,
    auth: AuthContextType
}) => {
    return (
        <Routes>
            <Route index element={
                <ProtectedRoute forbidden={<Forbidden />} unauthorized={<Unauthorized />}>
                    <App />
                </ProtectedRoute>
            } />
            <Route path="*" element={
                <ProtectedRoute forbidden={<Forbidden />} unauthorized={<Unauthorized />}>
                    <NotFound />
                </ProtectedRoute>
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
    const basename = useHref('/');
    if (basename) {
        return (
            <ThemeProvider theme={muiTheme}>
                <AuthProvider oidc={config.auth.oidc} msal={config.auth.msal} baseUri={basename}>
                    <WithAuth config={config} />
                </AuthProvider>
            </ThemeProvider>
        );
    } else {
        throw new Error("Missing basename.");
    }
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
