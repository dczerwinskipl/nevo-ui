import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { Card } from "../primitives/Card";
import { Typography } from "../primitives/Typography";

const meta: Meta<typeof Pagination> = {
  title: "Data/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pagination component for navigating through large datasets. Displays page numbers and total item count.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    total: {
      control: "number",
      description: "Total number of items",
    },
    pageSize: {
      control: "number",
      description: "Number of items per page",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 100,
    pageSize: 20,
  },
};

export const SmallDataset: Story = {
  args: {
    total: 25,
    pageSize: 10,
  },
};

export const LargeDataset: Story = {
  args: {
    total: 500,
    pageSize: 25,
  },
};

export const FewPages: Story = {
  args: {
    total: 45,
    pageSize: 15,
  },
};

export const SinglePage: Story = {
  args: {
    total: 10,
    pageSize: 20,
  },
};

export const ManyPages: Story = {
  args: {
    total: 1000,
    pageSize: 10,
  },
};

export const DifferentPageSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography type="card-title" className="mb-4">
          10 items per page
        </Typography>
        <Pagination total={100} pageSize={10} />
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          25 items per page
        </Typography>
        <Pagination total={100} pageSize={25} />
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          50 items per page
        </Typography>
        <Pagination total={100} pageSize={50} />
      </div>
    </div>
  ),
};

export const VariousTotals: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography type="card-title" className="mb-4">
          25 total items
        </Typography>
        <Pagination total={25} pageSize={10} />
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          100 total items
        </Typography>
        <Pagination total={100} pageSize={10} />
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          500 total items
        </Typography>
        <Pagination total={500} pageSize={10} />
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          1000 total items
        </Typography>
        <Pagination total={1000} pageSize={10} />
      </div>
    </div>
  ),
};

export const InTable: Story = {
  render: () => (
    <Card className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">Item {i + 1}</td>
                <td className="p-2">Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination total={100} pageSize={10} />
    </Card>
  ),
};
