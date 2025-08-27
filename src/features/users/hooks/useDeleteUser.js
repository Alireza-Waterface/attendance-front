import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../../services/apiUsers";
import toast from "react-hot-toast";

export default function useDeleteUser() {
	const queryClient = useQueryClient();

	const { mutate: deleteUser, isPending: isDeleting } = useMutation({
		mutationFn: deleteUserApi, // تابع API که در مرحله قبل ساختیم

		onSuccess: () => {
			toast.success("کاربر با موفقیت حذف شد.");
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
			queryClient.invalidateQueries({
				queryKey: ["dashboard"],
			});
		},

		onError: (err) => {
			console.error(err);
			toast.error(err.message);
		},
	});

	return { deleteUser, isDeleting };
}
