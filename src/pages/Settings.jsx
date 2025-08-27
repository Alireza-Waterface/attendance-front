import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import OrganizationalSettingsForm from "../features/settings/components/OrganizationalSettingsForm";
import LogoUpload from "../features/settings/components/LogoUpload";
import AttendancePolicyForm from "../features/settings/components/AttendancePolicyForm";
import SecuritySettingsForm from "../features/settings/components/SecuritySettingsForm";
import DepartmentManager from "../features/departments/components/DepartmentSettings";
import RolesManager from "../features/roles/components/RolesManager";

import { useUser } from "../features/auth/hooks/useUser";

function Settings() {
	const { isAdmin, isLoading } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isAdmin) {
			navigate("/restricted", { replace: true });
		}
	}, [isLoading, isAdmin, navigate]);

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold text-center mb-2">تنظیمات سامانه</h1>

			<div className="w-[80%] mx-auto flex flex-col gap-8">
				<OrganizationalSettingsForm />

				<LogoUpload />

				<AttendancePolicyForm />

				<SecuritySettingsForm />

				<DepartmentManager />

				<RolesManager />
			</div>
		</div>
	);
}

export default Settings;