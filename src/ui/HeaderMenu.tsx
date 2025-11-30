import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@/constants/paths.constants";

import ButtonIcon from "./ButtonIcon";
import Logout from "@/features/auth/Logout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

export default function HeaderMenu() {
    const navigate = useNavigate();

    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate(`/${PATHS.ACCOUNT}`)}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>

            <li>
                <DarkModeToggle />
            </li>

            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}
