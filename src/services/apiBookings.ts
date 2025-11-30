import supabase from "./supabase";
import { createClient } from "@supabase/supabase-js";

import { getToday } from "../utils/helpers";
import { PAGES } from "@/constants/pages.constants";
import type { Database, Tables, TablesUpdate } from "@/types/database.types";
import type { Booking } from "@/types/features/booking.types";

// Create a service role client for admin operations (bypasses RLS)
function getServiceRoleClient() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
        return null;
    }

    return createClient<Database>(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

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

export async function createExampleBooking(): Promise<Booking> {
    // First, get the first available glamping
    const { data: glampings, error: glampingsError } = await supabase
        .from("glampings")
        .select("*")
        .limit(1);

    if (glampingsError || !glampings || glampings.length === 0) {
        throw new Error(
            "No hay glampings disponibles para crear una reserva de ejemplo"
        );
    }

    const glamping = glampings[0];

    // Try to get an existing guest first to avoid creating duplicates
    let guest;
    const { data: existingGuests } = await supabase
        .from("guests")
        .select("*")
        .limit(1);

    if (existingGuests && existingGuests.length > 0) {
        // Reuse existing guest
        guest = existingGuests[0];
    } else {
        // Create a new guest
        // Note: This requires RLS policy allowing authenticated users to insert
        const serviceClient = getServiceRoleClient();
        const clientToUse = serviceClient || supabase;

        const { data: newGuest, error: guestError } = await clientToUse
            .from("guests")
            .insert([
                {
                    fullName: "Juan Pérez",
                    email: `ejemplo-${Date.now()}@example.com`,
                    nationality: "Ecuador",
                    countryFlag: "🇪🇨",
                    nationalID: "1234567890"
                }
            ])
            .select()
            .single();

        if (guestError) {
            console.error(guestError);
            throw new Error(
                "Error al crear el huésped de ejemplo. Asegúrate de que las políticas RLS en Supabase permitan a usuarios autenticados insertar en la tabla 'guests'."
            );
        }

        guest = newGuest;
    }

    // Calculate dates: start tomorrow, end in 2 nights
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(tomorrow);
    endDate.setDate(endDate.getDate() + 2);
    endDate.setUTCHours(0, 0, 0, 0);

    const numNights = 2;
    const numGuests = Math.min(2, glamping.maxCapacity || 2);

    // Calculate price: use weekdayPrice as base, or a default
    const basePrice = glamping.weekdayPrice || 100;
    const totalPrice = basePrice * numNights;

    // Create the booking
    const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert([
            {
                glampingId: glamping.id,
                guestId: guest.id,
                startDate: tomorrow.toISOString(),
                endDate: endDate.toISOString(),
                numNights,
                numGuests,
                totalPrice,
                status: "unconfirmed",
                isPaid: false,
                observations: "Reserva de ejemplo creada desde el dashboard"
            }
        ])
        .select("*, glampings(*), guests(*)")
        .single();

    if (bookingError) {
        console.error(bookingError);
        throw new Error("Error al crear la reserva de ejemplo");
    }

    return booking as Booking;
}
