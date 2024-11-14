import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute from "./components/util/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import CompetitionsPage from "./pages/competitions/CompetitionsPage";
import CreateCompetitionPage from "./pages/competitions/CreateCompetitionPage";
import GamesPage from "./pages/games/GamesPage";
import ViewGamePage from "./pages/games/ViewGamePage";
import { QueryClientProvider } from "@tanstack/react-query";
import { api, queryClient } from "./utils/trpc";
import { AuthContext } from "./utils/context";
import VenuesPage from "./pages/venues/VenuesPage";
import ViewVenuePage from "./pages/venues/ViewVenuePage";
import StreamConsumer from "./components/util/StreamConsumer";

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
        path: "/venues",
        element: (
            <ProtectedRoute>
                <VenuesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/venues/:id",
        element: (
            <ProtectedRoute>
                <ViewVenuePage />
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
    const { data: currentUser, isPending } = api.users.fetchCurrent.useQuery(undefined, { retry: 1 });

    if (isPending) return <span>Loading...</span>;

    return (
        <AuthContext.Provider value={currentUser}>
            <QueryClientProvider client={queryClient}>
                <StreamConsumer />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthContext.Provider>
    );
}

