import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

/**
 * یک رشته تاریخ ISO یا آبجکت Date را به فرمت تاریخ و ساعت شمسی تبدیل می‌کند.
 * @param {string | Date} date - رشته تاریخ ISO یا آبجکت Date ورودی.
 * @returns {string} رشته فرمت شده، مثلا "۱۴۰۴/۰۵/۲۴ - ۱۵:۰۸" یا "تاریخ نامعتبر"
 */
export function formatToPersianDateTime(date) {
    if (!date) {
        return "---";
    }

    try {
        const dateObject = new DateObject({
            date: date,
            calendar: persian,
            locale: persian_fa,
        });

        return dateObject.format("YYYY/MM/DD - HH:mm");

    } catch (error) {
        console.error("Error formatting date:", error);
        return "تاریخ نامعتبر";
    }
}

/**
 * یک رشته تاریخ ISO یا آبجکت Date را فقط به فرمت ساعت شمسی تبدیل می‌کند.
 * @param {string | Date} date - رشته تاریخ ISO یا آبجکت Date ورودی.
 * @returns {string} رشته فرمت شده، مثلا "۱۵:۰۸"
 */
export function formatToPersianTime(date) {
    if (!date) {
        return "---";
    }

    try {
        const dateObject = new DateObject({
            date: date,
            calendar: persian,
            locale: persian_fa,
        });
        return dateObject.format("YYYY/MM/DD - HH:mm");
    } catch (error) {
        console.error("Error formatting time:", error);
        return "زمان نامعتبر";
    }
}