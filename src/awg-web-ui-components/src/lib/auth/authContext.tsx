import { createContext, useContext, useEffect, useState } from 'react';
import { AppClient, AuthClient, AuthUser } from '@awg/web-services';

type AuthContextType = {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    loginRoute: string;
    unauthorizedRoute: string;
    appClient: AppClient;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
    authClient: AuthClient;
    appClient: AppClient;
    loginRoute: string;
    unauthorizedRoute: string;
};

export function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            props.authClient
                .getUser()
                .then((result: AuthUser | null) => {
                    setUser(result);
                })
                .finally(() => setLoading(false));
        } catch (e) {
            props.appClient.logger.error('An error occurred ' + e);
        }
    }, [props.authClient, props.appClient.logger]);

    const login = async (username: string, password: string) => {
        try {
            await props.authClient.login(username, password);
            const freshUser = await props.authClient.getUser();
            setUser(freshUser);
        } catch (e) {
            props.appClient.logger.error('An error occurred ' + e);
        }
    };

    const logout = async () => {
        await props.authClient.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                logout,
                loginRoute: props.loginRoute,
                appClient: props.appClient,
                unauthorizedRoute: props.unauthorizedRoute,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
