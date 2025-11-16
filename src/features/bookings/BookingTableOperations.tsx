import SortBy from "@/ui/SortBy";
import { PAGES } from "@/constants/pages.constants";

function BookingTableOperations() {
    return <SortBy options={PAGES.BOOKINGS.SORT_OPTIONS} />;
}

export default BookingTableOperations;
