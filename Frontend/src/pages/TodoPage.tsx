import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    } else {
      fetchTodos();
    }
  }, [currentUser, navigate]);


  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/todo/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch  {
      toast.error('Failed to fetch tasks.', { position: 'top-right', autoClose: 2000 });
    }
  };


  const handleTaskSubmit = async ({ title, description }: { title: string; description: string }) => {
    try {
      const token = localStorage.getItem('token');

      if (editingTask) {
  
        await axios.put(
          `http://localhost:5000/api/todo/todos/${editingTask.id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTasks(tasks.map(task => (task.id === editingTask.id ? { ...task, title, description } : task)));
        toast.info('Task updated!', { position: 'top-right', autoClose: 2000 });
      } else {

        const response = await axios.post(
          'http://localhost:5000/api/todo/todos',
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTasks([...tasks, response.data]);
        toast.success('Task added successfully!', { position: 'top-right', autoClose: 2000 });
      }

      setIsFormOpen(false);
      setEditingTask(null);
    } catch  {
      toast.error('Failed to save task.', { position: 'top-right', autoClose: 2000 });
    }
  };


  const deleteTask = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/todo/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter(task => task.id !== id));
      toast.warning('Task deleted!', { position: 'top-right', autoClose: 2000 });
    } catch  {
      toast.error('Failed to delete task.', { position: 'top-right', autoClose: 2000 });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <ToastContainer />
      <div className="flex justify-between mb-4">
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
        <button onClick={() => { setIsFormOpen(true); setEditingTask(null); }} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <TaskForm onSubmit={handleTaskSubmit} initialTask={editingTask} />
            <button onClick={() => setIsFormOpen(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full">
              Close
            </button>
          </div>
        </div>
      )}

      <TaskList tasks={tasks} onEdit={(task) => { setIsFormOpen(true); setEditingTask(task); }} onDelete={deleteTask} />
    </div>
  );
};

export default TodoPage;
