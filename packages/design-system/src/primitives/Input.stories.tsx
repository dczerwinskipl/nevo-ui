import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { ComponentIntent, ComponentSize } from "../theme";

const meta = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile input component with support for different intents, variants, sizes, and accessibility features.",
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
      description: "The visual intent/purpose of the input",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"] as ComponentSize[],
      description: "The size of the input (affects padding and font size)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    helperText: {
      control: "text",
      description: "Helper text shown below the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    label: "Label",
    size: "md",
    intent: "neutral",
  },
};

// With label and helper text
export const WithLabelAndHelper: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    helperText: "We'll never share your email with anyone else.",
    type: "email",
  },
};

// All intents showcase
export const AllIntents: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      <Input intent="neutral" label="Neutral" placeholder="Neutral input" />
      <Input intent="primary" label="Primary" placeholder="Primary input" />
      <Input intent="success" label="Success" placeholder="Success input" />
      <Input intent="warning" label="Warning" placeholder="Warning input" />
      <Input intent="error" label="Error" placeholder="Error input" />
      <Input intent="info" label="Info" placeholder="Info input" />
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

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      <Input size="xs" label="Extra Small" placeholder="xs input" />
      <Input size="sm" label="Small" placeholder="sm input" />
      <Input size="md" label="Medium" placeholder="md input" />
      <Input size="lg" label="Large" placeholder="lg input" />
      <Input size="xl" label="Extra Large" placeholder="xl input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all available size variants with proper touch targets",
      },
    },
  },
};

// With left icon/addon
export const WithLeftAddon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    left: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
  },
};

// Different input types
export const InputTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      <Input type="text" label="Text" placeholder="Text input" />
      <Input type="email" label="Email" placeholder="you@example.com" />
      <Input type="password" label="Password" placeholder="••••••••" />
      <Input type="number" label="Number" placeholder="123" />
      <Input type="tel" label="Phone" placeholder="+1 (555) 123-4567" />
      <Input type="url" label="URL" placeholder="https://example.com" />
      <Input type="date" label="Date" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different HTML5 input types supported by the component",
      },
    },
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    intent: "error",
    helperText: "This username is already taken",
  },
};

// Disabled state
export const DisabledState: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
    value: "Disabled value",
  },
};
