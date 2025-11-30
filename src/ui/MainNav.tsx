import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { PATHS } from "@/constants/paths.constants";
import { PAGES } from "@/constants/pages.constants";
import {
    HiOutlineCalendarDays,
    HiOutlineCog6Tooth,
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineUsers
} from "react-icons/hi2";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

export default function MainNav() {
    return (
        <NavList>
            <li>
                <StyledNavLink to={PATHS.BOOKINGS}>
                    <HiOutlineCalendarDays />
                    <span>{PAGES.BOOKINGS.HEADER}</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to={PATHS.GLAMPINGS}>
                    <HiOutlineHomeModern />
                    <span>{PAGES.GLAMPINGS.HEADER}</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to={PATHS.USERS}>
                    <HiOutlineUsers />
                    <span>{PAGES.USERS.HEADER}</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to={PATHS.SETTINGS}>
                    <HiOutlineCog6Tooth />
                    <span>{PAGES.SETTINGS.HEADER}</span>
                </StyledNavLink>
            </li>
        </NavList>
    );
}
