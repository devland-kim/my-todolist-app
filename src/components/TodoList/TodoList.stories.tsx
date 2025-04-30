import type { Meta, StoryObj } from "@storybook/react";
import { TodoList } from "./TodoList";
import { Todo } from "../TodoItem/TodoItem";
import { fn } from "@storybook/test";

const meta: Meta<typeof TodoList> = {
  title: "Components/TodoList",
  component: TodoList,
  tags: ["autodocs"],
  args: {
    onToggle: fn(),
    onDelete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TodoList>;

const sampleTodos: Todo[] = [
  { id: "1", text: "Learn SWR", completed: false },
  { id: "2", text: "Integrate Chromatic", completed: true },
  { id: "3", text: "Write Tests", completed: false },
];

export const Default: Story = {
  args: {
    todos: sampleTodos,
  },
};

export const Empty: Story = {
  args: {
    todos: [],
  },
};

export const Loading: Story = {
  // 로딩 상태 시뮬레이션 (추후 SWR과 연동)
  render: () => <p>Loading todos...</p>,
};
