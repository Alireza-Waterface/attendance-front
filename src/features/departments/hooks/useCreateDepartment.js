import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment as createDepartmentApi } from "../../../services/apiDepartments";
import toast from "react-hot-toast";

export function useCreateDepartment() {
	const queryClient = useQueryClient();

	const { mutate: createDepartment, isPending: isCreating } = useMutation({
		mutationFn: createDepartmentApi,
		onSuccess: () => {
			toast.success("واحد جدید با موفقیت ایجاد شد.");
			// Invalidate the departments query to refetch the list
			queryClient.invalidateQueries({ queryKey: ["departments"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { createDepartment, isCreating };
}
