import { useState } from 'react';
import { createTask } from '../api';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await createTask({ title, completed: false });
    setTitle('');
    onTaskCreated(newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nueva tarea" />
      <button type="submit">Agregar</button>
    </form>
  );
}
