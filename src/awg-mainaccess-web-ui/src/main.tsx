import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useHref } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { Loading, AuthProvider } from '@awg/web-ui-components';
import { muiTheme } from '@awg/web-ui-styles';

import { ConfigProvider, type ConfigContextType, useConfig } from './config/ConfigContext';
//import App from './App/App';

import '@awg/web-ui-components/index.css';
import '@awg/mainaccess-web-ui-lib/index.css';

/**
 * Adds components that require authentication to be loaded.
 * @returns 
 */
const WithAuth = () => {
    return (
        <Routes>
            <Route index element={
                <div>hi</div>
            } />
        </Routes>
    );
};

/**
 * Adds components that require the router to be loaded.
 * @param props
 * @returns 
 */
const WithRouter = ({config}: {config: ConfigContextType}) => {
    return (
        <AuthProvider oidc={config.auth.oidc} msal={config.auth.msal} baseUri={useHref('/')}>
            <WithAuth />
        </AuthProvider>
    );
};

/**
 * Adds components that require configuration to be loaded.
 * @returns 
 */
const WithConfig = () => {
    const config = useConfig();
    if (config) {
        return (
            <BrowserRouter>
                <ThemeProvider theme={muiTheme}>
                    <WithRouter config={config} />
                </ThemeProvider>
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
