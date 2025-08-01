import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getTasks,
  createTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from './api/tasks';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newCompleted, setNewCompleted] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    console.log('📡 [FETCH] Cargando tareas...');
    try {
      setLoading(true);
      const data = await getTasks();
      console.log('✅ [FETCH] Tareas recibidas:', data);
      setTasks(data);
    } catch (error) {
      console.error('❌ [FETCH] Error al cargar tareas:', error);
      toast.error('Error cargando tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    console.log('📝 [CREATE] Nueva tarea:', newTask);

    if (!newTask.trim()) {
      toast.warn('El nombre de la tarea no puede estar vacío');
      return;
    }

    if (tasks.some((t) => t.name.toLowerCase() === newTask.toLowerCase())) {
      toast.warn('Ya existe una tarea con ese nombre');
      return;
    }

    try {
      await createTask({ name: newTask, completed: newCompleted });
      console.log('✅ [CREATE] Tarea creada correctamente');
      setNewTask('');
      setNewCompleted(false);
      toast.success('Tarea creada');
      fetchTasks();
    } catch (error) {
      console.error('❌ [CREATE] Error creando tarea:', error);
      toast.error('Error creando la tarea');
    }
  };

  const toggleTask = async (task) => {
    console.log('🔄 [TOGGLE] Cambiando estado de la tarea:', task);
    try {
      await apiUpdateTask(task.id, { ...task, completed: !task.completed });
      console.log('✅ [TOGGLE] Estado actualizado');
      toast.info('Estado de la tarea actualizado');
      fetchTasks();
    } catch (error) {
      console.error('❌ [TOGGLE] Error al actualizar:', error);
      toast.error('Error actualizando tarea');
    }
  };

  const updateTask = async (id, data) => {
    console.log('✏️ [UPDATE] Editando tarea:', { id, ...data });
    try {
      await apiUpdateTask(id, data);
      console.log('✅ [UPDATE] Tarea actualizada correctamente');
      toast.success('Tarea actualizada');
      fetchTasks();
    } catch (error) {
      console.error('❌ [UPDATE] Error al actualizar tarea:', error);
      toast.error('Error actualizando tarea');
    }
  };

  const deleteTask = async (id) => {
    console.log('🗑️ [DELETE] Eliminando tarea con id:', id);
    try {
      await apiDeleteTask(id);
      console.log('✅ [DELETE] Tarea eliminada correctamente');
      toast.error('Tarea eliminada');
      fetchTasks();
    } catch (error) {
      console.error('❌ [DELETE] Error eliminando tarea:', error);
      toast.error('Error eliminando tarea');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchName = task.name.toLowerCase().includes(filterName.toLowerCase());
    const matchCompleted =
      filterCompleted === 'all' ||
      (filterCompleted === 'true' && task.completed) ||
      (filterCompleted === 'false' && !task.completed);
    return matchName && matchCompleted;
  });

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Gestor de Tareas</h1>

      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        newCompleted={newCompleted}
        setNewCompleted={setNewCompleted}
        handleAddTask={handleAddTask}
      />

      <FilterBar
        filterName={filterName}
        setFilterName={setFilterName}
        filterCompleted={filterCompleted}
        setFilterCompleted={setFilterCompleted}
      />

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
