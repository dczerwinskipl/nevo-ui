import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";

const meta = {
  title: "Layout/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible layout primitive that provides control over flexbox properties.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Flex direction",
    },
    gap: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: "Gap between items",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
      description: "Cross-axis alignment (align-items)",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
      description: "Main-axis alignment (justify-content)",
    },
    wrap: {
      control: "select",
      options: [false, true, "reverse"],
      description: "Flex wrap behavior",
    },
    grow: {
      control: "boolean",
      description: "Whether container should grow",
    },
    shrink: {
      control: "boolean",
      description: "Whether container should not shrink",
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default flex layout in row direction.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <div className="h-16 w-32 bg-blue-500 rounded px-4 flex items-center justify-center text-white">
          Item 1
        </div>
        <div className="h-16 w-32 bg-blue-500 rounded px-4 flex items-center justify-center text-white">
          Item 2
        </div>
        <div className="h-16 w-32 bg-blue-500 rounded px-4 flex items-center justify-center text-white">
          Item 3
        </div>
      </>
    ),
  },
};

/**
 * Column direction layout.
 */
export const Column: Story = {
  args: {
    direction: "column",
    children: (
      <>
        <div className="h-12 bg-green-500 rounded px-4 flex items-center text-white">
          Item 1
        </div>
        <div className="h-12 bg-green-500 rounded px-4 flex items-center text-white">
          Item 2
        </div>
        <div className="h-12 bg-green-500 rounded px-4 flex items-center text-white">
          Item 3
        </div>
      </>
    ),
  },
};

/**
 * Flex with justify-content variations.
 */
export const JustifyContent: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Justify Start (default)</h3>
        <Flex justify="start" className="border border-gray-300 p-4 rounded">
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Justify Center</h3>
        <Flex justify="center" className="border border-gray-300 p-4 rounded">
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Justify Between</h3>
        <Flex justify="between" className="border border-gray-300 p-4 rounded">
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-12 w-24 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Flex with align-items variations.
 */
export const AlignItems: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Align Start</h3>
        <Flex align="start" className="h-32 border border-gray-300 p-4 rounded">
          <div className="h-12 w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-16 w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-20 w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Align Center</h3>
        <Flex
          align="center"
          className="h-32 border border-gray-300 p-4 rounded"
        >
          <div className="h-12 w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-16 w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-20 w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Align Stretch</h3>
        <Flex
          align="stretch"
          className="h-32 border border-gray-300 p-4 rounded"
        >
          <div className="w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="w-24 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Flex with wrapping enabled.
 */
export const Wrapping: Story = {
  args: {
    wrap: true,
    className: "border border-gray-300 p-4 rounded",
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="h-12 w-24 bg-teal-500 rounded flex items-center justify-center text-white text-sm"
          >
            {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

/**
 * Responsive layout with gap variations.
 */
export const GapVariations: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 0</h3>
        <Flex gap={0}>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 4 (default)</h3>
        <Flex gap={4}>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 8</h3>
        <Flex gap={8}>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            1
          </div>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            2
          </div>
          <div className="h-12 w-24 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
            3
          </div>
        </Flex>
      </div>
    </div>
  ),
};

/**
 * Complex layout combining multiple properties.
 */
export const ComplexLayout: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Flex
      direction="column"
      gap={4}
      className="border border-gray-300 p-6 rounded-lg bg-gray-50"
    >
      <h3 className="text-lg font-semibold">Dashboard Header</h3>
      <Flex
        justify="between"
        align="center"
        className="bg-white p-4 rounded border border-gray-200"
      >
        <div className="font-medium">Title</div>
        <Flex gap={2}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Action 1
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Action 2
          </button>
        </Flex>
      </Flex>
      <Flex gap={4} wrap>
        <div className="h-32 w-48 bg-pink-500 rounded p-4 text-white">
          Card 1
        </div>
        <div className="h-32 w-48 bg-pink-500 rounded p-4 text-white">
          Card 2
        </div>
        <div className="h-32 w-48 bg-pink-500 rounded p-4 text-white">
          Card 3
        </div>
      </Flex>
    </Flex>
  ),
};
