import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from '../../../services/apiAuth';
import toast from "react-hot-toast";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logoutApi,

        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/', { replace: true });
            toast.success('با موفقیت از حساب کاربری خود خارج شدید');
        },

        onError: () => {
            toast.error('خطا در خروج از حساب کاربری! لطفاً دوباره تلاش کنید');
            queryClient.removeQueries();
            navigate('/login', { replace: true });
        },
    });

    return { logout, isLoggingOut };
}