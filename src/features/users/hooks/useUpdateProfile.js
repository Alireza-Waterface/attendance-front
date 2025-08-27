import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
		mutationFn: updateCurrentUserApi,
		onSuccess: (updatedUser) => {
			toast.success("پروفایل با موفقیت به‌روزرسانی شد.");
			queryClient.setQueryData(["user"], updatedUser);
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { updateProfile, isUpdatingProfile };
}