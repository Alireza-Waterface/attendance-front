import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recordAttendance as recordAttendanceApi } from "../../../services/apiAttendance";
import toast from "react-hot-toast";

export default function useRecordAttendance() {
	const queryClient = useQueryClient();

	const { mutate: recordAttendance, isPending: isRecording } = useMutation({
		mutationFn: recordAttendanceApi,

		onSuccess: () => {
			toast.success("گزارش با موفقیت ثبت شد");
			queryClient.invalidateQueries({ queryKey: ["today-records"] });
			queryClient.invalidateQueries({ queryKey: ["reports"] });
			queryClient.invalidateQueries({ queryKey: ["public-users"] });
			queryClient.invalidateQueries({ queryKey: ["my-records"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},

		onError: (error) => {
			console.error(error);
			toast.error(error.message);
		},
	});

	return { recordAttendance, isRecording };
}
