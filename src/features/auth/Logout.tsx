import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

import ButtonIcon from "@/ui/ButtonIcon";
import SpinnerMini from "@/ui/SpinnerMini";

export default function Logout() {
    const { logout, isLoggingOut } = useLogout();

    function handleClick() {
        logout();
    }

    return (
        <ButtonIcon onClick={handleClick} disabled={isLoggingOut}>
            {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    );
}
