import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { ComponentIntent, ComponentVariant } from "../theme";
import React from "react";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A small badge component used to highlight status, labels, or counts. Supports different intents and variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: [
        "primary",
        "success",
        "warning",
        "error",
        "info",
        "neutral",
      ] as ComponentIntent[],
      description: "The visual intent/purpose of the badge",
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "subtle"] as ComponentVariant[],
      description: "The visual style variant",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Badge",
    intent: "neutral",
    variant: "subtle",
  },
};

// All intents showcase
export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Badge intent="primary">Primary</Badge>
      <Badge intent="success">Success</Badge>
      <Badge intent="warning">Warning</Badge>
      <Badge intent="error">Error</Badge>
      <Badge intent="info">Info</Badge>
      <Badge intent="neutral">Neutral</Badge>
    </div>
  ),
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story: "Showcase of all available intent variants",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span className="text-sm" style={{ minWidth: "80px" }}>
          Solid:
        </span>
        <Badge variant="solid" intent="primary">
          Solid
        </Badge>
        <Badge variant="solid" intent="success">
          Solid
        </Badge>
        <Badge variant="solid" intent="error">
          Solid
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span className="text-sm" style={{ minWidth: "80px" }}>
          Outline:
        </span>
        <Badge variant="outline" intent="primary">
          Outline
        </Badge>
        <Badge variant="outline" intent="success">
          Outline
        </Badge>
        <Badge variant="outline" intent="error">
          Outline
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span className="text-sm" style={{ minWidth: "80px" }}>
          Ghost:
        </span>
        <Badge variant="ghost" intent="primary">
          Ghost
        </Badge>
        <Badge variant="ghost" intent="success">
          Ghost
        </Badge>
        <Badge variant="ghost" intent="error">
          Ghost
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span className="text-sm" style={{ minWidth: "80px" }}>
          Subtle:
        </span>
        <Badge variant="subtle" intent="primary">
          Subtle
        </Badge>
        <Badge variant="subtle" intent="success">
          Subtle
        </Badge>
        <Badge variant="subtle" intent="error">
          Subtle
        </Badge>
      </div>
    </div>
  ),
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available style variants",
      },
    },
  },
};

// Status badges
export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Badge intent="success" variant="subtle">
        Active
      </Badge>
      <Badge intent="warning" variant="subtle">
        Pending
      </Badge>
      <Badge intent="error" variant="subtle">
        Inactive
      </Badge>
      <Badge intent="info" variant="subtle">
        Draft
      </Badge>
      <Badge intent="neutral" variant="subtle">
        Archived
      </Badge>
    </div>
  ),
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story: "Common status badge examples",
      },
    },
  },
};

// Count badges
export const CountBadges: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span>Messages</span>
        <Badge intent="primary" variant="solid">
          5
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span>Notifications</span>
        <Badge intent="error" variant="solid">
          12
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span>Updates</span>
        <Badge intent="info" variant="solid">
          3
        </Badge>
      </div>
    </div>
  ),
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story: "Badges used as notification counts",
      },
    },
  },
};

// Category badges
export const CategoryBadges: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Badge intent="primary" variant="outline">
        Electronics
      </Badge>
      <Badge intent="success" variant="outline">
        New Arrival
      </Badge>
      <Badge intent="warning" variant="outline">
        Limited Stock
      </Badge>
      <Badge intent="error" variant="outline">
        Sale
      </Badge>
      <Badge intent="info" variant="outline">
        Featured
      </Badge>
    </div>
  ),
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story: "Badges used for categorization and tags",
      },
    },
  },
};

// Inline with text
export const InlineWithText: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <p>
        This product is{" "}
        <Badge intent="success" variant="subtle">
          In Stock
        </Badge>{" "}
        and has a{" "}
        <Badge intent="warning" variant="subtle">
          Limited Time Offer
        </Badge>
        . Order now to get{" "}
        <Badge intent="primary" variant="subtle">
          Free Shipping
        </Badge>
        !
      </p>
    </div>
  ),
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story: "Badges used inline with text content",
      },
    },
  },
};

// Different text lengths
export const DifferentLengths: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Badge>1</Badge>
      <Badge>New</Badge>
      <Badge>Badge</Badge>
      <Badge>Medium Length</Badge>
      <Badge>This is a longer badge text</Badge>
    </div>
  ),
  args: { children: "Badge" },
  parameters: {
    docs: {
      description: {
        story: "Badges with different text lengths",
      },
    },
  },
};
