import { useRouteError } from 'react-router';
import { Logger } from '@awg/web-services';

export function ErrorBoundary(logger: Logger) {
    const error = useRouteError();
    logger.error(error);

    return <div>Error occurred: {(error as Error)?.message || String(error)}</div>;
}
