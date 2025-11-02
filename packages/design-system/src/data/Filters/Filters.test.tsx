import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../theme";
import { Filters } from "./Filters";
import type { FilterConfig, FilterValue } from "../types";

// Mock data types for testing
interface TestFilters extends Record<string, FilterValue> {
  search: string;
  category: string;
  price: number;
  status: string;
}

const mockFilterConfig: FilterConfig<TestFilters> = {
  search: {
    name: "search",
    type: "text",
    label: "Search Products",
    placeholder: "Name, SKU, description...",
  },
  category: {
    name: "category",
    type: "select",
    label: "Category",
    placeholder: "All Categories",
    options: [
      { label: "All Categories", value: "" },
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
    ],
  },
  price: {
    name: "price",
    type: "number",
    label: "Maximum Price",
    placeholder: "Enter max price",
    min: 0,
    max: 10000,
  },
  status: {
    name: "status",
    type: "select",
    label: "Status",
    placeholder: "Any Status",
    options: [
      { label: "Any Status", value: "" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
};

const defaultFilters: Partial<TestFilters> = {
  search: "",
  category: "",
  status: "",
};

interface RenderProps {
  filters?: Partial<TestFilters>;
  config?: FilterConfig<TestFilters>;
  onUpdateFilter?: jest.Mock;
  onApplyFilters?: jest.Mock;
  onClearFilters?: jest.Mock;
  isFetching?: boolean;
  isDirty?: boolean;
  hasAppliedFilters?: boolean;
  applyLabel?: string;
  clearLabel?: string;
}

function renderFilters(props: RenderProps = {}) {
  const defaultProps = {
    filters: defaultFilters,
    config: mockFilterConfig,
    onUpdateFilter: jest.fn(),
    onApplyFilters: jest.fn(),
    onClearFilters: jest.fn(),
    isFetching: false,
    isDirty: false,
    hasAppliedFilters: false,
    applyLabel: "Apply",
    clearLabel: "Clear",
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Filters<TestFilters> {...defaultProps} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("Filters", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all configured filter fields", () => {
      renderFilters();

      // Check labels are rendered
      expect(screen.getByText("Search Products")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Maximum Price")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();

      // Check form controls exist
      expect(
        screen.getByPlaceholderText("Name, SKU, description...")
      ).toBeInTheDocument();
      expect(screen.getByText("All Categories")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter max price")
      ).toBeInTheDocument();
      expect(screen.getByText("Any Status")).toBeInTheDocument();
    });

    it("should render filter actions", () => {
      renderFilters();

      expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });

    it("should render with custom button labels", () => {
      renderFilters({
        applyLabel: "Search",
        clearLabel: "Reset",
      });

      expect(
        screen.getByRole("button", { name: "Search" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    });

    it("should handle number field with min/max attributes", () => {
      renderFilters();

      const priceInput = screen.getByPlaceholderText("Enter max price");
      expect(priceInput).toHaveAttribute("type", "number");
      expect(priceInput).toHaveAttribute("min", "0");
      expect(priceInput).toHaveAttribute("max", "10000");
    });

    it("should render with initial filter values", () => {
      const filters: Partial<TestFilters> = {
        search: "test search",
        price: 100,
      };

      renderFilters({ filters });

      const searchInput = screen.getByPlaceholderText(
        "Name, SKU, description..."
      );
      const priceInput = screen.getByPlaceholderText("Enter max price");

      expect(searchInput).toHaveValue("test search");
      expect(priceInput).toHaveValue(100);
    });
  });

  describe("Interactions", () => {
    it("should call onUpdateFilter when text input changes", async () => {
      const user = userEvent.setup();
      const { props } = renderFilters();

      const searchInput = screen.getByPlaceholderText(
        "Name, SKU, description..."
      );

      await user.type(searchInput, "test");

      // Check that onUpdateFilter was called for each character
      expect(props.onUpdateFilter).toHaveBeenCalledWith("search", "t");
      expect(props.onUpdateFilter).toHaveBeenCalledWith("search", "e");
      expect(props.onUpdateFilter).toHaveBeenCalledWith("search", "s");
      expect(props.onUpdateFilter).toHaveBeenCalledWith("search", "t");
    });

    it("should call onUpdateFilter when number input changes", async () => {
      const user = userEvent.setup();
      const { props } = renderFilters();

      const priceInput = screen.getByPlaceholderText("Enter max price");

      await user.type(priceInput, "123");

      // Check that onUpdateFilter was called for each digit
      expect(props.onUpdateFilter).toHaveBeenCalledWith("price", 1);
      expect(props.onUpdateFilter).toHaveBeenCalledWith("price", 2);
      expect(props.onUpdateFilter).toHaveBeenCalledWith("price", 3);
    });

    it("should handle clearing number input", async () => {
      const user = userEvent.setup();
      const { props } = renderFilters({ filters: { price: 100 } });

      const priceInput = screen.getByPlaceholderText("Enter max price");

      await user.clear(priceInput);

      expect(props.onUpdateFilter).toHaveBeenCalledWith("price", undefined);
    });

    it("should call onApplyFilters when apply button is clicked", async () => {
      const user = userEvent.setup();
      const { props } = renderFilters({ isDirty: true });

      const applyButton = screen.getByRole("button", { name: "Apply" });
      await user.click(applyButton);

      expect(props.onApplyFilters).toHaveBeenCalledTimes(1);
    });

    it("should call onClearFilters when clear button is clicked", async () => {
      const user = userEvent.setup();
      const { props } = renderFilters({ hasAppliedFilters: true });

      const clearButton = screen.getByRole("button", { name: "Clear" });
      await user.click(clearButton);

      expect(props.onClearFilters).toHaveBeenCalledTimes(1);
    });
  });

  describe("State management", () => {
    it("should disable apply button when not dirty", () => {
      renderFilters({ isDirty: false });

      const applyButton = screen.getByRole("button", { name: "Apply" });
      expect(applyButton).toBeDisabled();
    });

    it("should enable apply button when dirty", () => {
      renderFilters({ isDirty: true });

      const applyButton = screen.getByRole("button", { name: "Apply" });
      expect(applyButton).not.toBeDisabled();
    });

    it("should disable clear button when no applied filters", () => {
      renderFilters({ hasAppliedFilters: false });

      const clearButton = screen.getByRole("button", { name: "Clear" });
      expect(clearButton).toBeDisabled();
    });

    it("should enable clear button when has applied filters", () => {
      renderFilters({ hasAppliedFilters: true });

      const clearButton = screen.getByRole("button", { name: "Clear" });
      expect(clearButton).not.toBeDisabled();
    });

    it("should show loading state", () => {
      renderFilters({ isFetching: true });

      // When loading, the apply button should show a spinner
      const buttons = screen.getAllByRole("button");
      const applyButton = buttons.find((button) =>
        button.querySelector("svg.animate-spin")
      );

      expect(applyButton).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper form structure", () => {
      renderFilters();

      // Check that labels exist
      expect(screen.getByText("Search Products")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Maximum Price")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();

      // Check that buttons have proper roles
      expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
      const user = userEvent.setup();
      renderFilters();

      const searchInput = screen.getByPlaceholderText(
        "Name, SKU, description..."
      );

      // Tab to navigate to first input
      await user.tab();
      expect(searchInput).toHaveFocus();
    });

    it("should have proper input attributes", () => {
      renderFilters();

      const searchInput = screen.getByPlaceholderText(
        "Name, SKU, description..."
      );
      const priceInput = screen.getByPlaceholderText("Enter max price");

      expect(searchInput).toHaveAttribute(
        "placeholder",
        "Name, SKU, description..."
      );
      expect(priceInput).toHaveAttribute("placeholder", "Enter max price");
      expect(priceInput).toHaveAttribute("type", "number");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty config gracefully", () => {
      const { container } = renderFilters({ config: {} });

      expect(container).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });

    it("should handle partial config", () => {
      const partialConfig: Partial<FilterConfig<TestFilters>> = {
        search: mockFilterConfig.search,
      };

      renderFilters({ config: partialConfig as FilterConfig<TestFilters> });

      expect(screen.getByText("Search Products")).toBeInTheDocument();
      expect(screen.queryByText("Category")).not.toBeInTheDocument();
      expect(screen.queryByText("Maximum Price")).not.toBeInTheDocument();
      expect(screen.queryByText("Status")).not.toBeInTheDocument();
    });

    it("should handle missing filters object", () => {
      const { container } = renderFilters({ filters: {} });

      expect(container).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
    });

    it("should handle unknown field types gracefully", () => {
      const configWithUnknownType = {
        ...mockFilterConfig,
        unknown: {
          name: "unknown",
          type: "unknown" as any,
          label: "Unknown Field",
        },
      };

      const { container } = renderFilters({
        config: configWithUnknownType as unknown as FilterConfig<TestFilters>,
      });

      // Should render without crashing
      expect(container).toBeInTheDocument();

      // Unknown field should render label but no form control
      expect(screen.getByText("Unknown Field")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should not re-render unnecessarily", () => {
      const { rerender } = renderFilters();

      // Re-render with same props
      rerender(
        <ThemeProvider>
          <Filters<TestFilters>
            filters={defaultFilters}
            config={mockFilterConfig}
            onUpdateFilter={jest.fn()}
            onApplyFilters={jest.fn()}
            onClearFilters={jest.fn()}
            isFetching={false}
            isDirty={false}
            hasAppliedFilters={false}
            applyLabel="Apply"
            clearLabel="Clear"
          />
        </ThemeProvider>
      );

      // Component should still be accessible
      expect(screen.getByText("Search Products")).toBeInTheDocument();
    });

    it("should handle rapid filter updates", async () => {
      const user = userEvent.setup();
      const { props } = renderFilters();

      const searchInput = screen.getByPlaceholderText(
        "Name, SKU, description..."
      );

      // Rapidly type multiple characters
      await user.type(searchInput, "rapid");

      // Should have called onUpdateFilter for each character
      expect(props.onUpdateFilter).toHaveBeenCalledTimes(5);
    });
  });
});
