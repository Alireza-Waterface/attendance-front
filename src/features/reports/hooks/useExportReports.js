import { useMutation } from '@tanstack/react-query';
import { exportReportsToExcel as exportApi } from '../../../services/apiReports';
import toast from 'react-hot-toast';

export default function useExportReports() {
    const { mutate: exportReports, isPending: isExporting } = useMutation({
        mutationFn: exportApi, // The function that performs the export
        
        onSuccess: () => {
            toast.success('فایل اکسل در حال آماده‌سازی برای دانلود است...');
        },
        
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { exportReports, isExporting };
}