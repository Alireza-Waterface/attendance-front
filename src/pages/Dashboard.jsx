import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useDashboard from "../features/dashboard/hooks/useDashboard";
import { useUser } from "../features/auth/hooks/useUser";

import Loading from "../ui/Loading";
import Select from "../ui/Select";

import KpiStats from "../features/dashboard/components/KpiStats";
import AttendanceChart from "../features/dashboard/components/AttendanceChart";
import DepartmentPerformanceChart from "../features/dashboard/components/DepartmentPerformanceChart";
import PerformersList from "../features/dashboard/components/PerformersList";
import MlInsights from "../features/dashboard/components/MlInsights";
import DailyStatusLists from "../features/dashboard/components/DailyStatusLists";

function Dashboard() {
	const { isAdmin, isLoading } = useUser();
	const [searchParams, setSearchParams] = useSearchParams();
	const { dashboardData, isGettingDashData } = useDashboard();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isAdmin) {
			navigate("/restricted", { replace: true });
		}
	}, [isLoading, isAdmin, navigate]);

	if (isLoading || isGettingDashData) return <Loading />;

	const handleTimeRangeChange = (e) => {
		searchParams.set("timeRange", e.target.value);
		setSearchParams(searchParams);
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center gap-4 mb-2">
				<h1 className="text-3xl font-bold">داشبورد مدیریت</h1>
				<div className="flex items-center gap-2">
					<Select
						label="بازه زمانی:"
						identifier="timeRange"
						defaultValue={searchParams.get("timeRange") || "today"}
						onChange={handleTimeRangeChange}
						options={[
							{ key: "امروز", value: "today" },
							{ key: "هفته جاری", value: "week" },
							{ key: "ماه جاری", value: "month" },
						]}
						hasAllOption={false}
						render={(options = []) =>
							options.map((option) => (
								<option value={option.value} key={option.key}>
									{option.key}
								</option>
							))
						}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-4">
					<KpiStats stats={dashboardData?.kpiStats} />
				</div>

				<div className="lg:col-span-3 bg-whit rounded-lg shadow">
					<AttendanceChart
						data={dashboardData?.charts?.attendanceByDay}
					/>
				</div>

				<div
					className="lg:col-span-1 bg-white rounded-lg shadow"
					style={{ minWidth: 350 }}
				>
					<DepartmentPerformanceChart
						data={dashboardData?.charts?.departmentPerformance}
					/>
				</div>

				{(searchParams.get('timeRange') === "today" || !searchParams.get('timeRange')) && (
					<div className="lg:col-span-4">
						<DailyStatusLists
							lateUsers={dashboardData?.lists?.lateUsers}
							absentUsers={dashboardData?.lists?.absentUsers}
						/>
					</div>
				)}

				<div className="lg:col-span-2 bg-white rounded-lg shadow">
					<PerformersList
						title="کاربران منظم (کمترین تاخیر)"
						performers={dashboardData?.lists?.topPerformers}
					/>
				</div>
				<div className="lg:col-span-2 bg-white rounded-lg shadow">
					<PerformersList
						title="نیازمند توجه (بیشترین تاخیر)"
						performers={dashboardData?.lists?.riskyPerformers}
						isRisky={true}
					/>
				</div>

				<div className="lg:col-span-4">
					<MlInsights data={dashboardData?.ml} />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
