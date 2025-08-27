import { Link } from "react-router-dom";

function RestrictedAccess() {
	return (
		<div className="bg-amber-400 grid place-items-center gap-4 w-full max-w-2xl py-8 px-16 rounded-lg absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
			<h1 className="text-3xl font-bold">دسترسی غیر مجاز</h1>
			<p className="text-xl">شما اجازه دسترسی به این صفحه را ندارید</p>

			<Link
				type="button"
				to={'/'}
				className="py-2 px-8 text-xl font-bold border-2 transition-all bg-amber-100 rounded-md border-amber-600 cursor-pointer hover:bg-amber-200 active:translate-y-1"
			>
				صفحه اصلی
			</Link>
		</div>
	);
}

export default RestrictedAccess;
