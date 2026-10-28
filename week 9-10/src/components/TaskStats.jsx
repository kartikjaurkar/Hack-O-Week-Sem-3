import React from "react";

function TaskStats({ total, completed, pending }) {
  return (
    <>
      <div className="stat-card">
        <span className="stat-label">TOTAL</span>
        <strong>{total}</strong>
        <span>All tasks</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">COMPLETED</span>
        <strong>{completed}</strong>
        <span>Finished tasks</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">PENDING</span>
        <strong>{pending}</strong>
        <span>Remaining tasks</span>
      </div>
    </>
  );
}

export default TaskStats;