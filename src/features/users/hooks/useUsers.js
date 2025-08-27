import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers as getUsersApi } from "../../../services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

export function useUsers() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const department = searchParams.get('department') || 'all';
    const role = searchParams.get('role') || 'all';
    const search = searchParams.get('search') || '';
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const { data: { docs: users, ...pagination } = {}, isLoading: isGettingUsers } = useQuery({
        queryKey: ['users', department, role, search, page],
        queryFn: () => getUsersApi({ department, role, search, page }),
    });

    const totalPages = pagination?.totalPages;

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ['users', department, role, search, page + 1],
            queryFn: () => getUsersApi({ department, role, search, page: page + 1 }),
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['users', department, role, search, page - 1],
            queryFn: () => getUsersApi({ department, role, search, page: page - 1 }),
        });
    }

    return { users, isGettingUsers, pagination };
}