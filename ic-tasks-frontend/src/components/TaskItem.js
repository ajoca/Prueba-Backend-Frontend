import React, { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);

  const handleSave = () => {
    if (!editName.trim()) return;
    onUpdate(task.id, { ...task, name: editName });
    setIsEditing(false);
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        task.completed ? 'list-group-item-success' : 'list-group-item-light'
      }`}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="me-2"
        />
        {isEditing ? (
          <input
            type="text"
            className="form-control d-inline-block"
            style={{ width: '200px' }}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        ) : (
          <span>{task.name}</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
            Guardar
          </button>
        ) : (
          <button className="btn btn-warning btn-sm me-2" onClick={() => setIsEditing(true)}>
            Editar
          </button>
        )}
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
