import { useSearchParams } from "react-router-dom";
import Select from "../../../ui/Select";
import Search from "../../../ui/Search";
import { ROLES } from "../../../utils/constants";

function RegisterFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	function handleFilterChange(e) {
		searchParams.set(e.target.name, e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<div className="flex items-center justify-between gap-4 p-2 rounded-md bg-amber-200 mb-4">
			<Search />

			<div className="flex items-center gap-2">
				<Select
					label="نقش:"
					identifier="role"
					defaultValue={searchParams.get("role") || ""}
					onChange={handleFilterChange}
					options={ROLES}
					render={(options = []) =>
						options.map((role) => (
							<option value={role} key={role}>
								{role}
							</option>
						))
					}
				/>
			</div>

			<div className="flex items-center gap-2">
				<Select
					label="ترتیب:"
					identifier="sortBy"
					defaultValue={searchParams.get("sortBy") || ""}
					onChange={handleFilterChange}
					options={[
						{ key: "جدیدترین", value: "createdAt-desc" },
						{ key: "قدیمی‌ترین", value: "createdAt-asc" },
					]}
					hasAllOption={false}
					render={(options = []) =>
						options.map((option) => (
							<option value={option.value} key={option.key}>
								{option.key}
							</option>
						))
					}
				/>
			</div>

			<div className="flex items-center gap-2">
				<Select
					label="تعداد در صفحه:"
					identifier="limit"
					defaultValue={searchParams.get("limit") || ""}
					onChange={handleFilterChange}
					options={[10, 20, 30, 40, 50, 100]}
					hasAllOption={false}
					render={(options = []) =>
						options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))
					}
				/>
			</div>
		</div>
	);
}

export default RegisterFilters;
