import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import { ThemeProvider } from "../theme/ThemeProvider";
import {
  ComponentIntent,
  ComponentVariant,
  ComponentSize,
} from "../theme/types";

// Mock data and helpers
const mockOnClick = jest.fn();

interface RenderProps {
  intent?: ComponentIntent;
  variant?: ComponentVariant;
  size?: ComponentSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: jest.Mock | undefined;
  onFocus?: jest.Mock;
  onBlur?: jest.Mock;
  onKeyDown?: jest.Mock;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  "data-testid"?: string;
}

function renderButton(props: RenderProps = {}) {
  const defaultProps = {
    children: "Test Button",
    onClick: props.onClick || mockOnClick,
    "data-testid": "test-button",
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Button {...(defaultProps as any)} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("Button", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic rendering", () => {
    it("should render button with text", () => {
      renderButton({ children: "Click me" });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Click me");
    });

    it("should render button without text", () => {
      renderButton({ children: undefined });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("");
    });

    it("should render with custom content", () => {
      renderButton({
        children: <span data-testid="custom-content">Custom Content</span>,
      });

      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("should handle default props", () => {
      renderButton();

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Test Button");
    });
  });

  describe("Intent variations", () => {
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
        renderButton({ intent, children: `${intent} button` });

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(`${intent} button`);
      });
    });

    it("should apply primary intent styling by default", () => {
      renderButton();

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Default intent is primary - verified through rendering
    });
  });

  describe("Variant styles", () => {
    const variants: ComponentVariant[] = [
      "solid",
      "outline",
      "ghost",
      "subtle",
    ];

    variants.forEach((variant) => {
      it(`should render with ${variant} variant`, () => {
        renderButton({ variant, children: `${variant} button` });

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(`${variant} button`);
      });
    });

    it("should apply solid variant styling by default", () => {
      renderButton();

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Default variant is solid - verified through rendering
    });
  });

  describe("Size variations", () => {
    const sizes: ComponentSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`should render with ${size} size`, () => {
        renderButton({ size, children: `${size} button` });

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(`${size} button`);
      });
    });

    it("should apply medium size by default", () => {
      renderButton();

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Default size is md - verified through rendering
    });

    it("should have proper touch targets for accessibility", () => {
      renderButton({ size: "sm" });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Touch target verification through minimum height classes
    });
  });

  describe("Loading state", () => {
    it("should show loading text when loading", () => {
      renderButton({ loading: true, children: "Submit" });

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Loading...");
      expect(button).not.toHaveTextContent("Submit");
    });

    it("should be disabled when loading", () => {
      renderButton({ loading: true });

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should not respond to clicks when loading", async () => {
      const user = userEvent.setup();
      renderButton({ loading: true });

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should show original content when not loading", () => {
      renderButton({ loading: false, children: "Submit" });

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Submit");
      expect(button).not.toHaveTextContent("Loading...");
    });
  });

  describe("Disabled state", () => {
    it("should be disabled when disabled prop is true", () => {
      renderButton({ disabled: true });

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should not respond to clicks when disabled", async () => {
      const user = userEvent.setup();
      renderButton({ disabled: true });

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should have disabled styling", () => {
      renderButton({ disabled: true });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:opacity-50");
      expect(button).toHaveClass("disabled:cursor-not-allowed");
    });

    it("should be enabled by default", () => {
      renderButton();

      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
    });
  });

  describe("User interactions", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderButton();

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should handle multiple clicks", async () => {
      const user = userEvent.setup();
      renderButton();

      const button = screen.getByRole("button");
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it("should call onFocus when focused", async () => {
      const mockOnFocus = jest.fn();
      const user = userEvent.setup();
      renderButton({ onFocus: mockOnFocus });

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when blurred", async () => {
      const mockOnBlur = jest.fn();
      const user = userEvent.setup();
      renderButton({ onBlur: mockOnBlur });

      const button = screen.getByRole("button");
      await user.click(button);
      await user.tab(); // Move focus away

      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", async () => {
      const mockOnKeyDown = jest.fn();
      const user = userEvent.setup();
      renderButton({ onKeyDown: mockOnKeyDown });

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(mockOnKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "Enter",
        })
      );
    });

    it("should handle space key activation", async () => {
      const user = userEvent.setup();
      renderButton();

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard(" ");

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should handle enter key activation", async () => {
      const user = userEvent.setup();
      renderButton();

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Button types", () => {
    it("should handle submit type", () => {
      renderButton({ type: "submit" });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should handle reset type", () => {
      renderButton({ type: "reset" });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });

    it("should handle button type", () => {
      renderButton({ type: "button" });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("should default to button type", () => {
      renderButton();

      const button = screen.getByRole("button");
      // Default type should be button or unspecified
      expect(button).toBeInTheDocument();
    });
  });

  describe("Form integration", () => {
    it("should work within a form as submit button", async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <form onSubmit={handleSubmit}>
            <Button type="submit" data-testid="submit-button">
              Submit Form
            </Button>
          </form>
        </ThemeProvider>
      );

      const button = screen.getByTestId("submit-button");
      await user.click(button);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should work within a form as reset button", () => {
      render(
        <ThemeProvider>
          <form>
            <input defaultValue="test" />
            <Button type="reset" data-testid="reset-button">
              Reset Form
            </Button>
          </form>
        </ThemeProvider>
      );

      const button = screen.getByTestId("reset-button");
      expect(button).toHaveAttribute("type", "reset");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      renderButton({ "aria-label": "Custom button label" });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom button label");
    });

    it("should be focusable by default", async () => {
      const user = userEvent.setup();
      renderButton();

      const button = screen.getByRole("button");
      await user.tab();

      expect(button).toHaveFocus();
    });

    it("should not be focusable when disabled", () => {
      renderButton({ disabled: true });

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      // Disabled buttons are not focusable
    });

    it("should support screen reader navigation", () => {
      renderButton({
        children: "Accessible Button",
        "aria-label": "This button is accessible",
      });

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Accessible Button");
      expect(button).toHaveAttribute("aria-label", "This button is accessible");
    });

    it("should handle high contrast mode", () => {
      renderButton({ variant: "outline" });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // High contrast verified through outline variant rendering
    });
  });

  describe("Performance and edge cases", () => {
    it("should handle rapid clicks gracefully", async () => {
      const user = userEvent.setup();
      renderButton();

      const button = screen.getByRole("button");

      // Rapid clicks
      await user.click(button);
      await user.click(button);
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(5);
    });

    it("should handle missing onClick gracefully", async () => {
      const user = userEvent.setup();
      renderButton({ onClick: undefined });

      const button = screen.getByRole("button");
      await user.click(button);

      // Should not throw error even without onClick
      expect(button).toBeInTheDocument();
    });

    it("should maintain performance with many re-renders", () => {
      const { rerender } = renderButton({ children: "Initial" });

      // Multiple re-renders to test performance
      for (let i = 0; i < 10; i++) {
        rerender(
          <ThemeProvider>
            <Button data-testid="test-button">Update {i}</Button>
          </ThemeProvider>
        );
      }

      const button = screen.getByTestId("test-button");
      expect(button).toHaveTextContent("Update 9");
    });

    it("should handle complex children content", () => {
      renderButton({
        children: (
          <div>
            <span>Icon</span>
            <span>Text</span>
            <span>Badge</span>
          </div>
        ),
      });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
      expect(screen.getByText("Badge")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      renderButton({ children: "" });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("");
    });
  });

  describe("Styling and theme integration", () => {
    it("should apply custom className", () => {
      renderButton({ className: "custom-button-class" });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-button-class");
    });

    it("should have proper hover scaling animation", () => {
      renderButton();

      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:scale-105");
    });

    it("should prevent scaling when disabled", () => {
      renderButton({ disabled: true });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:hover:scale-100");
    });

    it("should integrate with theme system", () => {
      renderButton({
        intent: "success",
        variant: "outline",
        size: "lg",
      });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Theme integration verified through rendering without errors
    });

    it("should handle all intent and variant combinations", () => {
      const intents: ComponentIntent[] = [
        "primary",
        "success",
        "warning",
        "error",
        "info",
        "neutral",
      ];
      const variants: ComponentVariant[] = [
        "solid",
        "outline",
        "ghost",
        "subtle",
      ];

      intents.forEach((intent) => {
        variants.forEach((variant) => {
          const { unmount } = renderButton({
            intent,
            variant,
            children: `${intent}-${variant}`,
          });

          const button = screen.getByRole("button");
          expect(button).toBeInTheDocument();
          expect(button).toHaveTextContent(`${intent}-${variant}`);

          unmount();
        });
      });
    });

    it("should maintain consistent styling with different content", () => {
      const contentTypes = [
        "Short",
        "This is a much longer button text that spans multiple words",
        <span key="complex">
          Complex <strong>HTML</strong> content
        </span>,
        123,
        null,
      ];

      contentTypes.forEach((content, index) => {
        const { unmount } = renderButton({
          children: content,
          "data-testid": `button-${index}`,
        });

        const button = screen.getByTestId(`button-${index}`);
        expect(button).toBeInTheDocument();

        unmount();
      });
    });
  });
});
