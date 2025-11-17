import styled, { css } from "styled-components";

const StyledHeading = styled.div<HeadingProps>`
    ${(props) =>
        props.as === "h1" &&
        css`
            font-size: 3rem;
            font-weight: 600;
        `}

    ${(props) =>
        props.as === "h2" &&
        css`
            font-size: 2rem;
            font-weight: 600;
        `}
        
    ${(props) =>
        props.as === "h3" &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}

    ${(props) =>
        props.as === "h4" &&
        css`
            font-size: 3rem;
            font-weight: 600;
            text-align: center;
        `}
`;

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4";
    children: React.ReactNode;
};

export default function Heading({
    as = "h1",
    children,
    ...props
}: HeadingProps) {
    return (
        <StyledHeading as={as} {...props}>
            {children}
        </StyledHeading>
    );
}
