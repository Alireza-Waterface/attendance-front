import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useMyRecords } from "../features/attendance/hooks/useMyRecords";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { toEnglishDigits } from "../utils/digitConvertor";
import { formatToPersianTime } from "../utils/formatDate";

import Loading from "../ui/Loading";
import Pagination from "../ui/Pagination";
import Select from "../ui/Select";
import { ATTENDANCE_STATUS } from "../utils/constants";
// import { useNotifications } from "../features/notifications/hooks/useNotifications";
import { IoMdNotificationsOutline } from "react-icons/io";

function MyRecords() {
	const { myRecords, isGettingMyReports, pagination } = useMyRecords();
	const [searchParams, setSearchParams] = useSearchParams();
	// const { notifications, isGettingNotifs, unreadCount } = useNotifications();

	const initialStartDate = searchParams.get("startDate");
	const initialEndDate = searchParams.get("endDate");
	const [date, setDate] = useState(
		initialStartDate && initialEndDate
			? [
					new DateObject({
						date: initialStartDate,
						calendar: persian,
					}),
					new DateObject({ date: initialEndDate, calendar: persian }),
			  ]
			: []
	);

	function handleDateChange(dateObjects) {
		setDate(dateObjects);
		if (dateObjects && dateObjects.length === 2) {
			const formattedStart = toEnglishDigits(
				dateObjects[0].format("YYYY/MM/DD")
			);
			const formattedEnd = toEnglishDigits(
				dateObjects[1].format("YYYY/MM/DD")
			);
			searchParams.set("startDate", formattedStart);
			searchParams.set("endDate", formattedEnd);
		} else {
			searchParams.delete("startDate");
			searchParams.delete("endDate");
		}
		searchParams.set("page", "1");
		setSearchParams(searchParams);
	}

	function handleFilterChange(e) {
		const { name, value } = e.target;
		if (value && value !== "all") {
			searchParams.set(name, value);
		} else {
			searchParams.delete(name);
		}
		searchParams.set("page", "1"); // Reset to page 1 on filter change
		setSearchParams(searchParams);
	}

	return (
		<div className="space-y-4 flex flex-col gap-4">
			<h1 className="text-2xl font-bold text-center">گزارشات تردد من</h1>
			<div className="flex gap-4 items-center bg-amber-200 p-2 rounded-sm">
				<div className="flex items-center gap-2">
					<label>فیلتر بر اساس تاریخ:</label>
					<DatePicker
						value={date}
						onChange={handleDateChange}
						range
						rangeHover
						calendar={persian}
						locale={persian_fa}
						format="YYYY/MM/DD"
					/>
				</div>

				<div className="flex items-center gap-2">
					<Select
						options={Object.keys(ATTENDANCE_STATUS)}
						identifier="status"
						onChange={handleFilterChange}
						defaultValue={searchParams.get("status") || ""}
						label="وضعیت:"
						hasAllOption
						render={(options = []) =>
							options.map((status) => (
								<option
									value={ATTENDANCE_STATUS[status]}
									key={status}
								>
									{ATTENDANCE_STATUS[status]}
								</option>
							))
						}
					/>
				</div>

				<div className="flex items-center gap-2">
					<Select
						label="توجیه:"
						identifier="isJustified"
						defaultValue={searchParams.get("isJustified") || ""}
						onChange={handleFilterChange}
						options={[
							{ key: "توجیه‌شده", value: "true" },
							{ key: "توجیه‌نشده", value: "false" },
						]}
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

			{/* <div className="p-2 rounded-md flex gap-2 items-center bg-amber-200">
				<IoMdNotificationsOutline size={24} />

				{isGettingNotifs && <Loading className="loaderMini" />}
				{!isGettingNotifs &&
					notifications.length > 0 &&
					!unreadCount && <p>اعلان خوانده نشده‌ای وجود ندارد</p>}
				{!isGettingNotifs && !notifications.length && (
					<p>اعلانی جهت نمایش وجود ندارد</p>
				)}
				{!isGettingNotifs && unreadCount && (
					<p>شما {unreadCount} اعلان خوانده نشده دارید</p>
				)}

				<Link
					to={"/my-records/notifications"}
					className="text-amber-600 hover:text-amber-700 cursor-pointer transition-all border-b-2"
				>
					اعلانات
				</Link>
			</div> */}

			{isGettingMyReports ? (
				<Loading />
			) : (
				<>
					<table className="bg-amber-100 w-full text-center rounded-sm">
						<thead className="bg-gray-100">
							<tr className="bg-amber-300">
								<th className="p-2 font-bold text-md">تاریخ</th>
								<th className="p-2 font-bold text-md">ورود</th>
								<th className="p-2 font-bold text-md">خروج</th>
								<th className="p-2 font-bold text-md">وضعیت</th>
								<th className="p-2 font-bold text-md">
									توجیه شده
								</th>
								<th className="p-2 font-bold text-md">
									ثبت توسط
								</th>
							</tr>
						</thead>
						<tbody>
							{myRecords && myRecords.length > 0 ? (
								myRecords.map((record) => (
									<tr
										key={record._id}
										className="even:bg-amber-200"
									>
										<td className="p-2">
											{toEnglishDigits(record.date)}
										</td>
										<td className="p-2">
											{formatToPersianTime(
												record.checkIn
											)}
										</td>
										<td className="p-2">
											{formatToPersianTime(
												record.checkOut
											)}
										</td>
										<td className="p-2">{record.status}</td>
										<td className="p-2">
											{record.isJustified ? "بله" : "خیر"}
										</td>
										<td className="p-2">
											{record.recordedBy?.fullName ||
												"سیستم"}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="6"
										className="text-center py-4"
									>
										هیچ گزارشی مطابق با فیلتر شما یافت نشد.
									</td>
								</tr>
							)}
						</tbody>
					</table>

					<Pagination
						pagination={pagination}
						isLoading={isGettingMyReports}
						length={myRecords?.length}
					/>
				</>
			)}
		</div>
	);
}

export default MyRecords;
