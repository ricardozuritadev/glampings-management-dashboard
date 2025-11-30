import { createContext, useEffect, type ReactNode } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

type DarkModeContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};

type DarkModeProviderProps = {
    children: ReactNode;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
    undefined
);

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        "isDarkMode",
        false
    );

    useEffect(
        function () {
            if (isDarkMode) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
            } else {
                document.documentElement.classList.add("light-mode");
                document.documentElement.classList.remove("dark-mode");
            }
        },
        [isDarkMode]
    );

    function toggleDarkMode() {
        setIsDarkMode((isDarkMode: boolean) => !isDarkMode);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}
