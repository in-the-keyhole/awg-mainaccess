import {type FragmentProps, useEffect} from "react";
import {useLocation} from "react-router";

export const Unauthorized = ({
    onSignIn,
    children
} : FragmentProps & {
    onSignIn: (returnUrl: string) => Promise<void>
}) => {
    const location = useLocation();
    useEffect(() => {
        onSignIn(location.pathname).then();
    }, []);

    return children;
};
