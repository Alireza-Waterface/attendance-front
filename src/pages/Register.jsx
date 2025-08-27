import useTodayRecords from "../features/attendance/hooks/useTodayRecords";
import { useDeleteAttendance } from "../features/attendance/hooks/useDeleteAttendance";

import RecordAttendanceForm from "../features/attendance/components/RecordAttendanceForm";
import RegisterFilters from "../features/attendance/components/RegisterFilters";
import TodayRecordList from "../features/attendance/components/TodayRecordList";

import Modal from "../ui/Modal";

function Register() {
	const { todayRecords, isGettingRecords } = useTodayRecords();
	const { deleteAttendance, isDeleting } = useDeleteAttendance();

	return (
		<div>
			<h1 className="text-center text-2xl">
				ثبت و مشاهده گزارش‌های امروز
			</h1>

			<div className="my-4">
				<Modal>
					<Modal.Open opens="record-new">
						<button className="bg-amber-300 hover:bg-amber-400 text-black px-4 py-2 rounded w-full cursor-pointer active:scale-[0.99] transition-all">
							ثبت گزارش جدید
						</button>
					</Modal.Open>
					<Modal.Window
						name="record-new"
						styles={{
							height: "60%",
						}}
					>
						<RecordAttendanceForm onClose={() => {}} />
					</Modal.Window>
				</Modal>
			</div>

			<div className="flex items-center gap-4 justify-between mb-4">
				<h2 className="text-xl font-semibold">
					گزارش‌های ثبت شده امروز
				</h2>
				<RegisterFilters />
			</div>

			<TodayRecordList
				todayRecords={todayRecords}
				isGettingRecords={isGettingRecords}
				deleteAttendance={deleteAttendance}
				isDeleting={isDeleting}
			/>
		</div>
	);
}

export default Register;
