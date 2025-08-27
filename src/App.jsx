import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import ErrorBoundaryFallback from "./ui/ErrorBoundaryFallback";
import Loading from "./ui/Loading";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Reports = lazy(() => import("./pages/Reports"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const RestrictedAccess = lazy(() => import("./pages/RestrictedAccess"));
const MyRecords = lazy(() => import("./pages/MyRecords"));

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <ErrorBoundaryFallback />,
		children: [
			{
				path: "dashboard",
				element: (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{
				path: "users",
				element: (
					<ProtectedRoute>
						<Users />
					</ProtectedRoute>
				),
			},
			{
				path: "reports",
				element: (
					<ProtectedRoute>
						<Reports />
					</ProtectedRoute>
				),
			},
			{
				path: "register",
				element: (
					<ProtectedRoute>
						<Register />
					</ProtectedRoute>
				),
			},
			{
				path: "settings",
				element: (
					<ProtectedRoute>
						<Settings />
					</ProtectedRoute>
				),
			},
			{
				path: "profile",
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "my-records",
				element: (
					<ProtectedRoute>
						<MyRecords />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/reset-password",
		element: <ResetPassword />,
	},
	{
		path: "/restricted",
		element: <RestrictedAccess />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
]);

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
