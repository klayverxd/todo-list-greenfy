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
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	useTheme,
} from "@mui/material";
import { HomePageProps, Task } from "../types/HomePage";
import { Add, Delete, Edit, Search } from "@mui/icons-material";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const HomePage = ({ onLogout }: HomePageProps) => {
	const theme = useTheme();

	const [tasks, setTasks] = useState<Task[]>([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const [editTask, setEditTask] = useState<Task | null>(null);
	const [editTitle, setEditTitle] = useState("");
	const [editDescription, setEditDescription] = useState(" ");

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

	const handleEditTask = (task: Task) => {
		setEditTask(task);
		setEditTitle(task.title);
		setEditDescription(task.description);
	};

	const handleUpdateTask = () => {
		if (editTask) {
			setTasks(
				tasks.map(task =>
					task.id === editTask.id
						? { ...task, title: editTitle, description: editDescription }
						: task
				)
			);
			setEditTask(null);
			setEditTitle("");
			setEditDescription("");
		}
	};

	const handleCancelEditTask = () => {
		setEditTask(null);
		setEditTitle("");
		setEditDescription("");
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
						sx={{
							height: 24,
							width: 24,
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
									{filteredTasks.map((task, index) => (
										<>
											<ListItem
												key={task.id}
												secondaryAction={
													<>
														<IconButton
															edge="end"
															onClick={() => handleEditTask(task)}
														>
															<Edit />
														</IconButton>
														<IconButton
															edge="end"
															onClick={() => handleDeleteTask(task.id)}
														>
															<Delete />
														</IconButton>
													</>
												}
											>
												<Checkbox
													checked={task.completed}
													onChange={() => handleToggleComplete(task.id)}
												/>

												<ListItemText
													primary={`${index + 1}. ${task.title}`}
													secondary={task.description}
													sx={{
														maxWidth: "sm",
														textDecoration: task.completed
															? "line-through"
															: "none",
													}}
												/>
											</ListItem>
											<Divider variant="middle" />
										</>
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

				<Dialog open={!!editTask} onClose={handleCancelEditTask}>
					<DialogTitle>Edit Task</DialogTitle>
					<DialogContent>
						<TextField
							label="Title"
							fullWidth
							value={editTitle}
							onChange={e => setEditTitle(e.target.value)}
							sx={{ mb: 2, mt: 2 }}
						/>

						<TextField
							label="Description"
							fullWidth
							value={editDescription}
							onChange={e => setEditDescription(e.target.value)}
							sx={{ mb: 2 }}
						/>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleCancelEditTask} sx={{ fontWeight: "bold" }}>
							Cancel
						</Button>

						<Button onClick={handleUpdateTask} sx={{ fontWeight: "bold" }}>
							Update
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Container>
	);
};

export default HomePage;
