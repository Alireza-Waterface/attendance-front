import { useState, useEffect } from 'react';

/**
    * یک هوک سفارشی برای debounce کردن یک مقدار.
    * @param {*} value - مقداری که می‌خواهید debounce شود (مثلاً متن جستجو).
    * @param {number} delay - مدت زمان تاخیر به میلی‌ثانیه.
    * @returns {*} مقدار debounce شده.
*/

function useDebounce(value, delay) {
    // State برای نگهداری مقدار debounce شده
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // یک تایمر تنظیم کن که بعد از مدت زمان delay، مقدار debounce شده را آپدیت کند
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // cleanup function: این تابع در هر بار اجرای مجدد useEffect (یعنی هر بار که value تغییر می‌کند)
        // تایمر قبلی را پاک می‌کند.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // این افکت فقط زمانی اجرا می‌شود که value یا delay تغییر کند

    return debouncedValue;
}

export default useDebounce;