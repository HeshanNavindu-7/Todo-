export interface Task {
    id: string;
    title: string; // ✅ Ensure "title" exists
    description?: string;
    completed: boolean;
    createdAt: string; // ✅ Ensure proper date format
  }
  