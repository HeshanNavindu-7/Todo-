export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}