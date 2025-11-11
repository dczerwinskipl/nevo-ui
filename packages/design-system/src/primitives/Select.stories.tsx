import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { ComponentIntent, ComponentSize } from "../theme";
import React, { useState } from "react";

const meta = {
  title: "Primitives/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A custom select/dropdown component with support for different intents, variants, sizes, and accessibility features. Includes keyboard navigation and clear functionality.",
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
      description: "The visual intent/purpose of the select",
    },
    variant: {
      control: "select",
      options: ["outline", "filled"],
      description: "The visual style variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"] as ComponentSize[],
      description: "The size of the select (affects padding and font size)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    allowClear: {
      control: "boolean",
      description: "Whether to show a clear option",
    },
    label: {
      control: "text",
      description: "Label text for the select",
    },
    helperText: {
      control: "text",
      description: "Helper text shown below the select",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
];

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
];

// Default story
export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option...",
    label: "Label",
    size: "md",
    intent: "neutral",
    variant: "outline",
  },
};

// With controlled state
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState<string | number>("");
    return (
      <div style={{ minWidth: "300px" }}>
        <Select
          label="Controlled Select"
          options={countryOptions}
          value={value}
          onChange={setValue}
          placeholder="Choose a country..."
          helperText={`Selected: ${value || "none"}`}
        />
      </div>
    );
  },
  args: { options: countryOptions },
  parameters: {
    docs: {
      description: {
        story: "Select with controlled state management",
      },
    },
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
      <Select
        intent="neutral"
        label="Neutral"
        options={sampleOptions}
        placeholder="Neutral select"
      />
      <Select
        intent="primary"
        label="Primary"
        options={sampleOptions}
        placeholder="Primary select"
      />
      <Select
        intent="success"
        label="Success"
        options={sampleOptions}
        placeholder="Success select"
      />
      <Select
        intent="warning"
        label="Warning"
        options={sampleOptions}
        placeholder="Warning select"
      />
      <Select
        intent="error"
        label="Error"
        options={sampleOptions}
        placeholder="Error select"
      />
      <Select
        intent="info"
        label="Info"
        options={sampleOptions}
        placeholder="Info select"
      />
    </div>
  ),
  args: { options: sampleOptions },
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
      <Select
        size="xs"
        label="Extra Small"
        options={sampleOptions}
        placeholder="xs select"
      />
      <Select
        size="sm"
        label="Small"
        options={sampleOptions}
        placeholder="sm select"
      />
      <Select
        size="md"
        label="Medium"
        options={sampleOptions}
        placeholder="md select"
      />
      <Select
        size="lg"
        label="Large"
        options={sampleOptions}
        placeholder="lg select"
      />
      <Select
        size="xl"
        label="Extra Large"
        options={sampleOptions}
        placeholder="xl select"
      />
    </div>
  ),
  args: { options: sampleOptions },
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all available size variants with proper touch targets",
      },
    },
  },
};

// Variant comparison
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      <Select
        variant="outline"
        label="Outline Variant"
        options={sampleOptions}
        placeholder="Outline select"
      />
      <Select
        variant="filled"
        label="Filled Variant"
        options={sampleOptions}
        placeholder="Filled select"
      />
    </div>
  ),
  args: { options: sampleOptions },
  parameters: {
    docs: {
      description: {
        story: "Comparison of outline and filled variants",
      },
    },
  },
};

// With clear option
export const WithClear: Story = {
  render: function SelectWithClear() {
    const [value, setValue] = useState<string | number>("us");
    return (
      <div style={{ minWidth: "300px" }}>
        <Select
          label="Country"
          options={countryOptions}
          value={value}
          onChange={setValue}
          allowClear
          clearLabel="No country selected"
          helperText="You can clear your selection"
        />
      </div>
    );
  },
  args: { options: countryOptions },
  parameters: {
    docs: {
      description: {
        story: "Select with a clear option to reset the value",
      },
    },
  },
};

// With label and helper text
export const WithLabelAndHelper: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Choose your country...",
    helperText: "Select the country you're currently residing in",
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    label: "Required Field",
    options: sampleOptions,
    placeholder: "Please select an option",
    intent: "error",
    helperText: "This field is required",
  },
};

// Disabled state
export const DisabledState: Story = {
  args: {
    label: "Disabled Select",
    options: sampleOptions,
    disabled: true,
    value: "1",
  },
};

// Long options list
export const LongOptionsList: Story = {
  render: () => {
    const longOptions = Array.from({ length: 20 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `${i + 1}`,
    }));

    return (
      <div style={{ minWidth: "300px" }}>
        <Select
          label="Many Options"
          options={longOptions}
          placeholder="Select from many options..."
          helperText="Dropdown with scrollable list"
        />
      </div>
    );
  },
  args: { options: sampleOptions },
  parameters: {
    docs: {
      description: {
        story:
          "Select with a long list of options demonstrating scroll behavior",
      },
    },
  },
};
