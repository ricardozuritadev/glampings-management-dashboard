import styled from "styled-components";

import { PAGES } from "@/constants/pages.constants";

import Button from "./Button";
import Heading from "./Heading";
import GlobalStyles from "@/styles/GlobalStyles";

const StyledErrorFallback = styled.main`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4.8rem;
`;

const Box = styled.div`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 4.8rem;
    flex: 0 1 96rem;
    text-align: center;

    & h1 {
        margin-bottom: 1.6rem;
    }

    & p {
        font-family: "Sono";
        margin-bottom: 3.2rem;
        color: var(--color-grey-500);
    }
`;

type ErrorFallbackProps = {
    error: Error;
    resetErrorBoundary: () => void;
};

export default function ErrorFallback({
    resetErrorBoundary
}: ErrorFallbackProps) {
    return (
        <>
            <GlobalStyles />

            <StyledErrorFallback>
                <Box>
                    <Heading as="h1">{PAGES.ERROR_FALLBACK.TITLE}</Heading>
                    <p>{PAGES.ERROR_FALLBACK.MESSAGE}</p>
                    <Button onClick={resetErrorBoundary} size="large">
                        {PAGES.ERROR_FALLBACK.BUTTON}
                    </Button>
                </Box>
            </StyledErrorFallback>
        </>
    );
}
