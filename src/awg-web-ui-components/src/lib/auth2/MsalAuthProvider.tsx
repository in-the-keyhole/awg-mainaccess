import {PropsWithChildren, ReactNode, useState} from "react";
import {AuthContext, AuthUser} from "./AuthContext.tsx";

/**
 * Required configuration values for the MsalAuthProvider.
 */
export type MsalAuthProviderConfig = {

};

/**
 * Props to be passed to the MsalAuthProvider.
 */
export type MsalAuthProviderProps = PropsWithChildren & {

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
     * Configuration for the MSAL provider.
     */
    config: MsalAuthProviderConfig;

    /**
     * React element to display while loading.
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
 * Implements authentication through MSAL.
 * @param props
 * @returns
 */
export const MsalAuthProvider = (props: MsalAuthProviderProps) => {
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
};

const MsalAuthProviderImpl = (props: MsalAuthProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Initiates a signin request to the OIDC provider.
     * @param returnUrl
     */
    const signIn = async (returnUrl: string) => {
        console.log(`signin: ${returnUrl}`);
    };

    /**
     * Initiates a signout request from the OIDC provider.
     */
    const signOut = async (returnUrl: string) => {
        console.log(`signout: ${returnUrl}`);
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
            signIn: signIn,
            signOut: signOut,
            getAccessToken : getAccessToken,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};
