import { useSearchParams } from "react-router-dom";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useExportReports from "../hooks/useExportReports";
import { toEnglishDigits } from "../../../utils/digitConvertor";

function ReportExport() {
	const [searchParams] = useSearchParams();
	const { exportReports, isExporting } = useExportReports();

	function handleExport(e) {
		if (!e.target.closest("button")?.name) return;
		const preset = e.target.closest("button").name;

		const currentFilters = Object.fromEntries(searchParams.entries());
		delete currentFilters.page;

		const dateObject = new DateObject({
			calendar: persian,
			locale: persian_fa,
		});

		const today = toEnglishDigits(dateObject.toString());

		let filtersToExport = {},
			startDate;

		switch (preset) {
			case "day":
				filtersToExport = {
					startDate: today,
					endDate: today,
				};
				break;
			case "week":
				startDate = toEnglishDigits(
					dateObject.toFirstOfWeek().toString()
				);
				filtersToExport = {
					endDate: today,
					startDate,
				};

				break;
			case "month":
				startDate = toEnglishDigits(
					dateObject.toFirstOfMonth().toString()
				);
				filtersToExport = {
					startDate,
					endDate: today,
				};
				break;
			default:
				filtersToExport = {
					...currentFilters,
				};
		}

		exportReports(filtersToExport);
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4" onClick={handleExport}>
			<button
				name="day"
				disabled={isExporting}
				className="bg-amber-200 p-2 rounded-sm hover:bg-amber-300 transition-all cursor-pointer disabled:cursor-not-allowed"
			>
				دریافت گزارشات امروز
			</button>
			<button
				name="week"
				disabled={isExporting}
				className="bg-amber-200 p-2 rounded-sm hover:bg-amber-300 transition-all cursor-pointer disabled:cursor-not-allowed"
			>
				دریافت گزارشات هفته جاری
			</button>
			<button
				name="month"
				disabled={isExporting}
				className="bg-amber-200 p-2 rounded-sm hover:bg-amber-300 transition-all cursor-pointer disabled:cursor-not-allowed"
			>
				دریافت گزارشات ماه جاری
			</button>
			<button
				name="current"
				disabled={isExporting}
				className="bg-amber-200 p-2 rounded-sm hover:bg-amber-300 transition-all cursor-pointer disabled:cursor-not-allowed"
			>
				دریافت گزارشات مطابق فیلتر ها
			</button>
		</div>
	);
}

export default ReportExport;
