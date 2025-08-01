import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, toggleTask, deleteTask, updateTask }) {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}    // para marcar como completada
          onDelete={deleteTask}    // para eliminar
          onUpdate={updateTask}    // para editar
        />
      ))}
    </ul>
  );
}

export default TaskList;
