import { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggle = (updatedTask) => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleSave = (savedTask) => {
    const exists = tasks.find(t => t.id === savedTask.id);
    if (exists) {
      setTasks(tasks.map(t => (t.id === savedTask.id ? savedTask : t)));
    } else {
      setTasks([...tasks, savedTask]);
    }
    setTaskToEdit(null);
  };

  return (
    <div>
      <TaskForm onTaskSaved={handleSave} taskToEdit={taskToEdit} />
      {tasks.length === 0 && <p>No hay tareas aún.</p>}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={setTaskToEdit}
        />
      ))}
    </div>
  );
}
