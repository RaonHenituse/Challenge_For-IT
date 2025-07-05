import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';

export default function TaskForm({ onTaskSaved, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    if (taskToEdit) {
      const updated = await updateTask(taskToEdit.id, { title, description });
      onTaskSaved(updated);
    } else {
      const newTask = await createTask({ title, description });
      onTaskSaved(newTask);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">
        {taskToEdit ? 'Actualizar tarea' : 'Agregar tarea'}
      </button>
    </form>
  );
}
