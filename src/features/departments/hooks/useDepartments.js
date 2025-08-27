import { useQuery } from '@tanstack/react-query';
import { getDepartments as getDepartmentsApi } from '../../../services/apiDepartments';

export function useDepartments() {
    const { data: departments, isLoading: isGettingDepartments, error } = useQuery({
        // کلید کوئری برای شناسایی این داده در کش
        queryKey: ['departments'],
        
        // تابعی که برای واکشی داده‌ها فراخوانی می‌شود
        queryFn: getDepartmentsApi,

        // تنظیمات بهینه برای داده‌هایی که به ندرت تغییر می‌کنند
        staleTime: Infinity, // <<-- نکته کلیدی
    });

    return { departments, isGettingDepartments, error };
}