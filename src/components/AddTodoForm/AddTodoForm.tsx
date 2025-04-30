import React, { useState, FormEvent } from "react";
import "./AddTodoForm.css";

interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText(""); // 입력 필드 초기화
    }
  };

  return (
    <form className="AddTodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New todo text"
      />
      <button type="submit">Add</button>
    </form>
  );
};
