import React, { useState } from "react";
import {
	TextField,
	Button,
	Container,
	Box,
	Typography,
	InputAdornment,
} from "@mui/material";

import { login } from "../api/auth";
import { LoginFormProps } from "../types/Login";

import { Person, Password } from "@mui/icons-material";

const LoginForm = ({ onLogin }: LoginFormProps) => {
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
					component="img"
					sx={{
						height: 120,
						width: 120,
						maxHeight: { xs: 80, md: 120 },
						maxWidth: { xs: 80, md: 120 },
						mb: 2,
					}}
					alt="Logo"
					src="/logo-dark.png"
				/>

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
