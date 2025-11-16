import { useSearchParams } from "react-router-dom";
import BookingRow from "@/features/bookings/BookingRow";
import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import { useBookings } from "./useBookings";
import { PAGES } from "@/constants/pages.constants";
import type { Booking } from "@/types/features/booking.types";

function BookingTable() {
    const { isPending, bookings } = useBookings();
    const [searchParams] = useSearchParams();

    if (isPending) return <Spinner />;

    const sortBy = searchParams.get("sortBy") || "startDate-desc";

    const [field, direction] = sortBy.split("-");

    const sortedBookings = bookings?.sort((a, b) => {
        const aValue = a[field as keyof Booking];
        const bValue = b[field as keyof Booking];

        // Handle null values
        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return 1;
        if (bValue === null) return -1;

        // Handle number fields
        if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        // Handle string fields
        if (typeof aValue === "string" && typeof bValue === "string") {
            return direction === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        return 0;
    });

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>{PAGES.BOOKINGS.TABLE.GLAMPING}</div>
                    <div>{PAGES.BOOKINGS.TABLE.GUEST}</div>
                    <div>{PAGES.BOOKINGS.TABLE.DATES}</div>
                    <div>{PAGES.BOOKINGS.TABLE.STATUS}</div>
                    <div>{PAGES.BOOKINGS.TABLE.AMOUNT}</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortedBookings ?? []}
                    render={(booking) => {
                        const bookingData = booking as Booking;
                        return (
                            <BookingRow
                                key={bookingData.id}
                                booking={bookingData}
                            />
                        );
                    }}
                />
            </Table>
        </Menus>
    );
}

export default BookingTable;
