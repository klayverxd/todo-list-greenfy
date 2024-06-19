import { AuthResponse } from "../types/Auth";

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === '12345') {
        resolve({ token: 'todo-list-token' });
      } else {
        reject('Invalid credentials');
      }
    }, 1000);
  });
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
};
