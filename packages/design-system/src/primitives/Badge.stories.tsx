import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { ComponentIntent, ComponentVariant } from "../theme";
import { Flex } from "../layout/Flex";
import { Stack } from "../layout/Stack";
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
    dot: {
      control: "boolean",
      description: "Display a dot indicator before the text",
    },
    icon: {
      control: false,
      description: "Optional icon to display before the text",
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
    <Flex wrap gap={2}>
      <Badge intent="primary">Primary</Badge>
      <Badge intent="success">Success</Badge>
      <Badge intent="warning">Warning</Badge>
      <Badge intent="error">Error</Badge>
      <Badge intent="info">Info</Badge>
      <Badge intent="neutral">Neutral</Badge>
    </Flex>
  ),
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
    <Stack gap={4}>
      <Flex gap={2} align="center">
        <span className="text-sm min-w-[80px]">Solid:</span>
        <Badge variant="solid" intent="primary">
          Solid
        </Badge>
        <Badge variant="solid" intent="success">
          Solid
        </Badge>
        <Badge variant="solid" intent="error">
          Solid
        </Badge>
      </Flex>
      <Flex gap={2} align="center">
        <span className="text-sm min-w-[80px]">Outline:</span>
        <Badge variant="outline" intent="primary">
          Outline
        </Badge>
        <Badge variant="outline" intent="success">
          Outline
        </Badge>
        <Badge variant="outline" intent="error">
          Outline
        </Badge>
      </Flex>
      <Flex gap={2} align="center">
        <span className="text-sm min-w-[80px]">Ghost:</span>
        <Badge variant="ghost" intent="primary">
          Ghost
        </Badge>
        <Badge variant="ghost" intent="success">
          Ghost
        </Badge>
        <Badge variant="ghost" intent="error">
          Ghost
        </Badge>
      </Flex>
      <Flex gap={2} align="center">
        <span className="text-sm min-w-[80px]">Subtle:</span>
        <Badge variant="subtle" intent="primary">
          Subtle
        </Badge>
        <Badge variant="subtle" intent="success">
          Subtle
        </Badge>
        <Badge variant="subtle" intent="error">
          Subtle
        </Badge>
      </Flex>
    </Stack>
  ),
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
    <Flex wrap gap={2}>
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
    </Flex>
  ),
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
    <Flex wrap gap={4} align="center">
      <Flex gap={2} align="center">
        <span>Messages</span>
        <Badge intent="primary" variant="solid">
          5
        </Badge>
      </Flex>
      <Flex gap={2} align="center">
        <span>Notifications</span>
        <Badge intent="error" variant="solid">
          12
        </Badge>
      </Flex>
      <Flex gap={2} align="center">
        <span>Updates</span>
        <Badge intent="info" variant="solid">
          3
        </Badge>
      </Flex>
    </Flex>
  ),
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
    <Flex wrap gap={2}>
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
    </Flex>
  ),
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
    <div className="max-w-md">
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
    <Flex wrap gap={2}>
      <Badge>1</Badge>
      <Badge>New</Badge>
      <Badge>Badge</Badge>
      <Badge>Medium Length</Badge>
      <Badge>This is a longer badge text</Badge>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with different text lengths",
      },
    },
  },
};

// Badges with dots
export const WithDots: Story = {
  render: () => (
    <Flex wrap gap={2}>
      <Badge intent="success" dot>
        Online
      </Badge>
      <Badge intent="error" dot>
        Offline
      </Badge>
      <Badge intent="warning" dot>
        Away
      </Badge>
      <Badge intent="info" dot>
        Busy
      </Badge>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with dot indicators for status",
      },
    },
  },
};

// Badges with icons
export const WithIcons: Story = {
  render: () => (
    <Flex wrap gap={2}>
      <Badge intent="success" icon={<span>✓</span>}>
        Verified
      </Badge>
      <Badge intent="primary" icon={<span>⭐</span>}>
        Featured
      </Badge>
      <Badge intent="warning" icon={<span>⚠</span>}>
        Warning
      </Badge>
      <Badge intent="error" icon={<span>✕</span>}>
        Error
      </Badge>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with icon indicators",
      },
    },
  },
};
