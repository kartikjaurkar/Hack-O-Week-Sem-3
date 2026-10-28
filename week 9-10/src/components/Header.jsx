import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="logo">ST</div>
          <div>
            <strong>Student Task Manager</strong>
            <span>React Practical</span>
          </div>
        </div>

        <button
          className="theme-button"
          onClick={() => setDarkMode((value) => !value)}
          type="button"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;