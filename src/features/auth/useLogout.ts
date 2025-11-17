import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@/constants/paths.constants";
import { logout as logoutApi } from "@/services/apiAuth";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate(`/${PATHS.LOGIN}`, { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { isLoggingOut, logout };
}
