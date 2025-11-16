import { PAGES } from "@/constants/pages.constants";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import GlampingTable from "@/features/glampings/GlampingTable";
import AddGlamping from "@/features/glampings/AddGlamping";
import SortBy from "@/ui/SortBy";

export default function Glampings() {
    return (
        <>
            <Row>
                <Heading as="h1">{PAGES.GLAMPINGS.HEADER}</Heading>
                <SortBy options={PAGES.GLAMPINGS.SORT_OPTIONS} />
            </Row>

            <Row type="vertical">
                <GlampingTable />
                <AddGlamping />
            </Row>
        </>
    );
}
