import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import useOutsideClick from "../../../hooks/useOutsideClick";
import NotificationsPanel from "./NotificationsPanel";
import { FiBell } from "react-icons/fi";

function NotificationIcon() {
	const [isOpen, setIsOpen] = useState(false);
	const { notifications, unreadCount, isGettingNotifs } = useNotifications();

	// Use the outside click hook to close the panel
	const ref = useOutsideClick(() => setIsOpen(false), false);

	const togglePanel = () => setIsOpen((prev) => !prev);

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={togglePanel}
				className="relative p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-all active:scale-[0.9]"
			>
				<FiBell size={24} />
				{!isGettingNotifs && unreadCount > 0 && (
					<span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
						{unreadCount}
					</span>
				)}
			</button>

			{isOpen && (
				<NotificationsPanel
					notifications={notifications}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
}

export default NotificationIcon;
