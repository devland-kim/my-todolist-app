// src/components/AddTodoForm/AddTodoForm.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AddTodoForm } from "./AddTodoForm";
import "@testing-library/jest-dom/matchers";

describe("AddTodoForm", () => {
  const mockAddTodo = vi.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
  });

  it("인풋, 버튼 렌더링", () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    expect(
      screen.getByLabelText(/what needs to be done\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i })
    ).toBeInTheDocument();
  });

  it("인풋 값 변경", async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByLabelText(/what needs to be done\?/i);
    await userEvent.type(input, "New Task");
    expect(input).toHaveValue("New Task");
  });

  it("인풋 공백 제거 및 버튼 클릭 시 인풋 클리어 확인", async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByLabelText(/what needs to be done\?/i);
    const addButton = screen.getByRole("button", { name: /add todo/i });

    expect(addButton).toBeDisabled();

    await userEvent.type(input, "  Important Task  ");
    expect(addButton).toBeEnabled();
    await userEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith("Important Task");
    expect(input).toHaveValue("");
    expect(addButton).toBeDisabled();
  });

  it("빈 값 버그 테스트", async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByLabelText(/what needs to be done\?/i);
    const addButton = screen.getByRole("button", { name: /add todo/i });

    expect(input).toHaveValue("");
    expect(addButton).toBeDisabled();
    expect(mockAddTodo).not.toHaveBeenCalled();

    await userEvent.type(input, "   ");
    expect(input).toHaveValue("   ");
    expect(addButton).toBeDisabled();
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
