import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPublicUsers as getPublicUsersApi } from "../../../services/apiUsers";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

export default function usePublicUsers() {
	const [searchParams] = useSearchParams();

	const search = searchParams.get("search") || "";
	const limit = searchParams.get("limit") || "";
	const page = !searchParams.get("page")
		? 1
		: Number(searchParams.get("page"));

	const todayJalaliString = new DateObject({ calendar: persian }).format(
		"YYYY/MM/DD"
	);

	const {
		data: { docs: users, ...pagination } = {},
		isLoading: isGettingUsers,
	} = useQuery({
		queryKey: ["public-users", todayJalaliString, search, page],
		queryFn: () => getPublicUsersApi({ search, page, limit }),
	});

	return { users, isGettingUsers, pagination };
}
