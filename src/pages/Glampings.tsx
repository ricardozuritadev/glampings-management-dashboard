import { PAGES } from "@/constants/pages.constants";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import GlampingTable from "@/features/glampings/GlampingTable";
import AddGlamping from "@/features/glampings/AddGlamping";

export default function Glampings() {
    return (
        <>
            <Row>
                <Heading as="h1">{PAGES.GLAMPINGS.HEADER}</Heading>
                <p>Filtrar / ordenar</p>
            </Row>

            <Row type="vertical">
                <GlampingTable />
                <AddGlamping />
            </Row>
        </>
    );
}
