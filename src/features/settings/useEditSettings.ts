import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PAGES } from "@/constants/pages.constants";
import { updateSettings as updateSettingsApi } from "@/services/apiSettings";

export function useEditSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isPending: isEditing } = useMutation({
        mutationFn: updateSettingsApi,
        onSuccess: () => {
            toast.success(PAGES.SETTINGS.TOASTS.UPDATED);
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { isEditing, updateSetting };
}
