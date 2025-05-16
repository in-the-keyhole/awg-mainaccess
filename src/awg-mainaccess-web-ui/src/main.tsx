import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ServerAppClient, ServerAuthClient } from '@awg/web-services';
import { AuthProvider } from '@awg/web-ui-components';
import { muiTheme } from '@awg/web-ui-styles';
import { ThemeProvider } from '@emotion/react';

import { Router } from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const loginRoute = '/auth/login.html';

root.render(
    <StrictMode>
        <ThemeProvider theme={muiTheme}>
            <AuthProvider
                authClient={ServerAuthClient}
                appClient={ServerAppClient}
                loginRoute={loginRoute}
                unauthorizedRoute={'/unauthorized'}
            >
                <Router />
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
