import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem, Todo } from "./TodoItem";
import { fn } from "@storybook/test"; // Storybook v8+
// import { action } from '@storybook/addon-actions'; // Storybook v7

const meta: Meta<typeof TodoItem> = {
  title: "Components/TodoItem",
  component: TodoItem,
  tags: ["autodocs"], // 자동 문서 생성
  argTypes: {
    // Props 타입 및 컨트롤 정의 (선택 사항)
    todo: { control: "object" },
    onToggle: { action: "toggled" }, // Storybook UI에서 액션 로깅
    onDelete: { action: "deleted" },
  },
  // fn() 또는 action()을 사용하여 mock 함수 전달
  args: {
    // Storybook v8+ 스타일
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
};

export const Completed: Story = {
  args: {
    todo: {
      ...defaultTodo,
      completed: true,
    },
  },
};
