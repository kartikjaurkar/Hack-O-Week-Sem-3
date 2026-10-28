import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? "completed" : ""}`}>
      <button
        className="check-button"
        onClick={() => onToggle(task.id)}
        type="button"
        aria-label={task.completed ? "Mark as pending" : "Mark as complete"}
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-content">
        <span className="task-name">{task.name}</span>
        <span className="task-status">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        type="button"
      >
        Delete
      </button>
    </article>
  );
}

export default TaskItem;