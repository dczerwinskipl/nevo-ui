import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./Alert";
import { Button } from "../primitives/Button";
import { AlertTriangle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Alert component provides feedback to users about important information. Supports multiple intents, variants, and can be dismissible.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["info", "success", "warning", "error", "primary", "neutral"],
      description: "The intent/severity of the alert",
    },
    variant: {
      control: "select",
      options: ["subtle", "solid", "outline"],
      description: "Visual variant of the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the alert can be dismissed",
    },
    title: {
      control: "text",
      description: "Optional title for the alert",
    },
    icon: {
      control: "boolean",
      description: "Whether to show an icon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    intent: "info",
    variant: "subtle",
    children: "This is an informational alert message.",
  },
};

export const WithTitle: Story = {
  args: {
    intent: "info",
    variant: "subtle",
    title: "Information",
    children: "This alert has a title to provide additional context.",
  },
};

export const AllIntents: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert intent="info" title="Info">
        This is an informational message.
      </Alert>
      <Alert intent="success" title="Success">
        Operation completed successfully!
      </Alert>
      <Alert intent="warning" title="Warning">
        Please review this important information.
      </Alert>
      <Alert intent="error" title="Error">
        An error occurred. Please try again.
      </Alert>
      <Alert intent="primary" title="Primary">
        Primary alert for important actions.
      </Alert>
      <Alert intent="neutral" title="Neutral">
        Neutral information without specific context.
      </Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert intent="info" variant="subtle" title="Subtle Variant">
        Subtle background with colored icon and text.
      </Alert>
      <Alert intent="info" variant="solid" title="Solid Variant">
        Solid colored background with white text.
      </Alert>
      <Alert intent="info" variant="outline" title="Outline Variant">
        Outlined border with subtle background.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: function DismissibleAlert() {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Alert
        intent="success"
        title="Success!"
        dismissible
        onDismiss={() => setVisible(false)}
      >
        This alert can be dismissed by clicking the X button.
      </Alert>
    ) : (
      <Button intent="primary" onClick={() => setVisible(true)}>
        Show Alert Again
      </Button>
    );
  },
};

export const CustomIcon: Story = {
  args: {
    intent: "warning",
    title: "Custom Icon",
    icon: <AlertTriangle className="w-5 h-5" />,
    children: "This alert uses a custom icon component.",
  },
};

export const NoIcon: Story = {
  args: {
    intent: "info",
    title: "No Icon",
    icon: false,
    children: "This alert has no icon.",
  },
};

export const LongContent: Story = {
  args: {
    intent: "warning",
    variant: "subtle",
    title: "Important Information",
    dismissible: true,
    children:
      "This is a longer alert message that demonstrates how the component handles multiple lines of text. The content will wrap naturally and maintain proper spacing and alignment with the icon and dismiss button. This helps ensure that even lengthy messages remain readable and well-formatted.",
  },
};

export const SuccessVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert intent="success" variant="subtle">
        Subtle success message
      </Alert>
      <Alert intent="success" variant="solid">
        Solid success message
      </Alert>
      <Alert intent="success" variant="outline">
        Outlined success message
      </Alert>
    </div>
  ),
};

export const ErrorVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert intent="error" variant="subtle" title="Validation Error">
        Please check the form fields and try again.
      </Alert>
      <Alert intent="error" variant="solid" title="System Error" dismissible>
        An unexpected error occurred. Our team has been notified.
      </Alert>
      <Alert intent="error" variant="outline">
        Connection failed. Please check your internet connection.
      </Alert>
    </div>
  ),
};

export const WarningVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert intent="warning" variant="subtle" title="Action Required">
        Your session will expire in 5 minutes.
      </Alert>
      <Alert intent="warning" variant="solid" dismissible>
        This action cannot be undone. Please proceed with caution.
      </Alert>
      <Alert intent="warning" variant="outline" title="Low Stock">
        Only 3 items remaining in inventory.
      </Alert>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveAlert() {
    type AlertItem = {
      id: number;
      intent: "info" | "success" | "warning" | "error";
      message: string;
    };

    const [alerts, setAlerts] = useState<AlertItem[]>([
      { id: 1, intent: "info", message: "First alert" },
      { id: 2, intent: "success", message: "Second alert" },
      { id: 3, intent: "warning", message: "Third alert" },
    ]);

    const removeAlert = (id: number) => {
      setAlerts(alerts.filter((a) => a.id !== id));
    };

    const addAlert = () => {
      const intents: Array<"info" | "success" | "warning" | "error"> = [
        "info",
        "success",
        "warning",
        "error",
      ];
      const randomIntent =
        intents[Math.floor(Math.random() * intents.length)] || "info";
      setAlerts([
        ...alerts,
        {
          id: Date.now(),
          intent: randomIntent,
          message: `New ${randomIntent} alert`,
        },
      ]);
    };

    return (
      <div className="space-y-4">
        <Button intent="primary" onClick={addAlert}>
          Add Random Alert
        </Button>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            intent={alert.intent}
            dismissible
            onDismiss={() => removeAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
        {alerts.length === 0 && (
          <p className="text-sm text-muted">All alerts dismissed!</p>
        )}
      </div>
    );
  },
};
