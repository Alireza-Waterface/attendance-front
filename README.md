# سامانه حضور و غیاب دانشگاه - بخش فرانت‌اند (Frontend)

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB.svg?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/React%20Router-6.x-CA4245.svg?style=for-the-badge&logo=react-router" alt="React Router">
  <img src="https://img.shields.io/badge/TanStack%20Query-5.x-FF4154.svg?style=for-the-badge&logo=react-query" alt="React Query">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</p>

این ریپازیتوری شامل کد کامل بخش فرانت‌اند برای **سامانه هوشمند حضور و غیاب دانشگاه** است. این برنامه به صورت یک **Single-Page Application (SPA)** با استفاده از React ساخته شده و یک رابط کاربری مدرن، واکنش‌گرا و کارآمد برای تعامل با بک‌اند سامانه فراهم می‌کند.

## ✨ امکانات و ویژگی‌های کلیدی

این رابط کاربری تمام قابلیت‌های قدرتمند بک‌اند را در قالبی زیبا و کاربرپسند ارائه می‌دهد:

### 🎨 رابط کاربری مدرن و واکنش‌گرا
- **طراحی با Tailwind CSS:** استایل‌دهی سریع، قابل نگهداری و کاملاً واکنش‌گرا برای تمام دستگاه‌ها.
- **کامپوننت‌های قابل استفاده مجدد:** استفاده از الگوهای پیشرفته React برای ساخت کامپوننت‌های UI ماژولار و قابل استفاده مجدد (مانند Modal، Menus، Select).
- **تجربه کاربری روان:** استفاده از `React.lazy` برای بارگذاری تنبل صفحات و `Suspense` برای نمایش حالت‌های لودینگ.
- **Error Boundary:** مدیریت خطاهای غیرمنتظره و نمایش یک صفحه fallback کاربرپسند برای جلوگیری از کرش کامل برنامه.

###  state مدیریتی قدرتمند
- **TanStack (React) Query:** مدیریت کامل state سمت سرور، کش کردن داده‌ها، re-fetching خودکار و بهینه‌سازی عملکرد با prefetching.
- **مدیریت state در URL:** استفاده از `useSearchParams` برای مدیریت وضعیت فیلترها، صفحه‌بندی و مرتب‌سازی، که باعث می‌شود URL همیشه منبع حقیقت باشد.
- **هوک‌های سفارشی (Custom Hooks):** کپسوله کردن تمام منطق‌های واکشی داده و `mutations` در هوک‌های سفارشی (مانند `useUsers`, `useReports`, `useLogin`) برای کدی تمیز و قابل نگهداری.

### 📋 قابلیت‌های اصلی
- **صفحات عمومی و محافظت شده:** تفکیک کامل مسیرها با استفاده از `createBrowserRouter` و یک کامپوننت `ProtectedRoute` قدرتمند.
- **داشبورد مدیریتی جامع:** نمایش KPI ها، نمودارهای تعاملی (با `recharts`) و لیست‌های هوشمند برای مدیران.
- **مدیریت کامل داده‌ها:** رابط کاربری کامل برای عملیات CRUD (ایجاد، خواندن، ویرایش، حذف) روی کاربران، گزارشات و تنظیمات.
- **جستجو و فیلتر پیشرفته:** قابلیت جستجوی Debounced و فیلترهای چندگانه در تمام جداول داده.
- **فرم‌های هوشمند:** ساخته شده با `react-hook-form` برای عملکرد بالا و اعتبارسنجی قوی در سمت کلاینت.
- **سیستم اعلان (Notification):** یک مرکز اعلان در هدر برای نمایش رویدادهای مهم به کاربر.
- **پشتیبانی کامل از تقویم شمسی:** با استفاده از `react-multi-date-picker` برای انتخاب تاریخ و `date-fns-jalali` برای نمایش.

## 🛠️ تکنولوژی‌ها و کتابخانه‌های اصلی

- **فریم‌ورک:** React (با Vite)
- **مسیریابی (Routing):** React Router DOM v6 (`createBrowserRouter`)
- **مدیریت State سرور:** TanStack (React) Query
- **استایل‌دهی:** Tailwind CSS
- **فرم‌ها:** React Hook Form
- **نمودارها:** Recharts
- **آیکون‌ها:** React Icons
- **تاریخ شمسی:** React Multi Date Picker
- **اعلان‌ها:** React Hot Toast
- **Error Handling:** React Error Boundary

## 🚀 راه‌اندازی و نصب (Setup)

برای راه‌اندازی این پروژه به صورت محلی، مراحل زیر را دنبال کنید:

1.  **پیش‌نیازها:**
    - Node.js (نسخه 16 یا بالاتر)
    - بک‌اند این پروژه باید در حال اجرا باشد. (به ریپازیتوری [attendance-system-backend](https://github.com/your-username/attendance-system-backend) مراجعه کنید)

2.  **کلون کردن ریپازیتوری:**
    ```bash
    git clone https://github.com/your-username/attendance-system-frontend.git
    cd attendance-system-frontend
    ```

3.  **نصب وابستگی‌ها:**
    ```bash
    npm install
    ```

4.  **ایجاد فایل `.env`:**
    یک فایل به نام `.env` در ریشه پروژه بسازید و آدرس API بک‌اند خود را در آن مشخص کنید:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

5.  **اجرای سرور توسعه:**
    ```bash
    npm run dev
    ```
    برنامه شما روی آدرسی مانند `http://localhost:5173` (یا پورت دیگری که Vite مشخص می‌کند) در دسترس خواهد بود.

---

**مشارکت (Contributing):**
در حال حاضر، این یک پروژه شخصی است، اما اگر پیشنهادی برای بهبود دارید، لطفاً یک Issue باز کنید.

**نویسنده:** علیرضا آبچهره || Alireza Waterface
