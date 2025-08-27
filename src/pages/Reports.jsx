import { useReports } from "../features/reports/hooks/useReports";

import ReportFilters from "../features/reports/components/ReportFilters";
import ReportExport from "../features/reports/components/ReportExport";
import ReportTable from "../features/reports/components/ReportTable";

import Pagination from "../ui/Pagination";

function Reports() {
	const { reports, isGettingReports, pagination } = useReports();

	return (
		<div className="pt-4 pb-2 space-y-4">
			<h1 className="text-2xl font-bold text-center">
				مدیریت گزارشات تردد
			</h1>

			<ReportFilters />
			<ReportExport />
			<ReportTable reports={reports} isLoading={isGettingReports} />
			
			<Pagination pagination={pagination} isLoading={isGettingReports} length={reports?.length} />
		</div>
	);
}

export default Reports;