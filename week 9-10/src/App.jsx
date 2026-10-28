import React, { useState, useMemo, useCallback } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import SearchBar from "./components/SearchBar";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("studentTasks", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [search, setSearch] = useState("");

  // Lifting state up: App owns shared task state.
  const addTask = useCallback((taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  // useMemo: avoid recalculating filtered/statistical data unnecessarily.
  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tasks;
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(query)
    );
  }, [tasks, search]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const pendingCount = tasks.length - completedCount;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <Header />

        <main className="container">
          <section className="hero-card">
            <div>
              <p className="eyebrow">REACT PRACTICAL PROJECT</p>
              <h1>Student Task Manager</h1>
              <p className="subtitle">
                Manage your college tasks while demonstrating React
                events, forms, state management, composition and hooks.
              </p>
            </div>
            <div className="hero-badge">React Hooks</div>
          </section>

          <section className="stats-grid">
            <TaskStats
              total={tasks.length}
              completed={completedCount}
              pending={pendingCount}
            />
          </section>

          <section className="panel">
            <TaskForm onAddTask={addTask} />
          </section>

          <section className="panel">
            <SearchBar value={search} onChange={setSearch} />
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </section>

          <footer>
            <p>Built with React • Event Handling • Forms • Hooks</p>
          </footer>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;