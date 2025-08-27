import { FaChevronLeft, FaRegCopyright } from "react-icons/fa6";
import { usePublicSettings } from "../features/settings/hooks/usePublicSettings";

import Loading from "../ui/Loading";
import Modal from "../ui/Modal";

export default function Footer() {
	const { publicSettings, isLoadingPublicSettings } = usePublicSettings();

	return (
		<footer className="grid grid-cols-3 gap-2 items-stretch border-t-2 border-t-amber-400 col-span-12 p-2">
			<div className="flex flex-col gap-2">
				{!isLoadingPublicSettings && (
					<h2 className="text-xl font-bold">
						{publicSettings?.universityName}
					</h2>
				)}
				{!isLoadingPublicSettings && (
					<p>{publicSettings?.title} - نسخه 1.0.0</p>
				)}
				<p className="text-sm flex items-center gap-1">
					تمامی حقوق مادی و معنوی این سامانه متعلق به{" "}
					{!isLoadingPublicSettings ? (
						publicSettings?.universityName
					) : (
						<Loading className="loaderMini" />
					)}{" "}
					می‌باشد
					<FaRegCopyright size={20} />
				</p>
			</div>

			<div className="flex flex-col gap-2">
				<h3 className="text-xl">لینک‌های مفید</h3>
				<a
					href="https://kut.ac.ir"
					title="وب‌سایت دانشگاه صنعتی کرمانشاه"
					target="_blank"
					className="text-amber-500 flex items-center gap-1 hover:text-amber-600 w-fit hover:mr-1 transition-all"
				>
					<FaChevronLeft />
					وب‌سایت رسمی دانشگاه
				</a>
				<a
					href="https://golestan.kut.ac.ir"
					title="سامانه گلستان دانشگاه صنعتی کرمانشاه"
					target="_blank"
					className="text-amber-500 flex items-center gap-1 hover:text-amber-600 w-fit hover:mr-1 transition-all"
				>
					<FaChevronLeft />
					سامانه گلستان
				</a>
				<a
					href="https://samad.app"
					title="سامانه سماد"
					target="_blank"
					className="text-amber-500 flex items-center gap-1 hover:text-amber-600 w-fit hover:mr-1 transition-all"
				>
					<FaChevronLeft />
					سامانه سماد
				</a>
				<a
					href="https://swf.ir"
					title="صندوق رفاه دانشجویی"
					target="_blank"
					className="text-amber-500 flex items-center gap-1 hover:text-amber-600 w-fit hover:mr-1 transition-all"
				>
					<FaChevronLeft />
					صندوق رفاه دانشجویی
				</a>
			</div>

			<div className="flex flex-col gap-2">
				<h3 className="flex items-baseline gap-1">
					طراحی و توسعه از
					<a
						href="https://waterface.ir"
						target="_blank"
						rel="noopener noreferrer"
						title="وب‌سایت توسعه‌دهنده سامانه"
						className="text-amber-500 hover:text-amber-600 transition-all"
					>
						علیرضا آبچهره
					</a>
				</h3>

				<Modal>
					<Modal.Open opens="report-issue">
						<button className="text-amber-500 text-right cursor-pointer hover:text-amber-600 transition-all">
							گزارش اشکال در سامانه
						</button>
					</Modal.Open>

					<Modal.Window name="report-issue">
						<div className="text-black">
							<h3 className="text-lg font-bold mb-2">
								گزارش اشکال در عملکرد
							</h3>

							<p className="text-md">
								شما عزیزان میتوانید از طریق روش‌های زیر نسبت به
								گزارش اشکال در عملکرد سامانه اقدام فرمایید
							</p>

							<ul className="flex flex-col gap-4 list-decimal mr-4">
								<li>
									<h4 className="text-md font-bold">
										مراجعه به بخش IT دانشگاه
									</h4>
									<p>
										با مراجعه به زیر زمین ساختمان اصلی،
										روبروی درب ورودی غذاخوری آقایان، پشت
										سایت عمومی شماره 1 خدمت آقای مهندس حامد
										قدیمی
									</p>
								</li>
								<li className="">
									<h4 className="text-md font-bold">
										تماس مستقیم با توسعه‌دهنده
									</h4>
									<a
										href="sms:+989155706085"
										title="ارسال پیام کوتاه"
										className="text-amber-700 font-bold block w-fit"
									>
										ارسال پیامک
									</a>
									<a
										href={`mailto:Alireza.waterface@outlook.com?subject=گزارش اشکال در عملکرد سامانه حضور و غیاب ${!isLoadingPublicSettings && publicSettings?.universityName}`}
										title="ارسال ایمیل"
										className="text-amber-700 font-bold block w-fit"
									>
										ارسال ایمیل
									</a>
									<a
										href='https://t.me/+989155706085'
										title="ارسال ایمیل"
										className="text-amber-700 font-bold block w-fit"
									>
										پیام‌رسان تلگرام
									</a>
								</li>
							</ul>
						</div>
					</Modal.Window>
				</Modal>
			</div>
		</footer>
	);
}
