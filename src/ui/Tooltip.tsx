import styled from "styled-components";
import type { ReactNode } from "react";

const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
    width: fit-content;
`;

const TooltipText = styled.span<{
    $position?: "top" | "bottom" | "left" | "right";
}>`
    visibility: hidden;
    opacity: 0;
    background-color: var(--color-grey-800);
    color: var(--color-grey-0);
    text-align: center;
    border-radius: var(--border-radius-sm);
    padding: 0.6rem 1.2rem;
    position: absolute;
    z-index: 2000;
    font-size: 1.2rem;
    white-space: nowrap;
    transition:
        opacity 0.2s,
        visibility 0.2s;
    pointer-events: none;
    box-shadow: var(--shadow-md);

    ${(props) => {
        switch (props.$position) {
            case "top":
                return `
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 0.8rem;
                    &::after {
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 5px solid transparent;
                        border-top-color: var(--color-grey-800);
                    }
                `;
            case "bottom":
                return `
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-top: 0.8rem;
                    &::after {
                        content: "";
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 5px solid transparent;
                        border-bottom-color: var(--color-grey-800);
                    }
                `;
            case "left":
                return `
                    right: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-right: 0.8rem;
                    &::after {
                        content: "";
                        position: absolute;
                        left: 100%;
                        top: 50%;
                        transform: translateY(-50%);
                        border: 5px solid transparent;
                        border-left-color: var(--color-grey-800);
                    }
                `;
            case "right":
                return `
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-left: 0.8rem;
                    &::after {
                        content: "";
                        position: absolute;
                        right: 100%;
                        top: 50%;
                        transform: translateY(-50%);
                        border: 5px solid transparent;
                        border-right-color: var(--color-grey-800);
                    }
                `;
            default:
                return `
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 0.8rem;
                    &::after {
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 5px solid transparent;
                        border-top-color: var(--color-grey-800);
                    }
                `;
        }
    }}

    ${TooltipContainer}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

type TooltipProps = {
    text: string;
    children: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({
    text,
    children,
    position = "top"
}: TooltipProps) {
    return (
        <TooltipContainer>
            {children}
            <TooltipText $position={position}>{text}</TooltipText>
        </TooltipContainer>
    );
}
