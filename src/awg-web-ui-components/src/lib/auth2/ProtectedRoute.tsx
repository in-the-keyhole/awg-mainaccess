import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

type ProtectedRouteProps = {
    redirectPath?: string;
    children: React.ReactNode;
};

export const ProtectedRoute = ({
    redirectPath = '/',
    children
}: ProtectedRouteProps) => {
    const auth = useAuth();
    if (auth?.isAuthenticated ?? false) {
        return children;
    } else {
        return <Navigate to={redirectPath} replace />;
    }
};
