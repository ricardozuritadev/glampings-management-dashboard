import { BOOKINGS } from "@/constants/pages/bookings.constants";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

export default function Bookings() {
    return (
        <Row type="horizontal">
            <Heading as="h1">{BOOKINGS.BOOKINGS}</Heading>
            <p>TEST</p>
        </Row>
    );
}
