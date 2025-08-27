import authFetch from "../utils/authFetch";

export async function getTodayRecords({ sortBy, role }) {
	const params = new URLSearchParams();
	if (sortBy) params.append("sortBy", sortBy);
	if (role) params.append("role", role);

	const res = await authFetch(
		`${
			import.meta.env.VITE_API_URL
		}/api/attendance/my-creations?${params.toString()}`,
		{
			credentials: "include",
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در دریافت لیست گزارشات");
	}

	const data = await res.json();

	return data.data;
}

export async function recordAttendance(record) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/attendance`,
		{
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(record),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در ثبت گزارش");
	}

	const data = await res.json();

	return data.data;
}

export async function updateAttendance({ recordId, data }) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/attendance/${recordId}`,
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در ویرایش رکورد");
	}

	return await res.json();
}

export async function deleteAttendance(recordId) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/attendance/${recordId}`,
		{
			method: "DELETE",
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در حذف رکورد");
	}

	return null;
}

/**
 * Fetches the logged-in user's own attendance records.
 * @param {object} filters - { page, startDate, endDate }
 */
export async function getMyRecords(filters) {
	const params = new URLSearchParams();

	Object.keys(filters).forEach((key) => {
		if (filters[key]) {
			params.append(key, filters[key]);
		}
	});

	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/attendance/my-records?${params.toString()}`
	);

	if (!res.ok) {
		throw new Error("خطا در دریافت گزارشات شخصی");
	}

	const data = await res.json();
	return data.data; // The paginated response object
}