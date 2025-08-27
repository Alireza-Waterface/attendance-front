import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../../services/apiAuth";

function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: ({username, password}) => loginApi({ username, password }),

        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
            navigate('/', {replace: true});
            toast.success('با موفقیت وارد شدید', {style: {color: 'green'}});
        },

        onError: (error) => {
            toast.error(error.message);
        },

        retry: false,
    });

    return { login, isLoggingIn };
}

export default useLogin;