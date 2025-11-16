import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/services/apiBookings";
import type { Booking } from "@/types/features/booking.types";

export function useBookings() {
    const { data: bookings, isPending } = useQuery<Booking[]>({
        queryKey: ["bookings"],
        queryFn: getBookings
    });

    return { isPending, bookings };
}
