import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDepartment as deleteDepartmentApi } from "../../../services/apiDepartments";
import toast from "react-hot-toast";

export function useDeleteDepartment() {
	const queryClient = useQueryClient();

	const { mutate: deleteDepartment, isPending: isDeleting } = useMutation({
		mutationFn: deleteDepartmentApi,
		onSuccess: () => {
			toast.success("واحد با موفقیت حذف شد.");
			// Invalidate the departments query to refetch the list
			queryClient.invalidateQueries({ queryKey: ["departments"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { deleteDepartment, isDeleting };
}
