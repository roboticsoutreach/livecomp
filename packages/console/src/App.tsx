import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import ProtectedRoute from "./components/util/ProtectedRoute";
import DashboardPage from "./pages/dashboard";
import CompetitionsPage from "./pages/competitions";
import CreateCompetitionPage from "./pages/competitions/create";
import GamesPage from "./pages/games";
import ViewGamePage from "./pages/games/view";
import { QueryClientProvider } from "@tanstack/react-query";
import { api, queryClient } from "./utils/trpc";
import { AuthContext } from "./utils/context";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
    },
    {
        path: "/games",
        element: (
            <ProtectedRoute>
                <GamesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/games/:id",
        element: (
            <ProtectedRoute>
                <ViewGamePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/competitions",
        element: (
            <ProtectedRoute>
                <CompetitionsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/competitions/create",
        element: (
            <ProtectedRoute>
                <CreateCompetitionPage />
            </ProtectedRoute>
        ),
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
    const { data: currentUser, isPending } = api.users.fetchCurrent.useQuery();

    if (isPending) return <span>Loading...</span>;

    return (
        <AuthContext.Provider value={currentUser}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthContext.Provider>
    );
}

