import { useState } from "react";

// Custom hook for reusable controlled-input logic.
export default function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return { value, handleChange, reset };
}