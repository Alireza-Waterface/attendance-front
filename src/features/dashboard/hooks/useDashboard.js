import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getDashboardData as getDashboardDataApi } from "../../../services/apiDashboard"; // New API service file

export default function useDashboard() {
	const [searchParams] = useSearchParams();
	const timeRange = searchParams.get("timeRange") || "today";

	const { data: dashboardData, isLoading: isGettingDashData } = useQuery({
		queryKey: ["dashboard", timeRange],
		queryFn: () => getDashboardDataApi(timeRange),
	});

	return { dashboardData, isGettingDashData, timeRange };
}
