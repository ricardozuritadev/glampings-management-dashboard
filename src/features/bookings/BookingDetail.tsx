import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import Tag from "@/ui/Tag";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";
import Spinner from "@/ui/Spinner";

import { useMoveBack } from "@/hooks/useMoveBack";
import { getBooking } from "@/services/apiBookings";
import { PAGES } from "@/constants/pages.constants";
import type { Booking } from "@/types/features/booking.types";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { bookingId } = useParams();
    const moveBack = useMoveBack();

    const { data: booking, isPending } = useQuery<Booking>({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(Number(bookingId))
    });

    if (isPending) return <Spinner />;

    if (!booking) {
        return (
            <>
                <Row type="horizontal">
                    <Heading as="h1">{PAGES.BOOKINGS.DETAIL.NOT_FOUND}</Heading>
                    <ButtonText onClick={moveBack}>
                        &larr; {PAGES.BOOKINGS.DETAIL.BACK}
                    </ButtonText>
                </Row>
            </>
        );
    }

    const status = booking.status || "unconfirmed";

    const statusToTagName: Record<string, "blue" | "green" | "silver"> = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver"
    };

    const statusToLabel: Record<string, string> = {
        unconfirmed: PAGES.BOOKINGS.STATUS.UNCONFIRMED,
        "checked-in": PAGES.BOOKINGS.STATUS.CHECKED_IN,
        "checked-out": PAGES.BOOKINGS.STATUS.CHECKED_OUT
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">
                        {PAGES.BOOKINGS.DETAIL.TITLE.replace(
                            "{id}",
                            String(booking.id)
                        )}
                    </Heading>
                    <Tag type={statusToTagName[status] || "blue"}>
                        {statusToLabel[status] || status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>
                    &larr; {PAGES.BOOKINGS.DETAIL.BACK}
                </ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Button variation="secondary" onClick={moveBack}>
                    {PAGES.BOOKINGS.DETAIL.BACK}
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
