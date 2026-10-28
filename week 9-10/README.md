# Student Task Manager — React Practical Project

## Requirements covered

- Event handling
- Forms
- Controlled components
- Component composition
- Lifting state up
- `useRef`
- `useMemo`
- `useCallback`
- `useContext`
- Custom hooks

## Additional feature

Tasks and theme preference are persisted using `localStorage`.

## Project structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   ├── TaskList.jsx
│   └── TaskStats.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useInput.js
│   └── useLocalStorage.js
├── App.jsx
├── index.css
└── main.jsx
```

## How to run

Make sure Node.js is installed.

```bash
npm install
npm run dev
```

Open the localhost URL shown by Vite, usually:

```text
http://localhost:5173
```

## Hook demonstration

### useRef
Used in `TaskForm` to automatically focus the input after adding a task or when validation fails.

### useMemo
Used in `App` to calculate completed tasks and filter the task list efficiently.

### useCallback
Used to memoize `addTask`, `toggleTask`, and `deleteTask` functions passed to child components.

### useContext
Used for light/dark theme sharing between components without prop drilling.

### Custom hook
`useInput` provides reusable controlled-input state and reset logic.

`useLocalStorage` synchronizes React state with browser localStorage.

## Viva explanation

The `App` component stores the main task state. This is lifting state up because `TaskForm`, `TaskList`, and `TaskStats` all need information related to the same tasks.

`TaskList` is composed of multiple `TaskItem` components, demonstrating component composition.

The form is controlled because its input value comes from React state and changes through `onChange`.

User actions such as submitting, clicking complete/delete, searching, and changing the theme demonstrate event handling.
