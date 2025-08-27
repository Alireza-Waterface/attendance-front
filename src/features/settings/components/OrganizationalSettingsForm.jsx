import { useForm } from "react-hook-form";
import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import Loading from "../../../ui/Loading";

function OrganizationalSettingsForm() {
	const { settings, isLoadingSettings } = useSettings();
	const { updateSettings, isUpdatingSettings } = useUpdateSettings();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (isLoadingSettings) return <Loading className="loaderMini" />;

	function onSubmit(data) {
		updateSettings(data);
	}

	return (
		<div className="p-4 bg-amber-100 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">تنظیمات عمومی</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col gap-2"
			>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<label htmlFor="universityName" className="basis-40">
							نام دانشگاه
						</label>
						<input
							type="text"
							id="universityName"
							defaultValue={settings?.universityName}
							{...register("universityName", {
								required: "لطفا نام دانشگاه را وارد کنید",
							})}
							className={`w-full p-2 border-2 ${
								errors?.universityName && "border-red-600"
							} outline-none rounded-md focus:bg-amber-200 transition-all`}
						/>
					</div>
					{errors?.universityName && (
						<p className="text-red-600 text-sm mt-1">
							{errors?.universityName?.message}
						</p>
					)}
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<label htmlFor="title" className="basis-40">
							عنوان سامانه
						</label>
						<input
							type="text"
							id="title"
							defaultValue={settings?.title}
							{...register("title", {
								required: "لطفا عنوان سامانه را وارد کنید",
							})}
							className={`w-full p-2 border-2 ${
								errors?.title && "border-red-600"
							} outline-none rounded-md focus:bg-amber-200 transition-all`}
						/>
					</div>
					{errors?.title && (
						<p className="text-red-600 text-sm mt-1">
							{errors?.title?.message}
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

export default OrganizationalSettingsForm;
