import { createContext, useContext, useEffect, useState, } from 'react';
import { AuthProvider as ReactOidcAuthProvider, useAuth as oidcUseAuth } from 'react-oidc-context';
import { Loading } from '../loading/Loading';

type SignInFunction = {
    (resource: string | null): Promise<void>
}

type SignOutFunction = {
    (): Promise<void>
}

type GetAccessTokenFunction = {
    (resource: string): Promise<string>
}

/**
 * Describes the information available through the AuthContext.
 */
type AuthContextType = {
    isAuthenticated: boolean;
    user: AuthUser | null;
    signin: SignInFunction;
    signout: SignOutFunction;
    getAccessToken: GetAccessTokenFunction;
};

/**
 * Describes an authenticated user.
 */
export type AuthUser = {
    iss: string;
    sub: string;
    name: string | null;
    email: string | null;
    roles: string[];
};

export const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Props to be passed to the AuthProvider.
 */
type AuthProviderProps = {
    children: React.ReactNode;
    oidc: OidcAuthProviderConfig;
    msal: MsalAuthProviderConfig;
    baseUri: string;
};

/**
 * Required configuration values for the OidcAuthProvider.
 */
export type OidcAuthProviderConfig = {
    authority: string;
    clientId: string;
    responseType: string;
    defaultScopes: string[];
}

/**
 * Required configuration values for the MsalAuthProvider.
 */
export type MsalAuthProviderConfig = {

}

/**
 * Returns the current authentication context.
 */
export function useAuth() {
    return useContext(AuthContext);
}

/**
 * Implements authentication within the scope.
 * @param props 
 * @returns 
 */
export function AuthProvider(props: AuthProviderProps) {
    if (props.oidc) {
        return(
            <OidcAuthProvider config={props.oidc} baseUri={props.baseUri}>
                {props.children}
            </OidcAuthProvider>
        );
    }

    if (props.msal) {
        return(
            <MsalAuthProvider config={props.msal}>
                {props.children}
            </MsalAuthProvider>
        );
    }

    throw new Error("No configured authentication type.");
}

/**
 * Props to be passed to the OidcAuthProvider.
 */
type OidcAuthProviderProps = {
    children: React.ReactNode;
    config: OidcAuthProviderConfig;
    baseUri: string;
}

/**
 * Implements authentication through the standard OIDC mechanism.
 * @param props 
 * @returns 
 */
function OidcAuthProvider(props: OidcAuthProviderProps) {
    return (
        <ReactOidcAuthProvider
            authority={props.config.authority}
            client_id={props.config.clientId}
            redirect_uri={props.baseUri}
            silent_redirect_uri={props.baseUri}
            response_type={props.config.responseType}
            scope={['openid', 'profile', 'email'].concat(props.config.defaultScopes ?? []).join(' ')}
            automaticSilentRenew={true}>
            <OidcAuthProviderImpl {...props}>
                {props.children}
            </OidcAuthProviderImpl>
        </ReactOidcAuthProvider>
    );
}

/**
 * Nested under the OIDC auth provider context. Wraps the isLoaded status in a Promise for suspension.
 * @param props 
 * @returns 
 */
function OidcAuthProviderImpl(props: OidcAuthProviderProps) {
    const auth = oidcUseAuth();
    const [user, setUser] = useState<AuthUser | null>(null);

    // copies information from the OIDC authentication context to the AWG authentication context
    useEffect(() => {
        // update user with user information
        if (auth.user) {
            setUser({
                iss: auth.user.profile.iss ?? null,
                sub: auth.user.profile.sub ?? null,
                name: auth.user.profile.name ?? null,
                email: auth.user.profile.email ?? null,
                roles: auth.user.scopes,
            });
        } else {
            setUser(null);
        }
    }, [auth.isAuthenticated, auth.user]);

    if (auth.isLoading) {
        return <Loading />;
    }

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <>Signing you in...</>;
        case "signoutRedirect":
            return <>Signing you out...</>;
    }

    if (auth.error) {
        throw new Error(auth.error.message);
    }

    /**
     * Initiates a signin request to the OIDC provider.
     * @param resource
     */
    const signin = async (resource: string | null) => {

    };

    /**
     * Initiates a signout request from the OIDC provider.
     */
    const signout = async () => {

    };
    
    /**
     * Gets an access token for the specified resource.
     * @param resource
     * @returns 
     */
    const getAccessToken = async (resource: string) => {
        const u = await auth.signinSilent({ resource: resource })
        if (u) {
            return u.access_token;
        } else {
            throw new Error("Did not return user.");
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!user,
            user: user,
            signin: signin,
            signout: signout,
            getAccessToken: getAccessToken,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

/**
 * Props to be passed to the MsalAuthProvider.
 */
type MsalAuthProviderProps = {
    children: React.ReactNode;
    config: MsalAuthProviderConfig;
}

/**
 * Implements authentication through MSAL.
 * @param props
 * @returns 
 */
function MsalAuthProvider(props: MsalAuthProviderProps) {
    return (
        <div>MSAL not yet implemented.</div>
    );
    // return (
    //     <MSALThing>
    //         <MsalAuthProviderImpl {...props}>
    //             {props.children}
    //         </MsalAuthProviderImpl>
    //     </MSALThing>
    // );
}

function MsalAuthProviderImpl(props: MsalAuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Initiates a signin request to the OIDC provider.
     * @param resource 
     */
    const signin = async (resource: string | null) => {

    };

    /**
     * Initiates a signout request from the OIDC provider.
     */
    const signout = async () => {

    };

    /**
     * Gets an access token for the specified resource.
     * @param resource
     * @returns 
     */
    const getAccessToken = async (resource: string) => {
        throw new Error("Not yet implemented.");
    };

    throw new Error("Not yet implemented.");
    return (
        <AuthContext.Provider value={{
            isAuthenticated: false,
            user: null,
            signin: signin,
            signout: signout,
            getAccessToken : getAccessToken,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}