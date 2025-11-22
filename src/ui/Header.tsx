import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "@/features/auth/UserAvatar";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 2rem;
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
`;

export default function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}
