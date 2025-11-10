import type { FormHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

const StyledForm = styled.form<FormProps>`
    ${(props) =>
        props.type === "regular" &&
        css`
            padding: 2.4rem 4rem;

            /* Box */
            background-color: var(--color-grey-0);
            border: 1px solid var(--color-grey-100);
            border-radius: var(--border-radius-md);
        `}

    ${(props) =>
        props.type === "modal" &&
        css`
            width: 80rem;
        `}
    
  overflow: hidden;
    font-size: 1.4rem;
`;

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    type?: "modal" | "regular";
    children: ReactNode;
};

export default function Form({ type = "regular", children, ...props }: FormProps) {
    return (
        <StyledForm type={type} {...props}>
            {children}
        </StyledForm>
    );
}
