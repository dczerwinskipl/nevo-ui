import type { Meta, StoryObj } from "@storybook/react";
import { FormError } from "./FormError";
import { FormField } from "./FormField";
import { Input } from "../primitives/Input";

const meta = {
  title: "Forms/FormError",
  component: FormError,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An error message component for form fields with an optional icon and configurable size.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showIcon: {
      control: "boolean",
      description: "Whether to show the error icon",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "The size of the error message",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof FormError>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "This field is required",
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    children: "Please enter a valid email address",
    showIcon: false,
  },
};

// Medium size
export const MediumSize: Story = {
  args: {
    children: "Password must be at least 8 characters",
    size: "md",
  },
};

// Long error message
export const LongMessage: Story = {
  args: {
    children:
      "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    size: "md",
  },
};

// Multiple errors
export const MultipleErrors: Story = {
  args: { children: "" },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: "400px",
      }}
    >
      <FormError>Username is required</FormError>
      <FormError>Email address is invalid</FormError>
      <FormError>Password must be at least 8 characters</FormError>
      <FormError>Passwords do not match</FormError>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple error messages stacked vertically.",
      },
    },
  },
};

// Size comparison
export const SizeComparison: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <div
          style={{
            fontSize: "0.875rem",
            marginBottom: "0.25rem",
            fontWeight: 500,
          }}
        >
          Small (default)
        </div>
        <FormError size="sm">This is a small error message</FormError>
      </div>
      <div>
        <div
          style={{
            fontSize: "0.875rem",
            marginBottom: "0.25rem",
            fontWeight: 500,
          }}
        >
          Medium
        </div>
        <FormError size="md">This is a medium error message</FormError>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of small and medium sizes.",
      },
    },
  },
};

// With form field
export const WithFormField: Story = {
  args: { children: "" },
  render: () => (
    <div style={{ minWidth: "300px" }}>
      <FormField
        label="Email Address"
        required
        error="Please enter a valid email address"
      >
        <Input type="email" placeholder="you@example.com" intent="error" />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "FormError integrated with FormField component showing proper error state.",
      },
    },
  },
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    children: "Custom styled error message",
    className: "font-bold",
  },
};

// Empty (no render)
export const Empty: Story = {
  args: {
    children: null,
  },
  parameters: {
    docs: {
      description: {
        story: "FormError with no children renders nothing (returns null).",
      },
    },
  },
};
