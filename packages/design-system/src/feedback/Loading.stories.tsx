import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";

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
        <span className="text-sm text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="md" />
        <span className="text-sm text-gray-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="lg" />
        <span className="text-sm text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loading variant="spinner" size="md" />
        <span className="text-sm text-gray-500">Spinner</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="dots" size="md" />
        <span className="text-sm text-gray-500">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="pulse" size="md" />
        <span className="text-sm text-gray-500">Pulse</span>
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
    <div
      className="p-8 rounded-lg border"
      style={{
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading variant="spinner" size="lg" text="Loading content..." />
    </div>
  ),
};

export const FullPageLoading: Story = {
  render: () => (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      style={{ minHeight: "400px" }}
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <Loading variant="spinner" size="lg" text="Loading application..." />
      </div>
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Spinner Variants</h3>
        <div className="flex gap-8">
          <Loading variant="spinner" size="sm" text="Small" />
          <Loading variant="spinner" size="md" text="Medium" />
          <Loading variant="spinner" size="lg" text="Large" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Dots Variants</h3>
        <div className="flex gap-8">
          <Loading variant="dots" size="sm" text="Small" />
          <Loading variant="dots" size="md" text="Medium" />
          <Loading variant="dots" size="lg" text="Large" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Pulse Variants</h3>
        <div className="flex gap-8">
          <Loading variant="pulse" size="sm" text="Small" />
          <Loading variant="pulse" size="md" text="Medium" />
          <Loading variant="pulse" size="lg" text="Large" />
        </div>
      </div>
    </div>
  ),
};
