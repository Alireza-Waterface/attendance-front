import {
	FiUsers,
	FiClock,
	FiCheckCircle,
	FiAlertTriangle,
} from "react-icons/fi"; // Example icons

function KpiStats({ stats }) {
	if (!stats) return null;

	const kpiItems = [
		{
			label: "کل کارمندان فعال",
			value: stats.totalStaff,
			icon: <FiUsers />,
			color: "blue",
		},
		{
			label: "کل تردد ثبت شده",
			value: stats.totalRecords,
			icon: <FiCheckCircle />,
			color: "green",
		},
		{
			label: "کل تاخیرها",
			value: stats.totalLates,
			icon: <FiAlertTriangle />,
			color: "red",
		},
		{
			label: "میانگین ساعات کاری",
			value: `${stats.avgWorkHours} ساعت`,
			icon: <FiClock />,
			color: "indigo",
		},
		{
			label: "حضور به موقع",
			value: `${stats.onTimePercentage}%`,
			icon: <FiCheckCircle />,
			color: "green",
		},
	];

	const colors = {
		blue: "bg-blue-500",
		green: "bg-green-500",
		red: "bg-red-500",
		indigo: "bg-indigo-500",
	};

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{kpiItems.map((item) => (
				<div
					key={item.label}
					className={`p-4 rounded-lg shadow text-white ${
						colors[item.color]
					}`}
				>
					<div className="flex justify-between items-center">
						<div>
							<p className="text-sm opacity-80">{item.label}</p>
							<p className="text-3xl font-bold">{item.value}</p>
						</div>
						<div className="text-4xl opacity-50">{item.icon}</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default KpiStats;
