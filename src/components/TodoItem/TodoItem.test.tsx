// src/components/TodoItem/TodoItem.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoItem, Todo } from "./TodoItem";
import "@testing-library/jest-dom/matchers";

describe("TodoItem", () => {
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();
  const mockTodo: Todo = {
    id: "1",
    text: "Test Todo",
    completed: false,
  };

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  const renderComponent = (todo: Todo) => {
    render(
      <TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />
    );
  };

  it("텍스트 렌더링", () => {
    renderComponent(mockTodo);
    expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
  });

  it("선택안되어있는 체크박스 확인", () => {
    renderComponent(mockTodo);
    const checkbox = screen.getByRole("checkbox", { name: /test todo/i });
    expect(checkbox).not.toBeChecked();

    const textElement = screen.getByText(mockTodo.text);
    expect(textElement).not.toHaveStyle("text-decoration: line-through");
  });

  it("체크박스 체크 확인", () => {
    const completedTodo = { ...mockTodo, completed: true };
    renderComponent(completedTodo);
    const checkbox = screen.getByRole("checkbox", { name: completedTodo.text });
    expect(checkbox).toBeChecked();
  });

  it("체크 박스 클릭 함수 동작 확인", async () => {
    renderComponent(mockTodo);
    const checkbox = screen.getByRole("checkbox", { name: mockTodo.text });
    await userEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it("삭제 버튼 클릭 함수 동작 확인", async () => {
    renderComponent(mockTodo);
    const deleteButton = screen.getByRole("button", {
      name: `Delete ${mockTodo.text}`,
    });
    await userEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(mockTodo.id);
  });
});
