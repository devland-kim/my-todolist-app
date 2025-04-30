import type { Meta, StoryObj } from "@storybook/react";
import { AddTodoForm } from "./AddTodoForm";
import { expect, fn } from "@storybook/test";
import { userEvent, within } from "@storybook/test"; // Interaction test imports

const meta: Meta<typeof AddTodoForm> = {
  title: "Components/AddTodoForm",
  component: AddTodoForm,
  tags: ["autodocs"],
  args: {
    onAddTodo: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof AddTodoForm>;

export const Default: Story = {};

export const AddingTodo: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText(/what needs to be done\?/i);
    const addButton = canvas.getByRole("button", { name: /add todo/i });

    const taskText = "New Task from Storybook";
    await userEvent.type(input, taskText, { delay: 50 });

    await expect(input).toHaveValue(taskText);

    await userEvent.click(addButton);

    await expect(input).toHaveValue("");

    await expect(args.onAddTodo).toHaveBeenCalledTimes(1);
    await expect(args.onAddTodo).toHaveBeenCalledWith(taskText);
  },
};
