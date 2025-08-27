import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment as updateDepartmentApi } from "../../../services/apiDepartments";
import toast from "react-hot-toast";

export function useUpdateDepartment() {
	const queryClient = useQueryClient();

	const { mutate: updateDepartment, isPending: isUpdating } = useMutation({
		mutationFn: updateDepartmentApi,
		onSuccess: () => {
			toast.success("واحد با موفقیت ویرایش شد.");
			// Invalidate the departments query to refetch the list
			queryClient.invalidateQueries({ queryKey: ["departments"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateDepartment, isUpdating };
}
