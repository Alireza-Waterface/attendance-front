import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/auth/hooks/useUser";
import Loading from "../ui/Loading";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { isLoading, isAuthenticated } = useUser();

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate("/login");
		}
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading) {
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Loading />
			</div>
		);
	}

	if (isAuthenticated) {
		return children;
	}

	return null;
}

export default ProtectedRoute;
