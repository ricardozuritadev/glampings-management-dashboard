import styled from "styled-components";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/auth/useUser";

import { PATHS } from "@/constants/paths.constants";

import Spinner from "./Spinner";

type ProtectedRouteProps = {
    children: ReactNode;
};

const FullPageSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();

    const { isPending, isAuthenticated } = useUser();

    useEffect(
        function () {
            if (!isAuthenticated && !isPending) navigate(`/${PATHS.LOGIN}`);
        },
        [isAuthenticated, isPending, navigate]
    );

    if (isPending) {
        return (
            <FullPageSpinner>
                <Spinner />
            </FullPageSpinner>
        );
    }

    if (isAuthenticated) return children;

    return null;
}
