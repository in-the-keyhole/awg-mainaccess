import { createContext, useContext } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { type OidcAuthProviderConfig, type MsalAuthProviderConfig } from '@awg/web-ui-components';

export type ConfigContextType = {
    auth: {
        oidc: OidcAuthProviderConfig;
        msal: MsalAuthProviderConfig;
    }
};

export const ConfigContext = createContext<ConfigContextType | null>(null);

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
        <ConfigContext.Provider value={query.data ?? null}>
            {props.children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    return useContext(ConfigContext);
}
