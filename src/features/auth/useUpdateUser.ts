import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PAGES } from "@/constants/pages.constants";
import { upadteCurrentUser } from "@/services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: upadteCurrentUser,
        onSuccess: () => {
            toast.success(PAGES.USERS.TOASTS.ACCOUNT_UPDATED);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: () => {
            toast.error(PAGES.ACCOUNT.TOASTS.ERROR_UPDATE);
        }
    });

    return { isUpdating, updateUser };
}
