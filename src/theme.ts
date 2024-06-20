import { createTheme } from "@mui/material";

const lightTheme = createTheme({
	palette: {
		primary: {
			main: "#01F36D",
		},
		background: {
			default: "#F5F5F5",
		},
	},
});

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#01F36D",
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

export { darkTheme, lightTheme };
