import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteGlamping as deleteGlampingApi } from "@/services/apiGlampings";

export function useDeleteGlamping() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteGlamping } = useMutation({
        mutationFn: deleteGlampingApi,
        onSuccess: () => {
            toast.success("Glamping eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["glampings"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { isDeleting, deleteGlamping };
}
