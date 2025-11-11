import styled from "styled-components";

import { useDeleteGlamping } from "./useDeleteGlamping";

import { formatCurrency, pluralize } from "@/utils/helpers";
import type { Glamping } from "@/types/features/glamping.types";

import Row from "@/ui/Row";
import CreateOrEditGlampingForm from "./CreateOrEditGlampingForm";
import { HiPencilSquare, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateGlamping } from "./useCreateGlamping";
import { Modal } from "@/ui/Modal";
import { PAGES } from "@/constants/pages.constants";
import ConfirmDelete from "@/ui/ConfirmDelete";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 1.8fr 2fr 1.5fr 1.5fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const GlampingName = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Capacity = styled.div`
    font-weight: regular;
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

type CabinRowProps = {
    glamping: Glamping;
};

export default function GlampingRow({ glamping }: CabinRowProps) {
    const {
        id,
        image,
        name,
        maxCapacity,
        weekdayPrice,
        fridayPrice,
        saturdayPrice,
        description
    } = glamping;

    const { isDeleting, deleteGlamping } = useDeleteGlamping();
    const { isCreating, createGlamping } = useCreateGlamping();

    function handleDuplicate() {
        createGlamping({
            glamping: {
                name: `${name} - Copia`,
                maxCapacity,
                weekdayPrice,
                fridayPrice,
                saturdayPrice,
                description,
                image
            } as Omit<Glamping, "image"> & { image: File | string | null }
        });
    }

    return (
        <TableRow role="row">
            <Img src={image || ""} alt="Glamping" />
            <GlampingName>{name}</GlampingName>
            <Capacity>
                Hasta <b>{maxCapacity}</b> {pluralize(maxCapacity, "persona")}
            </Capacity>
            <Price>{formatCurrency(weekdayPrice || 0)}</Price>
            <Price>{formatCurrency(fridayPrice || 0)}</Price>
            <Price>{formatCurrency(saturdayPrice || 0)}</Price>

            <Row>
                <button onClick={handleDuplicate} disabled={isCreating}>
                    <HiSquare2Stack />
                </button>

                <Modal>
                    <Modal.Trigger
                        opens={PAGES.GLAMPINGS.MODALS.EDIT_GLAMPING_FORM}
                    >
                        <button>
                            <HiPencilSquare />
                        </button>
                    </Modal.Trigger>
                    <Modal.Content
                        name={PAGES.GLAMPINGS.MODALS.EDIT_GLAMPING_FORM}
                    >
                        <CreateOrEditGlampingForm glamping={glamping} />
                    </Modal.Content>

                    <Modal.Trigger
                        opens={PAGES.GLAMPINGS.MODALS.DELETE_GLAMPING_FORM}
                    >
                        <button disabled={isDeleting}>
                            <HiTrash />
                        </button>
                    </Modal.Trigger>
                    <Modal.Content
                        name={PAGES.GLAMPINGS.MODALS.DELETE_GLAMPING_FORM}
                    >
                        <ConfirmDelete
                            resourceName="glamping"
                            onConfirm={() => deleteGlamping(id)}
                            disabled={isDeleting}
                        />
                    </Modal.Content>
                </Modal>
            </Row>
        </TableRow>
    );
}
