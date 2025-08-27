import { Link } from "react-router-dom";
import { formatToPersianTime } from "../../../utils/formatDate";
import { compareChanges } from "../../../utils/changeComparer";

import { FaRegPenToSquare } from "react-icons/fa6";
import { FaUserPen } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

export default function AttendanceDetails({ report = {}, isAdmin = false }) {
    const changes = compareChanges(report);

    return (
        <div>
            <div className="w-1/2 mx-auto">
                <img
                    src={`${import.meta.env.VITE_API_URL}/${report.user.avatar}`}
                    alt={report.user.fullName}
                    className="w-full rounded-full"
                />
            </div>

            <div className="flex flex-col gap-2 text-black">
                <p className="flex items-center gap-2">
                    <FaRegPenToSquare size={20} />
                    ثبت شده در:
                    <span>{formatToPersianTime(report.createdAt)}</span>
                </p>
            
                <Link 
                    className="flex items-center gap-2 text-amber-700" 
                    to={`/users?search=${report.recordedBy.personnelCode ? report.recordedBy.personnelCode : report.recordedBy.nationalCode}`}
                >
                    <FaUserPen size={20} />
                    مشاهده جزئیات مسئول ثبت کننده
                </Link>
            
                <Link 
                    className="flex items-center gap-2 text-amber-700" 
                    to={`/users?search=${report.user.personnelCode ? report.user.personnelCode : report.user.nationalCode}`}
                >
                    <FaCircleUser size={20} />
                    مشاهده جزئیات کاربر
                </Link>
            
                <p className="flex items-center gap-2">
                    <BsFillQuestionOctagonFill size={20} />
                    وضعیت تردد:
                    <span>{report.status}</span>
                </p>
            
                <p className="flex items-center gap-2">
                    {report.isJustified ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    بررسی و توجیه:
                    <span>{report.isJustified ? 'توجیه‌شده' : 'توجیه‌نشده'}</span>
                </p>
                {
                    report.justificationNotes &&
                    <p className="flex items-center gap-2">
                        <FiFileText size={20} />
                        متن توضیحات توجیه:
                        <span>{report.justificationNotes}</span>
                    </p>
                }
                
                { isAdmin && changes.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                        <h3 className="flex items-center gap-2 font-bold mb-2 text-blue-800">
                            <MdHistory size={22} />
                            آخرین تغییرات ثبت شده
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                            {changes.map((change, index) => (
                                <li key={index}>{change}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}