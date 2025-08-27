import { useUser } from "../features/auth/hooks/useUser";

import PasswordChangeForm from "../features/auth/components/ChangePasswordForm";
import UploadAvatar from "../features/users/components/UploadAvatar";
import ProfileDataForm from "../features/users/components/ProfileDataForm";

import Loading from "../ui/Loading";

function Profile() {
	const { isLoading } = useUser();

	if (isLoading) return <Loading className="loader" />;

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold text-center">پروفایل کاربری</h1>

			<div className="w-[70%] mx-auto flex flex-col gap-8">
				<UploadAvatar />
				<ProfileDataForm />
				<PasswordChangeForm />
			</div>
		</div>
	);
}

export default Profile;
