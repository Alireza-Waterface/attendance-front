import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendance as updateAttendanceApi } from "../../../services/apiAttendance";
import toast from "react-hot-toast";

export function useUpdateAttendance() {
	const queryClient = useQueryClient();

	const { mutate: updateAttendance, isPending: isUpdating } = useMutation({
		mutationFn: updateAttendanceApi,
		onSuccess: () => {
			toast.success("گزارش با موفقیت ویرایش شد.");
			queryClient.invalidateQueries({ queryKey: ["today-records"] });
			queryClient.invalidateQueries({ queryKey: ["reports"] });
			queryClient.invalidateQueries({ queryKey: ["public-users"] });
			queryClient.invalidateQueries({ queryKey: ["my-records"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateAttendance, isUpdating };
}
