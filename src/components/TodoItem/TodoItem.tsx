import React from "react";
import "./TodoItem.css"; // 간단한 스타일링을 위해 CSS 파일 사용

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  return (
    <li className={`TodoItem ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.text} as ${
          todo.completed ? "incomplete" : "complete"
        }`}
      />
      <span className="text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.text}`}
      >
        X
      </button>
    </li>
  );
};
