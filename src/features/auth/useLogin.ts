import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "@/services/apiAuth";
import { PAGES } from "@/constants/pages.constants";
import { PATHS } from "@/constants/paths.constants";

export function useLogin() {
    const navigate = useNavigate();

    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: loginApi,
        onSuccess: ({ user }) => {
            console.log(user);
            navigate(`/${PATHS.DASHBOARD}`);
        },
        onError: () => {
            toast.error(PAGES.LOGIN.FORM.TOASTS.WRONG_CREDENTIALS);
        }
    });

    return { isLoggingIn, login };
}
