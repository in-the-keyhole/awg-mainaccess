import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { withAuthGuard } from '@awg/web-ui-components';

import App from './App/App';

const router = createBrowserRouter(
    [
        {
            path: '*',
            element: withAuthGuard(<App />),
            errorElement: <div>An error occurred.</div>, // TODO
        },
        {
            path: '/unauthorized',
            element: <div>Unauthorized</div>, // TODO
        },
    ],
    {
        basename: '/landing',
        future: {
            v7_relativeSplatPath: true,
        },
    }
);

export function Router() {
    return <RouterProvider router={router}></RouterProvider>;
}
