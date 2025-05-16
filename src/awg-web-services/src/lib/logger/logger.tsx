export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type ConsoleMethod = (...args: Parameters<typeof console.log>) => void;

export interface Logger {
    debug: ConsoleMethod;
    info: ConsoleMethod;
    warn: ConsoleMethod;
    error: ConsoleMethod;
}

export const createLogger = (
    level: LogLevel = 'info',
    output?: (level: LogLevel, ...args: unknown[]) => void
): Logger => {
    const levels: Record<LogLevel, number> = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    };

    const minLevel = levels[level];

    const log = (logLevel: LogLevel, ...args: unknown[]) => {
        if (levels[logLevel] < minLevel) return;

        if (output) {
            output(logLevel, ...args);
        } else {
            const prefix = `[${logLevel.toUpperCase()}]`;
            console[logLevel === 'debug' ? 'log' : logLevel](prefix, ...args);
        }
    };

    return {
        debug: (...args) => log('debug', ...args),
        info: (...args) => log('info', ...args),
        warn: (...args) => log('warn', ...args),
        error: (...args) => log('error', ...args),
    };
};
