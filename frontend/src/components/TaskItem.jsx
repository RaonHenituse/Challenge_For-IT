export default function TaskItem({ task, onDelete }) {
  return (
    <div style={{ margin: '8px 0' }}>
      <span>{task.title} - {task.completed ? '✔️' : '❌'}</span>
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  );
}
