import styled from "styled-components";
import type { ChangeEvent, SelectHTMLAttributes } from "react";

type StyledSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    type?: "white";
};

const StyledSelect = styled.select<StyledSelectProps>`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
        ${(props) =>
            props.type === "white"
                ? "var(--color-grey-100)"
                : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: {
        value: string;
        label: string;
    }[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ options, onChange }: SelectProps) {
    return (
        <StyledSelect onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
}
