import { PAGES } from "@/constants/pages.constants";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";

export default function Bookings() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">{PAGES.BOOKINGS.HEADER}</Heading>
                <BookingTableOperations />
            </Row>

            <BookingTable />
        </>
    );
}
