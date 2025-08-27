import { PAGE_SIZE } from "../utils/constants";
import authFetch from "../utils/authFetch";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { toEnglishDigits } from "../utils/digitConvertor";

export async function getUsers({ department, role, search, page }) {
	// ۱. ساخت Query String به صورت پویا
	const params = new URLSearchParams();
	if (page) params.append("page", page);
	if (PAGE_SIZE) params.append("limit", PAGE_SIZE);
	if (search) params.append("search", search);

	// ۲. اضافه کردن فیلترها فقط اگر مقدار 'all' را نداشته باشند
	if (department && department !== "all") {
		params.append("department", department);
	}
	if (role && role !== "all") {
		params.append("role", role);
	}

	// ۳. ارسال درخواست
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users?${params.toString()}`,
		{
			credentials: "include",
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در دریافت لیست کاربران");
	}

	const data = await res.json();
	return data.data;
}

export async function getOfficers() {
	const params = new URLSearchParams();
	params.append("role", "مسئول");
	params.append("limit", 100);

	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users?${params.toString()}`,
		{
			credentials: "include",
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در دریافت لیست مسئولان");
	}

	const data = await res.json();
	return data.data.docs || [];
}

export async function getUser(id) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users/${id}`,
		{
			method: "GET",
			credentials: "include",
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در دریافت اطلاعات اعضا");
	}

	const data = await res.json();

	return data.data;
}

export async function createUser(user) {
	console.log(user);
	const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/users`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در ایجاد عضو");
	}

	const data = await res.json();

	return data.data;
}

export async function updateUser({ id, updatedData }) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(updatedData),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در ویرایش عضو");
	}

	const data = await res.json();

	return data.data;
}

export async function uploadUserImage(image) {
	const formData = new FormData();
	formData.append("image", image);

	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users/profile/avatar`,
		{
			method: "POST",
			credentials: "include",
			body: formData,
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در آپلود تصویر عضو");
	}

	const data = await res.json();

	return data.data;
}

export async function deleteUser(userId) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users/${userId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در حذف کاربر");
	}

	// برای عملیات حذف موفق، چیزی برنمی‌گردانیم
	return null;
}

export async function getPublicUsers({ search = "", page = 1, limit = 10 }) {
	const params = new URLSearchParams();
	if (search) params.append("search", search);
	if (page) params.append("page", page);
	if (limit) params.append("limit", limit);

	const today = new DateObject({ calendar: persian });
	const todayJalaliString = toEnglishDigits(today.format("YYYY/MM/DD"));
	params.append("date", todayJalaliString);

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/api/public/users?${params.toString()}`
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در دریافت لیست کاربران");
	}

	const data = await res.json();
	return data.data;
}

/**
 * Updates the currently logged-in user's profile data.
 * @param {object} updatedData - An object with the fields to update (e.g., { fullName, roomLocation })
 */
export async function updateCurrentUser(updatedData) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users/profile`,
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedData),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در به‌روزرسانی پروفایل");
	}

	const data = await res.json();
	return data.data; // The updated user object
}

/**
 * آپلود تصویر پروفایل جدید برای کاربر فعلی با قابلیت رهگیری прогресс.
 * @param {object} options
 * @param {File} options.avatarFile - فایل تصویر از اینپوت.
 * @param {function} options.onUploadProgress - یک تابع callback که با прогресс آپلود فراخوانی می‌شود.
 */
export function uploadAvatar({ avatarFile, onUploadProgress }) {
	return new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append("avatar", avatarFile);

		const xhr = new XMLHttpRequest();

		// ۱. رهگیری رویداد "progress" در آپلود
		xhr.upload.addEventListener("progress", (event) => {
			if (event.lengthComputable) {
				const percentCompleted = Math.round(
					(event.loaded * 100) / event.total
				);
				// فراخوانی callback با مقدار درصد
				onUploadProgress(percentCompleted);
			}
		});

		// ۲. مدیریت پاسخ موفق
		xhr.addEventListener("load", () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				const response = JSON.parse(xhr.responseText);
				resolve(response.data); // آبجکت آپدیت شده کاربر را resolve کن
			} else {
				const errorResponse = JSON.parse(xhr.responseText);
				reject(
					new Error(errorResponse.message || "خطا در آپلود تصویر")
				);
			}
		});

		// ۳. مدیریت خطای شبکه
		xhr.addEventListener("error", () => {
			reject(new Error("خطای شبکه در هنگام آپلود فایل."));
		});

		// ۴. تنظیم و ارسال درخواست
		xhr.open(
			"PUT",
			`${import.meta.env.VITE_API_URL}/api/users/profile/avatar`
		);

		// برای ارسال کوکی‌های HttpOnly با XHR
		xhr.withCredentials = true;

		xhr.send(formData);
	});
}

/**
 * Searches users for selection dropdowns.
 * @param {string} searchTerm - The term to search for.
 */
export async function searchUsers(searchTerm) {
	if (!searchTerm || searchTerm.length < 2) return []; // Don't send a request if the search is empty

	const params = new URLSearchParams();
	params.append("search", searchTerm);

	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/users/search?${params.toString()}`
	);

	if (!res.ok) {
		throw new Error("خطا در جستجوی کاربران");
	}

	const data = await res.json();
	return data.data; // The backend now returns a simple array of users
}