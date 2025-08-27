import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	updateSettings as updateSettingsApi,
	uploadLogo as uploadLogoApi,
} from "../../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
	const queryClient = useQueryClient();

	// Mutation for text-based settings
	const { mutate: updateSettings, isPending: isUpdatingSettings } = useMutation({
		mutationFn: updateSettingsApi,
		onSuccess: (newSettings) => {
			toast.success("تنظیمات با موفقیت ذخیره شد.");
			queryClient.setQueryData(["settings"], newSettings);
            queryClient.invalidateQueries(['public-settings']);
		},
		onError: (err) => toast.error(err.message),
	});

	// Mutation for logo upload
	const { mutate: uploadLogo, isPending: isUploadingLogo } = useMutation({
		mutationFn: uploadLogoApi,
		onSuccess: (newSettings) => {
			toast.success("لوگو با موفقیت آپلود شد.");
			queryClient.setQueryData(["settings"], newSettings);
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateSettings, isUpdatingSettings, uploadLogo, isUploadingLogo };
}