import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { useDepartments } from "../../departments/hooks/useDepartments";
import useOfficers from "../../users/hooks/useOfficers";
import { useUser } from "../../auth/hooks/useUser";

import { toEnglishDigits } from "../../../utils/digitConvertor";
import { ATTENDANCE_STATUS, ROLES } from "../../../utils/constants";

import Select from "../../../ui/Select";

function ReportFilters() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { isAdmin } = useUser();
	const { officers, isGettingOfficers } = useOfficers();
	const { departments, isGettingDepartments } = useDepartments();

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

	function handleFilterChange(e) {
		const { name, value } = e.target;
		if (!value || value === "all") {
			searchParams.delete(name);
		} else {
			searchParams.set(name, value);
		}
		searchParams.set("page", "1");
		setSearchParams(searchParams);
	}

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

	return (
		<div className="bg-amber-200 grid grid-cols-6 gap-4 items-center p-2 rounded-sm my-4 col-span-full">
			<div className="flex items-center gap-2">
				<Select
					label="ترتیب:"
					identifier="sortBy"
					defaultValue={searchParams.get("sortBy") || ""}
					onChange={handleFilterChange}
					options={[
						{ key: "جدیدترین", value: "" },
						{ key: "قدیمی‌ترین", value: "date-asc" },
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

			<div className="flex items-center gap-2 col-span-2">
				<label htmlFor="fromDate">تاریخ:</label>
				<DatePicker
					name="dateRange"
					value={date}
					onChange={handleDateChange}
					format="YYYY/MM/DD"
					calendar={persian}
					locale={persian_fa}
					range
					rangeHover
				/>
			</div>

			<div className="flex items-center gap-2">
				<Select
					label="وضعیت:"
					identifier="status"
					defaultValue={searchParams.get("status") || ""}
					onChange={handleFilterChange}
					options={Object.keys(ATTENDANCE_STATUS)}
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

			<div className="flex items-center gap-2">
				<Select
					label="نقش:"
					identifier="userRole"
					defaultValue={searchParams.get("userRole") || ""}
					onChange={handleFilterChange}
					options={ROLES}
					render={(options = []) =>
						options.map((role) => (
							<option value={role} key={role}>
								{role}
							</option>
						))
					}
				/>
			</div>

			<div className="flex items-center gap-2 col-span-2">
				<Select
					label="عضو دپارتمان:"
					identifier="department"
					defaultValue={searchParams.get("department") || ""}
					onChange={handleFilterChange}
					options={departments}
					isLoading={isGettingDepartments}
					render={(options = []) =>
						options.map((dep) => (
							<option value={dep.name} key={dep._id}>
								{dep.name}
							</option>
						))
					}
				/>
			</div>

			{isAdmin && (
				<div className="flex items-center gap-2 col-span-2">
					<Select
						label="ثبت توسط:"
						identifier="recordedById"
						defaultValue={searchParams.get("recordedById") || ""}
						onChange={handleFilterChange}
						options={officers}
						isLoading={isGettingOfficers}
						render={(options = []) =>
							options.map((officer) => (
								<option value={officer._id} key={officer._id}>
									{officer.fullName}
								</option>
							))
						}
					/>
				</div>
			)}

			<div className="flex items-center gap-2 col-span-2">
				<Select
					label="تعداد در صفحه:"
					identifier="limit"
					defaultValue={searchParams.get("limit") || ""}
					onChange={handleFilterChange}
					options={[10, 20, 30, 40, 50, 100]}
					hasAllOption={false}
					render={(options = []) =>
						options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))
					}
				/>
			</div>
		</div>
	);
}

export default ReportFilters;
