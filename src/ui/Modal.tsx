import styled from "styled-components";

import {
    cloneElement,
    createContext,
    isValidElement,
    useContext,
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
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
    titleId?: string;
    ariaLabel?: string;
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

function Content({ children, name, titleId, ariaLabel }: ContentProps) {
    const { openName, close } = useModal();

    const modalRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    // Close the modal when the user presses the Escape key
    useEffect(() => {
        if (openName !== name) return;

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [openName, name, close]);

    // Focus the first focusable element when the modal is opened
    useEffect(() => {
        if (openName !== name) return;

        previouslyFocusedElement.current =
            document.activeElement as HTMLElement;

        const modalElement = modalRef.current;
        if (!modalElement) return;

        const focusableSelectors = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        const focusableElements = Array.from(
            modalElement.querySelectorAll<HTMLElement>(focusableSelectors)
        );

        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        } else {
            modalElement.focus();
        }

        return () => {
            const prev = previouslyFocusedElement.current as HTMLElement | null;
            if (prev && typeof prev.focus === "function") {
                prev.focus();
            }
        };
    }, [openName, name]);

    if (openName !== name) return null;
    if (typeof document === "undefined") return null;

    // Close the modal when the user clicks outside of it
    function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            close();
        }
    }

    if (!isValidElement(children)) {
        throw new Error(
            "<Modal.Content> expects a single React element as child"
        );
    }

    const child = children as ReactElement<{
        onCloseModal?: () => void;
    }>;

    function handleCloseModal() {
        child.props.onCloseModal?.();
        close();
    }

    // Handle the Tab key to navigate between focusable elements
    function handleKeyDownInside(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "Tab") return;

        const modalEl = modalRef.current;
        if (!modalEl) return;

        const focusableSelectors = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        const focusableElements = Array.from(
            modalEl.querySelectorAll<HTMLElement>(focusableSelectors)
        );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const current = document.activeElement as HTMLElement | null;

        if (event.shiftKey && current === first) {
            event.preventDefault();
            last.focus();
            return;
        }

        if (!event.shiftKey && current === last) {
            event.preventDefault();
            first.focus();
            return;
        }
    }

    const ariaProps =
        titleId != null
            ? { "aria-labelledby": titleId }
            : { "aria-label": ariaLabel ?? "Modal dialog" };

    return createPortal(
        <Overlay onMouseDown={handleOverlayClick}>
            <StyledModal
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onKeyDown={handleKeyDownInside}
                {...ariaProps}
            >
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
