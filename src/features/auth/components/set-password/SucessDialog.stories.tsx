import type { Meta, StoryObj } from "@storybook/react";
import SuccessDialog from "./SuccessDialog";
const meta = {
  title: "Components/SuccessDialog",
  component: SuccessDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof SuccessDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
};
