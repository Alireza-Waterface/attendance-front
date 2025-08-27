import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getMyRecords as getMyRecordsApi } from "../../../services/apiAttendance";

export function useMyRecords() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// Extract filters from the URL
	const filters = {
		page: !searchParams.get("page") ? 1 : Number(searchParams.get("page")),
		startDate: searchParams.get("startDate") || "",
		endDate: searchParams.get("endDate") || "",
		status: searchParams.get("status") || "",
		isJustified: searchParams.get("isJustified") || "",
	};

	const {
		data: { docs: myRecords, ...pagination } = {},
		isLoading: isGettingMyReports,
	} = useQuery({
		queryKey: ["my-records", filters],
		queryFn: () => getMyRecordsApi(filters),
	});

	const totalPages = pagination?.totalPages;
	if (filters.page < totalPages) {
		const nextFilters = { ...filters, page: filters.page + 1 };
		queryClient.prefetchQuery({
			queryKey: ["my-records", nextFilters],
			queryFn: () => getMyRecordsApi(nextFilters),
		});
	}
	if (filters.page > 1) {
		const prevFilters = { ...filters, page: filters.page - 1 };
		queryClient.prefetchQuery({
			queryKey: ["my-records", prevFilters],
			queryFn: () => getMyRecordsApi(prevFilters),
		});
	}

	return { myRecords, isGettingMyReports, pagination };
}
