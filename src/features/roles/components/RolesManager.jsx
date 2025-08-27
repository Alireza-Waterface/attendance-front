import { ROLE_DESCRIPTIONS, ROLES } from "../../../utils/constants";

export default function RolesManager() {
	return (
		<div className="bg-amber-100 rounded-lg flex flex-col gap-2 p-4">
			<h2 className="text-xl font-semibold">مدیریت نقش‌ها</h2>
			<p className="text-sm text-gray-600">
				نقش‌های زیر در سیستم تعریف شده‌اند و در حال حاضر قابل تغییر
				نیستند.
			</p>
			<div className="space-y-3 flex flex-col gap-2">
				{ROLES.map((role) => (
					<div
						key={role}
						className="bg-white p-3 rounded-md shadow-sm"
					>
						<p className="font-bold text-amber-600">{role}</p>
						<p className="text-sm text-gray-700 mt-1">
							{ROLE_DESCRIPTIONS[role] ||
								"توضیحات برای این نقش ثبت نشده است."}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
