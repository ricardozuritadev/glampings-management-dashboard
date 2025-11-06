import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PAGES } from "@/constants/pages.constants";
import { createOrEditGlamping } from "@/services/apiGlampings";
import type { Glamping } from "@/types/features/glamping.types";

export function useCreateGlamping() {
    const queryClient = useQueryClient();

    const { mutate: createGlamping, isPending: isCreating } = useMutation({
        mutationFn: ({
            glamping
        }: {
            glamping: Omit<Glamping, "image"> & { image: File | string | null };
        }) => {
            return createOrEditGlamping(glamping);
        },
        onSuccess: () => {
            toast.success(PAGES.GLAMPINGS.TOASTS.CREATED);
            queryClient.invalidateQueries({ queryKey: ["glampings"] });
        },
        onError: () => {
            toast.error(PAGES.GLAMPINGS.TOASTS.ERROR);
        }
    });

    return { isCreating, createGlamping };
}
