import { useForm } from "react-hook-form";
import { useUser } from "../../auth/hooks/useUser";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import Loading from "../../../ui/Loading";

export default function ProfileDataForm() {
	const { user, isLoading } = useUser();
	const { updateProfile, isUpdatingProfile } = useUpdateProfile();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm({
		defaultValues: {
			fullName: user.fullName || "",
			roomLocation: user.roomLocation || "",
			phoneNumber: user.phoneNumber || "",
			nationalCode: user.nationalCode || "",
			personnelCode: user.personnelCode || "",
			isPhoneNumberPublic:
				user?.profileSettings?.isPhoneNumberPublic || false,
		},
	});

	if(isLoading) return <Loading />;

	const isNationalCodeRequired =
		user.roles.includes("استاد") || user.roles.includes("هیات_علمی");
	const isPersonnelCodeRequired =
		user.roles.includes("مدیر") ||
		user.roles.includes("مسئول") ||
		user.roles.includes("اداری");

	function onSubmit(formData) {
		const dataToSubmit = {
			fullName: formData.fullName,
			roomLocation: formData.roomLocation,
			phoneNumber: formData.phoneNumber,
			nationalCode: formData.nationalCode,
			personnelCode: formData.personnelCode,
			profileSettings: {
				isPhoneNumberPublic: formData.isPhoneNumberPublic,
			},
		};

		updateProfile(dataToSubmit, {
			onSuccess: () => {
				reset(formData);
			},
		});
	}

	function handleCancel() {
		reset({
			fullName: user.fullName || "",
			roomLocation: user.roomLocation || "",
			phoneNumber: user.phoneNumber || "",
			nationalCode: user.nationalCode || "",
			personnelCode: user.personnelCode || "",
			isPhoneNumberPublic:
				user?.profileSettings?.isPhoneNumberPublic || false,
		});
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-4 bg-amber-100 rounded-lg space-y-4 flex flex-col gap-2"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col rounded-sm bg-amber-200 p-2">
					<label htmlFor="fullName">نام کامل</label>
					<input
						type="text"
						id="fullName"
						{...register("fullName", {
							required: "لطفا نام کامل خود را وارد کنید",
                            minLength: {
                                value: 3,
                                message: 'طول نام وارد شده کمتر از حد مجاز است'
                            }
						})}
						className={`w-full p-2 border-2 border-amber-600 focus:bg-amber-300 transition-all outline-none rounded-md ${errors.fullName && 'border-red-600'}`}
						disabled={isUpdatingProfile}
					/>
					{errors.fullName && (
						<p className="text-red-500 text-sm mt-1">
							{errors.fullName.message}
						</p>
					)}
				</div>

				<div className="flex flex-col rounded-sm bg-amber-200 p-2">
					<label htmlFor="phoneNumber">شماره تلفن</label>
					<input
						type="text"
						inputMode="numeric"
						id="phoneNumber"
						{...register("phoneNumber", {
							pattern: {
								value: /^(09\d{9})$/,
								message:
									"شماره تلفن باید ۱۱ رقم باشد و با 09 شروع شود",
							},
						})}
						placeholder="09123456789"
						className={`w-full p-2 border-2 border-amber-600 focus:bg-amber-300 transition-all outline-none rounded-md ${errors.phoneNumber && 'border-red-600'}`}
						disabled={isUpdatingProfile}
					/>
					{errors.phoneNumber && (
						<p className="text-red-500 text-sm mt-1">
							{errors.phoneNumber.message}
						</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col rounded-sm bg-amber-200 p-2">
					<label htmlFor="nationalCode">کد ملی</label>
					<input
						type="text"
						id="nationalCode"
						{...register("nationalCode", {
							required: isNationalCodeRequired
								? "کد ملی برای این نقش الزامی است"
								: false,
							pattern: {
								value: /^\d{10}$/,
								message: "کد ملی باید ۱۰ رقم باشد",
							},
						})}
						className={`w-full p-2 border-2 border-amber-600 focus:bg-amber-300 transition-all outline-none rounded-md ${errors.nationalCode && 'border-red-600'}`}
						disabled={isUpdatingProfile}
					/>
					{errors.nationalCode && (
						<p className="text-red-500 text-sm mt-1">
							{errors.nationalCode.message}
						</p>
					)}
				</div>

				<div className="flex flex-col rounded-sm bg-amber-200 p-2">
					<label htmlFor="personnelCode">کد پرسنلی</label>
					<input
						type="text"
						id="personnelCode"
						{...register("personnelCode", {
							required: isPersonnelCodeRequired
								? "کد پرسنلی برای این نقش الزامی است"
								: false,
						})}
						className={`w-full p-2 border-2 border-amber-600 focus:bg-amber-300 transition-all outline-none rounded-md ${errors.personnelCode && 'border-red-600'}`}
						disabled={isUpdatingProfile}
					/>
					{errors.personnelCode && (
						<p className="text-red-500 text-sm mt-1">
							{errors.personnelCode.message}
						</p>
					)}
				</div>
			</div>

			<div className="flex flex-col rounded-sm bg-amber-200 p-2 gap-4">
				<div className="flex gap-2 items-center">
					<label htmlFor="roomLocation" className="basis-24">
						محل اتاق
					</label>
					<input
						type="text"
						id="roomLocation"
						{...register("roomLocation")}
						className="w-full p-2 border-2 border-amber-600 focus:bg-amber-300 transition-all rounded-md outline-none"
						disabled={isUpdatingProfile}
					/>
				</div>
				<div className="flex gap-2 items-center">
					<label htmlFor="isPhoneNumberPublic">
						شماره‌ تلفن در پروفایل عمومی نمایش داده شود؟
					</label>
					<input
						type="checkbox"
						id="isPhoneNumberPublic"
						{...register("isPhoneNumberPublic")}
						className="h-5 w-5"
					/>
				</div>
			</div>

			<div className="text-gray-600 text-sm p-2">
				<p>
					<strong>نقش‌ها:</strong> {user?.roles?.join("، ")}
				</p>
				<p>
					<strong>واحدها:</strong> {user?.departments?.join("، ")}
				</p>
			</div>

			<div className="flex items-center gap-4 mt-4">
				<button
					type="button"
					disabled={isUpdatingProfile || !isDirty}
					onClick={handleCancel}
					className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-700 active:translate-y-1 transition-all"
				>
					لغو
				</button>
				<button
					type="submit"
					disabled={isUpdatingProfile || !isDirty}
					className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 active:translate-y-1 transition-all"
				>
					{isUpdatingProfile ? (
						<div className="loaderMini"></div>
					) : (
						"ذخیره تغییرات"
					)}
				</button>
			</div>
		</form>
	);
}
