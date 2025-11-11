import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Input } from "../primitives/Input";
import { Select } from "../primitives/Select";
import React from "react";

const meta = {
  title: "Forms/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A wrapper component that combines label, input, error message, and helper text for accessible form fields.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the form field",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    hint: {
      control: "text",
      description: "Helper text to display (hidden when error is present)",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: "Email Address",
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

// With hint text
export const WithHint: Story = {
  args: {
    label: "Username",
    hint: "Choose a unique username between 3-20 characters",
    children: <Input type="text" placeholder="username" />,
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Password",
    required: true,
    hint: "Must be at least 8 characters",
    children: <Input type="password" placeholder="••••••••" />,
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "Email Address",
    error: "Please enter a valid email address",
    children: (
      <Input type="email" placeholder="you@example.com" intent="error" />
    ),
  },
};

// Error replaces hint
export const ErrorReplacesHint: Story = {
  args: {
    label: "Username",
    hint: "This hint will be hidden when there's an error",
    error: "This username is already taken",
    children: <Input type="text" placeholder="username" intent="error" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When both hint and error are provided, only the error is displayed.",
      },
    },
  },
};

// With Select component
export const WithSelect: Story = {
  args: {
    label: "Country",
    hint: "Select your country of residence",
    required: true,
    children: (
      <Select
        options={[
          { label: "United States", value: "us" },
          { label: "United Kingdom", value: "uk" },
          { label: "Canada", value: "ca" },
          { label: "Germany", value: "de" },
        ]}
        placeholder="Choose a country..."
      />
    ),
  },
};

// Multiple fields
export const MultipleFields: Story = {
  args: { children: <></> },
  render: () => (
    <div
      style={{
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <FormField label="First Name" required>
        <Input type="text" placeholder="John" />
      </FormField>

      <FormField label="Last Name" required>
        <Input type="text" placeholder="Doe" />
      </FormField>

      <FormField
        label="Email"
        required
        hint="We'll never share your email with anyone else"
      >
        <Input type="email" placeholder="john.doe@example.com" />
      </FormField>

      <FormField label="Phone" hint="Include country code">
        <Input type="tel" placeholder="+1 (555) 123-4567" />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of multiple form fields in a form layout.",
      },
    },
  },
};

// Form validation example
export const ValidationExample: Story = {
  args: { children: <></> },
  render: function ValidationForm() {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const newErrors: Record<string, string> = {};

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email) {
        newErrors.email = "Email is required";
      } else if (!email.includes("@")) {
        newErrors.email = "Please enter a valid email";
      }

      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted successfully!");
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ minWidth: "400px" }}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <FormField
            label="Email"
            required
            {...(errors.email && { error: errors.email })}
            hint="Enter your email address"
          >
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              intent={errors.email ? "error" : "neutral"}
            />
          </FormField>

          <FormField
            label="Password"
            required
            {...(errors.password && { error: errors.password })}
            hint="Must be at least 8 characters"
          >
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              intent={errors.password ? "error" : "neutral"}
            />
          </FormField>

          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              background: "#6d6aff",
              color: "white",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive form with validation. Try submitting with empty or invalid values.",
      },
    },
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    hint: "This field has no label, just a hint",
    children: <Input type="text" placeholder="Enter value" />,
  },
};

// All states showcase
export const AllStates: Story = {
  args: { children: <></> },
  render: () => (
    <div
      style={{
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <FormField label="Default">
        <Input type="text" placeholder="Default field" />
      </FormField>

      <FormField label="With Hint" hint="This is a helpful hint">
        <Input type="text" placeholder="Field with hint" />
      </FormField>

      <FormField label="Required" required>
        <Input type="text" placeholder="Required field" />
      </FormField>

      <FormField label="With Error" error="This field has an error">
        <Input type="text" placeholder="Field with error" intent="error" />
      </FormField>

      <FormField label="Required with Error" required error="This is required">
        <Input
          type="text"
          placeholder="Required field with error"
          intent="error"
        />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all FormField states and combinations.",
      },
    },
  },
};
