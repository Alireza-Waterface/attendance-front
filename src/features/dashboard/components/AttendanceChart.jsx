import {
	ResponsiveContainer,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
} from "recharts";

function AttendanceChart({ data }) {
	return (
		<>
			<h2 className="text-xl font-bold mb-4">روند حضور و تاخیر</h2>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" tick={{ fontSize: 14 }} />
					<YAxis allowDecimals={false} />
					<Tooltip contentStyle={{ fontFamily: "sans-serif" }} />
					<Legend />
					<Line
						type="monotone"
						dataKey="present"
						name="حاضر"
						stroke="#4ade80"
						strokeWidth={2}
					/>
					<Line
						type="monotone"
						dataKey="late"
						name="تاخیر"
						stroke="#facc15"
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

export default AttendanceChart;
