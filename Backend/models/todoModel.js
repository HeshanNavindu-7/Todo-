const db = require('../config/db');

const getAllTodos = async (userId) => {
  const [rows] = await db.query('SELECT * FROM todos WHERE userId = ?', [userId]);
  return rows;
};

const addTodo = async (userId, title) => {
  const [result] = await db.query(
    'INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)', 
    [userId, title, false]
  );
  return result.insertId;
};

const updateTodo = async (id, title, completed) => {
  await db.query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [title, completed, id]);
};

const deleteTodo = async (id) => {
  await db.query('DELETE FROM todos WHERE id = ?', [id]);
};

module.exports = { getAllTodos, addTodo, updateTodo, deleteTodo };
