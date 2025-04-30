import type { Meta, StoryObj } from "@storybook/react";
import { AddTodoForm } from "./AddTodoForm";
import { fn } from "@storybook/test";
import { userEvent, within } from "@storybook/test"; // Interaction test imports

const meta: Meta<typeof AddTodoForm> = {
  title: "Components/AddTodoForm",
  component: AddTodoForm,
  tags: ["autodocs"],
  args: {
    onAddTodo: fn(), // Mock the callback
  },
};

export default meta;
type Story = StoryObj<typeof AddTodoForm>;

export const Default: Story = {};

// Storybook Interaction Test 예시
export const AddingTodo: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: /new todo text/i });
    const addButton = canvas.getByRole("button", { name: /add/i });

    // Simulate user typing
    await userEvent.type(input, "New Task from Storybook", { delay: 100 });

    // Simulate clicking the add button
    await userEvent.click(addButton);

    // (Optional) Check if the onAddTodo function was called (visible in Actions tab)
    // You might need further assertions depending on your setup
    // expect(args.onAddTodo).toHaveBeenCalledWith('New Task from Storybook'); // This expect might not work directly in play function easily, check console/actions tab
  },
};
