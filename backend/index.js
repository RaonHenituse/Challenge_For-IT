const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newTask = { id: idCounter++, title, completed: !!completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.title = title !== undefined ? title : task.title;
  task.completed = completed !== undefined ? completed : task.completed;
  res.json(task);
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
