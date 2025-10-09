import { GLAMPINGS } from "@/constants/pages/glampings.constants";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

export default function Glampings() {
    return (
        <Row type="horizontal">
            <Heading as="h1">{GLAMPINGS.GLAMPINGS}</Heading>
            <p>TEST</p>
        </Row>
    );
}
