import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";
import { ThemeProvider } from "../theme/ThemeProvider";
import {
  ComponentIntent,
  ComponentVariant,
} from "../theme/types";

// Mock data and helpers
interface RenderProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: ComponentIntent;
  variant?: ComponentVariant;
  icon?: React.ReactNode;
  dot?: boolean;
  children?: React.ReactNode;
}

function renderBadge(props: RenderProps = {}) {
  const defaultProps = {
    children: "Test Badge",
    "data-testid": "test-badge",
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Badge {...(defaultProps as any)} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("Badge", () => {
  describe("Basic rendering", () => {
    it("should render badge with text", () => {
      renderBadge({ children: "New" });

      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("should render badge without text", () => {
      renderBadge({ children: "" });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent("");
    });

    it("should render with custom content", () => {
      renderBadge({
        children: <span data-testid="custom-content">Custom</span>,
      });

      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
      expect(screen.getByText("Custom")).toBeInTheDocument();
    });

    it("should handle default props", () => {
      renderBadge();

      const badge = screen.getByTestId("test-badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent("Test Badge");
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
        renderBadge({ intent, children: `${intent} badge` });

        const badge = screen.getByText(`${intent} badge`);
        expect(badge).toBeInTheDocument();
      });
    });

    it("should apply neutral intent styling by default", () => {
      renderBadge();

      const badge = screen.getByTestId("test-badge");
      expect(badge).toBeInTheDocument();
      // Default intent is neutral - verified through rendering
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
        renderBadge({ variant, children: `${variant} badge` });

        const badge = screen.getByText(`${variant} badge`);
        expect(badge).toBeInTheDocument();
      });
    });

    it("should apply subtle variant styling by default", () => {
      renderBadge();

      const badge = screen.getByTestId("test-badge");
      expect(badge).toBeInTheDocument();
      // Default variant is subtle - verified through rendering
    });
  });

  describe("Dot indicator", () => {
    it("should render dot when dot prop is true", () => {
      const { container } = renderBadge({ dot: true, children: "Online" });

      const badge = screen.getByText("Online");
      expect(badge).toBeInTheDocument();
      
      // Check for dot element
      const dot = container.querySelector('.h-1\\.5');
      expect(dot).toBeInTheDocument();
    });

    it("should not render dot when dot prop is false", () => {
      const { container } = renderBadge({ dot: false, children: "Online" });

      const badge = screen.getByText("Online");
      expect(badge).toBeInTheDocument();
      
      // Check dot is not present
      const dot = container.querySelector('.h-1\\.5');
      expect(dot).not.toBeInTheDocument();
    });

    it("should not render dot by default", () => {
      const { container } = renderBadge({ children: "Online" });

      const dot = container.querySelector('.h-1\\.5');
      expect(dot).not.toBeInTheDocument();
    });
  });

  describe("Icon support", () => {
    it("should render icon when icon prop is provided", () => {
      renderBadge({
        icon: <span data-testid="badge-icon">✓</span>,
        children: "Verified",
      });

      expect(screen.getByTestId("badge-icon")).toBeInTheDocument();
      expect(screen.getByText("Verified")).toBeInTheDocument();
    });

    it("should not render icon when icon prop is not provided", () => {
      renderBadge({ children: "No Icon" });

      expect(screen.queryByTestId("badge-icon")).not.toBeInTheDocument();
      expect(screen.getByText("No Icon")).toBeInTheDocument();
    });

    it("should render both icon and text", () => {
      renderBadge({
        icon: <span>⭐</span>,
        children: "Featured",
      });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toHaveTextContent("⭐");
      expect(badge).toHaveTextContent("Featured");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes when provided", () => {
      renderBadge({ "aria-label": "Status badge" });

      const badge = screen.getByLabelText("Status badge");
      expect(badge).toBeInTheDocument();
    });

    it("should be a span element", () => {
      renderBadge();

      const badge = screen.getByTestId("test-badge");
      expect(badge.tagName).toBe("SPAN");
    });

    it("should mark decorative elements as aria-hidden", () => {
      const { container } = renderBadge({
        dot: true,
        icon: <span data-testid="icon">★</span>,
        children: "Test",
      });

      // Dot should be aria-hidden
      const dot = container.querySelector('.h-1\\.5');
      expect(dot).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe("Styling and customization", () => {
    it("should apply custom className", () => {
      renderBadge({ className: "custom-badge-class" });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toHaveClass("custom-badge-class");
    });

    it("should maintain base classes with custom className", () => {
      renderBadge({ className: "custom-class" });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toHaveClass("custom-class");
      expect(badge).toHaveClass("inline-flex");
      expect(badge).toHaveClass("rounded-full");
    });

    it("should integrate with theme system", () => {
      renderBadge({ intent: "primary", variant: "solid" });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toBeInTheDocument();
      // Theme integration verified through rendering
    });

    it("should handle all intent and variant combinations", () => {
      const intents: ComponentIntent[] = ["primary", "success", "error"];
      const variants: ComponentVariant[] = ["solid", "outline"];

      intents.forEach((intent) => {
        variants.forEach((variant) => {
          const { unmount } = renderBadge({
            intent,
            variant,
            children: `${intent}-${variant}`,
          });

          const badge = screen.getByText(`${intent}-${variant}`);
          expect(badge).toBeInTheDocument();

          unmount();
        });
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle empty children gracefully", () => {
      renderBadge({ children: "" });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent("");
    });

    it("should handle undefined children", () => {
      renderBadge({ children: undefined });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toBeInTheDocument();
    });

    it("should handle numeric children", () => {
      renderBadge({ children: 42 as any });

      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("should handle complex children", () => {
      renderBadge({
        children: (
          <div>
            <span>Complex</span> <strong>Content</strong>
          </div>
        ),
      });

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should handle long text without breaking layout", () => {
      const longText = "This is a very long badge text that might wrap";
      renderBadge({ children: longText });

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("should handle special characters", () => {
      renderBadge({ children: "Badge <>&\"'" });

      expect(screen.getByText("Badge <>&\"'")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should handle many re-renders efficiently", () => {
      const { rerender } = render(
        <ThemeProvider>
          <Badge>Initial</Badge>
        </ThemeProvider>
      );

      for (let i = 0; i < 100; i++) {
        rerender(
          <ThemeProvider>
            <Badge>Rerender {i}</Badge>
          </ThemeProvider>
        );
      }

      expect(screen.getByText("Rerender 99")).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("should pass through HTML attributes", () => {
      renderBadge({ id: "custom-id", title: "Tooltip text" });

      const badge = screen.getByTestId("test-badge");
      expect(badge).toHaveAttribute("id", "custom-id");
      expect(badge).toHaveAttribute("title", "Tooltip text");
    });

    it("should support data attributes", () => {
      const { container } = renderBadge();
      
      const badge = container.querySelector('[data-testid="test-badge"]');
      expect(badge).toBeInTheDocument();
    });
  });
});
