import { useState } from "react";
import { Link } from "react-router-dom";
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
	Tooltip,
} from "recharts";

// Define consistent colors for our clusters
const CLUSTER_COLORS = {
	"منظم و وقت‌شناس": "#22c55e", // Green
	"شناور و پرکار": "#3b82f6", // Blue
	"در معرض خطر (تاخیر زیاد)": "#ef4444", // Red
};
const FALLBACK_COLOR = "#8884d8";

function ClusterAnalysis({ clustersData }) {
	const [selectedCluster, setSelectedCluster] = useState(null);

	// 1. Process the raw data to get counts for the chart
	const clusterSummary = clustersData.reduce((acc, user) => {
		const label = user.cluster_label || "نامشخص";
		if (!acc[label]) {
			acc[label] = { name: label, value: 0 };
		}
		acc[label].value += 1;
		return acc;
	}, {});

	const chartData = Object.values(clusterSummary);

	// 2. Filter the list of users based on the selected cluster
	const filteredUsers = selectedCluster
		? clustersData.filter((user) => user.cluster_label === selectedCluster)
		: [];

	return (
		<div className="p-4 bg-white rounded-lg shadow">
			<h2 className="text-xl font-bold mb-4">تحلیل خوشه‌بندی رفتاری</h2>

			{/* Check if there's data to display */}
			{!clustersData || clustersData.length === 0 ? (
				<p className="text-gray-500">
					داده کافی برای تحلیل خوشه‌بندی وجود ندارد.
				</p>
			) : (
				<div className="flex flex-col gap-4">
					{/* Pie Chart Section */}
					<div className="md:col-span-1 h-60">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={chartData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									nameKey="name"
									// Add click handler to update the selected cluster
									onClick={(data) =>
										setSelectedCluster(data.name)
									}
								>
									{chartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												CLUSTER_COLORS[entry.name] ||
												FALLBACK_COLOR
											}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend
									onClick={(data) =>
										setSelectedCluster(data.payload.name)
									}
									wrapperStyle={{ cursor: "pointer" }}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>

					{/* Details List Section */}
					<div className="md:col-span-2">
						<h3 className="font-semibold mb-2">
							{selectedCluster
								? `کاربران در خوشه: ${selectedCluster}`
								: "برای مشاهده لیست، روی یک بخش از نمودار کلیک کنید."}
						</h3>
						{selectedCluster && (
							<ul className="space-y-2 max-h-72 overflow-y-auto p-2 rounded-md">
								{filteredUsers.map((user) => (
									<li
										key={user.user_id}
										className="text-sm p-2 rounded even:bg-gray-300"
									>
										<Link className="hover:text-amber-600 transition-all" to={`/users?search=${user.fullName}`}>{user.fullName}</Link>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default ClusterAnalysis;
