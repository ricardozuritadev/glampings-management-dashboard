import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { getGlampings } from "@/services/apiGlampings";

import Spinner from "@/ui/Spinner";
import GlampingRow from "./GlampingRow";

const Table = styled.div`
    border: 1px solid var(--color-grey-200);
    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
    width: 100%;
`;

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 1.8fr 2fr 1.5fr 1.5fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

export default function GlampingTable() {
    const {
        data: glampings,
        isPending,
        error
    } = useQuery({
        queryKey: ["glampings"],
        queryFn: getGlampings
    });

    if (isPending) return <Spinner />;

    return (
        <Table role="table">
            <TableHeader role="row">
                <div></div>
                <div>Glamping</div>
                <div>Capacidad</div>
                <div>Precio entre semana</div>
                <div>Precio Viernes</div>
                <div>Precio Sábado</div>
            </TableHeader>

            {glampings?.map((glamping) => (
                <GlampingRow key={glamping.id} glamping={glamping} />
            ))}
        </Table>
    );
}
