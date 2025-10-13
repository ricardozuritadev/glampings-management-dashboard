import styled from "styled-components";

import { formatCurrency, pluralize } from "@/utils/helpers";
import type { Glamping } from "@/types/features/glamping.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGlamping } from "@/services/apiGlampings";

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
    const { id, image, name, maxCapacity, weekdayPrice, fridayPrice, saturdayPrice } = glamping;

    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate } = useMutation({
        mutationFn: deleteGlamping,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["glampings"] });
        },
        onError: (error) => {
            console.error(error.message);
        }
    });

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
            <button onClick={() => mutate(id)} disabled={isDeleting}>
                Eliminar
            </button>
        </TableRow>
    );
}
