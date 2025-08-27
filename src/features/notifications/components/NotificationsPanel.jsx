import { Link } from "react-router-dom";

import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { useDeleteNotification } from "../hooks/useDeleteNotification";

import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { FaRegTrashCan } from "react-icons/fa6";

function NotificationsPanel({ notifications = [], onClose }) {
	const { markAsRead } = useMarkAsRead();
	const { deleteNotification, isDeleting } = useDeleteNotification();

	function handleMarkAllAsRead() {
		markAsRead({});
	}

	function handleDelete(e, notificationId) {
		e.preventDefault();
		e.stopPropagation();
		deleteNotification(notificationId);
	}

	return (
		<div className="absolute top-11 left-0 w-80 bg-white rounded-lg shadow-lg border z-50">
			<div className="flex justify-between items-center p-3 border-b">
				<h3 className="font-bold">اعلانات</h3>
				<button
					onClick={handleMarkAllAsRead}
					disabled={!notifications?.length}
					className="text-xs text-amber-600 hover:underline cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed"
				>
					علامت زدن همه به عنوان خوانده‌شده
				</button>
			</div>
			<ul className="max-h-96 overflow-y-auto">
				{notifications.length > 0 ? (
					notifications.map((notif) => (
						<li
							key={notif._id}
							className={`not-last:border-b hover:bg-amber-300 transition-all last:rounded-b-lg flex gap-2 items-center justify-between p-2 pl-1 ${
								!notif.isRead ? "bg-amber-200" : ""
							}`}
						>
							<Link
								to={notif.link || "#"}
								onClick={onClose}
								className="block"
							>
								<p className="text-sm">{notif.message}</p>
								<p className="text-xs text-gray-600 mt-1">
									{new DateObject({
										date: notif.createdAt,
										calendar: persian,
										locale: persian_fa,
										format: "YYYY/MM/DD - HH:mm",
									}).toString()}
								</p>
							</Link>

							<button
								onClick={(e) => handleDelete(e, notif._id)}
								disabled={isDeleting}
								className="p-2 rounded-full text-gray-600 hover:bg-red-200 hover:text-red-600 transition-all cursor-pointer"
								title="حذف این اعلان"
							>
								<FaRegTrashCan size={18} />
							</button>
						</li>
					))
				) : (
					<p className="text-center text-gray-500 p-6">
						هیچ اعلان جدیدی وجود ندارد.
					</p>
				)}
			</ul>
		</div>
	);
}

export default NotificationsPanel;
