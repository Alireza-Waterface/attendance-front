import { useForm } from "react-hook-form";
import { useChangePassword } from "../hooks/useChangePassword";

function PasswordChangeForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const { changePassword, isChangingPassword } = useChangePassword();

	function onSubmit({ oldPassword, newPassword }) {
		changePassword(
			{ oldPassword, newPassword },
			{
				onSuccess: () => {
					reset({
						oldPassword: "",
						newPassword: "",
						confirmPassword: "",
					});
				},
			}
		);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mt-4 mx-auto p-4 bg-amber-100 rounded-lg space-y-4 w-full flex flex-col gap-2"
		>
			<input
				type="text"
				name="username"
				className="hidden"
				autoComplete="false"
			/>
			<div className="flex flex-col gap-1 bg-amber-200 p-2 rounded-sm mt-2">
				<div className="flex gap-2 items-center">
					<label htmlFor="oldPassword" className="basis-44">
						رمز عبور فعلی
					</label>
					<input
						type="password"
						id="oldPassword"
						autoComplete="false"
						disabled={isChangingPassword}
						{...register("oldPassword", {
							required: "رمز عبور فعلی خود را وارد کنید",
						})}
						className={`w-full p-2 border-2 border-amber-600 rounded-md outline-none focus:bg-amber-300 transition-all ${errors.oldPassword && 'border-red-600'}`}
					/>
				</div>
				{errors.oldPassword && (
					<p className="text-red-500 text-sm">
						{errors.oldPassword.message}
					</p>
				)}
			</div>

			<div className="flex flex-col gap-1 bg-amber-200 p-2 rounded-sm mt-2">
				<div className="flex gap-2 items-center">
					<label htmlFor="newPassword" className="basis-44">
						رمز عبور جدید
					</label>
					<input
						type="password"
						id="newPassword"
						autoComplete="new-password"
						disabled={isChangingPassword}
						{...register("newPassword", {
							required: "لطفا رمز عبور جدید خود را وارد کنید",
							minLength: {
								value: 8,
								message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
							},
						})}
						className={`w-full p-2 border-2 border-amber-600 rounded-md outline-none focus:bg-amber-300 transition-all ${errors.newPassword && 'border-red-600'}`}
					/>
				</div>
				{errors.newPassword && (
					<p className="text-red-500 text-sm">
						{errors.newPassword.message}
					</p>
				)}
			</div>

			<div className="flex flex-col gap-1 bg-amber-200 p-2 rounded-sm mt-2">
				<div className="flex gap-2 items-center">
					<label htmlFor="confirmPassword" className="basis-44">
						تکرار رمز عبور جدید
					</label>
					<input
						type="password"
						id="confirmPassword"
						autoComplete="new-password"
						disabled={isChangingPassword}
						{...register("confirmPassword", {
							required: "لطفا تکرار رمز عبور جدید خود را وارد کنید",
							validate: (value) =>
								value === getValues().newPassword ||
								"تکرار رمز عبور با رمز عبور جدید مطابقت ندارد",
						})}
						className={`w-full p-2 border-2 border-amber-600 rounded-md outline-none focus:bg-amber-300 transition-all ${errors.newPassword && 'border-red-600'}`}
					/>
				</div>
				{errors.confirmPassword && (
					<p className="text-red-500 text-sm">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			<div className="flex items-center gap-4 mt-4">
				<button
					type="button"
					onClick={() => reset()}
					disabled={isChangingPassword}
					className="bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700 active:translate-y-1 transition-all"
				>
					لغو
				</button>
				<button
					type="submit"
					disabled={isChangingPassword}
					className="bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 active:translate-y-1 transition-all"
				>
					{isChangingPassword ? (
						<div className="loaderMini"></div>
					) : (
						"تغییر رمز عبور"
					)}
				</button>
			</div>
		</form>
	);
}

export default PasswordChangeForm;
