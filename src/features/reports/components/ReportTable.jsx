import Loading from "../../../ui/Loading";
import { useDeleteAttendance } from "../../attendance/hooks/useDeleteAttendance";
import ReportRow from './ReportRow';

function ReportTable({ reports, isLoading }) {
	const { deleteAttendance, isDeleting } = useDeleteAttendance();

	if (isLoading) return <Loading className="loader" />;
	if (!reports || reports.length === 0)
		return <p className="text-center">گزارشی جهت نمایش یافت نشد</p>;

	return (
		<table className="col-span-full bg-amber-100 w-full text-center">
			<thead>
				<tr className="bg-amber-200">
					<th className="p-2 font-bold text-md">کاربر</th>
					<th className="p-2 font-bold text-md">ثبت‌کننده</th>
					<th className="p-2 font-bold text-md">تاریخ</th>
					<th className="p-2 font-bold text-md">ورود</th>
					<th className="p-2 font-bold text-md">خروج</th>
					<th className="p-2 font-bold text-md">مدیریت</th>
				</tr>
			</thead>
			<tbody>
				{reports.map((report) => (
					<ReportRow
						key={report._id}
						report={report}
						onDelete={deleteAttendance}
						isDeleting={isDeleting}
					/>
				))}
			</tbody>
		</table>
	);
}

export default ReportTable;
