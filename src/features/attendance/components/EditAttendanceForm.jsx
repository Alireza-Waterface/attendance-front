import { useForm, Controller } from "react-hook-form";

import { useUpdateAttendance } from "../hooks/useUpdateAttendance";
import { useUser } from "../../auth/hooks/useUser";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function EditAttendanceForm({ recordToEdit = {}, onClose }) {
	const {
		_id: recordId,
		user,
		checkIn,
		checkOut,
		status,
		isJustified,
		justificationNotes,
	} = recordToEdit;

	const { isAdmin } = useUser();
	const { updateAttendance, isUpdating } = useUpdateAttendance();

	const { handleSubmit, control, register } = useForm({
		defaultValues: {
			checkIn: checkIn ? new Date(checkIn) : null,
			checkOut: checkOut ? new Date(checkOut) : null,
			status: status || "",
			isJustified: isJustified || false,
			justificationNotes: justificationNotes || "",
		},
	});

	function onSubmit(data) {
		const updatePayload = {
			checkIn: data.checkIn ? new Date(data.checkIn) : null,
			checkOut: data.checkOut ? new Date(data.checkOut) : null,
		};
		if (isAdmin) {
			updatePayload.status = data.status;
			updatePayload.isJustified = data.isJustified;
			updatePayload.justificationNotes = data.justificationNotes;
		}

		updateAttendance(
			{ recordId, data: updatePayload },
			{
				onSuccess: () => {
					onClose?.();
				},
			}
		);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 text-black"
		>
			<h2 className="text-xl font-bold text-center mb-4">
				ویرایش گزارش برای: {user.fullName}
			</h2>

			<div className="mt-4 grid grid-cols-4 items-center">
				<label className="col-span-1">زمان ورود:</label>
				<div className="col-span-3">
					<Controller
						control={control}
						name="checkIn"
						rules={{ required: true }}
						render={({
							field: { onChange, value },
							formState: { errors },
						}) => (
							<>
								<DatePicker
									value={value || ""}
									onChange={(date) => {
										onChange(date);
									}}
									format="YYYY/MM/DD - HH:mm"
									calendar={persian}
									locale={persian_fa}
									disableDayPicker={!isAdmin}
									plugins={[
										<TimePicker
											position="left"
											hideSeconds
										/>,
									]}
								/>
								{errors &&
									errors.checkIn &&
									errors.checkIn.type === "required" && (
										<span>
											لطفا تاریخ و ساعت را مشخص کنید
										</span>
									)}
							</>
						)}
					/>
				</div>
			</div>

			<div className="mt-4 grid grid-cols-4 items-center">
				<label className="col-span-1">زمان خروج:</label>
				<div className="col-span-3">
					<Controller
						control={control}
						name="checkOut"
						render={({
							field: { onChange, value },
							formState: { errors },
						}) => (
							<>
								<DatePicker
									value={value || ""}
									onChange={(date) => {
										onChange(date);
									}}
									format="YYYY/MM/DD - HH:mm"
									calendar={persian}
									locale={persian_fa}
									disableDayPicker={!isAdmin}
									plugins={[
										<TimePicker
											position="left"
											hideSeconds
										/>,
									]}
								/>
								{errors &&
									errors.checkOut &&
									errors.checkOut.type === "required" && (
										<span>
											لطفا تاریخ و ساعت را مشخص کنید
										</span>
									)}
							</>
						)}
					/>
				</div>
			</div>

			{isAdmin && (
				<div className="mt-4 grid grid-cols-4 items-center">
					<label className="col-span-1">وضعیت:</label>
					<select
						{...register("status")}
						className="w-full p-2 border-2 rounded outline-none bg-amber-400 col-span-3"
					>
						<option value="حاضر">حاضر</option>
						<option value="تاخیر">تاخیر</option>
						<option value="غایب">غایب</option>
						<option value="موجه">موجه</option>
					</select>
				</div>
			)}

			{isAdmin && (
				<>
					<div className="mt-4 grid grid-cols-4 items-center">
						<label className="col-span-1">توجیه شده:</label>
						<div className="col-span-3">
							<input
								type="checkbox"
								{...register("isJustified")}
								className="h-5 w-5"
							/>
						</div>
					</div>

					<div className="mt-4 grid grid-cols-4 items-start">
						<label className="col-span-1 pt-2">
							یادداشت توجیه:
						</label>
						<textarea
							{...register("justificationNotes")}
							className="w-full p-2 border-2 rounded outline-none bg-amber-400 col-span-3 min-h-20"
							rows={3}
						/>
					</div>
				</>
			)}

			<div className="flex justify-center gap-2 pt-4">
				<button
					type="button"
					onClick={onClose}
					className="px-8 py-2 rounded cursor-pointer bg-red-600 hover:bg-red-700 active:translate-y-1 transition-all"
				>
					انصراف
				</button>
				<button
					type="submit"
					disabled={isUpdating}
					className="cursor-pointer bg-green-600 px-8 py-2 rounded hover:bg-green-700 active:translate-y-1 transition-all"
				>
					{isUpdating ? (
						<div className="loaderMini"></div>
					) : (
						"ذخیره تغییرات"
					)}
				</button>
			</div>
		</form>
	);
}

export default EditAttendanceForm;
