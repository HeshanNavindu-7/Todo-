const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Extract userId from token
    console.log("Fetching tasks for user:", userId); // ✅ Debugging Log

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const todos = await Todo.getAllTodos(userId);
    res.json(todos);
  } catch (err) {
    console.error("❌ Get Todos Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
