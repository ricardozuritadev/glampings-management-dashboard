import supabase from "./supabase";

import { getToday } from "../utils/helpers";
import { PAGES } from "@/constants/pages.constants";
import type { Tables, TablesUpdate } from "@/types/database.types";
import type { Booking } from "@/types/features/booking.types";

export async function getBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, glampings(*), guests(*)");

    if (error) {
        console.error(error);
        throw new Error(PAGES.BOOKINGS.TOASTS.ERROR_GET);
    }

    return data as Booking[];
}

export async function getBooking(id: number): Promise<Booking> {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, glampings(*), guests(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error(PAGES.BOOKINGS.TOASTS.ERROR_GET);
    }

    return data as Booking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string): Promise<
    Array<{
        created_at: string;
        glampings: Pick<
            Tables<"glampings">,
            "fridayPrice" | "saturdayPrice" | "weekdayPrice"
        > | null;
    }>
> {
    const { data, error } = await supabase
        .from("bookings")
        .select(
            "created_at, glampings(fridayPrice, saturdayPrice, weekdayPrice)"
        )
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error(PAGES.BOOKINGS.TOASTS.ERROR_GET_BOOKINGS_AFTER_DATE);
    }

    return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(
    date: string
): Promise<Tables<"bookings">[]> {
    const { data, error } = await supabase
        .from("bookings")
        // .select('*')
        .select("*, guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", getToday());

    if (error) {
        console.error(error);
        throw new Error(PAGES.BOOKINGS.TOASTS.ERROR_GET_STAYS_AFTER_DATE);
    }

    return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<Tables<"bookings">[]> {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationality, countryFlag)")
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        )
        .order("created_at");

    // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
    // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

    if (error) {
        console.error(error);
        throw new Error(PAGES.BOOKINGS.TOASTS.ERROR_GET_STAYS_TODAY_ACTIVITY);
    }
    return data;
}

export async function updateBooking(
    id: number,
    obj: TablesUpdate<"bookings">
): Promise<Tables<"bookings">> {
    const { data, error } = await supabase
        .from("bookings")
        .update(obj)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error(PAGES.BOOKINGS.TOASTS.ERROR_UPDATE_BOOKING);
    }
    return data;
}

export async function deleteBooking(id: number): Promise<Tables<"bookings">> {
    // REMEMBER RLS POLICIES
    const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error(PAGES.BOOKINGS.TOASTS.ERROR_DELETE_BOOKING);
    }
    return data;
}
