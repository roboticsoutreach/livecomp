import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "../../utils/context";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: PropsWithChildren) {
    const currentUser = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/auth/login" />;
    }

    return children;
}

