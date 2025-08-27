import { useQuery } from "@tanstack/react-query";
import { getCurrentUser as getCurrentUserApi } from "../../../services/apiAuth";

export function useUser() {
    const { data: user, isLoading, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUserApi,

        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    return {
        isLoading: isLoading || isFetching,
        user,
        roles: user?.roles || [],
        isAdmin: user?.roles?.includes('مدیر'),
        isOfficer: user?.roles?.includes('مسئول'),
        isAuthenticated: user ? true : false,
    };
}