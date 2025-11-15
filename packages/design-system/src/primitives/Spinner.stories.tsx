import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";
import { Card } from "./Card";
import { Typography } from "./Typography";

const meta = {
  title: "Primitives/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A loading spinner component with different sizes. Uses currentColor so it inherits text color from its parent.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the spinner",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Small spinner for inline loading states
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Default medium-sized spinner
 */
export const Medium: Story = {
  args: {
    size: "md",
  },
};

/**
 * Large spinner for prominent loading states
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * All sizes shown together
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <Typography type="label" className="text-xs">
          Small
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <Typography type="label" className="text-xs">
          Medium
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <Typography type="label" className="text-xs">
          Large
        </Typography>
      </div>
    </div>
  ),
};

/**
 * Spinner with custom colors (using className to set text color)
 */
export const WithColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-blue-600" />
        <Typography type="label" className="text-xs">
          Blue
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-green-600" />
        <Typography type="label" className="text-xs">
          Green
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-red-600" />
        <Typography type="label" className="text-xs">
          Red
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" className="text-yellow-600" />
        <Typography type="label" className="text-xs">
          Yellow
        </Typography>
      </div>
    </div>
  ),
};

/**
 * Spinner in a loading card
 */
export const InCard: Story = {
  render: () => (
    <Card>
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <Spinner size="lg" />
        <Typography type="body" className="text-muted">
          Loading data...
        </Typography>
      </div>
    </Card>
  ),
};

/**
 * Inline spinner with text
 */
export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="sm" />
      <Typography type="body">Loading content...</Typography>
    </div>
  ),
};
