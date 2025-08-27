import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAttendance as deleteAttendanceApi } from '../../../services/apiAttendance';
import toast from 'react-hot-toast';

export function useDeleteAttendance() {
    const queryClient = useQueryClient();

    const { mutate: deleteAttendance, isPending: isDeleting } = useMutation({
        mutationFn: deleteAttendanceApi,
        onSuccess: () => {
            toast.success('گزارش با موفقیت حذف شد.');
            queryClient.invalidateQueries({ queryKey: ['today-records'] });
            queryClient.invalidateQueries({ queryKey: ['reports'] });
			queryClient.invalidateQueries({ queryKey: ["my-records"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { deleteAttendance, isDeleting };
}