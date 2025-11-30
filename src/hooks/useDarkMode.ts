import { useContext } from "react";
import { DarkModeContext } from "@/context/DarkMode.context";

export function useDarkMode() {
    const contextValue = useContext(DarkModeContext);

    if (!contextValue) {
        throw new Error(
            "useDarkMode must be called from within an DarkModeContextProvider"
        );
    }

    return contextValue;
}
