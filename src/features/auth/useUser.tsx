import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuth";

export function useUser() {
    const { data: userData, isPending } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    });

    const user = userData?.user ?? null;

    return { user, isPending, isAuthenticated: !!user };
}
