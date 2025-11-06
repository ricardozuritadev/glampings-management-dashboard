import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import GlampingTable from "@/features/glampings/GlampingTable";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import { useState } from "react";
import CreateOrEditGlampingForm from "@/features/glampings/CreateOrEditGlampingForm";

export default function Glampings() {
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <>
            <Row>
                <Heading as="h1">{PAGES.GLAMPINGS.HEADER}</Heading>
                <p>Filtrar / ordenar</p>
            </Row>

            <Row type="vertical">
                <GlampingTable />

                <Button onClick={() => setShowForm((show) => !show)}>
                    {PAGES.GLAMPINGS.ADD_GLAMPING}
                </Button>
                {showForm && (
                    <CreateOrEditGlampingForm glamping={null} onClose={() => setShowForm(false)} />
                )}
            </Row>
        </>
    );
}
