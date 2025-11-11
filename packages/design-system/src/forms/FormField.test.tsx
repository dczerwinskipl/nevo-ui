import React from "react";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";
import { ThemeProvider } from "../theme/ThemeProvider";

interface RenderProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function renderFormField(props: RenderProps) {
  const defaultProps = {
    children: <input type="text" placeholder="Test input" />,
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <FormField {...defaultProps} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("FormField", () => {
  describe("Rendering", () => {
    it("should render with children", () => {
      renderFormField({
        children: <input type="text" data-testid="test-input" />,
      });
      expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });

    it("should render with label", () => {
      renderFormField({ label: "Username" });
      expect(screen.getByText("Username")).toBeInTheDocument();
    });

    it("should render without label", () => {
      const { container } = renderFormField({});
      const label = container.querySelector("label");
      expect(label).not.toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = renderFormField({ className: "custom-field" });
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("custom-field");
    });
  });

  describe("Required field", () => {
    it("should render asterisk when required is true", () => {
      renderFormField({ label: "Email", required: true });
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should not render asterisk when required is false", () => {
      renderFormField({ label: "Email", required: false });
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("should not render asterisk when no label", () => {
      renderFormField({ required: true });
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
  });

  describe("Hint text", () => {
    it("should render hint when provided", () => {
      renderFormField({ hint: "Enter your username" });
      expect(screen.getByText("Enter your username")).toBeInTheDocument();
    });

    it("should not render hint when not provided", () => {
      const { container } = renderFormField({});
      const hint = container.querySelector(".text-xs");
      expect(hint).not.toBeInTheDocument();
    });

    it("should hide hint when error is present", () => {
      renderFormField({
        hint: "This is a hint",
        error: "This is an error",
      });
      expect(screen.queryByText("This is a hint")).not.toBeInTheDocument();
      expect(screen.getByText("This is an error")).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("should render error message", () => {
      renderFormField({ error: "This field is required" });
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should not render error when not provided", () => {
      const { container } = renderFormField({});
      const errors = container.querySelectorAll('[style*="error"]');
      expect(errors.length).toBe(0);
    });

    it("should style label with error color when error exists", () => {
      renderFormField({
        label: "Email",
        error: "Invalid email",
      });
      const label = screen.getByText("Email");
      expect(label).toBeInTheDocument();
    });
  });

  describe("Children rendering", () => {
    it("should render input as child", () => {
      renderFormField({
        children: <input type="email" data-testid="email-input" />,
      });
      expect(screen.getByTestId("email-input")).toBeInTheDocument();
    });

    it("should render select as child", () => {
      renderFormField({
        children: (
          <select data-testid="select-input">
            <option>Option 1</option>
          </select>
        ),
      });
      expect(screen.getByTestId("select-input")).toBeInTheDocument();
    });

    it("should render textarea as child", () => {
      renderFormField({
        children: <textarea data-testid="textarea-input" />,
      });
      expect(screen.getByTestId("textarea-input")).toBeInTheDocument();
    });

    it("should render custom component as child", () => {
      const CustomInput = () => <div data-testid="custom">Custom</div>;
      renderFormField({
        children: <CustomInput />,
      });
      expect(screen.getByTestId("custom")).toBeInTheDocument();
    });
  });

  describe("Combination scenarios", () => {
    it("should render complete form field with all props", () => {
      renderFormField({
        label: "Password",
        required: true,
        hint: "Must be at least 8 characters",
        children: <input type="password" data-testid="password" />,
        className: "my-field",
      });

      expect(screen.getByText("Password")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
      expect(
        screen.getByText("Must be at least 8 characters")
      ).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
    });

    it("should render field with label and error", () => {
      renderFormField({
        label: "Username",
        error: "Username is already taken",
        children: <input type="text" />,
      });

      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Username is already taken")).toBeInTheDocument();
    });

    it("should render field with error hiding hint", () => {
      renderFormField({
        hint: "Choose a unique username",
        error: "Username is required",
        children: <input type="text" />,
      });

      expect(
        screen.queryByText("Choose a unique username")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper label association", () => {
      renderFormField({
        label: "Email",
        children: <input type="email" id="email-input" />,
      });
      const label = screen.getByText("Email");
      expect(label.tagName).toBe("LABEL");
    });

    it("should render error with appropriate styling", () => {
      renderFormField({
        error: "Error message",
      });
      const error = screen.getByText("Error message");
      expect(error).toHaveClass("text-xs");
    });
  });
});
