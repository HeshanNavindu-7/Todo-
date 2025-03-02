const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  try {
    const userId = req.user.id; 
    const todos = await Todo.getAllTodos(userId);
    res.json(todos);
  } catch (err) {
    console.error("Get Todos Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const insertId = await Todo.addTodo(userId, title, description);
    res.status(201).json({ id: insertId, title, description, completed: false });
  } catch (err) {
    console.error("Create Todo Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    await Todo.updateTodo(id, title, description, completed);
    res.json({ message: 'Task updated' });
  } catch (err) {
    console.error("Update Todo Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.deleteTodo(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error("Delete Todo Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
