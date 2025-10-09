import { PAGES } from "@/constants/pages.constants";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

export default function Glampings() {
    return (
        <Row type="horizontal">
            <Heading as="h1">{PAGES.GLAMPINGS.HEADER}</Heading>
            <p>TEST</p>
        </Row>
    );
}
