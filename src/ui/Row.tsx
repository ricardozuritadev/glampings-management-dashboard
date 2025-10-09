import styled, { css } from "styled-components";

const StyledRow = styled.div<RowProps>`
    display: flex;

    ${(props) =>
        props.type === "horizontal" &&
        css`
            justify-content: space-between;
            align-items: center;
        `}

    ${(props) =>
        props.type === "vertical" &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}
`;

type RowProps = {
    type?: "horizontal" | "vertical";
    children: React.ReactNode;
};

const Row = ({ type = "horizontal", children, ...props }: RowProps) => {
    return (
        <StyledRow type={type} {...props}>
            {children}
        </StyledRow>
    );
};

export default Row;
