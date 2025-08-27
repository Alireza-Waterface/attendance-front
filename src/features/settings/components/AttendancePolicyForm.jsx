import { useForm, Controller } from "react-hook-form";
import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { ALL_WEEKDAYS } from "../../../utils/constants";
import Loading from "../../../ui/Loading";

function AttendancePolicyForm() {
	const { settings, isLoadingSettings } = useSettings();
	const { updateSettings, isUpdatingSettings } = useUpdateSettings();
	const { register, handleSubmit, control } = useForm();

	if (isLoadingSettings) return <Loading className="loaderMini" />;

	function onSubmit(data) {
		updateSettings(data);
	}

	return (
		<div className="p-4 bg-amber-100 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">تنظیمات حضور و غیاب</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-6 flex flex-col gap-4"
			>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label htmlFor="workStartTime">
							ساعت آغاز روز کاری
						</label>
						<input
							type="time"
							id="workStartTime"
							defaultValue={settings?.workStartTime}
							{...register("workStartTime")}
							className="w-full p-2 border-2 rounded-md mt-1 focus:bg-amber-200 outline-none transition-all"
						/>
					</div>
					<div>
						<label htmlFor="workEndTime">ساعت پایان روز کاری</label>
						<input
							type="time"
							id="workEndTime"
							defaultValue={settings?.workEndTime}
							{...register("workEndTime")}
							className="w-full p-2 border-2 rounded-md mt-1 focus:bg-amber-200 outline-none transition-all"
						/>
					</div>
					<div>
						<label htmlFor="lateThresholdTime">
							ساعت ثبت تاخیر
						</label>
						<input
							type="time"
							id="lateThresholdTime"
							defaultValue={settings?.lateThresholdTime}
							{...register("lateThresholdTime")}
							className="w-full p-2 border-2 rounded-md mt-1 focus:bg-amber-200 outline-none transition-all"
						/>
					</div>
				</div>

				<div>
					<label className="font-medium">روزهای کاری هفته</label>
					<div className="grid grid-cols-4 md:grid-cols-7 gap-4 mt-2 p-3 bg-white rounded-md">
						{ALL_WEEKDAYS.map((day) => (
							<div
								key={day.id}
								className="flex items-center gap-2"
							>
								<Controller
									name="workingDays"
									control={control}
									defaultValue={settings?.workingDays || []}
									render={({ field }) => (
										<input
											type="checkbox"
											id={day.id}
											value={day.id}
											checked={field.value.includes(
												day.id
											)}
											onChange={(e) => {
												const updatedDays = e.target
													.checked
													? [
															...field.value,
															e.target.value,
													  ]
													: field.value.filter(
															(value) =>
																value !==
																e.target.value
													  );
												field.onChange(updatedDays);
											}}
											className="h-5 w-5 cursor-pointer"
										/>
									)}
								/>
								<label
									htmlFor={day.id}
									className="cursor-pointer"
								>
									{day.label}
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="text-left">
					<button
						type="submit"
						disabled={isUpdatingSettings}
						className="bg-green-600 text-white w-full px-6 py-2 rounded hover:bg-green-700 cursor-pointer active:translate-y-1 transition-all"
					>
						{isUpdatingSettings ? (
							<div className="loaderMini"></div>
						) : (
							"ذخیره"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AttendancePolicyForm;
