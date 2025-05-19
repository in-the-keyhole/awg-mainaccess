import { createContext, useContext } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { type OidcAuthProviderConfig, type MsalAuthProviderConfig } from '@awg/web-ui-components';

export type ConfigContextType = {
    baseUri: string;
    auth: {
        oidc: OidcAuthProviderConfig;
        msal: MsalAuthProviderConfig;
    }
};

export const Config = createContext<ConfigContextType | null>(null);

type ConfigProviderProps = {
    children: React.ReactNode;
};

const fetchConfig = async () => {
    const resp = await fetch("/config");
    const json = await resp.json();
    return json;
};

export function ConfigProvider(props: ConfigProviderProps) {
    const query = useSuspenseQuery({ queryKey: ['fetchConfig'], queryFn: fetchConfig });

    return (
        <Config.Provider value={query.data ?? null}>
            {props.children}
        </Config.Provider>
    );
}

export function useConfig() {
    return useContext(Config);
}
