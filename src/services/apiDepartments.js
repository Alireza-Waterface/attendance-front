import authFetch from "../utils/authFetch";

/**
 * Fetches all departments from the server.
 */
export async function getDepartments() {
	const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/departments`);
	if (!res.ok) throw new Error("خطا در دریافت لیست واحدها");
	const data = await res.json();
	return data.data;
}

/**
 * Creates a new department.
 * @param {object} departmentData - { name, description }
 */
export async function createDepartment(departmentData) {
	const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/departments`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(departmentData),
	});
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در ایجاد واحد");
	}
	const data = await res.json();
	return data.data;
}

/**
 * Updates an existing department.
 * @param {object} params
 * @param {object} params.newData - The object of the department data { _id, data: {} }
 */
export async function updateDepartment({ id, data }) {
	const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/departments/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در ویرایش واحد");
	}
	const result = await res.json();
	return result.data;
}

/**
 * Deletes a department by its ID.
 * @param {string} id - The ID of the department to delete.
 */
export async function deleteDepartment(id) {
	const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/departments/${id}`, {
		method: "DELETE",
	});
	// A 204 response has no body, so we just check res.ok
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "خطا در حذف واحد");
	}
	// On successful deletion, there is no data to return
	return null;
}
