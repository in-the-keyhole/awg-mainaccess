import {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {SignoutResponse, User, UserManagerSettings} from "oidc-client-ts";
import {AuthProvider as ReactOidcAuthProvider, useAuth as oidcUseAuth} from "react-oidc-context";
import {AuthContext, AuthUser} from "./AuthContext.tsx";

/**
 * Required configuration values for the OidcAuthProvider.
 */
export type OidcAuthProviderConfig = {
    authority: string;
    clientId: string;
    responseType: string;
    defaultScopes: string[];
};

/**
 * Props to be passed to the OidcAuthProvider.
 */
export type OidcAuthProviderProps = PropsWithChildren & {

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
     * Configuration for the OIDC provider.
     */
    config: OidcAuthProviderConfig;

    /**
     * Element to show during any loading phases.
     */
    loadingElement: ReactNode;

}

/**
 * Type of the custom state passed through the provider.
 */
type State = {
    returnUrl: string;
}

/**
 * Implements authentication through the standard OIDC mechanism.
 * @param props
 * @returns
 */
export const OidcAuthProvider = (props: OidcAuthProviderProps) => {
    const location = useLocation();

    if (!props.config.authority) {
        throw new Error("Missing OIDC authority in config.");
    }

    if (!props.config.clientId) {
        throw new Error("Missing OIDC client id in config.");
    }

    /**
     * Invoked when the OIDC provider completes a sign in operation.
     * @param user
     */
    const onSignIn = (user: User | undefined) => {
        console.log(`onSignIn: ${JSON.stringify(user)}`);

        // clears out the authentication information from the current URL
        if (window && window.history) {
            window.history.replaceState({}, document.title, location.pathname);
        }

        // check any passed state for a return path
        if (user) {
            const state = user.state as State;
            if (state && state.returnUrl) {
                props.onNavigate(state.returnUrl);
            }
        } else {
            throw new Error("No user returned from sign in.");
        }
    };

    /**
     * Invoked when the OIDC provider completes a signout operation.
     * @param resp
     */
    const onSignOut = (resp: SignoutResponse | undefined) => {
        console.log(`onSignOut: ${JSON.stringify(resp)}`);

        // clears out the authentication information from the current URL
        if (window && window.history) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (resp) {
            if (resp.error) {
                throw new Error(resp.error_description ?? "unknown error");
            } else {
                // check any passed state for a return path
                const state = resp.userState as State;
                if (state && state.returnUrl) {
                    props.onNavigate(state.returnUrl);
                }
            }
        }
    };

    /**
     * Invoked to evaluate whether the current path IS NOT the sign in callback path.
     */
    const skipSignIn = () => {
        return location.pathname !== '/oidc-callback';
    };

    /**
     * Invoked to evaluate whether the current path IS the sign-out callback path.
     * @param args
     */
    const matchSignOut = (args: UserManagerSettings) => {
        return location.pathname === '/oidc-signout-callback';
    };

    return (
        <ReactOidcAuthProvider
            authority={props.config.authority}
            client_id={props.config.clientId}
            redirect_uri={new URL('oidc-callback', props.baseUri).toString()}
            silent_redirect_uri={new URL('oidc-callback', props.baseUri).toString()}
            post_logout_redirect_uri={new URL('oidc-signout-callback', props.baseUri).toString()}
            response_type={props.config.responseType ?? 'code'}
            scope={['openid', 'profile', 'email'].concat(props.config.defaultScopes ?? []).join(' ')}
            automaticSilentRenew={true}
            onSigninCallback={onSignIn}
            skipSigninCallback={skipSignIn()}
            onSignoutCallback={onSignOut}
            matchSignoutCallback={matchSignOut}>
            <OidcAuthProviderBody {...props} />
        </ReactOidcAuthProvider>
    );
};

/**
 * Nested under the OIDC auth provider context. Wraps the isLoaded status in a Promise for suspension.
 * @param props
 * @returns
 */
const OidcAuthProviderBody = (props: OidcAuthProviderProps) => {
    const oidcAuth = oidcUseAuth();

    // maintain AuthUser state
    const [user, setUser] = useState<AuthUser | null>(null);

    // copies information from the OIDC authentication context to the AuthUser
    useEffect(() => {
        // update user with user information
        if (oidcAuth.user) {
            setUser({
                iss: oidcAuth.user.profile.iss ?? null,
                sub: oidcAuth.user.profile.sub ?? null,
                name: oidcAuth.user.profile.name ?? null,
                email: oidcAuth.user.profile.email ?? null,
                roles: oidcAuth.user.scopes,
            });
        } else {
            setUser(null);
        }
    }, [oidcAuth.isAuthenticated, oidcAuth.user]);

    // shortly displays when transition between pages
    if (oidcAuth.isLoading) {
        return props.loadingElement;
    }

    switch (oidcAuth.activeNavigator) {
        case "signinSilent":
            return <>Signing you in...</>;
        case "signoutRedirect":
            return <>Signing you out...</>;
    }

    if (oidcAuth.error) {
        throw new Error(oidcAuth.error.message);
    }

    /**
     * Initiates a sign in request to the OIDC provider.
     * @param returnUrl the URL to direct the user to after sign in
     */
    const signIn = async (returnUrl: string) => {
        const state: State = {
            returnUrl: returnUrl
        }

        await oidcAuth.signinRedirect({
            state: state,
        });
    };

    /**
     * Initiates a signout request from the OIDC provider.
     * @param returnUrl the URL to direct the user to after signout
     */
    const signOut = async (returnUrl: string) => {
        const state: State = {
            returnUrl: returnUrl
        }

        await oidcAuth.signoutRedirect({
            state: state
        });
    };

    /**
     * Gets an access token for the specified resource.
     * @param resource
     * @returns
     */
    const getAccessToken = async (resource: string) => {
        const u = await oidcAuth.signinSilent({ resource: resource })
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
            signIn: signIn,
            signOut: signOut,
            getAccessToken: getAccessToken,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};
