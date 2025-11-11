import type { Meta, StoryObj } from "@storybook/react";
import { FormLabel } from "./FormLabel";
import { Input } from "../primitives/Input";
import { ComponentIntent } from "../theme/types";

const meta = {
  title: "Forms/FormLabel",
  component: FormLabel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A label component for form fields with support for required indicator and different intents.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "ID of the form element this label is for",
    },
    required: {
      control: "boolean",
      description: "Whether to show required indicator (*)",
    },
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
      description: "The visual intent/purpose of the label",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the label text",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Email Address",
    htmlFor: "email",
  },
};

// Required field
export const Required: Story = {
  args: {
    children: "Password",
    htmlFor: "password",
    required: true,
  },
};

// With error intent
export const ErrorIntent: Story = {
  args: {
    children: "Username",
    htmlFor: "username",
    intent: "error",
    required: true,
  },
};

// All sizes
export const AllSizes: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <FormLabel size="sm">Small Label</FormLabel>
      <FormLabel size="md">Medium Label (Default)</FormLabel>
      <FormLabel size="lg">Large Label</FormLabel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "FormLabel in different sizes: sm (text-xs), md (text-sm), lg (text-base).",
      },
    },
  },
};

// All intents
export const AllIntents: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <FormLabel intent="neutral">Neutral Label</FormLabel>
      <FormLabel intent="primary">Primary Label</FormLabel>
      <FormLabel intent="success">Success Label</FormLabel>
      <FormLabel intent="warning">Warning Label</FormLabel>
      <FormLabel intent="error">Error Label</FormLabel>
      <FormLabel intent="info">Info Label</FormLabel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "FormLabel with different intent colors. Error intent is most commonly used for validation.",
      },
    },
  },
};

// With input association
export const WithInput: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <FormLabel htmlFor="email-input" required>
        Email Address
      </FormLabel>
      <Input id="email-input" type="email" placeholder="you@example.com" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "FormLabel associated with an Input component using htmlFor and id attributes for accessibility.",
      },
    },
  },
};

// Complex content
export const ComplexContent: Story = {
  args: {
    children: (
      <>
        Full Name{" "}
        <span
          style={{ fontWeight: "normal", fontSize: "0.875rem", opacity: 0.7 }}
        >
          (optional)
        </span>
      </>
    ),
  },
};

// Multiple states
export const MultipleStates: Story = {
  args: { children: "" },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      <div>
        <FormLabel htmlFor="field1">Default Label</FormLabel>
        <Input id="field1" type="text" />
      </div>

      <div>
        <FormLabel htmlFor="field2" required>
          Required Field
        </FormLabel>
        <Input id="field2" type="text" />
      </div>

      <div>
        <FormLabel htmlFor="field3" intent="error" required>
          Error State
        </FormLabel>
        <Input id="field3" type="text" intent="error" />
      </div>

      <div>
        <FormLabel htmlFor="field4" size="lg">
          Large Label
        </FormLabel>
        <Input id="field4" type="text" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different FormLabel states and configurations with Input components.",
      },
    },
  },
};
