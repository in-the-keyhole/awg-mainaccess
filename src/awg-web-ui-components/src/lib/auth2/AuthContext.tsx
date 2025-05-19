import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import {MsalAuthProvider, type MsalAuthProviderConfig} from "./MsalAuthProvider.tsx";
import {OidcAuthProvider, type OidcAuthProviderConfig} from "./OidcAuthProvider.tsx";

/**
 * Describes the information available through the AuthContext.
 */
export type AuthContextType = {

    /**
     * Whether the current session is authenticated.
     */
    isAuthenticated: boolean;

    /**
     * Gets the currently authenticated user object.
     */
    user: AuthUser | null;

    /**
     * Invoke this function to initiate a sign in operation, optionally navigating to the specified return URL when
     * complete.
     * @param returnUrl
     */
    signIn: (returnUrl: string) => Promise<void>;

    /**
     * Invoke this function to initiate a sign-out operation, optionally navigating to the specified return URL when
     * complete.
     * @param returnUrl
     */
    signOut: (returnUrl: string) => Promise<void>;

    /**
     * Gets an access token for the specified resource.
     */
    getAccessToken: (resource: string) => Promise<string>;

};

/**
 * Describes an authenticated user.
 */
export type AuthUser = {

    /**
     * Gets the 'issuer' of the authenticated user. In combination with 'iss' this should serve as a unique identifier
     * of the user.
     */
    iss: string;

    /**
     * Gets the 'subject' of the authenticated user. In combination with 'iss' this should serve as a unique identifier
     * of the user.
     */
    sub: string;

    /**
     * Gets the name of the authenticated user, if available.
     */
    name: string | null;

    /**
     * Gets the email address of the authenticated user, if available.
     */
    email: string | null;

    /**
     * Gets the set of application roles of the authenticated user.
     */
    roles: string[];

};

export const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Props to be passed to the AuthProvider.
 */
export type AuthProviderProps = PropsWithChildren & {

    /**
     * Base URI of the application for relative URI calculations.
     */
    baseUri: string;

    /**
     * Invoked by the authentication context when a navigation action should occur.
     * @param url
     */
    onNavigate: (url: string) => void;

    /**
     * If present enables OIDC mode with the given configuration.
     */
    oidc: OidcAuthProviderConfig;

    /**
     * If present enables MSAL mode with the given configuration.
     */
    msal: MsalAuthProviderConfig;

    /**
     * React element to display while loading.
     */
    loadingElement: ReactNode;

};

/**
 * Returns the current authentication context.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

/**
 * Implements authentication within the scope.
 * @param props 
 * @returns 
 */
export const AuthProvider = ({
    baseUri,
    oidc,
    msal,
    onNavigate,
    loadingElement,
    children
}:  AuthProviderProps) => {

    // oidc options enable OIDC provider
    if (oidc) {
        return(
            <OidcAuthProvider baseUri={baseUri} config={oidc} onNavigate={onNavigate} loadingElement={loadingElement}>
                {children}
            </OidcAuthProvider>
        );
    }

    // msal options enable MSAL provider
    if (msal) {
        return(
            <MsalAuthProvider baseUri={baseUri} config={msal} onNavigate={onNavigate} loadingElement={loadingElement}>
                {children}
            </MsalAuthProvider>
        );
    }

    throw new Error("No configured authentication mechanism.");
};
