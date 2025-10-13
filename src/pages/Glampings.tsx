import { PAGES } from "@/constants/pages.constants";
import GlampingTable from "@/features/glampings/GlampingTable";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

export default function Glampings() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">{PAGES.GLAMPINGS.HEADER}</Heading>
                <p>Filtrar / ordenar</p>
            </Row>

            <Row>
                <GlampingTable />
            </Row>
        </>
    );
}
