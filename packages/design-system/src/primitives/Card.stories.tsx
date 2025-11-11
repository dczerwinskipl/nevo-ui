import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
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
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-sm opacity-80">
          This is a simple card with some text content. Cards are useful for
          grouping related information.
        </p>
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
          <h2 className="text-xl font-bold">Product Name</h2>
          <p className="text-sm opacity-60">SKU: ABC-12345</p>
        </div>
        <div>
          <p className="text-sm mb-2">
            <strong>Description:</strong> This is a detailed product description
            that provides more information about the item.
          </p>
          <p className="text-sm">
            <strong>Price:</strong> $99.99
          </p>
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
        <h3 className="font-semibold mb-2">Card 1</h3>
        <p className="text-sm opacity-80">First card content</p>
      </Card>
      <Card style={{ flex: "1 1 200px" }}>
        <h3 className="font-semibold mb-2">Card 2</h3>
        <p className="text-sm opacity-80">Second card content</p>
      </Card>
      <Card style={{ flex: "1 1 200px" }}>
        <h3 className="font-semibold mb-2">Card 3</h3>
        <p className="text-sm opacity-80">Third card content</p>
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
        <h3 className="text-lg font-semibold mb-2">Styled Card</h3>
        <p className="text-sm opacity-80">
          This card has custom border styling applied
        </p>
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
        <h3 className="font-semibold mb-2">Interactive Card</h3>
        <p className="text-sm opacity-80">Hover over me and click!</p>
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
          <h3 className="font-semibold mb-1">Image Card</h3>
          <p className="text-sm opacity-80">Card with an image placeholder</p>
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
          <h3 className="font-semibold mb-2">Card {num}</h3>
          <p className="text-sm opacity-80">Content for card number {num}</p>
        </Card>
      ))}
    </div>
  ),
  args: {},
};
