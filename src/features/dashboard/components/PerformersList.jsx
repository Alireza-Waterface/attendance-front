import { Link } from "react-router-dom";

function PerformersList({ title, performers, isRisky = false }) {
	return (
		<div>
			<h2 className="text-xl font-bold mb-4">{title}</h2>
			<ul className="space-y-3 flex flex-col gap-2">
				{performers?.length > 0 ? (
					performers.map((p) => (
						<li
							key={p.userId}
							className="flex justify-between items-center text-sm gap-2 p-1 rounded-md odd:bg-gray-300"
						>
							<Link
								className="hover:text-amber-600 transition-all"
								to={`/users?search=${p.fullName}`}
							>
								{p.fullName}
							</Link>
							<span
								className={`font-bold px-2 py-0.5 rounded-full ${
									isRisky
										? "bg-red-100 text-red-700"
										: "bg-green-100 text-green-700"
								}`}
							>
								{p.lateCount} تاخیر
							</span>
						</li>
					))
				) : (
					<p className="text-gray-500">
						داده‌ای برای نمایش وجود ندارد.
					</p>
				)}
			</ul>
		</div>
	);
}

export default PerformersList;
