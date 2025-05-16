import { ReactNode } from 'react';

import { RequireAuth } from './RequireAuth';

type WithAuthGuardOptions = {
    roles?: string[];
};

export function withAuthGuard(element: ReactNode, options?: WithAuthGuardOptions) {
    return <RequireAuth roles={options?.roles}>{element}</RequireAuth>;
}
