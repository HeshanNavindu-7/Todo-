import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      <div className="flex justify-end space-x-2 mt-3">
        <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700 px-3 py-1 border border-blue-500 rounded-md">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 px-3 py-1 border border-red-500 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
