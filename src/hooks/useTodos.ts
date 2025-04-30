import useSWR, { mutate } from "swr";
import { Todo } from "../components/TodoItem/TodoItem";
import * as api from "../api/todos"; // Mock API 함수 임포트

const TODOS_KEY = "/api/todos"; // SWR 캐시 키

export const useTodos = () => {
  // useSWR(key, fetcher, options)
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>(TODOS_KEY, api.fetchTodos);

  // 데이터 변경 함수 (Mutations)
  const addTodoItem = async (text: string) => {
    // Optimistic Update: UI 즉시 업데이트 (선택 사항)
    const tempId = `temp-${Date.now()}`;
    const optimisticData = todos
      ? [...todos, { id: tempId, text, completed: false }]
      : [{ id: tempId, text, completed: false }];
    mutate(TODOS_KEY, optimisticData, false); // revalidate=false

    try {
      const newTodo = await api.addTodo(text);
      // 실제 데이터로 업데이트 (API 성공 시)
      // SWR은 자동으로 revalidate 할 수도 있지만, 명시적으로 업데이트하면 더 빠름
      mutate(TODOS_KEY, (currentData) =>
        currentData
          ? [...currentData.filter((t) => t.id !== tempId), newTodo]
          : [newTodo]
      );
    } catch (err) {
      console.error("Failed to add todo:", err);
      // 에러 발생 시 Optimistic Update 롤백
      mutate(TODOS_KEY, todos, false); // 원래 데이터로 복구
      // 사용자에게 에러 알림 로직 추가 가능
    }
  };

  const toggleTodoItem = async (id: string) => {
    // Optimistic Update
    const optimisticData = todos?.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    mutate(TODOS_KEY, optimisticData, false);

    try {
      await api.toggleTodo(id);
      // 성공 시 revalidate (선택 사항, SWR이 자동으로 할 수도 있음)
      // mutate(TODOS_KEY);
    } catch (err) {
      console.error("Failed to toggle todo:", err);
      // 에러 시 롤백
      mutate(TODOS_KEY, todos, false);
    }
  };

  const deleteTodoItem = async (id: string) => {
    // Optimistic Update
    const optimisticData = todos?.filter((t) => t.id !== id);
    mutate(TODOS_KEY, optimisticData, false);

    try {
      await api.deleteTodo(id);
      // 성공 시 revalidate (선택 사항)
      // mutate(TODOS_KEY);
    } catch (err) {
      console.error("Failed to delete todo:", err);
      // 에러 시 롤백
      mutate(TODOS_KEY, todos, false);
    }
  };

  return {
    todos,
    isLoading,
    error,
    addTodo: addTodoItem,
    toggleTodo: toggleTodoItem,
    deleteTodo: deleteTodoItem,
  };
};
