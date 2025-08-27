import authFetch from "../utils/authFetch";

/**
 * Fetches the user's notifications.
 * @param {object} filters - { status: 'unread' | 'all', page, limit }
 */
export async function getNotifications(filters) {
	const params = new URLSearchParams();

	if (filters.status) params.append("status", filters.status);

	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/notifications?${params.toString()}`
	);
	if (!res.ok) throw new Error("خطا در دریافت اعلانات");
	const data = await res.json();
	return data.data;
}

/**
 * Marks notifications as read on the server.
 * @param {object} payload
 * @param {Array<string>} [payload.notificationIds] - Optional array of IDs. If empty, marks all as read.
 */
export async function markNotificationsAsRead(payload) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/notifications/read`,
		{
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در به‌روزرسانی اعلانات");
	}
	const data = await res.json();
	return data;
}

/**
 * Deletes a single notification by its ID.
 * @param {string} notificationId - The ID of the notification to delete.
 */
export async function deleteNotification(notificationId) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}`,
		{
			method: "DELETE",
		}
	);

	// 204 response has no body, so we only check the status.
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در حذف اعلان");
	}

	return null; // No data to return on successful deletion
}
