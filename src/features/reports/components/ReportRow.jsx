import { formatToPersianTime } from "../../../utils/formatDate";

import AttendanceDetails from '../../attendance/components/AttendanceDetails';
import EditAttendanceForm from '../../attendance/components/EditAttendanceForm';

import Modal from '../../../ui/Modal';
import Menus from '../../../ui/Menus';
import ConfirmDelete from '../../../ui/ConfirmDelete';

import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

export default function ReportRow({ report, onDelete, isDeleting }) {
	return (
		<tr className="even:bg-amber-200">
			<td className="p-2">{report.user.fullName}</td>
			<td className="p-2">{report.recordedBy?.fullName || "---"}</td>
			<td className="p-2">{report.date}</td>
			<td className="p-2">{formatToPersianTime(report.checkIn)}</td>
			<td className="p-2">{formatToPersianTime(report.checkOut)}</td>
			<td>
				<Modal>
					<Menus>
						<Menus.Menu>
							<Menus.Toggle id={report._id} />
							<Menus.List id={report._id}>
								<Modal.Open opens={`details-${report._id}`}>
									<Menus.Button icon={<HiEye />}>
										جزئیات
									</Menus.Button>
								</Modal.Open>
								<Modal.Open opens={`edit-${report._id}`}>
									<Menus.Button icon={<HiPencil />}>
										ویرایش
									</Menus.Button>
								</Modal.Open>
								<Modal.Open opens={`delete-${report._id}`}>
									<Menus.Button icon={<HiTrash />}>
										حذف
									</Menus.Button>
								</Modal.Open>
							</Menus.List>
						</Menus.Menu>
						<Modal.Window name={`details-${report._id}`}>
							<AttendanceDetails report={report} />
						</Modal.Window>
						<Modal.Window name={`edit-${report._id}`}>
							<EditAttendanceForm recordToEdit={report} />
						</Modal.Window>
						<Modal.Window name={`delete-${report._id}`}>
							<ConfirmDelete
								resourceName={`گزارش برای ${report.user.fullName}`}
								onConfirm={() => onDelete(report._id)}
								disabled={isDeleting}
							/>
						</Modal.Window>
					</Menus>
				</Modal>
			</td>
		</tr>
	);
}