import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PAGES } from "@/constants/pages.constants";
import { createOrEditGlamping } from "@/services/apiGlampings";
import type { Glamping } from "@/types/features/glamping.types";

export function useEditGlamping() {
    const queryClient = useQueryClient();

    const { mutate: editGlamping, isPending: isEditing } = useMutation({
        mutationFn: ({
            glamping,
            id
        }: {
            glamping: Omit<Glamping, "image"> & { image: File | string | null };
            id: number;
        }) => {
            return createOrEditGlamping(glamping, id);
        },
        onSuccess: () => {
            toast.success(PAGES.GLAMPINGS.TOASTS.UPDATED);
            queryClient.invalidateQueries({ queryKey: ["glampings"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { isEditing, editGlamping };
}
