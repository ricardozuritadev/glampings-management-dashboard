import { useGlampings } from "./useGlampings";
import { useSearchParams } from "react-router-dom";

import { PAGES } from "@/constants/pages.constants";
import type { Glamping } from "@/types/features/glamping.types";

import Spinner from "@/ui/Spinner";
import GlampingRow from "./GlampingRow";
import Table from "@/ui/Table";

export default function GlampingTable() {
    const { isPending, glampings } = useGlampings();
    const [searchParams] = useSearchParams();

    if (isPending) return <Spinner />;

    const sortBy = searchParams.get("sortBy") || "name-asc";

    const [field, direction] = sortBy.split("-");

    const sortedGlampings = glampings?.sort((a, b) => {
        const aValue = a[field as keyof Glamping];
        const bValue = b[field as keyof Glamping];

        // Handle null values
        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return 1;
        if (bValue === null) return -1;

        // Handle number fields
        if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        // Handle string fields
        if (typeof aValue === "string" && typeof bValue === "string") {
            return direction === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        return 0;
    });

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
                data={sortedGlampings ?? []}
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
