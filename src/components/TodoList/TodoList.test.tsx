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

  it("투두리스트 아이템 렌더링", () => {
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

  it("리스트 아이템 없을 때 확인", () => {
    render(<TodoList todos={[]} onToggle={mockToggle} onDelete={mockDelete} />);
    expect(
      screen.getByText(/No todos yet! Add one above./i)
    ).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
