import { useState } from "react";
import { useUser } from "../../auth/hooks/useUser";
import { useUploadAvatar } from "../hooks/useUploadAvatar";

function UploadAvatar() {
	const { user } = useUser();
	const { uploadAvatar, isUploading } = useUploadAvatar();

	const [avatar, setAvatar] = useState(null);
	const [preview, setPreview] = useState(null);
	// state جدید برای نگهداری درصد آپلود
	const [uploadProgress, setUploadProgress] = useState(0);

	function handleFileChange(e) {
		const file = e.target.files[0];
		if (file) {
			setAvatar(file);
			setPreview(URL.createObjectURL(file));
			setUploadProgress(0); // ریست کردن прогресс
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!avatar) return;

		// فراخوانی mutation با یک آبجکت که شامل فایل و callback است
		uploadAvatar(
			{
				avatarFile: avatar,
				onUploadProgress: (progress) => {
					setUploadProgress(progress);
				},
			},
			{
				onSuccess: () => {
					setAvatar(null);
					setPreview(null);
					setUploadProgress(0);
					e.target.reset();
				},
				onError: () => {
					setUploadProgress(0);
				},
			}
		);
	}

	return (
		<div className="text-center p-4 bg-amber-100 w-full mx-auto rounded-lg mt-4">
			<h2 className="text-xl font-bold mb-4">تغییر تصویر پروفایل</h2>
			<div className="flex flex-col items-center gap-4">
				<img
					src={
						preview ||
						`${import.meta.env.VITE_API_URL}/${user.avatar}`
					}
					alt="Avatar Preview"
					className="w-42 h-42 rounded-full object-cover border-4 border-amber-300"
				/>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center gap-4"
				>
					<div className="flex items-center gap-4">
						<label
							htmlFor="avatar-upload"
							className="cursor-pointer bg-amber-500 px-4 py-2 border rounded-md"
						>
							انتخاب فایل
						</label>
						<input
							type="file"
							id="avatar-upload"
							accept="image/png, image/jpeg, image/webp, image/jpg"
							onChange={handleFileChange}
							disabled={isUploading}
							className="hidden"
						/>

						{avatar && (
							<button
								type="submit"
								disabled={isUploading}
								className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 active:translate-y-1 transition-all"
							>
								{isUploading ? <div className="loaderMini"></div> : "آپلود"}
							</button>
						)}
					</div>
					{avatar && (
						<span className="text-sm text-gray-600">
							{avatar.name}
						</span>
					)}

					{isUploading && (
						<div className="w-full bg-green-300 rounded-full h-2.5 mt-2" style={{direction: 'ltr'}}>
							<div
								className="bg-green-700 h-2.5 rounded-full transition-all duration-300"
								style={{ width: `${uploadProgress}%` }}
							></div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default UploadAvatar;
