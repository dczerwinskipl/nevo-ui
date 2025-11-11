import type { Meta, StoryObj } from "@storybook/react";
import { FormGroup } from "./FormGroup";
import { FormField } from "./FormField";
import { Input } from "../primitives/Input";

const meta = {
  title: "Forms/FormGroup",
  component: FormGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component for grouping related form fields with optional title and description.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title for the form group",
    },
    description: {
      control: "text",
      description: "Description text for the form group",
    },
    direction: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Layout direction for the form fields",
    },
    spacing: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spacing between form fields",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    title: "Personal Information",
    children: (
      <>
        <FormField label="First Name">
          <Input type="text" placeholder="John" />
        </FormField>
        <FormField label="Last Name">
          <Input type="text" placeholder="Doe" />
        </FormField>
      </>
    ),
  },
};

// With description
export const WithDescription: Story = {
  args: {
    title: "Account Settings",
    description: "Update your account information and preferences",
    children: (
      <>
        <FormField label="Email" required>
          <Input type="email" placeholder="you@example.com" />
        </FormField>
        <FormField label="Username" required>
          <Input type="text" placeholder="username" />
        </FormField>
      </>
    ),
  },
};

// Horizontal layout
export const HorizontalLayout: Story = {
  args: {
    title: "Name",
    direction: "horizontal",
    children: (
      <>
        <FormField label="First Name">
          <Input type="text" placeholder="John" />
        </FormField>
        <FormField label="Last Name">
          <Input type="text" placeholder="Doe" />
        </FormField>
      </>
    ),
  },
};

// Different spacing
export const SmallSpacing: Story = {
  args: {
    title: "Contact Information",
    spacing: "sm",
    children: (
      <>
        <FormField label="Email">
          <Input type="email" placeholder="email@example.com" />
        </FormField>
        <FormField label="Phone">
          <Input type="tel" placeholder="+1 (555) 123-4567" />
        </FormField>
        <FormField label="Address">
          <Input type="text" placeholder="123 Main St" />
        </FormField>
      </>
    ),
  },
};

export const LargeSpacing: Story = {
  args: {
    title: "Contact Information",
    spacing: "lg",
    children: (
      <>
        <FormField label="Email">
          <Input type="email" placeholder="email@example.com" />
        </FormField>
        <FormField label="Phone">
          <Input type="tel" placeholder="+1 (555) 123-4567" />
        </FormField>
        <FormField label="Address">
          <Input type="text" placeholder="123 Main St" />
        </FormField>
      </>
    ),
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    children: (
      <>
        <FormField label="Street Address">
          <Input type="text" placeholder="123 Main St" />
        </FormField>
        <FormField label="City">
          <Input type="text" placeholder="New York" />
        </FormField>
        <FormField label="Zip Code">
          <Input type="text" placeholder="10001" />
        </FormField>
      </>
    ),
  },
};

// Complete form example
export const CompleteForm: Story = {
  args: { children: <></> },
  render: () => (
    <div style={{ minWidth: "500px", maxWidth: "600px" }}>
      <FormGroup
        title="Personal Information"
        description="Please provide your personal details"
        spacing="md"
      >
        <FormField label="First Name" required>
          <Input type="text" placeholder="John" />
        </FormField>
        <FormField label="Last Name" required>
          <Input type="text" placeholder="Doe" />
        </FormField>
        <FormField label="Email" required hint="We'll never share your email">
          <Input type="email" placeholder="john.doe@example.com" />
        </FormField>
      </FormGroup>

      <div style={{ height: "2rem" }} />

      <FormGroup
        title="Address"
        description="Enter your mailing address"
        spacing="md"
      >
        <FormField label="Street Address">
          <Input type="text" placeholder="123 Main St" />
        </FormField>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <FormField label="City">
            <Input type="text" placeholder="New York" />
          </FormField>
          <FormField label="Zip Code">
            <Input type="text" placeholder="10001" />
          </FormField>
        </div>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of a complete form with multiple FormGroups.",
      },
    },
  },
};

// Nested groups
export const NestedLayout: Story = {
  args: { children: <></> },
  render: () => (
    <div style={{ minWidth: "500px" }}>
      <FormGroup title="Account Creation" description="Create your new account">
        <FormField label="Email" required>
          <Input type="email" placeholder="you@example.com" />
        </FormField>

        <FormGroup title="Password" spacing="sm">
          <FormField label="Password" required hint="At least 8 characters">
            <Input type="password" placeholder="••••••••" />
          </FormField>
          <FormField label="Confirm Password" required>
            <Input type="password" placeholder="••••••••" />
          </FormField>
        </FormGroup>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of nested FormGroups for hierarchical form organization.",
      },
    },
  },
};
