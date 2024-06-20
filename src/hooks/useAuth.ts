import { useState, useEffect } from "react";
import { UseAuthReturnType } from "../types/Auth";

const useAuth = (): UseAuthReturnType => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogin = (token: string) => {
		localStorage.setItem("authToken", token);
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("tasks");
		setIsAuthenticated(false);
	};

	return {
		isAuthenticated,
		handleLogin,
		handleLogout,
	};
};

export default useAuth;
