import { useQuery } from "@tanstack/react-query";
import { getTodayRecords as getTodayRecordsApi } from "../../../services/apiAttendance";
import { useSearchParams } from "react-router-dom";

export default function useTodayRecords() {
    const [searchParams] = useSearchParams();

    const sortBy = searchParams.get('sortBy') || 'createdAt-desc';
    const role = searchParams.get('role') || 'all';

    const { data: todayRecords, isLoading: isGettingRecords } = useQuery({
        queryKey: ['today-records', sortBy, role],
        queryFn: () => getTodayRecordsApi({ sortBy, role }),
    });

    return { todayRecords, isGettingRecords };
}