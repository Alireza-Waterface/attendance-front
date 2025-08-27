import { useQuery } from "@tanstack/react-query";
import { getOfficers as getOfficersApi } from "../../../services/apiUsers";

export default function useOfficers() {
    const { data: officers, isLoading: isGettingOfficers } = useQuery({
        queryKey: ['officers'],
        queryFn: getOfficersApi,
    });

    return { officers, isGettingOfficers };
}