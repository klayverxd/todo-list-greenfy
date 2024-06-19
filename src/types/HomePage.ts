export interface HomePageProps {
  onLogout: () => void;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
