import { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";

import useAuth from "./hooks/useAuth";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/LightMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { darkTheme, lightTheme } from "./theme";

const App = () => {
	const { isAuthenticated, handleLogin, handleLogout } = useAuth();

	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			<Router>
				<IconButton
					onClick={toggleDarkMode}
					sx={{ position: "absolute", top: 16, right: 16 }}
				>
					{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
				</IconButton>
				<Routes>
					<Route
						path="/login"
						element={
							isAuthenticated ? (
								<Navigate to="/" />
							) : (
								<LoginForm onLogin={handleLogin} />
							)
						}
					/>
					<Route
						path="/"
						element={
							isAuthenticated ? (
								<HomePage onLogout={handleLogout} />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
