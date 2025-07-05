import { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
}
