// src/components/TodoItem/TodoItem.tsx
import React from "react";
// MUI 컴포넌트 및 아이콘 임포트
import { ListItem, Checkbox, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // 삭제 아이콘

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
  const labelId = `checkbox-list-label-${todo.id}`;

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label={`Delete ${todo.text}`}
          onClick={() => onDelete(todo.id)}
          title={`Delete ${todo.text}`}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        tabIndex={-1}
        disableRipple
        onChange={() => onToggle(todo.id)}
        sx={{ ml: 0.5 }}
        slotProps={{
          input: {
            "aria-labelledby": labelId,
          },
        }}
      />
      <ListItemText
        id={labelId}
        primary={todo.text}
        sx={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "text.disabled" : "text.primary",
          pr: 5,
          wordBreak: "break-word",
        }}
      />
    </ListItem>
  );
};
