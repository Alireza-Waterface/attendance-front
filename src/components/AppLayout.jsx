import { Link, Outlet } from "react-router-dom";

import { useUser } from "../features/auth/hooks/useUser";
import { useLogout } from "../features/auth/hooks/useLogout";
import { usePublicSettings } from "../features/settings/hooks/usePublicSettings";

import NotificationIcon from "../features/notifications/components/NotificationIcon";

import Footer from "./Footer";

import ListItem from "../ui/ListItem";
import Loading from "../ui/Loading";

import { IoExitOutline } from "react-icons/io5";

export default function AppLayout() {
	const { isAdmin, isOfficer, isAuthenticated } = useUser();
	const { publicSettings, isLoadingPublicSettings } = usePublicSettings();
	const { logout, isLoggingOut } = useLogout();

	return (
		<div className="grid grid-cols-12 grid-rows-[auto_1fr]">
			<aside className="col-span-2 border-l-2 border-l-amber-400 min-h-[100vh] px-2">
				{isLoadingPublicSettings && <div className="loaderMini"></div>}
				{!isLoadingPublicSettings && (
					<h2 className="h-12 flex items-center justify-center w-full">
						{publicSettings.universityName}
					</h2>
				)}

				<nav className="sticky top-0">
					<ul className="flex items-center justify-center flex-col py-2 gap-4">
						<ListItem text="صفحه اصلی" link="/" />
						{isAdmin && (
							<ListItem text="داشبورد مدیریت" link="/dashboard" />
						)}
						{isAdmin && (
							<ListItem text="مدیریت اعضا" link="/users" />
						)}
						{(isAdmin || isOfficer) && (
							<ListItem text="گزارشات" link="/reports" />
						)}
						{(isAdmin || isOfficer) && (
							<ListItem text="ثبت گزارش" link="/register" />
						)}
						{isAdmin && (
							<ListItem text="تنظیمات سامانه" link="/settings" />
						)}
						{isAuthenticated && (
							<ListItem text="پروفایل" link="/profile" />
						)}
						{isAuthenticated && (
							<ListItem text="تردد من" link="/my-records" />
						)}
					</ul>
				</nav>
			</aside>

			<div className="col-span-10">
				<header className="h-12 border-b-2 border-b-amber-400 flex justify-between items-center px-2">
					{isLoadingPublicSettings && (
						<Loading className="loaderMini"></Loading>
					)}
					{!isLoadingPublicSettings && (
						<h1>{publicSettings.title}</h1>
					)}

					{isAuthenticated ? (
						<div className="flex gap-4 items-center">
							<NotificationIcon />
							<button
								onClick={logout}
								disabled={isLoggingOut}
								className="cursor-pointer disabled:cursor-not-allowed"
								title="خروج از حساب"
							>
								{isLoggingOut ? (
									<Loading className="loaderMini" />
								) : (
									<IoExitOutline
										size={24}
										className="text-amber-700"
									/>
								)}
							</button>
						</div>
					) : (
						<Link className="bg-amber-400 rounded-md px-4 py-1 transition-all active:scale-95 hover:bg-amber-500 active:translate-y-0.5" to={"/login"}>
							ورود به حساب
						</Link>
					)}
				</header>

				<main className="p-2">
					<Outlet />
				</main>
			</div>

			<Footer />
		</div>
	);
}
