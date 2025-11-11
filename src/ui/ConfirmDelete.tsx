import styled from "styled-components";

import Button from "@/ui/Button";
import Heading from "@/ui/Heading";
import { PAGES } from "@/constants/pages.constants";

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
            <Heading as="h3">
                {PAGES.CONFIRM_DELETE.TITLE.replace(
                    "{resourceName}",
                    resourceName
                )}
            </Heading>
            <p>
                {PAGES.CONFIRM_DELETE.MESSAGE.replace(
                    "{resourceName}",
                    resourceName
                )}
            </p>

            <div>
                <Button
                    variation="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    {PAGES.CONFIRM_DELETE.CANCEL}
                </Button>

                <Button
                    variation="danger"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    {PAGES.CONFIRM_DELETE.DELETE}
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;
