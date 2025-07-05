import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks } from './api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const addTask = (task) => setTasks([...tasks, task]);

  return (
    <div>
      <h1>📝 Lista de Tareas</h1>
      <TaskForm onTaskCreated={addTask} />
      <TaskList />
    </div>
  );
}

export default App;
