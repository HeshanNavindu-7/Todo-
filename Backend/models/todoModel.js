const db = require('../config/db');

const getAllTodos = async (userId) => {
  const [rows] = await db.query('SELECT * FROM todos WHERE userId = ?', [userId]);
  return rows;
};

const addTodo = async (userId, title, description) => {
  const [result] = await db.query(
    'INSERT INTO todos (userId, title, description, completed) VALUES (?, ?, ?, ?)', 
    [userId, title, description, false]
  );
  return result.insertId;
};

const updateTodo = async (id, title, description, completed) => {
  await db.query(
    'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?', 
    [title, description, completed, id]
  );
};

const deleteTodo = async (id) => {
  await db.query('DELETE FROM todos WHERE id = ?', [id]);
};

module.exports = { getAllTodos, addTodo, updateTodo, deleteTodo };
