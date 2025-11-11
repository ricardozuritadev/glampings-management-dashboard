import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

type ConfirmDeleteProps = {
    resourceName: string;
    onConfirm: () => void;
    onCloseModal?: () => void;
    disabled: boolean;
};

function ConfirmDelete({
    resourceName,
    onConfirm,
    onCloseModal,
    disabled
}: ConfirmDeleteProps) {
    return (
        <StyledConfirmDelete>
            <Heading as="h3">Eliminar {resourceName}</Heading>
            <p>
                ¿Estás seguro de querer eliminar este {resourceName}{" "}
                permanentemente? Esta acción no puede ser deshecha.
            </p>

            <div>
                <Button
                    variation="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Cancelar
                </Button>

                <Button
                    variation="danger"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Eliminar
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;
