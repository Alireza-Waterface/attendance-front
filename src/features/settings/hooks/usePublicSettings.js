import { useQuery } from "@tanstack/react-query";
import { getPublicSettings as getPublicSettingsApi } from "../../../services/apiSettings";

export function usePublicSettings() {
	const { data: publicSettings, isLoading: isLoadingPublicSettings } = useQuery({
		queryKey: ["public-settings"],
		queryFn: getPublicSettingsApi,
		staleTime: 60 * 60 * 1000,
	});

	return { publicSettings, isLoadingPublicSettings };
}