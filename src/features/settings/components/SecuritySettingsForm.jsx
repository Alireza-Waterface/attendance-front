import { useForm } from "react-hook-form";
import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import Loading from "../../../ui/Loading";

function SecuritySettingsForm() {
	const { settings, isLoadingSettings } = useSettings();
	const { updateSettings, isUpdatingSettings } = useUpdateSettings();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (isLoadingSettings) return <Loading className="loaderMini" />;

	function onSubmit(data) {
		updateSettings({
			officerEditTimeLimit: Number(data.officerEditTimeLimit),
		});
	}

	return (
		<div className="p-4 bg-amber-100 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">تنظیمات دسترسی</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col gap-2"
			>
				<div className="flex flex-col gap-2">
					<div className="flex items-center">
						<label
							htmlFor="officerEditTimeLimit"
							className="basis-80"
						>
							محدودیت زمانی ویرایش گزارش (دقیقه)
						</label>
						<input
							type="text"
							inputMode="numeric"
							id="officerEditTimeLimit"
							defaultValue={settings?.officerEditTimeLimit}
							placeholder="محدودیت زمانی به دقیقه"
							{...register("officerEditTimeLimit", {
								required: "این فیلد الزامی است",
								min: {
									value: 1,
									message: "مقدار باید 1 یا بیشتر باشد",
								},
								max: {
									value: 480,
									message:
										"مقدار باید کمتر از 480 باشد (معادل 8 ساعت)",
								},
								pattern: {
									value: /^[0-9]*$/,
									message: "لطفا فقط عدد صحیح وارد کنید",
								},
							})}
							className={`w-full p-2 border-2 ${
								errors?.officerEditTimeLimit && "border-red-600"
							} outline-none rounded-md focus:bg-amber-200 transition-all`}
						/>
					</div>
					{errors?.officerEditTimeLimit && (
						<p className="text-sm text-red-600">
							{errors?.officerEditTimeLimit?.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isUpdatingSettings}
					className="bg-green-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-green-400 cursor-pointer hover:bg-green-700 active:translate-y-1"
				>
					{isUpdatingSettings ? (
						<div className="loaderMini"></div>
					) : (
						"ذخیره"
					)}
				</button>
			</form>
		</div>
	);
}

export default SecuritySettingsForm;
