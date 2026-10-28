import React, { useRef, useState } from "react";
import useInput from "../hooks/useInput";

function TaskForm({ onAddTask }) {
  const task = useInput("");
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  // Event handling + controlled form + useRef.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!task.value.trim()) {
      setError("Please enter a task.");
      inputRef.current?.focus();
      return;
    }

    onAddTask(task.value.trim());
    task.reset();
    setError("");
    inputRef.current?.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <h2>Add a Task</h2>
          <p>Enter a college task, assignment or activity.</p>
        </div>
      </div>

      <div className="input-row">
        <input
          ref={inputRef}
          type="text"
          value={task.value}
          onChange={task.handleChange}
          placeholder="e.g. Complete DAA assignment"
          aria-label="Task name"
        />
        <button className="primary-button" type="submit">
          + Add Task
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;