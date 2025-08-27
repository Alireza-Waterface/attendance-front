import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationsAsRead as markAsReadApi } from "../../../services/apiNotifications";

export function useMarkAsRead() {
	const queryClient = useQueryClient();

	const { mutate: markAsRead, isPending: isMarking } = useMutation({
		mutationFn: markAsReadApi,
		onSuccess: () => {
			// Invalidate the notifications query to get the fresh read/unread status
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (err) => {
			// You could show a toast here if you want
			console.error(err);
		},
	});

	return { markAsRead, isMarking };
}
