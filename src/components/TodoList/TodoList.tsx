import React from "react";
import { TodoItem, Todo } from "../TodoItem/TodoItem";
import "./TodoList.css";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
}) => {
  if (todos.length === 0) {
    return <p className="empty-message">No todos yet!</p>;
  }

  return (
    <ul className="TodoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
