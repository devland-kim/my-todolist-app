import { Todo } from "../components/TodoItem/TodoItem";

let todos: Todo[] = [
  { id: "1", text: "Learn SWR", completed: false },
  { id: "2", text: "Integrate Chromatic", completed: true },
];

const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// GET /api/todos
export const fetchTodos = async (): Promise<Todo[]> => {
  await simulateDelay(500);
  console.log("API: Fetching todos");
  return [...todos];
};

// POST /api/todos
export const addTodo = async (text: string): Promise<Todo> => {
  await simulateDelay(300);
  const newTodo: Todo = {
    id: Date.now().toString(), // 간단한 ID 생성
    text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("API: Added todo", newTodo);
  return newTodo;
};

// PATCH /api/todos/:id
export const toggleTodo = async (id: string): Promise<Todo | undefined> => {
  await simulateDelay(200);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex > -1) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      completed: !todos[todoIndex].completed,
    };
    console.log("API: Toggled todo", todos[todoIndex]);
    return todos[todoIndex];
  }
  console.error("API: Todo not found for toggle", id);
  return undefined;
};

// DELETE /api/todos/:id
export const deleteTodo = async (id: string): Promise<boolean> => {
  await simulateDelay(400);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id);
  const success = todos.length < initialLength;
  if (success) {
    console.log("API: Deleted todo", id);
  } else {
    console.error("API: Todo not found for delete", id);
  }
  return success;
};
