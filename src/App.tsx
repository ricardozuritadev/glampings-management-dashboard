import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PATHS } from "./constants/paths.constants";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
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

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />

            <GlobalStyles />

            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate to={PATHS.DASHBOARD} />} />
                        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
                        <Route path={PATHS.BOOKINGS} element={<Bookings />} />
                        <Route path={PATHS.GLAMPINGS} element={<Glampings />} />
                        <Route path={PATHS.USERS} element={<Users />} />
                        <Route path={PATHS.SETTINGS} element={<Settings />} />
                        <Route path={PATHS.ACCOUNT} element={<Account />} />
                    </Route>

                    <Route path={PATHS.LOGIN} element={<Login />} />
                    <Route path={PATHS.PAGE_NOT_FOUND} element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
