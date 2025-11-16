import { type ReactNode } from "react";

type MenusProps = {
    children: ReactNode;
};

function Menus({ children }: MenusProps) {
    return <>{children}</>;
}

export default Menus;
