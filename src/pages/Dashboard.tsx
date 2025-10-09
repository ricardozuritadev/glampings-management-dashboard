import { DASHBOARD } from "@/constants/pages/dashboard.constants";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

export default function Dashboard() {
    return (
        <Row type="horizontal">
            <Heading as="h1">{DASHBOARD.DASHBOARD}</Heading>
            <p>TEST</p>
        </Row>
    );
}
