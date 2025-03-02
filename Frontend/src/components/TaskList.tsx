import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => Promise<void>; // ✅ Ensure 'onToggle' is defined here
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onToggle }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks available.</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
      ))}
    </ul>
  );
};

export default TaskList;
