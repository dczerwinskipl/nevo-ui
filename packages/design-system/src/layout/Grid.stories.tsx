import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A grid layout primitive that provides control over CSS Grid properties.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6, 12, "auto"],
      description: "Number of grid columns",
    },
    gap: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: "Gap between grid items",
    },
    rows: {
      control: "select",
      options: [undefined, 1, 2, 3, 4, "auto"],
      description: "Number of grid rows",
    },
    alignItems: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
      description: "Vertical alignment of items",
    },
    justifyItems: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
      description: "Horizontal alignment of items",
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default single column grid.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <div className="h-16 bg-blue-500 rounded px-4 flex items-center text-white">
          Item 1
        </div>
        <div className="h-16 bg-blue-500 rounded px-4 flex items-center text-white">
          Item 2
        </div>
        <div className="h-16 bg-blue-500 rounded px-4 flex items-center text-white">
          Item 3
        </div>
      </>
    ),
  },
};

/**
 * Two column grid layout.
 */
export const TwoColumns: Story = {
  args: {
    cols: 2,
    children: (
      <>
        <div className="h-16 bg-green-500 rounded px-4 flex items-center text-white">
          Item 1
        </div>
        <div className="h-16 bg-green-500 rounded px-4 flex items-center text-white">
          Item 2
        </div>
        <div className="h-16 bg-green-500 rounded px-4 flex items-center text-white">
          Item 3
        </div>
        <div className="h-16 bg-green-500 rounded px-4 flex items-center text-white">
          Item 4
        </div>
      </>
    ),
  },
};

/**
 * Three column grid layout.
 */
export const ThreeColumns: Story = {
  args: {
    cols: 3,
    children: (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="h-16 bg-purple-500 rounded px-4 flex items-center justify-center text-white"
          >
            Item {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

/**
 * Grid with various column counts.
 */
export const ColumnVariations: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">4 Columns</h3>
        <Grid cols={4} gap={4}>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="h-16 bg-orange-500 rounded px-4 flex items-center justify-center text-white"
            >
              {i + 1}
            </div>
          ))}
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">6 Columns</h3>
        <Grid cols={6} gap={4}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="h-16 bg-teal-500 rounded px-4 flex items-center justify-center text-white"
            >
              {i + 1}
            </div>
          ))}
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">
          12 Columns (like Bootstrap)
        </h3>
        <Grid cols={12} gap={2}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="h-12 bg-indigo-500 rounded px-2 flex items-center justify-center text-white text-xs"
            >
              {i + 1}
            </div>
          ))}
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Grid with different gap sizes.
 */
export const GapVariations: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 0</h3>
        <Grid cols={3} gap={0}>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-16 bg-pink-500 flex items-center justify-center text-white"
            >
              {i + 1}
            </div>
          ))}
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 2</h3>
        <Grid cols={3} gap={2}>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-16 bg-pink-500 rounded flex items-center justify-center text-white"
            >
              {i + 1}
            </div>
          ))}
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Gap 8</h3>
        <Grid cols={3} gap={8}>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-16 bg-pink-500 rounded flex items-center justify-center text-white"
            >
              {i + 1}
            </div>
          ))}
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Grid with explicit rows.
 */
export const WithRows: Story = {
  args: {
    cols: 3,
    rows: 2,
    gap: 4,
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="h-16 bg-cyan-500 rounded px-4 flex items-center justify-center text-white"
          >
            Item {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

/**
 * Grid with item alignment options.
 */
export const Alignment: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Align Items Start</h3>
        <Grid
          cols={3}
          gap={4}
          alignItems="start"
          className="h-32 border border-gray-300 p-4 rounded"
        >
          <div className="h-12 bg-lime-500 rounded px-4 flex items-center text-white">
            1
          </div>
          <div className="h-16 bg-lime-500 rounded px-4 flex items-center text-white">
            2
          </div>
          <div className="h-20 bg-lime-500 rounded px-4 flex items-center text-white">
            3
          </div>
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Align Items Center</h3>
        <Grid
          cols={3}
          gap={4}
          alignItems="center"
          className="h-32 border border-gray-300 p-4 rounded"
        >
          <div className="h-12 bg-lime-500 rounded px-4 flex items-center text-white">
            1
          </div>
          <div className="h-16 bg-lime-500 rounded px-4 flex items-center text-white">
            2
          </div>
          <div className="h-20 bg-lime-500 rounded px-4 flex items-center text-white">
            3
          </div>
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Justify Items Center</h3>
        <Grid cols={3} gap={4} justifyItems="center">
          <div className="h-12 w-16 bg-amber-500 rounded flex items-center justify-center text-white">
            1
          </div>
          <div className="h-12 w-20 bg-amber-500 rounded flex items-center justify-center text-white">
            2
          </div>
          <div className="h-12 w-24 bg-amber-500 rounded flex items-center justify-center text-white">
            3
          </div>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Responsive card grid layout.
 */
export const CardGrid: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Grid cols={3} gap={6}>
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded mb-3" />
          <h3 className="font-semibold mb-2">Card {i + 1}</h3>
          <p className="text-sm text-gray-600">
            This is a sample card in a grid layout.
          </p>
        </div>
      ))}
    </Grid>
  ),
};

/**
 * Dashboard-style layout with mixed column spans.
 */
export const DashboardLayout: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Grid cols={12} gap={4}>
      <div className="col-span-12 h-20 bg-blue-600 rounded px-6 flex items-center text-white text-lg font-semibold">
        Header (Full Width)
      </div>
      <div className="col-span-3 h-64 bg-gray-200 rounded p-4">
        <div className="font-medium mb-2">Sidebar</div>
        <div className="text-sm text-gray-600">3 columns wide</div>
      </div>
      <div className="col-span-9 space-y-4">
        <Grid cols={3} gap={4}>
          <div className="h-32 bg-green-500 rounded p-4 text-white">Stat 1</div>
          <div className="h-32 bg-green-500 rounded p-4 text-white">Stat 2</div>
          <div className="h-32 bg-green-500 rounded p-4 text-white">Stat 3</div>
        </Grid>
        <div className="h-32 bg-purple-500 rounded p-4 text-white">
          Main Content (9 columns wide)
        </div>
      </div>
    </Grid>
  ),
};
