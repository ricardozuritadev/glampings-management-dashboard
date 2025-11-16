import type { Tables } from "@/types/database.types";

export type Booking = Tables<"bookings"> & {
    glampings: Tables<"glampings"> | null;
    guests: Tables<"guests"> | null;
};
