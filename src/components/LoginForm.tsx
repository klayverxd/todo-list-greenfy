import React, { useState } from "react";
import {
	TextField,
	Button,
	Container,
	Box,
	Typography,
	InputAdornment,
	useTheme,
} from "@mui/material";

import { login } from "../api/auth";
import { LoginFormProps } from "../types/Login";

import { Person, Password } from "@mui/icons-material";

const LoginForm = ({ onLogin }: LoginFormProps) => {
	const theme = useTheme();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await login(username, password);
			onLogin(response.token);
		} catch (err) {
			setError(err as string);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			>
				<Box
					sx={{
						height: 120,
						width: 120,
						maxHeight: { xs: 80, md: 120 },
						maxWidth: { xs: 80, md: 120 },
						mb: 2,
					}}
				>
					<svg
						width="auto"
						height="auto"
						viewBox="0 0 254 254"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M126.857 253.307C196.693 253.307 253.307 196.693 253.307 126.857C253.307 57.0202 196.693 0.406586 126.857 0.406586C57.0202 0.406586 0.406601 57.0202 0.406601 126.857C0.406601 196.693 57.0202 253.307 126.857 253.307Z"
							fill={theme.palette.primary.main}
						/>
						<path
							d="M108.53 181.652C108.502 181.652 108.474 181.652 108.448 181.652C104.795 181.626 101.331 180.025 98.9477 177.26L61.0745 133.275C56.5167 127.983 57.1124 119.997 62.4064 115.44C67.7005 110.885 75.6837 111.48 80.2415 116.771L108.656 149.772L173.584 76.3328C178.207 71.1006 186.198 70.6088 191.433 75.2341C196.665 79.8593 197.157 87.851 192.532 93.0832L118.008 177.383C115.603 180.098 112.152 181.652 108.53 181.652Z"
							fill="white"
						/>
					</svg>
				</Box>

				<Typography component="h1" variant="h5">
					ToDo List Login
				</Typography>

				{error && <Typography color="error">{error}</Typography>}

				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
						value={username}
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Person />
								</InputAdornment>
							),
						}}
						onChange={e => setUsername(e.target.value)}
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={password}
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Password />
								</InputAdornment>
							),
						}}
						onChange={e => setPassword(e.target.value)}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, fontWeight: "bold" }}
						disabled={loading}
					>
						{loading ? "Loading..." : "Login"}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginForm;
