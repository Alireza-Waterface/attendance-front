import { useQuery } from "@tanstack/react-query";
import { getUser as getUserApi } from "../../../services/apiUsers";

export default function useUser() {
    const { data: user, isLoading: isGettingUser } = useQuery({
        queryKey: ['userr'],
        queryFn: getUserApi,
    });

    return { user, isGettingUser };
}