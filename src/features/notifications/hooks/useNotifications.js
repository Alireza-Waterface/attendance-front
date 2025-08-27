import { useQuery } from "@tanstack/react-query";
import { getNotifications as getNotificationsApi } from "../../../services/apiNotifications";
import { useSearchParams } from "react-router-dom";

export function useNotifications() {
    const [searchParams] = useSearchParams();

    const status = searchParams.get('status') || 'all';

	const { data, isLoading: isGettingNotifs } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => getNotificationsApi({ status }),
		staleTime: 60 * 1000,
	});

	const unreadCount = data?.docs?.filter((n) => !n.isRead).length || 0;

	return { notifications: data?.docs, isGettingNotifs, unreadCount };
}
