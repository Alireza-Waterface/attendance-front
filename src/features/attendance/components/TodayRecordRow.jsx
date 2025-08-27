import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import ConfirmDelete from "../../../ui/ConfirmDelete";

import EditAttendanceForm from "./EditAttendanceForm";

import { HiPencil, HiTrash } from "react-icons/hi2";

export default function TodayRecordRow({ rec, deleteAttendance, isDeleting }) {
	const checkInTime = new DateObject({
		date: rec.checkIn,
		format: "HH:mm",
		calendar: persian,
		locale: persian_fa,
	});
	const checkOutTime = new DateObject({
		date: rec.checkOut,
		format: "HH:mm",
		calendar: persian,
		locale: persian_fa,
	});

	return (
		<li
			key={rec._id}
			className="bg-amber-100 p-3 rounded-md grid grid-cols-3"
		>
			<div>
				<p className="font-bold">{rec.user.fullName}</p>
				<p className="text-sm text-gray-600">
					{rec.checkIn &&
						`ورود: ${checkInTime.format("HH:mm", ["Time"])}`}
					{rec.checkOut &&
						` - خروج: ${checkOutTime.format("HH:mm", ["Time"])}`}
				</p>
			</div>

			<span
				className={`px-2 py-1 flex items-center w-1/5 mx-auto justify-center rounded-full text-xs ${
					rec.status === "تاخیر"
						? "bg-yellow-200 text-yellow-800"
						: rec.status === "غیبت"
						? "bg-red-200 text-red-700"
						: "bg-green-200 text-green-800"
				}`}
			>
				{rec.status}
			</span>

			<Modal>
				<Menus>
					<Menus.Menu>
						<Menus.Toggle id={rec._id} />
						<Menus.List id={rec._id}>
							<Modal.Open opens={`edit-${rec._id}`}>
								<Menus.Button icon={<HiPencil />}>
									ویرایش
								</Menus.Button>
							</Modal.Open>

							<Modal.Open opens={`delete-${rec._id}`}>
								<Menus.Button icon={<HiTrash />}>
									حذف
								</Menus.Button>
							</Modal.Open>
						</Menus.List>
					</Menus.Menu>

					<Modal.Window name={`edit-${rec._id}`}>
						<EditAttendanceForm recordToEdit={rec} />
					</Modal.Window>

					<Modal.Window name={`delete-${rec._id}`}>
						<ConfirmDelete
							resourceName={`گزارش تردد برای ${rec.user.fullName}`}
							onConfirm={() => deleteAttendance(rec._id)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Menus>
			</Modal>
		</li>
	);
}
