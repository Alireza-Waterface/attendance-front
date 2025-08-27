import authFetch from "../utils/authFetch";

export async function getSettings() {
	const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/settings`);
	if (!res.ok) throw new Error("خطا در دریافت تنظبمات سامانه");
	const data = await res.json();
	return data.data;
}

export async function updateSettings(settingsData) {
	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/settings`,
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(settingsData),
		}
	);
	if (!res.ok) throw new Error("خطا در ویرایش تنظیمات");
	const data = await res.json();
	return data.data;
}

export async function uploadLogo(logoFile) {
	const formData = new FormData();
	formData.append("logo", logoFile);

	const res = await authFetch(
		`${import.meta.env.VITE_API_URL}/api/settings/logo`,
		{
			method: "PUT",
			body: formData,
		}
	);
	if (!res.ok) throw new Error("خطا در آپلود لوگو سامانه");
	const data = await res.json();
	return data.data;
}

export async function getPublicSettings() {
	// Note: We use the original 'fetch', not 'authFetch', as no credentials are needed.
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/settings/public`);
	if (!res.ok) throw new Error("Error fetching public settings");
	const data = await res.json();
	return data.data;
}