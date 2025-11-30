import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Button from "./Button";
import { useCreateExampleBooking } from "@/features/bookings/useCreateExampleBooking";

const StyledSidebar = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    grid-row: 1 / -1;
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
`;

const ButtonContainer = styled.div`
    margin-top: auto;
    padding-top: 2.4rem;
`;

export default function Sidebar() {
    const { createExample, isCreating } = useCreateExampleBooking();

    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
            <ButtonContainer>
                <Button
                    size="medium"
                    variation="secondary"
                    onClick={() => createExample()}
                    disabled={isCreating}
                >
                    {isCreating ? "Creando..." : "Crear reserva de ejemplo"}
                </Button>
            </ButtonContainer>
        </StyledSidebar>
    );
}
