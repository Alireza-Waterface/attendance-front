import { useState, useEffect } from "react";
import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";

function LogoUpload() {
	const { settings } = useSettings();
	const { uploadLogo, isUploadingLogo } = useUpdateSettings();
	const [logoFile, setLogoFile] = useState(null);
	const [logoPreview, setLogoPreview] = useState("");

	useEffect(() => {
		if (settings?.logoPath) {
			setLogoPreview(
				`${import.meta.env.VITE_API_URL}/${settings.logoPath}`
			);
		}
	}, [settings?.logoPath]);

	function handleFileChange(e) {
		const file = e.target.files[0];
		if (file) {
			setLogoFile(file);
			setLogoPreview(URL.createObjectURL(file));
		}
	}
	function handleUpload(e) {
		e.preventDefault();
		if (!logoFile) return;

		uploadLogo(logoFile, {
			onSuccess: () => {
				setLogoFile(null);
			},
		});
	}

	return (
		<div className="p-4 bg-amber-100 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">لوگوی سامانه</h2>
			<div className="flex items-center gap-6 bg-amber-200 p-2 rounded-md">
				<img
					src={
						logoPreview ||
						`${import.meta.env.VITE_API_URL}/uploads/logos/logo.png`
					}
					alt="لوگو سامانه"
					className="w-32 aspect-square object-cover object-center bg-white border-2 border-amber-600 rounded-full"
				/>
				<form
					onSubmit={handleUpload}
					className="flex flex-col gap-2"
				>
					<label
						htmlFor="logo-input-label"
						className="text-sm font-medium"
					>
						فایل جدید را انتخاب کنید:
					</label>

					<div className="flex items-center gap-2">
						<label
							htmlFor="logo-input"
							className="bg-amber-50 text-amber-700 hover:bg-amber-100 font-semibold text-sm py-2 px-4 rounded-full cursor-pointer"
						>
							انتخاب فایل
						</label>

						<input
							type="file"
							id="logo-input"
							accept="image/*"
							onChange={handleFileChange}
							disabled={isUploadingLogo}
							className="hidden"
						/>

						<span className="text-sm text-gray-600">
							{logoFile
								? logoFile.name
								: "هیچ فایلی انتخاب نشده است"}
						</span>

						{logoFile && (
							<button
								type="submit"
								disabled={isUploadingLogo}
								className="bg-amber-500 text-white px-4 py-2 rounded cursor-pointer"
							>
								{isUploadingLogo ? (
									<div className="loaderMini"></div>
								) : (
									"آپلود لوگو"
								)}
							</button>
						)}
					</div>

					<p className="text-xs text-gray-500">
						حداکثر حجم: ۵ مگابایت (PNG, JPG, WEBP, JPEG)
					</p>
				</form>
			</div>
		</div>
	);
}

export default LogoUpload;
