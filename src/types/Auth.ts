export interface AuthResponse {
  token: string;
}

export interface UseAuthReturnType {
  isAuthenticated: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}
