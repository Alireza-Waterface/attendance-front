import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useLogin from "../features/auth/hooks/useLogin";

import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const { login, isLoggingIn } = useLogin();

	const [isVisible, setIsVisible] = useState(false);
	const changeVisiblity = () => setIsVisible((prev) => !prev);

	function onSubmit({ username, password }) {
		login({ username, password });
	}

	return (
		<main
			className="relative h-[100vh] w-[100vw] login-page"
			style={{
				background: `url(${
					import.meta.env.VITE_API_URL
				}/uploads/kut.webp) no-repeat center`,
				backgroundSize: "cover",
			}}
		>
			<div className="absolute left-1/12 top-1/6 w-xl bg-[#ca945a32] backdrop-filter-[blur(3px)] rounded-sm p-4">
				<h1 className="text-2xl font-bold text-center mb-4">
					ورود به سامانه
				</h1>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 w-full"
				>
					<div className="relative">
						<input
							disabled={isLoggingIn}
							type="text"
							name="username"
							id="username"
							autoComplete="false"
							placeholder=" "
							{...register("username", {
								required: "لطفا نام کاربری خود را وارد کنید",
							})}
							className="border-2 pr-2 pl-8 pt-4 rounded-md w-full"
						/>
						<label
							htmlFor="username"
							className="absolute right-[8px] top-[3px] opacity-[0.75] text-[0.7rem]"
						>
							نام کاربری
						</label>

						<FaUser
							size={18}
							className="absolute top-[12px] left-[10px]"
						/>

						{errors.username?.message && (
							<p className="mt-2 text-red-700 text-[0.8rem]">
								{errors.username.message}
							</p>
						)}
					</div>

					<div className="relative">
						<input
							disabled={isLoggingIn}
							type={isVisible ? "text" : "password"}
							name="password"
							id="password"
							autoComplete="false"
							placeholder=" "
							{...register("password", {
								required: "لطفا کلمه عبور خود را وارد کنید",
							})}
							className="border-2 pr-2 pl-8 pt-4 rounded-md w-full"
						/>
						<label
							htmlFor="password"
							className="absolute right-[8px] top-[3px] opacity-[0.75] text-[0.7rem]"
						>
							کلمه عبور
						</label>

						{isVisible ? (
							<FaEyeSlash
								className="absolute top-[12px] left-[10px] cursor-pointer"
								size={20}
								onClick={changeVisiblity}
								title="پنهان‌کردن کلمه عبور"
							/>
						) : (
							<FaEye
								className="absolute top-[12px] left-[10px] cursor-pointer"
								size={20}
								onClick={changeVisiblity}
								title="نمایش کلمه عبور"
							/>
						)}

						{errors.password?.message && (
							<p className="mt-2 text-red-700 text-[0.8rem]">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-2 gap-6 mt-10">
						<button
							type="submit"
							className="bg-amber-600 rounded-full h-10 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
							disabled={isLoggingIn}
						>
							{isLoggingIn ? (
								<div className="loaderMini"></div>
							) : (
								"ورود"
							)}
						</button>
						<Link
							to={"/reset-password"}
							className="bg-amber-600 rounded-full h-10 flex items-center justify-center cursor-pointer"
						>
							بازیابی کلمه عبور
						</Link>
					</div>
				</form>
			</div>
		</main>
	);
}

export default Login;
