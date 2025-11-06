import { useQuery } from "@tanstack/react-query";
import { getGlampings } from "@/services/apiGlampings";

export function useGlampings() {
    const { data: glampings, isPending } = useQuery({
        queryKey: ["glampings"],
        queryFn: getGlampings
    });

    return { isPending, glampings };
}
