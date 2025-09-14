import { useSearchParams } from "react-router-dom";

import Loading from "../../../ui/Loading";
import TodayRecordRow from "./TodayRecordRow";

function TodayRecordList({
	todayRecords,
	isGettingRecords,
	deleteAttendance,
	isDeleting,
}) {
	const [searchParams] = useSearchParams();
	const isFilterAppended = () => searchParams.get("role");

	if (isGettingRecords) return <Loading className="loader" />;

	if (!todayRecords || todayRecords.length === 0) {
		if (isFilterAppended()) {
			return <p>گزارشی مطابق با فیلتر اعمال شده یافت نشد</p>;
		}
		return <p>امروز هیچ گزارشی ثبت نشده است</p>;
	}

	return (
		<ul className="flex flex-col gap-2 mb-4">
			{todayRecords?.map((rec) => (
				<TodayRecordRow
					key={rec._id}
					rec={rec}
					deleteAttendance={deleteAttendance}
					isDeleting={isDeleting}
				/>
			))}
		</ul>
	);
}

export default TodayRecordList;
