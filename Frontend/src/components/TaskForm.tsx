import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string }) => Promise<void>;
  initialTask?: { title: string; description: string };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      await onSubmit({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" className="border p-2 rounded w-full" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        {initialTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
