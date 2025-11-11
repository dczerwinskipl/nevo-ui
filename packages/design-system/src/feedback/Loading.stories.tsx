import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";
import { Card } from "../primitives/Card";
import { Typography } from "../primitives/Typography";

const meta: Meta<typeof Loading> = {
  title: "Feedback/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Loading component displays loading states with different variants (spinner, dots, pulse) and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the loading indicator",
    },
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse"],
      description: "Visual variant of the loading indicator",
    },
    text: {
      control: "text",
      description: "Optional loading text to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    variant: "spinner",
    size: "md",
  },
};

export const WithText: Story = {
  args: {
    variant: "spinner",
    size: "md",
    text: "Loading...",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loading size="sm" />
        <Typography type="caption" intent="neutral">
          Small
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="md" />
        <Typography type="caption" intent="neutral">
          Medium
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="lg" />
        <Typography type="caption" intent="neutral">
          Large
        </Typography>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loading variant="spinner" size="md" />
        <Typography type="caption" intent="neutral">
          Spinner
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="dots" size="md" />
        <Typography type="caption" intent="neutral">
          Dots
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="pulse" size="md" />
        <Typography type="caption" intent="neutral">
          Pulse
        </Typography>
      </div>
    </div>
  ),
};

export const SpinnerSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loading variant="spinner" size="sm" text="Small" />
      <Loading variant="spinner" size="md" text="Medium" />
      <Loading variant="spinner" size="lg" text="Large" />
    </div>
  ),
};

export const DotsSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loading variant="dots" size="sm" text="Small" />
      <Loading variant="dots" size="md" text="Medium" />
      <Loading variant="dots" size="lg" text="Large" />
    </div>
  ),
};

export const PulseSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loading variant="pulse" size="sm" text="Small" />
      <Loading variant="pulse" size="md" text="Medium" />
      <Loading variant="pulse" size="lg" text="Large" />
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    variant: "spinner",
    size: "lg",
    text: "Loading your data, please wait...",
  },
};

export const InCard: Story = {
  render: () => (
    <Card className="p-8" style={{ minHeight: "200px" }}>
      <div className="flex items-center justify-center h-full">
        <Loading variant="spinner" size="lg" text="Loading content..." />
      </div>
    </Card>
  ),
};

export const FullPageLoading: Story = {
  render: () => (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      style={{ minHeight: "400px" }}
    >
      <Card className="p-8">
        <Loading variant="spinner" size="lg" text="Loading application..." />
      </Card>
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography type="card-title" className="mb-4">
          Spinner Variants
        </Typography>
        <div className="flex gap-8">
          <Loading variant="spinner" size="sm" text="Small" />
          <Loading variant="spinner" size="md" text="Medium" />
          <Loading variant="spinner" size="lg" text="Large" />
        </div>
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          Dots Variants
        </Typography>
        <div className="flex gap-8">
          <Loading variant="dots" size="sm" text="Small" />
          <Loading variant="dots" size="md" text="Medium" />
          <Loading variant="dots" size="lg" text="Large" />
        </div>
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          Pulse Variants
        </Typography>
        <div className="flex gap-8">
          <Loading variant="pulse" size="sm" text="Small" />
          <Loading variant="pulse" size="md" text="Medium" />
          <Loading variant="pulse" size="lg" text="Large" />
        </div>
      </div>
    </div>
  ),
};
