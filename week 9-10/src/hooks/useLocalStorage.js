import { useState } from "react";

function getInitialValue(key, initialValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  } catch {
    return initialValue;
  }
}

// Custom hook: keeps React state synchronized with localStorage.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>
    getInitialValue(key, initialValue)
  );

  const updateValue = (newValue) => {
    setValue((current) => {
      const valueToStore =
        typeof newValue === "function"
          ? newValue(current)
          : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [value, updateValue];
}