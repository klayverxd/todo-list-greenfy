import { useState, useEffect } from "react";
import {
	Button,
	Container,
	Box,
	Typography,
	TextField,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Checkbox,
} from "@mui/material";
import { HomePageProps, Task } from "../types/HomePage";
import { Add, Delete, Search } from "@mui/icons-material";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const HomePage = ({ onLogout }: HomePageProps) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const handleAddTask = () => {
		const newTask = {
			id: Date.now(),
			title: title || "Sem título",
			description: description || "Sem descrição",
			completed: false,
		};

		setTasks([...tasks, newTask]);
		setTitle("");
		setDescription("");
	};

	const handleDeleteTask = (id: number) => {
		setTasks(tasks.filter(task => task.id !== id));
	};

	const handleToggleComplete = (id: number) => {
		setTasks(
			tasks.map(task =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const filteredTasks = tasks.filter(task =>
		task.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Container maxWidth="sm">
			<Box
				sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box
						component="img"
						sx={{
							height: 24,
							width: 24,
						}}
						alt="Logo"
						src="/logo-light.png"
					/>

					<Typography component="h1" variant="h5">
						ToDo List
					</Typography>
				</Box>

				<Box sx={{ mt: 3, width: "100%" }}>
					<TextField
						label="Title"
						fullWidth
						value={title}
						onChange={e => setTitle(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<TextField
						label="Description"
						fullWidth
						value={description}
						onChange={e => setDescription(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<Button
						variant="contained"
						fullWidth
						startIcon={<Add />}
						onClick={handleAddTask}
						sx={{ fontWeight: "bold" }}
					>
						Add Task
					</Button>
				</Box>

				<TextField
					label="Search"
					fullWidth
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					sx={{ mt: 3 }}
					InputProps={{
						endAdornment: (
							<IconButton>
								<Search />
							</IconButton>
						),
					}}
				/>

				<Box
					sx={{
						width: "100%",
						height: 400,
						overflow: "auto",
						mt: 3,
						backgroundColor: "rgba(0,0,0,0.1)",
					}}
				>
					{tasks.length ? (
						<>
							{filteredTasks.length ? (
								<List sx={{ width: "100%" }}>
									{filteredTasks.map(task => (
										<ListItem
											key={task.id}
											secondaryAction={
												<IconButton
													edge="end"
													onClick={() => handleDeleteTask(task.id)}
												>
													<Delete />
												</IconButton>
											}
										>
											<Checkbox
												checked={task.completed}
												onChange={() => handleToggleComplete(task.id)}
											/>

											<ListItemText
												primary={task.title}
												secondary={task.description}
												sx={{
													textDecoration: task.completed
														? "line-through"
														: "none",
												}}
											/>
										</ListItem>
									))}
								</List>
							) : (
								<Box
									sx={{
										display: "flex",
										width: "100%",
										height: "100%",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Typography variant="h5">No tasks found</Typography>
								</Box>
							)}
						</>
					) : (
						<Box
							sx={{
								display: "flex",
								width: "100%",
								height: "100%",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<FormatListBulletedOutlinedIcon />
						</Box>
					)}
				</Box>
				<Button
					variant="contained"
					sx={{ mt: 3, gap: 1, fontWeight: "bold" }}
					onClick={onLogout}
				>
					<LogoutOutlinedIcon /> Logout
				</Button>
			</Box>
		</Container>
	);
};

export default HomePage;
