import { DateObject } from "react-multi-date-picker";
import authFetch from "../utils/authFetch";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toEnglishDigits } from "../utils/digitConvertor";

export async function getReports(filters) {
    const params = new URLSearchParams();

    // اضافه کردن تمام فیلترهای موجود به پارامترهای URL
    Object.keys(filters).forEach(key => {
        if (filters[key]) {
            params.append(key, filters[key]);
        }
    });

    const res = await authFetch(`http://localhost:5000/api/reports?${params.toString()}`);

    if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'خطا در دریافت گزارشات');
    }
    
    const data = await res.json();
    return data.data;
}

/**
  Exports attendance reports to an Excel file.
  @param {object} filters - An object containing all the filter parameters.
  @returns {Promise<void>} A promise that resolves when the download is initiated.
 */
export async function exportReportsToExcel(filters = {}) {
    try {
        const params = new URLSearchParams();

        // Add all provided filters to the URL parameters
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params.append(key, filters[key]);
            }
        });

        // CRITICAL: Add the export=true parameter
        params.append('export', 'true');

        const url = `${import.meta.env.VITE_API_URL}/api/reports?${params.toString()}`;

        // To download a file from an authenticated endpoint, we cannot just use window.open.
        // We must fetch it and then create a downloadable link.
        const response = await authFetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'خطا در ایجاد فایل اکسل');
        }

        // Get the blob data from the response
        const blob = await response.blob();

        // Create a temporary URL for the blob
        const downloadUrl = window.URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;

        // Suggest a filename for the user
        const dateStr = new DateObject({
            calendar: persian,
            locale: persian_fa,
        });
        link.setAttribute('download', `Attendance-Report-${toEnglishDigits(dateStr.toString())}.xlsx`);

        // Append to the document, click, and then remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the object URL to free up memory
        window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
        console.error("Export Error:", error);
        // You should probably show a toast message here
        throw error;
    }
}