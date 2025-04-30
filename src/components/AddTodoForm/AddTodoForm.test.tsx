import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // More realistic user events
import { describe, it, expect, vi } from "vitest";
import { AddTodoForm } from "./AddTodoForm";

describe("AddTodoForm", () => {
  const mockAddTodo = vi.fn();

  it("renders input field and add button", () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("updates input value on change", async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    await userEvent.type(input, "New Task");
    expect(input).toHaveValue("New Task");
  });

  it("calls onAddTodo with trimmed text and clears input on submit", async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "  Important Task  ");
    await userEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith("Important Task");
    expect(input).toHaveValue(""); // Input should be cleared
  });

  it("does not call onAddTodo if input is empty or only whitespace", async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add/i });

    // Test empty input
    await userEvent.click(addButton);
    expect(mockAddTodo).not.toHaveBeenCalled();

    // Test whitespace input
    await userEvent.type(input, "   ");
    await userEvent.click(addButton);
    expect(mockAddTodo).not.toHaveBeenCalled();
    expect(input).toHaveValue("   "); // Input should retain whitespace if not submitted
  });
});
