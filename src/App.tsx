import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { PATHS } from "./constants/paths";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to={PATHS.DASHBOARD} />} />
                    <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
                    <Route path={PATHS.BOOKINGS} element={<Bookings />} />
                    <Route path={PATHS.CABINS} element={<Cabins />} />
                    <Route path={PATHS.USERS} element={<Users />} />
                    <Route path={PATHS.SETTINGS} element={<Settings />} />
                    <Route path={PATHS.ACCOUNT} element={<Account />} />
                    <Route path={PATHS.LOGIN} element={<Login />} />
                    <Route path={PATHS.PAGE_NOT_FOUND} element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
