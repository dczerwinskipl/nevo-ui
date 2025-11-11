import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Typography } from "./Typography";
import React from "react";

const meta = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile card component that provides a consistent container with shadow, rounded corners, and proper theme support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: <div>Card content goes here</div>,
  },
};

// With text content
export const WithText: Story = {
  args: {
    children: (
      <div>
        <Typography type="card-title" className="mb-2">
          Card Title
        </Typography>
        <Typography type="body" intent="neutral">
          This is a simple card with some text content. Cards are useful for
          grouping related information.
        </Typography>
      </div>
    ),
  },
};

// With structured content
export const WithStructuredContent: Story = {
  render: () => (
    <Card style={{ minWidth: "300px" }}>
      <div className="flex flex-col gap-4">
        <div
          className="border-b pb-3"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Typography type="section-title" className="mb-1">
            Product Name
          </Typography>
          <Typography type="caption" intent="neutral">
            SKU: ABC-12345
          </Typography>
        </div>
        <div>
          <Typography type="body" className="mb-2">
            <strong>Description:</strong> This is a detailed product description
            that provides more information about the item.
          </Typography>
          <Typography type="body">
            <strong>Price:</strong> $99.99
          </Typography>
        </div>
      </div>
    </Card>
  ),
  args: {},
};

// Multiple cards
export const MultipleCards: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        maxWidth: "800px",
      }}
    >
      <Card style={{ flex: "1 1 200px" }}>
        <Typography type="card-title" className="mb-2">
          Card 1
        </Typography>
        <Typography type="body" intent="neutral">
          First card content
        </Typography>
      </Card>
      <Card style={{ flex: "1 1 200px" }}>
        <Typography type="card-title" className="mb-2">
          Card 2
        </Typography>
        <Typography type="body" intent="neutral">
          Second card content
        </Typography>
      </Card>
      <Card style={{ flex: "1 1 200px" }}>
        <Typography type="card-title" className="mb-2">
          Card 3
        </Typography>
        <Typography type="body" intent="neutral">
          Third card content
        </Typography>
      </Card>
    </div>
  ),
  args: {},
};

// With custom styling
export const CustomStyling: Story = {
  args: {
    className: "border-2 border-blue-500",
    children: (
      <div>
        <Typography type="card-title" className="mb-2">
          Styled Card
        </Typography>
        <Typography type="body" intent="neutral">
          This card has custom border styling applied
        </Typography>
      </div>
    ),
  },
};

// Interactive card
export const Interactive: Story = {
  render: function InteractiveCard() {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <Card
        style={{
          minWidth: "300px",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
        onClick={() => alert("Card clicked!")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Typography type="card-title" className="mb-2">
          Interactive Card
        </Typography>
        <Typography type="body" intent="neutral">
          Hover over me and click!
        </Typography>
      </Card>
    );
  },
  args: {},
};

// Card with image
export const WithImage: Story = {
  render: () => (
    <Card style={{ maxWidth: "300px" }}>
      <div className="flex flex-col gap-3">
        <div
          className="w-full h-40 rounded-lg flex items-center justify-center text-sm opacity-60"
          style={{ backgroundColor: "var(--color-surface-variant)" }}
        >
          Image Placeholder
        </div>
        <div>
          <Typography type="card-title" className="mb-1">
            Image Card
          </Typography>
          <Typography type="body" intent="neutral">
            Card with an image placeholder
          </Typography>
        </div>
      </div>
    </Card>
  ),
  args: {},
};

// Card grid layout
export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
        maxWidth: "800px",
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <Card key={num}>
          <Typography type="card-title" className="mb-2">
            Card {num}
          </Typography>
          <Typography type="body" intent="neutral">
            Content for card number {num}
          </Typography>
        </Card>
      ))}
    </div>
  ),
  args: {},
};
