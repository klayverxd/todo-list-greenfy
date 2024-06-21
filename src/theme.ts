import { createTheme, Theme } from "@mui/material/styles";

const getLightTheme = (primaryColor: string): Theme =>
	createTheme({
		palette: {
			primary: {
				main: primaryColor,
			},
			background: {
				default: "#F5F5F5",
			},
		},
	});

const getDarkTheme = (primaryColor: string): Theme =>
	createTheme({
		palette: {
			primary: {
				main: primaryColor,
				contrastText: "#242424",
			},
			background: {
				default: "#002154",
				paper: "#1976d2",
			},
			text: {
				primary: "#f5f5f5",
				secondary: "#f5f5f5",
			},
		},
	});

export { getLightTheme, getDarkTheme };
