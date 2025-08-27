import { FiClock, FiUserX } from "react-icons/fi";
import { Link } from "react-router-dom";

function DailyStatusLists({ lateUsers, absentUsers }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{/* Late Users List */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
					<FiClock className="text-yellow-500" />
					کاربران با تاخیر امروز
				</h2>
				<ul className="space-y-3 max-h-60 overflow-y-auto flex flex-col gap-2">
					{lateUsers && lateUsers.length > 0 ? (
						lateUsers.map((user) => (
							<li
								key={user.userId}
								className="flex justify-between items-center text-sm p-1 even:bg-gray-200 bg-gray-300 rounded-md"
							>
								<Link
									to={`/users?search=${user.fullName}`}
									className="transition-all hover:text-amber-600"
								>
									{user.fullName}
								</Link>
								<span className="font-mono font-bold text-amber-600">
									{user.checkInTime}
								</span>
							</li>
						))
					) : (
						<p className="text-gray-500 text-center py-4">
							هیچ تاخیری برای امروز ثبت نشده است.
						</p>
					)}
				</ul>
			</div>

			{/* Absent Users List */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
					<FiUserX className="text-red-500" />
					کاربران غایب امروز
				</h2>
				<ul className="space-y-3 max-h-60 overflow-y-auto flex flex-col gap-2">
					{absentUsers && absentUsers.length > 0 ? (
						absentUsers.map((user) => (
							<li
								key={user._id}
								className="flex justify-between items-center text-sm p-1 even:bg-gray-200 bg-gray-300 rounded-md"
							>
								<Link
									to={`/users?search=${user.personnelCode}`}
									className="transition-all hover:text-amber-600"
								>
									{user.fullName}
								</Link>
								<span className="text-xs text-amber-500">
									{user.personnelCode}
								</span>
							</li>
						))
					) : (
						<p className="text-gray-500 text-center py-4">
							هیچ کارمند غایبی برای امروز وجود ندارد.
						</p>
					)}
				</ul>
			</div>
		</div>
	);
}

export default DailyStatusLists;
