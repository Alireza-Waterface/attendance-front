import { useQuery } from "@tanstack/react-query";
import { getTodayRecords as getTodayRecordsApi } from "../../../services/apiAttendance";
import { useSearchParams } from "react-router-dom";

export default function useTodayRecords() {
    const [searchParams] = useSearchParams();

    const filters = {
        sortBy: searchParams.get('sortBy') || 'createdAt-desc',
        role: searchParams.get('role') || 'all',
        search: searchParams.get('search') || '',
        limit: searchParams.get('limit') || 10,
        page: !searchParams.get('page') ? 1 : Number(searchParams.get('page')),
    };

    const { data: { docs: todayRecords, ...pagination } = {}, isLoading: isGettingRecords } = useQuery({
        queryKey: ['today-records', filters],
        queryFn: () => getTodayRecordsApi(filters),
    });

    return { todayRecords, isGettingRecords, pagination };
}