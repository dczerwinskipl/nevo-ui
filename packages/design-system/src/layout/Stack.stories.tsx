import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A vertical layout primitive that stacks children with consistent spacing.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
      description: "Direction to stack children",
    },
    gap: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: "Gap between children",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
      description: "Cross-axis alignment",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default vertical stack with medium gap (gap-4).
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <div className="h-12 bg-blue-500 rounded px-4 flex items-center text-white">
          Item 1
        </div>
        <div className="h-12 bg-blue-500 rounded px-4 flex items-center text-white">
          Item 2
        </div>
        <div className="h-12 bg-blue-500 rounded px-4 flex items-center text-white">
          Item 3
        </div>
      </>
    ),
  },
};

/**
 * Horizontal stack layout.
 */
export const Horizontal: Story = {
  args: {
    direction: "row",
    children: (
      <>
        <div className="h-12 w-32 bg-green-500 rounded px-4 flex items-center text-white">
          Item 1
        </div>
        <div className="h-12 w-32 bg-green-500 rounded px-4 flex items-center text-white">
          Item 2
        </div>
        <div className="h-12 w-32 bg-green-500 rounded px-4 flex items-center text-white">
          Item 3
        </div>
      </>
    ),
  },
};

/**
 * Stack with various gap sizes.
 */
export const GapVariations: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Stack gap={8}>
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 0</h3>
        <Stack gap={0}>
          <div className="h-8 bg-purple-500 rounded px-4 flex items-center text-white text-sm">
            Item 1
          </div>
          <div className="h-8 bg-purple-500 rounded px-4 flex items-center text-white text-sm">
            Item 2
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 2</h3>
        <Stack gap={2}>
          <div className="h-8 bg-purple-500 rounded px-4 flex items-center text-white text-sm">
            Item 1
          </div>
          <div className="h-8 bg-purple-500 rounded px-4 flex items-center text-white text-sm">
            Item 2
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 8</h3>
        <Stack gap={8}>
          <div className="h-8 bg-purple-500 rounded px-4 flex items-center text-white text-sm">
            Item 1
          </div>
          <div className="h-8 bg-purple-500 rounded px-4 flex items-center text-white text-sm">
            Item 2
          </div>
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * Stack with different alignment options.
 */
export const Alignment: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Stack gap={8}>
      <div>
        <h3 className="text-sm font-medium mb-2">Align Start (default)</h3>
        <Stack align="start">
          <div className="h-8 w-32 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Short
          </div>
          <div className="h-8 w-64 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Medium width
          </div>
          <div className="h-8 w-48 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Another width
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Align Center</h3>
        <Stack align="center">
          <div className="h-8 w-32 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Short
          </div>
          <div className="h-8 w-64 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Medium width
          </div>
          <div className="h-8 w-48 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Another width
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Align Stretch</h3>
        <Stack align="stretch">
          <div className="h-8 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Stretched item 1
          </div>
          <div className="h-8 bg-orange-500 rounded px-4 flex items-center text-white text-sm">
            Stretched item 2
          </div>
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * Nested stacks combining vertical and horizontal layouts.
 */
export const Nested: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Stack gap={6}>
      <div className="text-sm font-medium">Nested Stacks Example</div>
      <Stack gap={4}>
        <Stack direction="row" gap={4}>
          <div className="h-16 w-32 bg-indigo-500 rounded px-4 flex items-center text-white">
            A1
          </div>
          <div className="h-16 w-32 bg-indigo-500 rounded px-4 flex items-center text-white">
            A2
          </div>
        </Stack>
        <Stack direction="row" gap={4}>
          <div className="h-16 w-32 bg-pink-500 rounded px-4 flex items-center text-white">
            B1
          </div>
          <div className="h-16 w-32 bg-pink-500 rounded px-4 flex items-center text-white">
            B2
          </div>
          <div className="h-16 w-32 bg-pink-500 rounded px-4 flex items-center text-white">
            B3
          </div>
        </Stack>
      </Stack>
    </Stack>
  ),
};

/**
 * Stack with custom className for additional styling.
 */
export const CustomStyling: Story = {
  args: {
    className: "p-6 bg-gray-100 rounded-lg border border-gray-300",
    children: (
      <>
        <div className="h-12 bg-teal-500 rounded px-4 flex items-center text-white">
          Custom styled stack
        </div>
        <div className="h-12 bg-teal-500 rounded px-4 flex items-center text-white">
          With border and background
        </div>
      </>
    ),
  },
};
