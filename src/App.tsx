import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";

import { PATHS } from "./constants/paths.constants";
import DarkModeProvider from "./context/DarkMode.context";
import { useDarkMode } from "./hooks/useDarkMode";

import ProtectedRoute from "./ui/ProtectedRoute";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import BookingDetail from "./features/bookings/BookingDetail";
import Glampings from "./pages/Glampings";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0
        }
    }
});

function AppContent() {
    const { isDarkMode } = useDarkMode();

    return (
        <ThemeProvider theme={{ isDarkMode }}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />

                <GlobalStyles />

                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate to={PATHS.BOOKINGS} />}
                            />
                            <Route
                                path={PATHS.BOOKINGS}
                                element={<Bookings />}
                            />
                            <Route
                                path={`${PATHS.BOOKINGS}/:bookingId`}
                                element={<BookingDetail />}
                            />
                            <Route
                                path={PATHS.GLAMPINGS}
                                element={<Glampings />}
                            />
                            <Route path={PATHS.USERS} element={<Users />} />
                            <Route
                                path={PATHS.SETTINGS}
                                element={<Settings />}
                            />
                            <Route path={PATHS.ACCOUNT} element={<Account />} />
                        </Route>

                        <Route path={PATHS.LOGIN} element={<Login />} />
                        <Route
                            path={PATHS.PAGE_NOT_FOUND}
                            element={<PageNotFound />}
                        />
                    </Routes>
                </BrowserRouter>

                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{
                        margin: "8px"
                    }}
                    toastOptions={{
                        success: {
                            duration: 3000
                        },
                        error: {
                            duration: 5000
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)"
                        }
                    }}
                />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default function App() {
    return (
        <DarkModeProvider>
            <AppContent />
        </DarkModeProvider>
    );
}
