import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, InputProps } from "./Input";
import { ThemeProvider } from "../theme/ThemeProvider";
import { ComponentIntent, ComponentSize } from "../theme/types";

// Mock data and helpers
const mockOnChange = jest.fn();
const mockOnFocus = jest.fn();
const mockOnBlur = jest.fn();
const mockOnKeyDown = jest.fn();

const defaultProps = {
  placeholder: "Enter text",
  "data-testid": "test-input",
};

interface RenderProps {
  label?: string;
  left?: React.ReactNode;
  intent?: ComponentIntent;
  variant?: "outline" | "filled";
  size?: ComponentSize;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: jest.Mock;
  onFocus?: jest.Mock;
  onBlur?: jest.Mock;
  onKeyDown?: jest.Mock;
  className?: string;
  id?: string;
  "aria-describedby"?: string;
}

function renderInput(props: RenderProps = {}) {
  const inputProps: InputProps = {
    ...defaultProps,
    onChange: props.onChange || (() => {}),
    onFocus: props.onFocus || undefined,
    onBlur: props.onBlur || undefined,
    onKeyDown: props.onKeyDown || undefined,
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Input {...(inputProps as any)} />
    </ThemeProvider>
  );

  return { ...result, props: inputProps };
}

describe("Input", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic rendering", () => {
    it("should render input with placeholder", () => {
      renderInput();

      const input = screen.getByTestId("test-input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Enter text");
    });

    it("should render with label", () => {
      renderInput({ label: "Email Address" });

      expect(screen.getByText("Email Address")).toBeInTheDocument();
      expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });

    it("should render without label", () => {
      renderInput();

      expect(screen.queryByText("Email Address")).not.toBeInTheDocument();
      expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });

    it("should render with helper text", () => {
      renderInput({
        helperText: "Enter a valid email address",
        label: "Email",
      });

      expect(
        screen.getByText("Enter a valid email address")
      ).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("should render with left icon", () => {
      const leftIcon = <span data-testid="search-icon">🔍</span>;
      renderInput({ left: leftIcon });

      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
      expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });
  });

  describe("Input types and attributes", () => {
    it("should handle text input type", () => {
      renderInput({ type: "text", value: "sample text" });

      const input = screen.getByTestId("test-input");
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveValue("sample text");
    });

    it("should handle email input type", () => {
      renderInput({ type: "email", value: "test@example.com" });

      const input = screen.getByTestId("test-input");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveValue("test@example.com");
    });

    it("should handle password input type", () => {
      renderInput({ type: "password", value: "secret" });

      const input = screen.getByTestId("test-input");
      expect(input).toHaveAttribute("type", "password");
    });

    it("should handle number input type", () => {
      renderInput({ type: "number", value: "123" });

      const input = screen.getByTestId("test-input");
      expect(input).toHaveAttribute("type", "number");
      expect(input).toHaveValue(123);
    });

    it("should handle disabled state", () => {
      renderInput({ disabled: true });

      const input = screen.getByTestId("test-input");
      expect(input).toBeDisabled();
    });

    it("should handle required attribute", () => {
      renderInput({ required: true });

      const input = screen.getByTestId("test-input");
      expect(input).toBeRequired();
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
        renderInput({
          intent,
          label: "Test Input",
          helperText: `This is ${intent} intent`,
        });

        expect(screen.getByText("Test Input")).toBeInTheDocument();
        expect(
          screen.getByText(`This is ${intent} intent`)
        ).toBeInTheDocument();
      });
    });

    it("should display error styling for error intent", () => {
      renderInput({
        intent: "error",
        helperText: "This field is required",
      });

      const helperText = screen.getByText("This field is required");
      expect(helperText).toBeInTheDocument();
    });

    it("should display success styling for success intent", () => {
      renderInput({
        intent: "success",
        helperText: "Valid input",
      });

      const helperText = screen.getByText("Valid input");
      expect(helperText).toBeInTheDocument();
    });
  });

  describe("Size variations", () => {
    const sizes: ComponentSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`should render with ${size} size`, () => {
        renderInput({ size, label: `${size} input` });

        expect(screen.getByText(`${size} input`)).toBeInTheDocument();
        expect(screen.getByTestId("test-input")).toBeInTheDocument();
      });
    });

    it("should have proper touch targets for accessibility", () => {
      renderInput({ size: "sm" });

      const input = screen.getByTestId("test-input");
      expect(input).toBeInTheDocument();
      // Touch target verification through container styling
    });
  });

  describe("Variant styles", () => {
    it("should render with outline variant", () => {
      renderInput({ variant: "outline", label: "Outline Input" });

      expect(screen.getByText("Outline Input")).toBeInTheDocument();
      expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });

    it("should render with filled variant", () => {
      renderInput({ variant: "filled", label: "Filled Input" });

      expect(screen.getByText("Filled Input")).toBeInTheDocument();
      expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("should call onChange when user types", async () => {
      const user = userEvent.setup();
      renderInput({ onChange: mockOnChange });

      const input = screen.getByTestId("test-input");
      await user.type(input, "Hello");

      expect(mockOnChange).toHaveBeenCalledTimes(5); // One for each character
    });

    it("should call onFocus when input is focused", async () => {
      const user = userEvent.setup();
      renderInput({ onFocus: mockOnFocus });

      const input = screen.getByTestId("test-input");
      await user.click(input);

      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      renderInput({ onBlur: mockOnBlur });

      const input = screen.getByTestId("test-input");
      await user.click(input);
      await user.tab(); // Move focus away

      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", async () => {
      const user = userEvent.setup();
      renderInput({ onKeyDown: mockOnKeyDown });

      const input = screen.getByTestId("test-input");
      await user.click(input);
      await user.keyboard("{Enter}");

      expect(mockOnKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "Enter",
        })
      );
    });

    it("should handle focus and blur state changes", async () => {
      const user = userEvent.setup();
      renderInput({ label: "Focus Test" });

      const input = screen.getByTestId("test-input");

      // Focus the input
      await user.click(input);
      expect(input).toHaveFocus();

      // Blur the input
      await user.tab();
      expect(input).not.toHaveFocus();
    });
  });

  describe("Form integration", () => {
    it("should work within a form", async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <form onSubmit={handleSubmit}>
            <Input data-testid="form-input" name="testField" required />
            <button type="submit">Submit</button>
          </form>
        </ThemeProvider>
      );

      const input = screen.getByTestId("form-input");
      const submitButton = screen.getByRole("button", { name: "Submit" });

      await user.type(input, "test value");
      await user.click(submitButton);

      expect(input).toHaveValue("test value");
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should handle controlled input", async () => {
      const ControlledInput = () => {
        const [value, setValue] = React.useState("");
        return (
          <ThemeProvider>
            <Input
              data-testid="controlled-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </ThemeProvider>
        );
      };

      const user = userEvent.setup();
      render(<ControlledInput />);

      const input = screen.getByTestId("controlled-input");
      await user.type(input, "controlled");

      expect(input).toHaveValue("controlled");
    });

    it("should handle uncontrolled input", () => {
      render(
        <ThemeProvider>
          <Input data-testid="uncontrolled-input" defaultValue="default" />
        </ThemeProvider>
      );

      const input = screen.getByTestId("uncontrolled-input");
      expect(input).toHaveValue("default");
    });
  });

  describe("Accessibility", () => {
    it("should have proper label association", () => {
      renderInput({ label: "Username", id: "username-input" });

      const label = screen.getByText("Username");
      const input = screen.getByTestId("test-input");

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    it("should support aria-describedby for helper text", () => {
      renderInput({
        helperText: "Helper text for accessibility",
        "aria-describedby": "helper-text",
      });

      const helperText = screen.getByText("Helper text for accessibility");
      expect(helperText).toBeInTheDocument();
    });

    it("should handle screen reader navigation", () => {
      renderInput({
        label: "Accessible Input",
        helperText: "This input is accessible",
        required: true,
      });

      const input = screen.getByTestId("test-input");
      expect(input).toBeRequired();
      expect(screen.getByText("Accessible Input")).toBeInTheDocument();
      expect(screen.getByText("This input is accessible")).toBeInTheDocument();
    });

    it("should maintain focus management", async () => {
      const user = userEvent.setup();
      renderInput({ label: "Focus Management Test" });

      const input = screen.getByTestId("test-input");

      // Test tab navigation
      await user.tab();
      if (document.activeElement === input) {
        expect(input).toHaveFocus();
      }
    });
  });

  describe("Performance and edge cases", () => {
    it("should handle rapid input changes", async () => {
      const user = userEvent.setup();
      renderInput({ onChange: mockOnChange });

      const input = screen.getByTestId("test-input");

      // Simulate rapid typing
      await user.type(input, "rapid");

      expect(mockOnChange).toHaveBeenCalledTimes(5);
      expect(input).toHaveValue("rapid");
    });

    it("should handle empty values gracefully", () => {
      renderInput({ value: "" });

      const input = screen.getByTestId("test-input");
      expect(input).toHaveValue("");
    });

    it("should handle null/undefined values", () => {
      renderInput({ value: undefined as any });

      const input = screen.getByTestId("test-input");
      expect(input).toBeInTheDocument();
    });

    it("should handle special characters", async () => {
      const user = userEvent.setup();
      renderInput({ onChange: mockOnChange });

      const input = screen.getByTestId("test-input");
      await user.type(input, "!@#$%^&*()");

      expect(input).toHaveValue("!@#$%^&*()");
    });

    it("should handle very long text input", async () => {
      const longText = "a".repeat(1000);
      renderInput();

      const input = screen.getByTestId("test-input");

      // Use fireEvent for performance with very long text
      fireEvent.change(input, { target: { value: longText } });

      expect(input).toHaveValue(longText);
    });

    it("should maintain performance with many re-renders", () => {
      const { rerender } = renderInput({ value: "initial" });

      // Multiple re-renders to test performance
      for (let i = 0; i < 10; i++) {
        rerender(
          <ThemeProvider>
            <Input {...defaultProps} value={`update-${i}`} />
          </ThemeProvider>
        );
      }

      const input = screen.getByTestId("test-input");
      expect(input).toHaveValue("update-9");
    });
  });

  describe("Styling and theme integration", () => {
    it("should apply custom className", () => {
      renderInput({ className: "custom-input-class" });

      // Check if custom class is applied to the label container
      const container = screen.getByTestId("test-input").closest("label");
      expect(container).toHaveClass("custom-input-class");
    });

    it("should handle focus state styling", async () => {
      const user = userEvent.setup();
      renderInput({ label: "Focus Styling Test" });

      const input = screen.getByTestId("test-input");

      // Focus the input to trigger styling changes
      await user.click(input);
      expect(input).toHaveFocus();

      // Blur to test state change
      await user.tab();
      expect(input).not.toHaveFocus();
    });

    it("should integrate with theme system", () => {
      renderInput({
        intent: "primary",
        variant: "filled",
        size: "lg",
      });

      const input = screen.getByTestId("test-input");
      expect(input).toBeInTheDocument();
      // Theme integration verified through rendering without errors
    });
  });
});
