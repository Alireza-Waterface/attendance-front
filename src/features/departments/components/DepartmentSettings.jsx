import { useDepartments } from "../../departments/hooks/useDepartments";
import { useCreateDepartment } from "../../departments/hooks/useCreateDepartment";
import { useUpdateDepartment } from "../../departments/hooks/useUpdateDepartment"; // Import the update hook
import { useDeleteDepartment } from "../../departments/hooks/useDeleteDepartment";

import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import DepartmentForm from "./DepartmentForm";
import { HiPencil, HiTrash } from "react-icons/hi2";

function DepartmentManager() {
	const { departments, isLoading: isLoadingDeps } = useDepartments();
	const { createDepartment, isCreating } = useCreateDepartment();
	const { updateDepartment, isUpdating } = useUpdateDepartment(); // Use the update hook
	const { deleteDepartment, isDeleting } = useDeleteDepartment();

	if (isLoadingDeps) return <div className="loaderMini"></div>;

	return (
		<div className="bg-amber-100 rounded-lg p-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">مدیریت واحدها</h2>
				<Modal>
					<Modal.Open opens="create-department">
						<button className="bg-amber-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-amber-600 active:translate-y-1 transition-all">
							افزودن واحد جدید
						</button>
					</Modal.Open>
					<Modal.Window name="create-department">
						<DepartmentForm
							onSubmit={createDepartment}
							isWorking={isCreating}
						/>
					</Modal.Window>
				</Modal>
			</div>

			{!isLoadingDeps && !departments?.length && (
				<p className="text-center">دپارتمانی جهت نمایش یافت نشد</p>
			)}
			{!isLoadingDeps && (
				<ul className="space-y-2 flex flex-col gap-2">
					{departments?.map((dep) => (
						<li
							key={dep._id}
							className="flex justify-between items-center bg-amber-300 p-3 rounded-md shadow-sm"
						>
							<div className="flex items-center gap-4">
								<p className="font-bold">{dep.name}</p>
								<p className="text-sm">
									{dep.description}
								</p>
							</div>
							<div>
								<Modal>
									<Menus>
										<Menus.Menu>
											<Menus.Toggle id={dep._id} />
											<Menus.List id={dep._id}>
												<Modal.Open
													opens={`edit-${dep._id}`}
												>
													<Menus.Button
														icon={<HiPencil />}
													>
														ویرایش
													</Menus.Button>
												</Modal.Open>
												<Modal.Open
													opens={`delete-${dep._id}`}
												>
													<Menus.Button
														icon={<HiTrash />}
													>
														حذف
													</Menus.Button>
												</Modal.Open>
											</Menus.List>
										</Menus.Menu>

										<Modal.Window name={`edit-${dep._id}`}>
											<DepartmentForm
												departmentToEdit={dep}
												onSubmit={updateDepartment} // Pass the update mutation function
												isWorking={isUpdating} // Pass the update loading state
											/>
										</Modal.Window>

										<Modal.Window
											name={`delete-${dep._id}`}
										>
											<ConfirmDelete
												resourceName={`واحد ${dep.name}`}
												onConfirm={() =>
													deleteDepartment(dep._id)
												}
												disabled={isDeleting}
											/>
										</Modal.Window>
									</Menus>
								</Modal>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default DepartmentManager;
