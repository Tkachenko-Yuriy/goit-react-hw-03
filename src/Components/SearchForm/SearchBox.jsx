import { useState } from "react";
import css from "./SearchBox.module.css";

export default function SearchBox({ label, onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };
  return (
    <label className={css.label}>
      {label}
      <input
        className={css.input}
        type="text"
        name="value"
        value={inputValue}
        onChange={handleInputChange}
      />
    </label>
  );
}
