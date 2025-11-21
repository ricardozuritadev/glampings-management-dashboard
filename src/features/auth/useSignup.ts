import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "@/services/apiAuth";
import { toast } from "react-hot-toast";
import { PAGES } from "@/constants/pages.constants";

export function useSignup() {
    const { mutate: signup, isPending: isSignupPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success(PAGES.USERS.TOASTS.ACCOUNT_CREATED);
        },
        onError: () => {
            toast.error(PAGES.USERS.TOASTS.ACCOUNT_CREATED_ERROR);
        }
    });

    return {
        signup,
        isSignupPending
    };
}
