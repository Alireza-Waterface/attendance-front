import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App";
import ErrorBoundaryFallback from "./ui/ErrorBoundaryFallback";

import "./index.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			retry: false,
		},
	},
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryFallback}
			onReset={() => window.location.replace("/")} // Simple reset by reloading
		>
			<QueryClientProvider client={queryClient}>
				<App />
				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: { duration: 4000 },
						error: { duration: 4000 },
						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "16px 24px",
							backgroundColor: "#fff",
							color: "#333",
						},
					}}
				/>
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>
);
