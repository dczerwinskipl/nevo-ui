import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";
import { ComponentIntent } from "../theme/types";
import React from "react";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Toast notification component for displaying brief messages to users. Supports multiple positions, intents, and dismissible behavior.",
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
      description: "The visual intent/purpose of the toast",
    },
    title: {
      control: "text",
      description: "Toast title",
    },
    description: {
      control: "text",
      description: "Toast description",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the toast can be dismissed",
    },
    icon: {
      control: "boolean",
      description: "Whether to show the intent icon",
    },
    position: {
      control: "select",
      options: [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top-center",
        "bottom-center",
      ],
      description: "Position of the toast on screen",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    title: "Notification",
    description: "This is a toast notification message.",
    position: "top-right",
  },
};

// Success toast
export const Success: Story = {
  args: {
    intent: "success",
    title: "Success!",
    description: "Your changes have been saved successfully.",
    position: "top-right",
  },
};

// Error toast
export const Error: Story = {
  args: {
    intent: "error",
    title: "Error",
    description: "Failed to save changes. Please try again.",
    position: "top-right",
  },
};

// Warning toast
export const Warning: Story = {
  args: {
    intent: "warning",
    title: "Warning",
    description: "Your session will expire in 5 minutes.",
    position: "top-right",
  },
};

// Info toast
export const Info: Story = {
  args: {
    intent: "info",
    title: "New update available",
    description: "A new version of the application is ready to install.",
    position: "top-right",
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    intent: "primary",
    title: "Message",
    description: "This toast has no icon.",
    icon: false,
    position: "top-right",
  },
};

// Title only
export const TitleOnly: Story = {
  args: {
    intent: "success",
    title: "Item added to cart",
    position: "top-right",
  },
};

// Description only
export const DescriptionOnly: Story = {
  args: {
    intent: "info",
    description: "You have 3 new notifications.",
    position: "top-right",
  },
};

// Not dismissible
export const NotDismissible: Story = {
  args: {
    intent: "warning",
    title: "Action required",
    description: "Please complete your profile to continue.",
    dismissible: false,
    position: "top-right",
  },
};

// All positions
export const AllPositions: Story = {
  args: { title: "", description: "" },
  render: () => (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Toast
        title="Top Right"
        description="Default position"
        intent="primary"
        position="top-right"
      />
      <Toast
        title="Top Left"
        description="Alternative position"
        intent="success"
        position="top-left"
      />
      <Toast
        title="Bottom Right"
        description="Bottom position"
        intent="warning"
        position="bottom-right"
      />
      <Toast
        title="Bottom Left"
        description="Alternative bottom"
        intent="error"
        position="bottom-left"
      />
      <Toast
        title="Top Center"
        description="Centered at top"
        intent="info"
        position="top-center"
      />
      <Toast
        title="Bottom Center"
        description="Centered at bottom"
        intent="neutral"
        position="bottom-center"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toast notifications in all available positions.",
      },
    },
  },
};

// All intents
export const AllIntents: Story = {
  args: { title: "", description: "" },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <Toast intent="neutral" title="Neutral" description="Default intent" />
      <Toast intent="primary" title="Primary" description="Primary action" />
      <Toast
        intent="success"
        title="Success"
        description="Operation successful"
      />
      <Toast intent="warning" title="Warning" description="Caution required" />
      <Toast intent="error" title="Error" description="Something went wrong" />
      <Toast intent="info" title="Info" description="Informational message" />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Toast notifications with all available intent colors.",
      },
    },
  },
};

// With custom content
export const WithCustomContent: Story = {
  args: {
    intent: "info",
    title: "New message",
    children: (
      <div style={{ marginTop: "0.5rem" }}>
        <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          John Doe sent you a message
        </p>
        <button
          style={{
            padding: "0.25rem 0.75rem",
            background: "#6d6aff",
            color: "white",
            borderRadius: "0.375rem",
            border: "none",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          View Message
        </button>
      </div>
    ),
    position: "top-right",
  },
};

// Long content
export const LongContent: Story = {
  args: {
    intent: "warning",
    title: "Important Notice",
    description:
      "Your account will be temporarily suspended due to unusual activity. Please verify your identity by clicking the link sent to your email address. If you didn't receive the email, check your spam folder or contact support.",
    position: "top-right",
  },
};

// Stacked toasts
export const StackedToasts: Story = {
  args: { title: "", description: "" },
  render: () => (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          zIndex: 50,
        }}
      >
        <Toast
          intent="success"
          title="Upload complete"
          description="file.pdf was uploaded successfully"
          position="top-right"
        />
        <Toast
          intent="info"
          title="Processing"
          description="Your document is being processed"
          position="top-right"
        />
        <Toast
          intent="warning"
          title="Storage almost full"
          description="You're using 95% of your storage"
          position="top-right"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple toast notifications stacked vertically.",
      },
    },
  },
};

// Interactive dismissible
export const InteractiveDismissible: Story = {
  args: { title: "", description: "" },
  render: function InteractiveToast() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <button
            onClick={() => setVisible(true)}
            style={{
              padding: "0.5rem 1rem",
              background: "#6d6aff",
              color: "white",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Show Toast
          </button>
        </div>
      );
    }

    return (
      <Toast
        intent="success"
        title="Success!"
        description="Click the X button to dismiss this notification."
        onDismiss={() => setVisible(false)}
        position="top-right"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive toast that can be dismissed and shown again.",
      },
    },
  },
};

// Real-world examples
export const SaveNotification: Story = {
  args: {
    intent: "success",
    title: "Changes saved",
    description: "Your document has been saved successfully.",
    position: "bottom-right",
  },
};

export const ErrorNotification: Story = {
  args: {
    intent: "error",
    title: "Upload failed",
    description: "The file size exceeds the 10MB limit.",
    position: "top-right",
  },
};

export const UpdateNotification: Story = {
  args: {
    intent: "info",
    title: "Update available",
    description: "A new version is ready to install.",
    children: (
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button
          style={{
            padding: "0.25rem 0.75rem",
            background: "#6d6aff",
            color: "white",
            borderRadius: "0.375rem",
            border: "none",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          Update Now
        </button>
        <button
          style={{
            padding: "0.25rem 0.75rem",
            background: "transparent",
            border: "1px solid currentColor",
            borderRadius: "0.375rem",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          Later
        </button>
      </div>
    ),
    position: "top-center",
  },
};
