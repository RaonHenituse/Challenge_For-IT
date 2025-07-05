import { updateTask } from '../api';
import '../index.css';

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const handleToggle = async () => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    onToggle(updated);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Creado el: {new Date(task.createdAt).toLocaleString()}</small><br />
      <button onClick={handleToggle}>
        {task.completed ? 'Desmarcar' : 'Completar'}
      </button>
      <button onClick={() => onEdit(task)}>Editar</button>
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  );
}
