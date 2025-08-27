import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification as deleteNotificationApi } from "../../../services/apiNotifications";
import toast from "react-hot-toast";

export function useDeleteNotification() {
	const queryClient = useQueryClient();

	const { mutate: deleteNotification, isPending: isDeleting } = useMutation({
		mutationFn: deleteNotificationApi,
		onSuccess: () => {
			toast.success("اعلان با موفقیت حذف شد.");
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { deleteNotification, isDeleting };
}
