import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import { $api } from "./modules/api";
import { AuthContext } from "./utils/context";
import ProtectedRoute from "./components/util/ProtectedRoute";
import DashboardPage from "./pages/dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    { path: "/auth/login", element: <LoginPage /> },
]);

export default function App() {
    const { data, isPending: userPending } = $api.useQuery("get", "/auth/users/current");

    if (userPending) return <div>Loading...</div>;
    if (!data) return <div>Error</div>;

    return (
        <AuthContext.Provider value={data.user}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
}

