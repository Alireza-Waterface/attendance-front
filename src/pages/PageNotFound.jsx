import useMoveBack from '../hooks/useMoveBack';

function PageNotFound() {
	const moveBack = useMoveBack();

	return (
		<div className="bg-amber-400 grid place-items-center gap-4 w-full max-w-2xl py-8 px-16 rounded-lg absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
			<h1 className="text-3xl font-bold">ارور 404</h1>
			<p className="text-xl">صفحه مورد نظر شما یافت نشد</p>

			<button
				type="button"
				onClick={moveBack}
				className="py-2 px-8 text-xl font-bold border-2 transition-all bg-amber-100 rounded-md border-amber-600 cursor-pointer hover:bg-amber-200 active:translate-y-1"
			>
				بازگشت
			</button>
		</div>
	);
}

export default PageNotFound;
