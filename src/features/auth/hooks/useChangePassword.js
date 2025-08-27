import { useMutation } from "@tanstack/react-query";
import { changePassword as changePasswordApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useChangePassword() {
	const { mutate: changePassword, isPending: isChangingPassword } =
		useMutation({
			mutationFn: changePasswordApi,
			onSuccess: (data) => {
				toast.success(data.message || "رمز عبور با موفقیت تغییر کرد.");
			},
			onError: (err) => {
				toast.error(err.message);
			},
		});

	return { changePassword, isChangingPassword };
}