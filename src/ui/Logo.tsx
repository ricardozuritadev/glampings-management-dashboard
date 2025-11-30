import styled from "styled-components";
import { useDarkMode } from "@/hooks/useDarkMode";

type LogoProps = {
    isDarkMode: boolean;
};

const StyledLogo = styled.div`
    text-align: center;
    height: 10rem;
`;

const Img = styled.img<LogoProps>`
    height: ${({ isDarkMode }) => (isDarkMode ? "9.6rem" : "8.8rem")};
    width: auto;
`;

export default function Logo() {
    const { isDarkMode } = useDarkMode();
    return (
        <StyledLogo>
            <Img
                isDarkMode={isDarkMode}
                src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
                alt="Logo"
            />
        </StyledLogo>
    );
}
