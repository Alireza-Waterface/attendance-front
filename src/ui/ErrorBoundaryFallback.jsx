import { useRouteError } from "react-router-dom";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
	const routeError = useRouteError();
	const errorMessage =
		error?.message || routeError.message || "An unexpected error occurred.";

	return (
		<div
			className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center"
			role="alert"
		>
			<h1 className="text-2xl font-bold text-red-600 mb-4">
				خطایی رخ داده است
			</h1>
			<p className="text-gray-700 mb-6">
				متاسفانه با یک خطای پیش‌بینی نشده مواجه شدیم. لطفاً صفحه را رفرش
				کنید یا بعداً دوباره تلاش کنید.
			</p>

			{import.meta.env.MODE === "development" && (
				<pre className="bg-red-100 text-red-800 p-4 rounded-md overflow-x-auto max-w-2xl mb-6">
					{errorMessage}
				</pre>
			)}

			<button
				onClick={() => {
					if (resetErrorBoundary) {
						resetErrorBoundary();
					} else {
						window.location.replace("/");
					}
				}}
				className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer active:translate-y-1 transition-all"
			>
				دوباره تلاش کنید
			</button>
		</div>
	);
}

export default ErrorBoundaryFallback;
