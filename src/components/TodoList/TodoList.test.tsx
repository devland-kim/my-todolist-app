import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TodoList } from "./TodoList";
import { Todo } from "../TodoItem/TodoItem";

describe("TodoList", () => {
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();

  const sampleTodos: Todo[] = [
    { id: "1", text: "First Todo", completed: false },
    { id: "2", text: "Second Todo", completed: true },
  ];

  it("renders a list of TodoItems", () => {
    render(
      <TodoList
        todos={sampleTodos}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
  });

  it("renders empty message when there are no todos", () => {
    render(<TodoList todos={[]} onToggle={mockToggle} onDelete={mockDelete} />);
    expect(screen.getByText("No todos yet!")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  // TodoItem의 onToggle/onDelete 호출은 TodoItem 테스트에서 확인했으므로,
  // 여기서는 리스트 렌더링에 집중합니다. 필요하다면 상호작용 테스트도 추가 가능.
});
