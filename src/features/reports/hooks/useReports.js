import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getReports as getReportsApi } from "../../../services/apiReports";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

export function useReports() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const filters = {
        page: !searchParams.get('page') ? 1 : Number(searchParams.get('page')),
        sortBy: searchParams.get('sortBy') || 'date-desc',
        startDate: searchParams.get('startDate') || '',
        endDate: searchParams.get('endDate') || '',
        status: searchParams.get('status') || '',
        isJustified: searchParams.get('isJustified') || '',
        userRole: searchParams.get('userRole') || '',
        recordedById: searchParams.get('recordedById') || '',
        limit: searchParams.get('limit') || '',
        department: searchParams.get('department') || '',
    };

    const { data: { docs: reports, ...pagination } = {}, isLoading: isGettingReports } = useQuery({
        queryKey: ['reports', filters],
        queryFn: () => getReportsApi(filters),
    });

    const totalPages = pagination?.totalPages;
    if (filters.page < totalPages) {
        const nextFilters = { ...filters, page: filters.page + 1 };
        queryClient.prefetchQuery({
            queryKey: ['reports', nextFilters],
            queryFn: () => getReportsApi(nextFilters),
        });
    }
    if (filters.page > 1) {
        const prevFilters = { ...filters, page: filters.page - 1 };
        queryClient.prefetchQuery({
            queryKey: ['reports', prevFilters],
            queryFn: () => getReportsApi(prevFilters),
        });
    }

    return { reports, isGettingReports, pagination };
}