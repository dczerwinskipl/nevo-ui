import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "Feedback/ErrorState",
  component: ErrorState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ErrorState component displays error information with optional retry action. Used across the application for consistent error handling UX.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "object",
      description: "Error object to display",
    },
    onRetry: {
      action: "retry",
      description: "Callback function when retry button is clicked",
    },
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    error: new Error("Failed to load data"),
  },
};

// With retry button
export const WithRetry: Story = {
  args: {
    error: new Error(
      "Connection failed. Please check your internet connection."
    ),
    onRetry: () => alert("Retrying..."),
  },
};

// Different error messages
export const NetworkError: Story = {
  args: {
    error: new Error(
      "Network request failed. Please check your connection and try again."
    ),
    onRetry: () => alert("Retrying..."),
  },
};

export const NotFoundError: Story = {
  args: {
    error: new Error("The requested resource was not found."),
    onRetry: () => alert("Retrying..."),
  },
};

export const ServerError: Story = {
  args: {
    error: new Error("Internal server error. Our team has been notified."),
    onRetry: () => alert("Retrying..."),
  },
};

export const PermissionError: Story = {
  args: {
    error: new Error("You don't have permission to access this resource."),
  },
};

// Long error message
export const LongErrorMessage: Story = {
  args: {
    error: new Error(
      "An unexpected error occurred while processing your request. This might be due to a temporary network issue, server overload, or a problem with your authentication. Please try again in a few moments, and if the problem persists, contact our support team."
    ),
    onRetry: () => alert("Retrying..."),
  },
};

// Without retry
export const WithoutRetry: Story = {
  args: {
    error: new Error("This operation is not supported in your current plan."),
  },
  parameters: {
    docs: {
      description: {
        story: "ErrorState without retry button for non-recoverable errors.",
      },
    },
  },
};

// Common use cases
export const ApiError: Story = {
  args: {
    error: new Error("Failed to fetch products. The server is not responding."),
    onRetry: () => alert("Retrying API call..."),
  },
};

export const ValidationError: Story = {
  args: {
    error: new Error("Unable to save changes due to validation errors."),
  },
};

export const TimeoutError: Story = {
  args: {
    error: new Error(
      "Request timed out. The operation took too long to complete."
    ),
    onRetry: () => alert("Retrying..."),
  },
};
