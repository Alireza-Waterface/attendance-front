import Loading from "./Loading";

export default function Select({
	options = [],
	identifier = "",
	onChange,
	defaultValue,
	label = "",
	render,
	hasAllOption = true,
	isLoading = false,
}) {
	return (
		<>
			<label htmlFor={identifier}>{label}</label>
			{isLoading ? (
				<Loading className="loaderMini" />
			) : (
				<select
					defaultValue={defaultValue}
					onChange={onChange}
					name={identifier}
					id={identifier}
					className="bg-amber-300 pr-2 rounded-md border-2 border-[#ff8400] outline-none cursor-pointer"
				>
					{hasAllOption && <option value="">همه</option>}
					{options && render(options)}
				</select>
			)}
		</>
	);
}
