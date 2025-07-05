import { updateTask } from '../api';

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const handleToggle = async () => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    onToggle(updated);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
      <h3>{task.title} {task.completed ? '✔️' : '❌'}</h3>
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
