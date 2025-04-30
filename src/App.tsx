// src/App.tsx
import { AddTodoForm } from "./components/AddTodoForm/AddTodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import { useTodos } from "./hooks/useTodos";
// MUI 레이아웃 및 피드백 컴포넌트 임포트
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

function App() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } =
    useTodos();

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {" "}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        {" "}
        <Typography variant="h3" component="h1" gutterBottom>
          Todo List
        </Typography>
      </Box>
      <AddTodoForm onAddTodo={addTodo} />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load todos. Please try again later. ({String(error)})
        </Alert>
      )}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && !error && (
        <TodoList
          todos={todos || []}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
    </Container>
  );
}

export default App;
