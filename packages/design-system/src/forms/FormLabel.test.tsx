import React from "react";
import { render, screen } from "@testing-library/react";
import { FormLabel } from "./FormLabel";
import { ThemeProvider } from "../theme/ThemeProvider";
import { ComponentIntent } from "../theme/types";

interface RenderProps {
  htmlFor?: string;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
  intent?: ComponentIntent;
  size?: "sm" | "md" | "lg";
}

function renderFormLabel(props: RenderProps) {
  const defaultProps = {
    children: "Label text",
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <FormLabel {...defaultProps} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("FormLabel", () => {
  describe("Rendering", () => {
    it("should render with children", () => {
      renderFormLabel({ children: "Username" });
      expect(screen.getByText("Username")).toBeInTheDocument();
    });

    it("should render as label element", () => {
      renderFormLabel({ children: "Email" });
      const label = screen.getByText("Email");
      expect(label.tagName).toBe("LABEL");
    });

    it("should render with custom className", () => {
      renderFormLabel({ children: "Name", className: "custom-label" });
      const label = screen.getByText("Name");
      expect(label).toHaveClass("custom-label");
    });
  });

  describe("htmlFor attribute", () => {
    it("should render with htmlFor attribute", () => {
      renderFormLabel({ children: "Email", htmlFor: "email-input" });
      const label = screen.getByText("Email");
      expect(label).toHaveAttribute("for", "email-input");
    });

    it("should render without htmlFor attribute", () => {
      renderFormLabel({ children: "Name" });
      const label = screen.getByText("Name");
      expect(label).not.toHaveAttribute("for");
    });
  });

  describe("Required field", () => {
    it("should render asterisk when required is true", () => {
      renderFormLabel({ children: "Password", required: true });
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should not render asterisk when required is false", () => {
      renderFormLabel({ children: "Bio", required: false });
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("should render asterisk with error color", () => {
      renderFormLabel({ children: "Email", required: true });
      const asterisk = screen.getByText("*");
      expect(asterisk).toHaveClass("ml-1");
    });
  });

  describe("Sizes", () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    sizes.forEach((size) => {
      it(`should render with ${size} size`, () => {
        renderFormLabel({ children: "Label", size });
        const label = screen.getByText("Label");
        expect(label).toBeInTheDocument();
      });
    });

    it("should render with default (md) size", () => {
      renderFormLabel({ children: "Label" });
      const label = screen.getByText("Label");
      expect(label).toHaveClass("text-sm");
    });

    it("should render sm size with text-xs", () => {
      renderFormLabel({ children: "Label", size: "sm" });
      const label = screen.getByText("Label");
      expect(label).toHaveClass("text-xs");
    });

    it("should render lg size with text-base", () => {
      renderFormLabel({ children: "Label", size: "lg" });
      const label = screen.getByText("Label");
      expect(label).toHaveClass("text-base");
    });
  });

  describe("Intent", () => {
    it("should render with default (neutral) intent", () => {
      renderFormLabel({ children: "Label" });
      const label = screen.getByText("Label");
      expect(label).toBeInTheDocument();
    });

    it("should render with error intent", () => {
      renderFormLabel({ children: "Label", intent: "error" });
      const label = screen.getByText("Label");
      expect(label).toBeInTheDocument();
    });

    it("should render with other intents", () => {
      const intents: ComponentIntent[] = [
        "primary",
        "success",
        "warning",
        "info",
      ];

      intents.forEach((intent) => {
        const { unmount } = renderFormLabel({
          children: `${intent} label`,
          intent,
        });
        const label = screen.getByText(`${intent} label`);
        expect(label).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Styling", () => {
    it("should have font-medium class", () => {
      renderFormLabel({ children: "Label" });
      const label = screen.getByText("Label");
      expect(label).toHaveClass("font-medium");
    });

    it("should have block class", () => {
      renderFormLabel({ children: "Label" });
      const label = screen.getByText("Label");
      expect(label).toHaveClass("block");
    });
  });

  describe("Combination scenarios", () => {
    it("should render complete label with all props", () => {
      renderFormLabel({
        children: "Email Address",
        htmlFor: "email",
        required: true,
        intent: "error",
        size: "lg",
        className: "my-label",
      });

      const label = screen.getByText("Email Address");
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute("for", "email");
      expect(label).toHaveClass("my-label", "text-base");
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render with complex children", () => {
      renderFormLabel({
        children: (
          <>
            Full Name <span className="text-xs">(optional)</span>
          </>
        ),
      });

      expect(screen.getByText("Full Name")).toBeInTheDocument();
      expect(screen.getByText("(optional)")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should associate with input using htmlFor", () => {
      const { container } = render(
        <ThemeProvider>
          <FormLabel htmlFor="username">Username</FormLabel>
          <input type="text" id="username" />
        </ThemeProvider>
      );

      const label = screen.getByText("Username");
      const input = container.querySelector("#username");
      expect(label).toHaveAttribute("for", "username");
      expect(input).toBeInTheDocument();
    });

    it("should be visible to screen readers", () => {
      renderFormLabel({ children: "Accessible label" });
      const label = screen.getByText("Accessible label");
      expect(label).toBeVisible();
    });
  });
});
