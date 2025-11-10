import styled from "styled-components";

import {
    cloneElement,
    createContext,
    isValidElement,
    useContext,
    useState,
    type MouseEvent,
    type ReactElement,
    type ReactNode
} from "react";

import { createPortal } from "react-dom";

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
}

type ModalContextType = {
    openName: string | null;
    open: (name: string) => void;
    close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModal() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error(
            "Modal compound components must be used inside <Modal />"
        );
    }

    return context;
}

function Modal({ children }: ModalProps) {
    const [openName, setOpenName] = useState<string | null>(null);

    const open = (name: string) => setOpenName(name);
    const close = () => setOpenName(null);

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function Trigger({ children, opens: openWindowName }: TriggerProps) {
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
        open(openWindowName);
    };

    return cloneElement(child, {
        onClick: handleClick
    });
}

function Content({ children, name }: ContentProps) {
    const { openName, close } = useModal();

    if (openName !== name) return null;
    if (typeof document === "undefined") return null;

    if (!isValidElement(children)) {
        throw new Error(
            "<Modal.Content> expects a single React element as child"
        );
    }

    const child = children as ReactElement<{
        onCloseModal?: () => void;
    }>;

    const handleCloseModal = () => {
        child.props.onCloseModal?.();
        close();
    };

    return createPortal(
        <Overlay>
            <StyledModal>
                <Button onClick={close}>
                    <HiXMark />
                </Button>

                <div>
                    {cloneElement(child, {
                        onCloseModal: handleCloseModal
                    })}
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Trigger = Trigger;
Modal.Content = Content;

export { Modal };
