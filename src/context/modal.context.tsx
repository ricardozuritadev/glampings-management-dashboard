"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ModalContextType = {
    openName: string | null;
    open: (name: string) => void;
    close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error(
            "Modal compound components must be used inside <Modal />"
        );
    }

    return context;
}

type ModalProviderProps = {
    children: ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
    const [openName, setOpenName] = useState<string | null>(null);

    const open = (name: string) => setOpenName(name);
    const close = () => setOpenName(null);

    return (
        <ModalContext.Provider value={{ openName, open, close }}>
            {children}
        </ModalContext.Provider>
    );
}
