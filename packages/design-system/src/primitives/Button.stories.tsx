import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ComponentIntent, ComponentVariant, ComponentSize } from "../theme";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with support for different intents, variants, sizes, and states.",
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
      description: "The visual intent/purpose of the button",
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "subtle"] as ComponentVariant[],
      description: "The visual style variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"] as ComponentSize[],
      description: "The size of the button (affects padding and font size)",
    },
    loading: {
      control: "boolean",
      description: "Whether the button is in a loading state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Primary: Story = {
  args: {
    children: "Click me",
    intent: "primary",
    variant: "solid",
    size: "md",
  },
};

// All intents showcase
export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <Button intent="primary">Primary</Button>
      <Button intent="success">Success</Button>
      <Button intent="warning">Warning</Button>
      <Button intent="error">Error</Button>
      <Button intent="info">Info</Button>
      <Button intent="neutral">Neutral</Button>
    </div>
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all available style variants",
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all available sizes with minimum touch targets for accessibility",
      },
    },
  },
};

// States showcase
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button loading disabled>
        Loading & Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button states including loading and disabled",
      },
    },
  },
};

// Interactive example with all controls
export const Interactive: Story = {
  args: {
    children: "Interactive Button",
    intent: "primary",
    variant: "solid",
    size: "md",
    loading: false,
    disabled: false,
  },
};

// Accessibility test cases
export const AccessibilityTest: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button aria-label="Save document">Save</Button>
      <Button
        disabled
        aria-label="Delete (disabled)"
        title="You don't have permission to delete"
      >
        Delete
      </Button>
      <Button size="xs">Touch Target Test (min 44px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility test scenarios - check the a11y panel for results",
      },
    },
    a11y: {
      config: {
        // Enable all rules for this story
        rules: [],
      },
    },
  },
};

// Long text handling
export const LongText: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "300px",
      }}
    >
      <Button>Short</Button>
      <Button>This is a medium length button text</Button>
      <Button>
        This is a very long button text that might wrap or overflow
      </Button>
    </div>
  ),
};

// Icon buttons (if icons are added later)
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <Button>
        <span>📧</span> Send Email
      </Button>
      <Button intent="error">🗑️ Delete</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with icon + text combinations",
      },
    },
  },
};
