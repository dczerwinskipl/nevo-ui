import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";
import { ThemeProvider } from "../theme/ThemeProvider";

interface RenderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

function renderEmptyState(props: RenderProps) {
  const result = render(
    <ThemeProvider>
      <EmptyState {...props} />
    </ThemeProvider>
  );

  return { ...result, props };
}

describe("EmptyState", () => {
  const defaultProps = {
    title: "No data found",
    description: "There are no items to display at this time.",
  };

  describe("Rendering", () => {
    it("should render with required props", () => {
      renderEmptyState(defaultProps);
      expect(screen.getByText("No data found")).toBeInTheDocument();
      expect(
        screen.getByText("There are no items to display at this time.")
      ).toBeInTheDocument();
    });

    it("should render title as heading", () => {
      renderEmptyState(defaultProps);
      const title = screen.getByText("No data found");
      expect(title.tagName).toBe("H3");
    });

    it("should render description as paragraph", () => {
      renderEmptyState(defaultProps);
      const description = screen.getByText(
        "There are no items to display at this time."
      );
      expect(description.tagName).toBe("P");
    });
  });

  describe("Icon", () => {
    it("should render without icon", () => {
      const { container } = renderEmptyState(defaultProps);
      const iconContainer = container.querySelector(".text-4xl");
      expect(iconContainer).not.toBeInTheDocument();
    });

    it("should render with icon", () => {
      const CustomIcon = () => <span data-testid="custom-icon">📭</span>;
      renderEmptyState({
        ...defaultProps,
        icon: <CustomIcon />,
      });
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should render icon with proper styling", () => {
      const { container } = renderEmptyState({
        ...defaultProps,
        icon: <span>Icon</span>,
      });
      const iconContainer = container.querySelector(".text-4xl");
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer?.className).toContain("opacity-50");
    });
  });

  describe("Content", () => {
    it("should render custom title", () => {
      renderEmptyState({
        title: "Custom Title",
        description: "Custom description",
      });
      expect(screen.getByText("Custom Title")).toBeInTheDocument();
    });

    it("should render custom description", () => {
      renderEmptyState({
        title: "Title",
        description: "This is a custom description with more details.",
      });
      expect(
        screen.getByText("This is a custom description with more details.")
      ).toBeInTheDocument();
    });

    it("should render long description", () => {
      const longDescription =
        "This is a very long description that explains in detail why there is no data available and what the user should do next.";
      renderEmptyState({
        title: "Empty",
        description: longDescription,
      });
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have centered layout", () => {
      const { container } = renderEmptyState(defaultProps);
      const wrapper = container.querySelector(".flex.flex-col") as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.className).toContain("flex");
      expect(wrapper.className).toContain("flex-col");
      expect(wrapper.className).toContain("items-center");
    });

    it("should have proper spacing", () => {
      const { container } = renderEmptyState(defaultProps);
      const wrapper = container.querySelector(".flex.flex-col") as HTMLElement;
      expect(wrapper.className).toContain("py-16");
      expect(wrapper.className).toContain("px-4");
    });

    it("should have text-center alignment", () => {
      const { container } = renderEmptyState(defaultProps);
      const wrapper = container.querySelector(".flex.flex-col") as HTMLElement;
      expect(wrapper.className).toContain("text-center");
    });
  });

  describe("Accessibility", () => {
    it("should have semantic HTML structure", () => {
      renderEmptyState(defaultProps);
      const title = screen.getByRole("heading", { level: 3 });
      expect(title).toHaveTextContent("No data found");
    });

    it("should be keyboard accessible", () => {
      const { container } = renderEmptyState(defaultProps);
      const wrapper = container.querySelector(".flex.flex-col") as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toBeVisible();
    });
  });

  describe("Common use cases", () => {
    it("should render for empty product list", () => {
      renderEmptyState({
        title: "No products found",
        description: "Try adjusting your filters or search criteria.",
        icon: <span>🛍️</span>,
      });
      expect(screen.getByText("No products found")).toBeInTheDocument();
    });

    it("should render for empty search results", () => {
      renderEmptyState({
        title: "No results",
        description: 'No items match your search for "example".',
      });
      expect(screen.getByText("No results")).toBeInTheDocument();
    });

    it("should render for empty notifications", () => {
      renderEmptyState({
        title: "All caught up!",
        description: "You have no new notifications.",
        icon: <span>🔔</span>,
      });
      expect(screen.getByText("All caught up!")).toBeInTheDocument();
    });
  });
});
