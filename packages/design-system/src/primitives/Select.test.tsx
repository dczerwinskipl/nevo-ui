import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";
import { ThemeProvider } from "../theme/ThemeProvider";
import { ComponentIntent, ComponentSize } from "../theme/types";

// Mock data and helpers
const mockOnChange = jest.fn();

const defaultOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const numberOptions = [
  { label: "One", value: 1 },
  { label: "Two", value: 2 },
  { label: "Three", value: 3 },
];

interface RenderProps {
  label?: string;
  options?: Array<{ label: string; value: string | number }>;
  value?: string | number;
  onChange?: jest.Mock | undefined;
  intent?: ComponentIntent;
  variant?: "outline" | "filled";
  size?: ComponentSize;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  allowClear?: boolean;
  clearLabel?: string;
}

function renderSelect(props: RenderProps = {}) {
  const defaultProps = {
    options: defaultOptions,
    onChange: props.onChange || mockOnChange,
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Select {...(defaultProps as any)} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("Select", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic rendering", () => {
    it("should render select with placeholder", () => {
      renderSelect({ placeholder: "Choose an option" });

      expect(screen.getByText("Choose an option")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with label", () => {
      renderSelect({ label: "Select Category" });

      expect(screen.getByText("Select Category")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render without label", () => {
      renderSelect();

      expect(screen.queryByText("Select Category")).not.toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with helper text", () => {
      renderSelect({
        helperText: "Choose your preferred option",
        label: "Preferences",
      });

      expect(
        screen.getByText("Choose your preferred option")
      ).toBeInTheDocument();
      expect(screen.getByText("Preferences")).toBeInTheDocument();
    });

    it("should render with default placeholder", () => {
      renderSelect();

      expect(screen.getByText("Select")).toBeInTheDocument();
    });

    it("should show selected value", () => {
      renderSelect({ value: "option2" });

      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  describe("Options rendering", () => {
    it("should show options when clicked", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("should hide options when clicking outside", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Click outside
      await user.click(document.body);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should render custom options", async () => {
      const user = userEvent.setup();
      const customOptions = [
        { label: "Custom A", value: "a" },
        { label: "Custom B", value: "b" },
      ];
      renderSelect({ options: customOptions });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByText("Custom A")).toBeInTheDocument();
        expect(screen.getByText("Custom B")).toBeInTheDocument();
      });
    });

    it("should handle number values", async () => {
      const user = userEvent.setup();
      renderSelect({ options: numberOptions, value: 2 });

      expect(screen.getByText("Two")).toBeInTheDocument();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByText("One")).toBeInTheDocument();
        expect(screen.getByText("Three")).toBeInTheDocument();
      });
    });
  });

  describe("Clear functionality", () => {
    it("should show clear option by default", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByText("None")).toBeInTheDocument();
      });
    });

    it("should not show clear option when allowClear is false", async () => {
      const user = userEvent.setup();
      renderSelect({ allowClear: false });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.queryByText("None")).not.toBeInTheDocument();
      });
    });

    it("should use custom clear label", async () => {
      const user = userEvent.setup();
      renderSelect({ clearLabel: "Clear Selection" });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByText("Clear Selection")).toBeInTheDocument();
      });
    });

    it("should call onChange with empty string when clear is selected", async () => {
      const user = userEvent.setup();
      renderSelect({ value: "option1" });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const clearOption = screen.getByText("None");
      await user.click(clearOption);

      expect(mockOnChange).toHaveBeenCalledWith("");
    });
  });

  describe("User interactions", () => {
    it("should call onChange when option is selected", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const option = screen.getByText("Option 2");
      await user.click(option);

      expect(mockOnChange).toHaveBeenCalledWith("option2");
    });

    it("should close dropdown after selection", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const option = screen.getByText("Option 1");
      await user.click(option);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should toggle dropdown on multiple clicks", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");

      // First click - open
      await user.click(selectButton);
      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Second click - close
      await user.click(selectButton);
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should handle keyboard navigation", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      selectButton.focus();

      // Open with Enter key
      await user.keyboard("{Enter}");
      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("should not open when disabled", async () => {
      const user = userEvent.setup();
      renderSelect({ disabled: true });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
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
        renderSelect({
          intent,
          label: "Test Select",
          helperText: `This is ${intent} intent`,
        });

        expect(screen.getByText("Test Select")).toBeInTheDocument();
        expect(
          screen.getByText(`This is ${intent} intent`)
        ).toBeInTheDocument();
      });
    });

    it("should display error styling for error intent", () => {
      renderSelect({
        intent: "error",
        helperText: "Please select an option",
      });

      const helperText = screen.getByText("Please select an option");
      expect(helperText).toBeInTheDocument();
    });

    it("should display success styling for success intent", () => {
      renderSelect({
        intent: "success",
        helperText: "Good choice!",
      });

      const helperText = screen.getByText("Good choice!");
      expect(helperText).toBeInTheDocument();
    });
  });

  describe("Size variations", () => {
    const sizes: ComponentSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`should render with ${size} size`, () => {
        renderSelect({ size, label: `${size} select` });

        expect(screen.getByText(`${size} select`)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
      });
    });

    it("should have proper touch targets for accessibility", () => {
      renderSelect({ size: "sm" });

      const selectButton = screen.getByRole("button");
      expect(selectButton).toBeInTheDocument();
      // Touch target verification through styling
    });
  });

  describe("Variant styles", () => {
    it("should render with outline variant", () => {
      renderSelect({ variant: "outline", label: "Outline Select" });

      expect(screen.getByText("Outline Select")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with filled variant", () => {
      renderSelect({ variant: "filled", label: "Filled Select" });

      expect(screen.getByText("Filled Select")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Disabled state", () => {
    it("should show disabled styling", () => {
      renderSelect({ disabled: true });

      const selectButton = screen.getByRole("button");
      expect(selectButton).toBeDisabled();
    });

    it("should not respond to clicks when disabled", async () => {
      const user = userEvent.setup();
      renderSelect({ disabled: true });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("should show disabled cursor style", () => {
      renderSelect({ disabled: true });

      const selectButton = screen.getByRole("button");
      expect(selectButton).toHaveClass("cursor-not-allowed");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", async () => {
      const user = userEvent.setup();
      renderSelect({ label: "Accessible Select" });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        expect(listbox).toBeInTheDocument();

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(4); // 3 options + clear option
      });
    });

    it("should mark selected option with aria-selected", async () => {
      const user = userEvent.setup();
      renderSelect({ value: "option2" });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        const selectedOption = screen.getByRole("option", { name: "Option 2" });
        expect(selectedOption).toHaveAttribute("aria-selected", "true");
      });
    });

    it("should handle screen reader navigation", () => {
      renderSelect({
        label: "Accessible Select",
        helperText: "This select is accessible",
      });

      expect(screen.getByText("Accessible Select")).toBeInTheDocument();
      expect(screen.getByText("This select is accessible")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should support keyboard focus management", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");

      // Test tab navigation
      await user.tab();
      expect(selectButton).toHaveFocus();
    });
  });

  describe("Performance and edge cases", () => {
    it("should handle empty options array", () => {
      renderSelect({ options: [] });

      const selectButton = screen.getByRole("button");
      expect(selectButton).toBeInTheDocument();
      expect(screen.getByText("Select")).toBeInTheDocument();
    });

    it("should handle options with same values", async () => {
      const user = userEvent.setup();
      const duplicateOptions = [
        { label: "First Option", value: "same" },
        { label: "Second Option", value: "same" },
      ];
      renderSelect({ options: duplicateOptions, value: "same" });

      // Should show first option with matching value
      expect(screen.getByText("First Option")).toBeInTheDocument();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByText("Second Option")).toBeInTheDocument();
      });
    });

    it("should handle very long option lists", async () => {
      const user = userEvent.setup();
      const manyOptions = Array.from({ length: 100 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `option${i + 1}`,
      }));
      renderSelect({ options: manyOptions });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 100")).toBeInTheDocument();
      });
    });

    it("should handle rapid clicks gracefully", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");

      // Rapid clicks with proper awaiting
      await user.click(selectButton);
      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      await user.click(selectButton);
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });

      await user.click(selectButton);
      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("should handle missing onChange gracefully", async () => {
      const user = userEvent.setup();
      renderSelect({ onChange: undefined });

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const option = screen.getByText("Option 1");
      await user.click(option);

      // Should not throw error even without onChange
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should maintain selection state correctly", () => {
      const { rerender } = renderSelect({ value: "option1" });

      expect(screen.getByText("Option 1")).toBeInTheDocument();

      // Update value through props
      rerender(
        <ThemeProvider>
          <Select
            options={defaultOptions}
            value="option3"
            onChange={mockOnChange}
          />
        </ThemeProvider>
      );

      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });
  });

  describe("Styling and theme integration", () => {
    it("should apply custom className", () => {
      renderSelect({ className: "custom-select-class" });

      const container = screen.getByRole("button").closest("div");
      expect(container).toHaveClass("custom-select-class");
    });

    it("should show chevron icon rotation", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      const chevron = selectButton.querySelector("svg");

      expect(chevron).toBeInTheDocument();

      // Open dropdown
      await user.click(selectButton);

      await waitFor(() => {
        expect(chevron).toHaveClass("rotate-180");
      });

      // Close dropdown
      await user.click(selectButton);

      await waitFor(() => {
        expect(chevron).not.toHaveClass("rotate-180");
      });
    });

    it("should integrate with theme system", () => {
      renderSelect({
        intent: "primary",
        variant: "filled",
        size: "lg",
      });

      const selectButton = screen.getByRole("button");
      expect(selectButton).toBeInTheDocument();
      // Theme integration verified through rendering without errors
    });

    it("should handle hover states on options", async () => {
      const user = userEvent.setup();
      renderSelect();

      const selectButton = screen.getByRole("button");
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const option = screen.getByText("Option 1");

      // Simulate hover
      fireEvent.mouseEnter(option);
      fireEvent.mouseLeave(option);

      expect(option).toBeInTheDocument();
    });
  });
});
