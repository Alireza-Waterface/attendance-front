import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserApi } from "../../../services/apiUsers";
import toast from "react-hot-toast";

export default function useCreateUser() {
	const queryClient = useQueryClient();

	const { mutate: createUser, isPending: isCreatingUser } = useMutation({
		mutationFn: createUserApi,

		onSuccess: () => {
			toast.success("کاربر جدید با موفقیت ایجاد شد");
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

	return { createUser, isCreatingUser };
}
