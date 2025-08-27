import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
} from "recharts";

function DepartmentPerformanceChart({ data }) {
	// We only want to show the top 5 departments to keep the chart clean
	const chartData = data?.slice(0, 5) || [];

	return (
		<>
			<h2 className="text-xl font-bold mb-4">تاخیر در واحدها</h2>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={chartData}
					layout="vertical"
					margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" allowDecimals={false} />
					<YAxis
						dataKey="department"
						type="category"
						width={100}
						tick={{ fontSize: 12, fill: "#374151" }}
					/>
					<Tooltip />
					<Bar
						dataKey="totalLates"
						name="تعداد تاخیر"
						fill="#fbbf24"
					/>
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}

export default DepartmentPerformanceChart;
