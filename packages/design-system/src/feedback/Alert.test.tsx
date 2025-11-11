import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";
import { ThemeProvider } from "../theme/ThemeProvider";
import { ComponentIntent } from "../theme/types";

const mockOnDismiss = jest.fn();

interface RenderProps {
  intent?: ComponentIntent;
  variant?: "subtle" | "solid" | "outline";
  title?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: jest.Mock;
  className?: string;
  icon?: React.ReactNode | boolean;
}

function renderAlert(props: RenderProps = {}) {
  const defaultProps = {
    children: "Test alert message",
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Alert {...defaultProps} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("Alert", () => {
  beforeEach(() => {
    mockOnDismiss.mockClear();
  });

  describe("Rendering", () => {
    it("should render with default props", () => {
      renderAlert();
      expect(screen.getByText("Test alert message")).toBeInTheDocument();
    });

    it("should render with title", () => {
      renderAlert({ title: "Alert Title" });
      expect(screen.getByText("Alert Title")).toBeInTheDocument();
      expect(screen.getByText("Test alert message")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = renderAlert({ className: "custom-class" });
      const alert = container.firstChild;
      expect(alert).toHaveClass("custom-class");
    });

    it("should render children content", () => {
      renderAlert({ children: <span>Custom content</span> });
      expect(screen.getByText("Custom content")).toBeInTheDocument();
    });
  });

  describe("Intents", () => {
    const intents: ComponentIntent[] = [
      "primary",
      "success",
      "warning",
      "error",
      "info",
      "neutral",
    ];

    intents.forEach((intent) => {
      it(`should render with ${intent} intent`, () => {
        const { container } = renderAlert({ intent });
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    const variants: Array<"subtle" | "solid" | "outline"> = [
      "subtle",
      "solid",
      "outline",
    ];

    variants.forEach((variant) => {
      it(`should render with ${variant} variant`, () => {
        const { container } = renderAlert({ variant });
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });

  describe("Icon", () => {
    it("should render with default icon (true)", () => {
      const { container } = renderAlert({ icon: true, intent: "success" });
      // Icon is rendered as SVG
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should not render icon when icon is false", () => {
      const { container } = renderAlert({ icon: false });
      const svg = container.querySelector("svg");
      // Only dismiss button SVG should be present if dismissible
      expect(svg).not.toBeInTheDocument();
    });

    it("should render custom icon", () => {
      const CustomIcon = () => <span data-testid="custom-icon">Custom</span>;
      renderAlert({ icon: <CustomIcon /> });
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Dismissible", () => {
    it("should render dismiss button when dismissible is true", () => {
      renderAlert({ dismissible: true, onDismiss: mockOnDismiss });
      const dismissButton = screen.getByRole("button", { name: /dismiss/i });
      expect(dismissButton).toBeInTheDocument();
    });

    it("should not render dismiss button when dismissible is false", () => {
      renderAlert({ dismissible: false });
      const dismissButton = screen.queryByRole("button", { name: /dismiss/i });
      expect(dismissButton).not.toBeInTheDocument();
    });

    it("should call onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      renderAlert({ dismissible: true, onDismiss: mockOnDismiss });

      const dismissButton = screen.getByRole("button", { name: /dismiss/i });
      await user.click(dismissButton);

      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA role", () => {
      const { container } = renderAlert();
      const alert = container.firstChild;
      expect(alert).toBeInTheDocument();
    });

    it("should render dismiss button with aria-label", () => {
      renderAlert({ dismissible: true, onDismiss: mockOnDismiss });
      const dismissButton = screen.getByRole("button", { name: /dismiss/i });
      expect(dismissButton).toHaveAttribute("aria-label");
    });
  });

  describe("Combination scenarios", () => {
    it("should render alert with all features", () => {
      renderAlert({
        intent: "warning",
        variant: "solid",
        title: "Warning Title",
        children: "Warning message",
        dismissible: true,
        onDismiss: mockOnDismiss,
        icon: true,
        className: "custom-alert",
      });

      expect(screen.getByText("Warning Title")).toBeInTheDocument();
      expect(screen.getByText("Warning message")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /dismiss/i })
      ).toBeInTheDocument();
    });
  });
});
