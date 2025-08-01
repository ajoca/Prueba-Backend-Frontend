import React from 'react';

function TaskForm({ newTask, setNewTask, newCompleted, setNewCompleted, handleAddTask }) {
  return (
    <div className="d-flex gap-2 align-items-center mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Nueva tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={newCompleted}
          onChange={(e) => setNewCompleted(e.target.checked)}
        />
        <label className="form-check-label">Completada</label>
      </div>
      <button className="btn btn-primary" onClick={handleAddTask}>
        Guardar
      </button>
    </div>
  );
}

export default TaskForm;
