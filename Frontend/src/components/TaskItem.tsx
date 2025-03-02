import React from 'react';
import { Task } from '../types';
import { Edit, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onToggle: (id: string) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit, onToggle }) => {
  return (
    <div className={`border p-4 rounded-lg shadow-md flex justify-between items-center ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex items-center">
        {/* ✅ Ensure onToggle works when clicking */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mr-3 focus:outline-none ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
        >
          {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>
        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h3>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700">
          <Edit size={18} />
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
