import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser as updateUserApi } from "../../../services/apiUsers";
import toast from "react-hot-toast";

export default function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isPending: isUpdating } = useMutation({
		mutationFn: updateUserApi,

		onSuccess: () => {
			toast.success("اطلاعات کاربر با موفقیت ویرایش شد");
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
			queryClient.invalidateQueries({
				queryKey: ["dashboard"],
			});
		},

		onError: (error) => {
			console.error(error);
			toast.error(error.message);
		},
	});

	return { updateUser, isUpdating };
}
