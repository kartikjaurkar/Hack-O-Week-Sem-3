import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-row">
      <div>
        <h2>Your Tasks</h2>
        <p>Search and manage your tasks.</p>
      </div>

      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
    </div>
  );
}

export default SearchBar;