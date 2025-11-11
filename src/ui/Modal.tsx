import styled from "styled-components";

import {
    cloneElement,
    isValidElement,
    type MouseEvent,
    type ReactElement,
    type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { useModalContent } from "@/hooks/useModalContent";

import { ModalProvider, useModal } from "@/context/modal.context";

import { HiXMark } from "react-icons/hi2";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-500);
    }
`;

type ModalProps = {
    children: ReactNode;
};

interface TriggerProps {
    children: ReactNode;
    opens: string;
}

interface ContentProps {
    children: ReactNode;
    name: string;
    titleId?: string;
    ariaLabel?: string;
}

function Modal({ children }: ModalProps) {
    return <ModalProvider>{children}</ModalProvider>;
}

function Trigger({ children, opens }: TriggerProps) {
    const { open } = useModal();

    if (!isValidElement(children)) {
        throw new Error(
            "<Modal.Trigger> expects a single React element as child"
        );
    }

    const child = children as ReactElement<{
        onClick?: (event: MouseEvent<HTMLElement>) => void;
    }>;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event);
        open(opens);
    };

    return cloneElement(child, {
        onClick: handleClick
    });
}

function Content(props: ContentProps) {
    const { isOpen, overlayProps, modalProps, close, content } =
        useModalContent(props);

    if (!isOpen) return null;
    if (typeof document === "undefined") return null;

    return createPortal(
        <Overlay {...overlayProps}>
            <StyledModal {...modalProps}>
                <Button onClick={close} aria-label="Cerrar modal">
                    <HiXMark />
                </Button>
                <div>{content}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Trigger = Trigger;
Modal.Content = Content;

export { Modal };
