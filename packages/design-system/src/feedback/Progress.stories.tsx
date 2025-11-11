import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";
import { ComponentIntent } from "../theme/types";
import React from "react";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Progress component for displaying completion status with bar or circular variants, multiple sizes, and intent colors.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value (0-100)",
    },
    max: {
      control: "number",
      description: "Maximum value (default: 100)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the progress indicator",
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
      description: "The visual intent/purpose of the progress",
    },
    showLabel: {
      control: "boolean",
      description: "Whether to show percentage label",
    },
    label: {
      control: "text",
      description: "Custom label text",
    },
    variant: {
      control: "select",
      options: ["bar", "circle"],
      description: "Progress bar or circular variant",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    value: 45,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    value: 65,
    showLabel: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    value: 75,
    label: "75% Complete",
  },
};

// All sizes (bar)
export const AllSizesBar: Story = {
  args: { value: 0 },
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
        <div
          style={{
            fontSize: "0.875rem",
            marginBottom: "0.5rem",
            fontWeight: 500,
          }}
        >
          Small
        </div>
        <Progress value={60} size="sm" showLabel />
      </div>
      <div>
        <div
          style={{
            fontSize: "0.875rem",
            marginBottom: "0.5rem",
            fontWeight: 500,
          }}
        >
          Medium (Default)
        </div>
        <Progress value={60} size="md" showLabel />
      </div>
      <div>
        <div
          style={{
            fontSize: "0.875rem",
            marginBottom: "0.5rem",
            fontWeight: 500,
          }}
        >
          Large
        </div>
        <Progress value={60} size="lg" showLabel />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Progress bars in different sizes: sm (h-1), md (h-2), lg (h-3).",
      },
    },
  },
};

// All intents
export const AllIntents: Story = {
  args: { value: 0 },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      <Progress value={70} intent="neutral" showLabel />
      <Progress value={70} intent="primary" showLabel />
      <Progress value={70} intent="success" showLabel />
      <Progress value={70} intent="warning" showLabel />
      <Progress value={70} intent="error" showLabel />
      <Progress value={70} intent="info" showLabel />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars with different intent colors.",
      },
    },
  },
};

// Different progress values
export const ProgressStages: Story = {
  args: { value: 0 },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "300px",
      }}
    >
      <Progress value={0} label="Not started" />
      <Progress value={25} intent="info" label="Getting started..." />
      <Progress value={50} intent="primary" label="Half way there" />
      <Progress value={75} intent="warning" label="Almost done" />
      <Progress value={100} intent="success" label="Complete!" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different progress stages with custom labels and intent colors.",
      },
    },
  },
};

// Circular variant
export const CircularDefault: Story = {
  args: {
    value: 65,
    variant: "circle",
    showLabel: true,
  },
};

// All sizes (circular)
export const AllSizesCircular: Story = {
  args: { value: 0 },
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Progress value={75} size="sm" variant="circle" showLabel />
        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>Small</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Progress value={75} size="md" variant="circle" showLabel />
        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>Medium</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Progress value={75} size="lg" variant="circle" showLabel />
        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>Large</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Circular progress indicators in different sizes.",
      },
    },
  },
};

// Circular with intents
export const CircularIntents: Story = {
  args: { value: 0 },
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      <Progress value={80} variant="circle" intent="primary" showLabel />
      <Progress value={100} variant="circle" intent="success" showLabel />
      <Progress value={50} variant="circle" intent="warning" showLabel />
      <Progress value={30} variant="circle" intent="error" showLabel />
      <Progress value={65} variant="circle" intent="info" showLabel />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Circular progress with different intent colors.",
      },
    },
  },
};

// Animated progress
export const AnimatedProgress: Story = {
  args: { value: 0 },
  render: function AnimatedProgressExample() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }, []);

    return (
      <div style={{ minWidth: "300px" }}>
        <Progress value={progress} intent="primary" showLabel />
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "0.875rem",
          }}
        >
          Auto-incrementing progress
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Progress bar that automatically animates from 0 to 100.",
      },
    },
  },
};

// File upload example
export const FileUploadExample: Story = {
  args: { value: 0 },
  render: () => (
    <div style={{ minWidth: "400px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Uploading document.pdf
          </span>
          <span style={{ fontSize: "0.875rem" }}>3.2 MB / 5.0 MB</span>
        </div>
        <Progress value={64} intent="primary" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Uploading image.jpg
          </span>
          <span style={{ fontSize: "0.875rem" }}>2.8 MB / 2.8 MB</span>
        </div>
        <Progress value={100} intent="success" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "File upload progress example with file names and sizes.",
      },
    },
  },
};

// Loading states
export const LoadingStates: Story = {
  args: { value: 0 },
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
        <Progress value={15} intent="info" label="Initializing..." />
      </div>
      <div>
        <Progress value={45} intent="primary" label="Processing..." />
      </div>
      <div>
        <Progress value={85} intent="warning" label="Finalizing..." />
      </div>
      <div>
        <Progress value={100} intent="success" label="Done!" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common loading states with descriptive labels.",
      },
    },
  },
};
