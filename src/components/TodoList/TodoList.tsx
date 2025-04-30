// src/components/TodoList/TodoList.tsx
import React from "react";
// MUI 컴포넌트 임포트
import { List, Typography, Divider, Paper } from "@mui/material";
import { TodoItem, Todo } from "../TodoItem/TodoItem";

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
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ p: 3 }}
      >
        No todos yet! Add one above.
      </Typography>
    );
  }

  return (
    <Paper elevation={2}>
      <List sx={{ width: "100%", bgcolor: "background.paper", padding: 0 }}>
        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
            {index < todos.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};
