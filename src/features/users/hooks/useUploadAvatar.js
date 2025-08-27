import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar as uploadAvatarApi } from "../../../services/apiUsers";
import toast from "react-hot-toast";

export function useUploadAvatar() {
	const queryClient = useQueryClient();

	const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
		mutationFn: uploadAvatarApi,
		onSuccess: (updatedUser) => {
			toast.success("تصویر پروفایل با موفقیت تغییر کرد.");
			// Update the user in the cache immediately with the new data from the server
			queryClient.setQueryData(["user"], updatedUser);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { uploadAvatar, isUploading };
}