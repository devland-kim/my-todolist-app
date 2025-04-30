// src/components/AddTodoForm/AddTodoForm.tsx
import React, { useState, FormEvent } from "react";
// MUI 컴포넌트 임포트
import { TextField, Button, Box, Stack } from "@mui/material";

interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAddTodo(trimmedText);
      setText("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      {" "}
      <Stack direction="row" spacing={1}>
        <TextField
          label="What needs to be done?" // placeholder 대신 label 사용
          variant="outlined"
          size="small"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="New todo text"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!text.trim()}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Todo
        </Button>
      </Stack>
    </Box>
  );
};
