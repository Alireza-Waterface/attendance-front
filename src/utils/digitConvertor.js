export function toEnglishDigits(str) {
    if (typeof str !== 'string') return str;
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
}