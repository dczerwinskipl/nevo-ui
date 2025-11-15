import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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
          "Pagination component for navigating through large datasets. Supports two modes: page-based (with total count) and cursor-style (with hasNext only).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
      description: "Current active page (1-indexed)",
    },
    mode: {
      control: "radio",
      options: ["pages", "cursor"],
      description: "Pagination mode",
    },
    totalPages: {
      control: "number",
      description: "Total number of pages (required for pages mode)",
    },
    hasNext: {
      control: "boolean",
      description: "Whether there is a next page (required for cursor mode)",
    },
    totalItems: {
      control: "number",
      description: "Total number of items (for displaying range text)",
    },
    pageSize: {
      control: "number",
      description: "Number of items per page",
    },
    disabled: {
      control: "boolean",
      description: "Whether pagination is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Helper component for interactive stories
const InteractivePaginationPages = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-4">
      <Typography type="body">Current page: {currentPage}</Typography>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        mode="pages"
        totalPages={10}
        totalItems={100}
        pageSize={10}
      />
    </div>
  );
};

const InteractivePaginationCursor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // Simulate hasNext - let's say we have 5 pages
  const hasNext = currentPage < 5;

  return (
    <div className="space-y-4">
      <Typography type="body">Current page: {currentPage}</Typography>
      <Typography type="caption" className="text-muted">
        Has next: {hasNext ? "Yes" : "No"}
      </Typography>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        mode="cursor"
        hasNext={hasNext}
      />
    </div>
  );
};

export const PagesModeDefault: Story = {
  render: () => <InteractivePaginationPages />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive pagination in pages mode. Shows page numbers and allows direct navigation.",
      },
    },
  },
};

export const CursorModeDefault: Story = {
  render: () => <InteractivePaginationCursor />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive pagination in cursor mode. Shows only previous/next buttons, useful when total count is expensive to calculate.",
      },
    },
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    onPageChange: () => {},
    mode: "pages",
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination on the first page - previous button is disabled.",
      },
    },
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    onPageChange: () => {},
    mode: "pages",
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination in the middle - both prev and next enabled.",
      },
    },
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    onPageChange: () => {},
    mode: "pages",
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination on the last page - next button is disabled.",
      },
    },
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    onPageChange: () => {},
    mode: "pages",
    totalPages: 50,
    totalItems: 500,
    pageSize: 10,
    maxPageButtons: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pagination with many pages. Only 5 page buttons shown at once, centered around current page.",
      },
    },
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    onPageChange: () => {},
    mode: "pages",
    totalPages: 3,
    totalItems: 30,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination with only a few pages.",
      },
    },
  },
};

export const CursorWithNext: Story = {
  args: {
    currentPage: 3,
    onPageChange: () => {},
    mode: "cursor",
    hasNext: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Cursor mode with next page available.",
      },
    },
  },
};

export const CursorLastPage: Story = {
  args: {
    currentPage: 5,
    onPageChange: () => {},
    mode: "cursor",
    hasNext: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Cursor mode on last page - next button disabled.",
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    currentPage: 3,
    onPageChange: () => {},
    mode: "pages",
    totalPages: 10,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination in disabled state (e.g., during loading).",
      },
    },
  },
};

export const CustomText: Story = {
  args: {
    currentPage: 2,
    onPageChange: () => {},
    mode: "pages",
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    totalText: "Displaying",
    previousLabel: "Previous page",
    nextLabel: "Next page",
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination with custom text labels.",
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <Card className="p-4">
      <div className="space-y-4">
        <Typography type="card-title">Sample Data Table</Typography>
        <div className="border-t border-border pt-4">
          {/* Simulated table content */}
          <div className="space-y-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="p-2 border-b border-border last:border-0">
                <Typography type="body">Item {i + 11}</Typography>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          currentPage={2}
          onPageChange={() => {}}
          mode="pages"
          totalPages={15}
          totalItems={150}
          pageSize={10}
        />
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pagination used within a Card component below table data.",
      },
    },
  },
};

export const DifferentPageSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography type="card-title" className="mb-4">
          10 items per page
        </Typography>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          mode="pages"
          totalPages={10}
          totalItems={100}
          pageSize={10}
        />
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          20 items per page
        </Typography>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          mode="pages"
          totalPages={5}
          totalItems={100}
          pageSize={20}
        />
      </div>
      <div>
        <Typography type="card-title" className="mb-4">
          50 items per page
        </Typography>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          mode="pages"
          totalPages={2}
          totalItems={100}
          pageSize={50}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pagination with different page sizes showing range text.",
      },
    },
  },
};
