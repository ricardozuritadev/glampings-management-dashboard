import styled from "styled-components";
import { isValidElement } from "react";
import type { FieldErrors, FieldValues } from "react-hook-form";

const StyledFormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem 0;
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

type FormRowVerticalProps = {
    label?: string;
    errors?: FieldErrors<FieldValues>;
    children: React.ReactNode;
};

function FormRowVertical({ label, errors, children }: FormRowVerticalProps) {
    const childId = isValidElement(children)
        ? (children.props as { id?: string })?.id || ""
        : "";

    return (
        <StyledFormRow>
            {label && <Label htmlFor={childId}>{label}</Label>}
            {children}
            {errors?.name && <Error>{errors.name.message as string}</Error>}
        </StyledFormRow>
    );
}

export default FormRowVertical;
