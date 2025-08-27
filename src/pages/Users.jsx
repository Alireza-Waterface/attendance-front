import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


import { useUser } from "../features/auth/hooks/useUser";
import { useDepartments } from "../features/departments/hooks/useDepartments";
import { useUsers } from "../features/users/hooks/useUsers";
import useDeleteUser from "../features/users/hooks/useDeleteUser";

import EditUserForm from "../features/users/components/EditUserForm";
import UserDetails from "../features/users/components/UserDetails";
import CreateUserForm from "../features/users/components/CreateUserForm";

import { ROLES } from "../utils/constants";

import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

import Modal from "../ui/Modal";
import Menus from "../ui/Menus";
import ConfirmDelete from "../ui/ConfirmDelete";
import Pagination from "../ui/Pagination";
import Search from "../ui/Search";
import Select from "../ui/Select";
import Loading from "../ui/Loading";

function Users() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { departments, isGettingDepartments } = useDepartments();
	const { users, isGettingUsers, pagination } = useUsers();
	const { deleteUser, isDeleting } = useDeleteUser();

	const { isAdmin, isLoading } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isAdmin) {
			navigate("/restricted", { replace: true });
		}
	}, [isLoading, isAdmin, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (value === "") searchParams.delete(name);
		else searchParams.set(name, value);

		searchParams.set("page", 1);
		setSearchParams(searchParams);
	};

	return (
		<main>
			<h1 className="text-center text-2xl font-bold">مدیریت اعضا</h1>

			<div className="grid grid-cols-6 gap-3 mt-4 bg-amber-200 p-2 rounded-lg">
				<Search placeholder="نام، کد پرسنلی یا ملی" />

				<div className="flex items-center justify-start gap-2">
					<Select
						options={ROLES}
						identifier="role"
						onChange={handleChange}
						defaultValue={searchParams.get("role")}
						label="نقش:"
						render={(options = []) =>
							options.map((role) => (
								<option value={role} key={role}>
									{role}
								</option>
							))
						}
					/>
				</div>

				<div className="flex items-center gap-2 justify-start">
					<Select
						options={departments}
						identifier="department"
						onChange={handleChange}
						defaultValue={searchParams.get("department")}
						label="دپارتمان:"
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
			</div>

			<div>
				<Modal>
					<Menus>
						<Modal.Open opens="create-user">
							<Menus.Button
								styles={{
									marginTop: "16px",
									borderRadius: "6px",
									justifyContent: "center",
								}}
							>
								افزودن کاربر جدید
							</Menus.Button>
						</Modal.Open>

						<Modal.Window name="create-user">
							<CreateUserForm />
						</Modal.Window>
					</Menus>
				</Modal>
			</div>

			<div className="grid grid-cols-4 gap-2 mt-4">
				{isGettingUsers && <Loading className="loaderMini" />}
				{!isGettingUsers && !users?.length && (
					<p className="col-span-full text-center">
						کاربری جهت نمایش یافت نشد
					</p>
				)}
				{!isGettingUsers &&
					users?.length > 0 &&
					users?.map((user) => (
						<div
							key={user._id}
							className="bg-amber-200 p-2 rounded-lg"
						>
							<div className="h-36 flex justify-center w-full">
								<img
									src={`${import.meta.env.VITE_API_URL}/${
										user.avatar
									}`}
									alt={user.fullName}
									className="h-full rounded-full aspect-square"
								/>
							</div>

							<div>
								<p>نام: {user.fullName}</p>
								<p>
									{user.roles.length > 1
										? "نقش‌ها: "
										: "نقش: "}
									{user.roles.map((role) => (
										<span className="camma" key={role}>
											{role}
										</span>
									))}
								</p>
								<p>
									{user.departments.length > 1
										? "دپارتمان‌ها: "
										: "دپارتمان: "}
									{user.departments.map((dep) => (
										<span className="camma" key={dep}>
											{dep}
										</span>
									))}
								</p>
							</div>

							<Modal>
								<Menus>
									<Menus.Menu>
										<Menus.Toggle id={user._id} />

										<Menus.List id={user._id}>
											<Modal.Open opens="user-details">
												<Menus.Button icon={<HiEye />}>
													جزئیات
												</Menus.Button>
											</Modal.Open>

											<Modal.Open opens="user-edit">
												<Menus.Button
													icon={<HiPencil />}
												>
													ویرایش
												</Menus.Button>
											</Modal.Open>

											<Modal.Open opens="user-delete">
												<Menus.Button
													icon={<HiTrash />}
												>
													حذف
												</Menus.Button>
											</Modal.Open>
										</Menus.List>
									</Menus.Menu>

									<Modal.Window name="user-details">
										<UserDetails user={user} />
									</Modal.Window>

									<Modal.Window name="user-edit">
										<EditUserForm user={user} />
									</Modal.Window>

									<Modal.Window name="user-delete">
										<ConfirmDelete
											onConfirm={() =>
												deleteUser(user._id)
											}
											disabled={isDeleting}
											resourceName={`کاربر ${user.fullName}`}
										/>
									</Modal.Window>
								</Menus>
							</Modal>
						</div>
					))}

				<Pagination
					pagination={pagination}
					isLoading={isGettingUsers}
					length={users?.length}
				/>
			</div>
		</main>
	);
}

export default Users;
