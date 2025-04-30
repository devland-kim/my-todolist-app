import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TodoItem, Todo } from "./TodoItem";

describe("TodoItem", () => {
  const mockTodo: Todo = { id: "1", text: "Test Todo", completed: false };
  const mockToggle = vi.fn(); // Vitest의 mock 함수
  const mockDelete = vi.fn();

  it("renders the todo text", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
    );
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("checkbox is unchecked when todo is not completed", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("checkbox is checked when todo is completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    // completed 클래스가 적용되었는지 확인 (선택 사항)
    expect(screen.getByRole("listitem")).toHaveClass("completed");
  });

  it("calls onToggle with the correct id when checkbox is clicked", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete with the correct id when delete button is clicked", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
    );
    const deleteButton = screen.getByRole("button", {
      name: /delete test todo/i,
    });
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith("1");
  });
});
