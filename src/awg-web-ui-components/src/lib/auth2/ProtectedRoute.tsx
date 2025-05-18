import { useAuth } from "./AuthContext";

type ProtectedRouteProps = {
    redirectPath?: string;
    unauthorized?: React.ReactNode;
    forbidden?: React.ReactNode;
    children: React.ReactNode;
};

export const ProtectedRoute = ({
    unauthorized,
    forbidden,
    children
}: ProtectedRouteProps) => {
    const auth = useAuth();
    if (auth?.isAuthenticated ?? false) {
        return children;
    } else {
        return unauthorized;
    }
};
