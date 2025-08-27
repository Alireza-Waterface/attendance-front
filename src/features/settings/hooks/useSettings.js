import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsApi } from "../../../services/apiSettings";

export function useSettings() {
	const { data: settings, isLoading: isLoadingSettings } = useQuery({
		queryKey: ["settings"],
		queryFn: getSettingsApi,
	});
	return { settings, isLoadingSettings };
}