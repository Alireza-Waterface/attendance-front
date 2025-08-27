import { useForm } from "react-hook-form";

function DepartmentForm({
	departmentToEdit = {},
	onSubmit,
	isWorking,
	onClose,
}) {
	const { _id: editId, ...editValues } = departmentToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	function handleFormSubmit(data) {
		const mutationData = isEditSession
			? {
					id: editId,
					data: { name: data.name, description: data.description },
			  }
			: data;
		onSubmit(mutationData, {
			onSuccess: () => {
				reset();
				onClose?.();
			},
		});
	}

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="space-y-4 flex flex-col gap-4 text-black"
		>
			<h2 className="text-xl font-bold text-center">
				{isEditSession ? "ویرایش واحد" : "افزودن واحد جدید"}
			</h2>
			<div className="flex gap-2 items-center">
				<label htmlFor="name" className="basis-30">
					نام واحد
				</label>
				<input
					type="text"
					name="name"
					id="name"
					{...register("name", { required: "این فیلد الزامی است" })}
					className="w-full p-2 border-2 rounded-md outline-none bg-amber-200"
					disabled={isWorking}
				/>
			</div>
			<div className="flex gap-2 items-center">
				<label htmlFor="description">توضیحات (اختیاری)</label>
				<textarea
					id="description"
					name="description"
					{...register("description")}
					className="w-full p-2 border-2 rounded-md min-h-30 outline-none bg-amber-200"
					disabled={isWorking}
				/>
			</div>
			<div className="flex justify-start gap-2">
				<button
					type="button"
					onClick={onClose}
					className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 active:translate-y-1 cursor-pointer disabled:cursor-not-allowed transition-all"
				>
					انصراف
				</button>
				<button
					type="submit"
					disabled={isWorking}
					className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 active:translate-y-1 cursor-pointer disabled:cursor-not-allowed transition-all"
				>
					{isWorking ? <div className="loaderMini"></div> : "ذخیره"}
				</button>
			</div>
		</form>
	);
}

export default DepartmentForm;
