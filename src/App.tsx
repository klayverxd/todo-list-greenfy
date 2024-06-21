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
import { Box, CssBaseline, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/LightMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { getDarkTheme, getLightTheme } from "./theme";

const App = () => {
	const { isAuthenticated, handleLogin, handleLogout } = useAuth();

	const [darkMode, setDarkMode] = useState(false);
	const [primaryColor, setPrimaryColor] = useState("#01F36D");

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrimaryColor(event.target.value);
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const theme = darkMode
		? getDarkTheme(primaryColor)
		: getLightTheme(primaryColor);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						position: "absolute",
						gap: 2,
						top: 16,
						right: 16,
					}}
				>
					<input
						type="color"
						value={primaryColor}
						onChange={handleColorChange}
						style={{
							border: "none",
							background: "none",
						}}
					/>
					<IconButton onClick={toggleDarkMode}>
						{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Box>

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
