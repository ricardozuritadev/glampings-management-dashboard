import styled from "styled-components";
import { useGlampings } from "./useGlampings";

import { PAGES } from "@/constants/pages.constants";

import Spinner from "@/ui/Spinner";
import GlampingRow from "./GlampingRow";
import Table from "@/ui/Table";
import type { Glamping } from "@/types/features/glamping.types";

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
    const { isPending, glampings } = useGlampings();

    if (isPending) return <Spinner />;

    return (
        <Table columns="0.6fr 1.8fr 1.8fr 2fr 1.5fr 1.5fr 1fr">
            <Table.Header columns="0.6fr 1.8fr 1.8fr 2fr 1.5fr 1.5fr 1fr">
                <div></div>
                <div>{PAGES.GLAMPINGS.TABLE.HEADER}</div>
                <div>{PAGES.GLAMPINGS.TABLE.CAPACITY}</div>
                <div>{PAGES.GLAMPINGS.TABLE.WEEKDAY_PRICE}</div>
                <div>{PAGES.GLAMPINGS.TABLE.FRIDAY_PRICE}</div>
                <div>{PAGES.GLAMPINGS.TABLE.SATURDAY_PRICE}</div>
            </Table.Header>

            <Table.Body
                data={glampings ?? []}
                render={(item) => {
                    const glamping = item as Glamping;
                    return (
                        <GlampingRow key={glamping.id} glamping={glamping} />
                    );
                }}
            />
        </Table>
    );
}
