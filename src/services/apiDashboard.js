import { DateObject } from "react-multi-date-picker";
import authFetch from "../utils/authFetch";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export async function getDashboardData(timeRange = "today") {
	const searchParams = new URLSearchParams();

	let endDate = new DateObject({
		calendar: persian,
		locale: persian_fa,
	});
	let startDate = new DateObject({
		calendar: persian,
		locale: persian_fa,
	});

	switch (timeRange) {
		case "week":
			startDate = new Date(
				startDate.toFirstOfWeek().setHour(0).setMinute(0).setSecond(1)
			).toISOString();
			break;
		case "month":
			startDate = new Date(
				startDate.toFirstOfMonth().setHour(0).setMinute(0).setSecond(1)
			).toISOString();
			break;
		default:
			startDate = new Date(
				startDate.setHour(0).setMinute(0).setSecond(1)
			).toISOString();
			break;
	}

	searchParams.append("startDate", startDate);
	searchParams.append("endDate", new Date(endDate.toDate()).toISOString());

	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/dashboard?${searchParams.toString()}`
	);

	if (!res.ok) throw new Error("خطا در دریافت اطلاعات داشبورد");

	const data = await res.json();
	return data.data;
}
