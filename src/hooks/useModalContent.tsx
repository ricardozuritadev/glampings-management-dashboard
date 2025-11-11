"use client";

import { useModal } from "@/context/modal.context";

import {
    cloneElement,
    isValidElement,
    useEffect,
    useRef,
    type ReactElement,
    type ReactNode
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent } from "react";
import type { HTMLAttributes } from "react";

type UseModalContentParams = {
    children: ReactNode;
    name: string;
    titleId?: string;
    ariaLabel?: string;
};

type UseModalContentResult = {
    isOpen: boolean;
    overlayProps: {
        onMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
    };
    modalProps: HTMLAttributes<HTMLDivElement> & {
        ref: React.RefObject<HTMLDivElement | null>;
    };
    close: () => void;
    content: ReactElement;
};

export function useModalContent({
    children,
    name,
    titleId,
    ariaLabel
}: UseModalContentParams): UseModalContentResult {
    const { openName, close } = useModal();

    const modalRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocusedElement = useRef<Element | null>(null);

    const isOpen = openName === name;

    // Close the modal when the user presses the Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                close();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, close]);

    // Focus the first focusable element when the modal is opened and restore focus when the modal is closed
    useEffect(() => {
        if (!isOpen) return;

        previouslyFocusedElement.current = document.activeElement;

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

        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        } else {
            modalEl.focus();
        }

        return () => {
            const prev = previouslyFocusedElement.current as HTMLElement | null;
            if (prev && typeof prev.focus === "function") {
                prev.focus();
            }
        };
    }, [isOpen]);

    if (!isValidElement(children)) {
        throw new Error(
            "<Modal.Content> expects a single React element as child"
        );
    }

    const child = children as ReactElement<{ onCloseModal?: () => void }>;

    const handleCloseModal = () => {
        child.props.onCloseModal?.();
        close();
    };

    // Close the modal when the user clicks outside of it
    const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            close();
        }
    };

    // Handle the Tab key to navigate between focusable elements
    const handleKeyDownInside = (event: ReactKeyboardEvent<HTMLDivElement>) => {
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
        }
    };

    const ariaProps =
        titleId != null
            ? ({ "aria-labelledby": titleId } as const)
            : ({ "aria-label": ariaLabel ?? "Modal dialog" } as const);

    const modalProps: UseModalContentResult["modalProps"] = {
        ref: modalRef,
        role: "dialog",
        "aria-modal": true,
        tabIndex: -1,
        onKeyDown: handleKeyDownInside,
        ...ariaProps
    };

    const overlayProps: UseModalContentResult["overlayProps"] = {
        onMouseDown: handleOverlayMouseDown
    };

    const content = cloneElement(child, {
        onCloseModal: handleCloseModal
    });

    return {
        isOpen,
        overlayProps,
        modalProps,
        close,
        content
    };
}
