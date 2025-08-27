import { useForm } from "react-hook-form";
import useUpdateUser from "../hooks/useUpdateUser";
import { useDepartments } from "../../departments/hooks/useDepartments";
import { ROLES } from "../../../utils/constants";

export default function EditUserForm({ onClose, user = {} }) {
	const { updateUser, isUpdating } = useUpdateUser();
	const { departments, isLoading: isGettingDeps } = useDepartments();

	const { id: editID, ...editValues } = user;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: editValues,
	});

	const { errors } = formState;

	const onSubmit = (formData) => {
		const preparedData = {
			fullName: formData.fullName,
			departments: formData.departments,
			roles: formData.roles,
			isActive: formData.isActive,
			roomLocation: formData.roomLocation,
			phoneNumber: formData.phoneNumber,
			nationalCode: formData.nationalCode,
		};
		if (formData.personnelCode)
			preparedData.personnelCode = formData.personnelCode;

		updateUser(
			{ id: user._id, updatedData: preparedData },
			{
				onSuccess: () => {
					onClose?.();
				},
			}
		);
	};

	const roles = ["مدیر", "مسئول", "استاد", "هیات_علمی", "کارمند"];

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-4 edit-user items-center">
				<label htmlFor="fullName" className="col-span-1">
					نام کامل:{" "}
				</label>
				<input
					type="text"
					name="fullName"
					id="fullName"
					disabled={isUpdating}
					className="col-span-3 p-2 rounded-sm"
					{...register("fullName", {
						required: "نام کاربر الزامی است",
						minLength: {
							value: 2,
							message: "طول نام کاربر کمتر از حد مجاز است",
						},
						maxLength: {
							value: 50,
							message: "طول نام کاربر بیش از حد مجاز است",
						},
					})}
				/>
				{errors?.fullName?.message && (
					<p className="text-red-600 col-span-4">
						{errors?.fullName?.message}
					</p>
				)}
			</div>
			<div className="flex flex-col">
				<div className="flex gap-4 mt-4">
					<legend className="">دپارتمان‌ها:</legend>

					<div className="grid grid-cols-3 gap-4">
						{isGettingDeps && <div className="loaderMini"></div>}
						{!isGettingDeps &&
							departments?.map((dep) => (
								<div
									className="flex items-center gap-2 justify-end"
									key={dep._id}
								>
									<label className="" htmlFor={dep._id}>
										{dep.name}
									</label>
									<input
										className=""
										type="checkbox"
										name="departments"
										id={dep._id}
										value={dep.name}
										disabled={isUpdating}
										{...register("departments", {
											required:
												"عضویت در یک دپارتمان الزامی است",
										})}
									/>
								</div>
							))}
					</div>
				</div>

				{errors?.departments?.message && (
					<p className="text-red-600">
						{errors?.departments?.message}
					</p>
				)}
			</div>

			<div className="flex flex-col">
				<div className="flex gap-4 mt-4">
					<legend className="">نقش‌ها:</legend>

					<div className="grid grid-cols-3 gap-4">
						{roles?.map((role) => (
							<div
								className="flex items-center gap-2 justify-end"
								key={role}
							>
								<label className="" htmlFor={role}>
									{role}
								</label>
								<input
									className=""
									type="checkbox"
									name="roles"
									id={role}
									value={role}
									disabled={isUpdating}
									{...register("roles", {
										required: "داشتن یک نقش الزامی است",
									})}
								/>
							</div>
						))}
					</div>
				</div>

				{errors?.roles?.message && (
					<p className="text-red-600">{errors?.roles?.message}</p>
				)}
			</div>

			<div className="flex gap-4 items-center mt-4">
				<label htmlFor="isActive">دسترسی به سامانه:</label>
				<input
					type="checkbox"
					name="isActive"
					id="isActive"
					disabled={isUpdating}
					{...register("isActive")}
				/>

				{errors?.isActive?.message && (
					<p className="text-red-600">{errors?.isActive?.message}</p>
				)}
			</div>

			{(user.roles.includes('کارمند') || user.roles.includes('مسئول')) && (
				<div className="grid grid-cols-4 items-center mt-4 edit-user">
					<label htmlFor="personnelCode">کد پرسنلی:</label>
					<input
						type="text"
						name="personnelCode"
						id="personnelCode"
						disabled={isUpdating}
						className="col-span-3 p-2 rounded-sm"
						{...register("personnelCode", {
							required: "کد پرسنلی الزامی است",
						})}
					/>

					{errors?.personnelCode?.message && (
						<p className="text-red-600 col-span-full mt-1">
							{errors?.personnelCode?.message}
						</p>
					)}
				</div>
			)}

			<div className="grid grid-cols-4 items-center mt-4 edit-user">
				<label htmlFor="nationalCode">کد ملی:</label>
				<input
					type="text"
					name="nationalCode"
					id="nationalCode"
					disabled={isUpdating}
					className="col-span-3 p-2 rounded-sm"
					{...register("nationalCode", {
						required: "کد ملی الزامی است",
					})}
				/>

				{errors?.nationalCode?.message && (
					<p className="text-red-600 col-span-full mt-1">
						{errors?.nationalCode?.message}
					</p>
				)}
			</div>

			<div className="grid grid-cols-4 items-center mt-4 edit-user">
				<label htmlFor="roomLocation">محل اتاق:</label>
				<input
					type="text"
					name="roomLocation"
					id="roomLocation"
					disabled={isUpdating}
					className="col-span-3 p-2 rounded-sm"
					{...register("roomLocation")}
				/>

				{errors?.roomLocation?.message && (
					<p className="text-red-600 col-span-full mt-1">
						{errors?.roomLocation?.message}
					</p>
				)}
			</div>

			<div className="grid grid-cols-4 items-center mt-4 edit-user">
				<label htmlFor="phoneNumber">شماره تلفن:</label>
				<input
					type="text"
					name="phoneNumber"
					id="phoneNumber"
					disabled={isUpdating}
					className="col-span-3 p-2 rounded-sm"
					placeholder="09123456789"
					{...register("phoneNumber", {
						minLength: {
							value: 11,
							message:
								"شماره تلفن باید 11 رقم باشد - مثال: 09123456789",
						},
						maxLength: {
							value: 11,
							message:
								"شماره تلفن باید 11 رقم باشد - مثال: 09123456789",
						},
                        pattern: {
                            value: /^[0-9]*$/,
                            message:
                                "لطفا فقط عدد صحیح وارد کنید",
                        },
					})}
				/>

				{errors?.phoneNumber?.message && (
					<p className="text-red-600 col-span-full mt-1">
						{errors?.phoneNumber?.message}
					</p>
				)}
			</div>

			<div className="flex items-center gap-4 mt-16 ">
				<button
					disabled={isUpdating}
					className="bg-green-500 px-8 py-2 rounded-sm cursor-pointer active:transform-[translateY(3px)] transition-all hover:bg-green-600"
					type="submit"
				>
					{isUpdating ? "در حال ثبت" : "ثبت اطلاعات"}
				</button>
				<button
					disabled={isUpdating}
					type="button"
					className="bg-red-400 px-8 py-2 rounded-sm cursor-pointer active:transform-[translateY(3px)] transition-all hover:bg-red-600"
					onClick={() => reset(editValues)}
				>
					لغو
				</button>
			</div>
		</form>
	);
}
