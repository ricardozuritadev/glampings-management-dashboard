import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PAGES } from "@/constants/pages.constants";
import { createExampleBooking } from "@/services/apiBookings";

export function useCreateExampleBooking() {
    const queryClient = useQueryClient();

    const { mutate: createExample, isPending: isCreating } = useMutation({
        mutationFn: createExampleBooking,
        onSuccess: () => {
            toast.success(PAGES.BOOKINGS.TOASTS.EXAMPLE_CREATED);
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (error: Error) => {
            toast.error(
                error.message || PAGES.BOOKINGS.TOASTS.ERROR_CREATE_EXAMPLE
            );
        }
    });

    return { isCreating, createExample };
}
