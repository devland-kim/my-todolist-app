import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem, Todo } from "./TodoItem";
import { expect, fn, userEvent } from "@storybook/test"; // Storybook v8+ mock function
import { within } from "@testing-library/react";

const meta: Meta<typeof TodoItem> = {
  title: "Components/TodoItem",
  component: TodoItem,
  tags: ["autodocs"],
  argTypes: {
    todo: { control: "object" },
    onToggle: { action: "toggled" },
    onDelete: { action: "deleted" },
  },
  args: {
    onToggle: fn(),
    onDelete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TodoItem>;

const defaultTodo: Todo = {
  id: "1",
  text: "Learn Storybook",
  completed: false,
};

export const Default: Story = {
  args: {
    todo: defaultTodo,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByRole("checkbox", { name: /Learn Storybook/i });
    await userEvent.click(checkbox);

    await expect(args.onToggle).toHaveBeenCalledTimes(1);
    await expect(args.onToggle).toHaveBeenCalledWith(defaultTodo.id);
  },
};

export const Completed: Story = {
  args: {
    todo: {
      ...defaultTodo,
      id: "2",
      text: "Write Interaction Tests",
      completed: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByRole("checkbox", {
      name: /Write Interaction Tests/i,
    });

    await expect(checkbox).toBeChecked();
  },
};
