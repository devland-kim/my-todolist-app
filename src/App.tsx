import { AddTodoForm } from "./components/AddTodoForm/AddTodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import { useTodos } from "./hooks/useTodos.ts";
import "./App.css"; // 전역 스타일

function App() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } =
    useTodos();

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />

      {error && <p className="error-message">Error loading todos!</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <TodoList
          todos={todos || []} // todos가 undefined일 경우 빈 배열 전달
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
