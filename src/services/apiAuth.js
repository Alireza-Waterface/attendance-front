import authFetch from "../utils/authFetch";

export async function login({ username, password }) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/auth/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || 'خطا در ورود به حساب کاربری');
	}

	const data = await res.json();
	return data.data.user;
}

export async function getCurrentUser() {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users/profile`,
		{ method: "GET" }
	);
	
	if (res.status === 401) return null;
	
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در دریافت اطلاعات کاربر");
	}

	const data = await res.json();

	return data.data;
}

export async function logout() {
	await authFetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
		method: "POST",
		credentials: "include",
	});
}

/**
 * Sends a request to change the current user's password.
 * @param {object} passwordData - { oldPassword, newPassword }
 */
export async function changePassword(passwordData) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/auth/change-password`,
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(passwordData),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در تغییر رمز عبور");
	}

	const data = await res.json();
	return data;
}
