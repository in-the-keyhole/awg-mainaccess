import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider, Loading } from '@awg/web-ui-components';
import { muiTheme } from '@awg/web-ui-styles';

import { ConfigProvider, useConfig } from './config/ConfigContext';
import App from './App/App';

import '@awg/web-ui-components/index.css';
import '@awg/mainaccess-web-ui-lib/index.css';

function WithConfig() {
    const config = useConfig();
    if (config) {
        return (
            <BrowserRouter>
                <ThemeProvider theme={muiTheme}>
                    <AuthProvider oidc={config.auth.oidc} msal={config.auth.msal}>
                        <Routes>
                            <Route index element={<App />} />
                        </Routes>
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        );
    } else {
        throw new Error("Missing configuration.");
    }
}

function Root() {
    const queryClient = new QueryClient();

    return (
        <React.StrictMode>
            <React.Suspense fallback={<Loading />}>
                <QueryClientProvider client={queryClient}>
                    <ConfigProvider>
                        <WithConfig />
                    </ConfigProvider>
                </QueryClientProvider>
            </React.Suspense>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
