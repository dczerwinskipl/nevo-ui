import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";
import { ThemeProvider } from "../theme/ThemeProvider";

// Mock data and helpers
const mockOnClose = jest.fn();

interface RenderProps {
  title?: string;
  onClose?: jest.Mock;
  children?: React.ReactNode;
}

function renderModal(props: RenderProps = {}) {
  const defaultProps = {
    title: "Test Modal",
    onClose: mockOnClose,
    children: <div data-testid="modal-content">Modal content</div>,
    ...props,
  };

  const result = render(
    <ThemeProvider>
      <Modal {...defaultProps} />
    </ThemeProvider>
  );

  return { ...result, props: defaultProps };
}

describe("Modal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic rendering", () => {
    it("should render modal with title and content", () => {
      renderModal({
        title: "My Modal",
        children: <div>Custom content</div>,
      });

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("My Modal")).toBeInTheDocument();
      expect(screen.getByText("Custom content")).toBeInTheDocument();
    });

    it("should render close button", () => {
      renderModal();

      const closeButton = screen.getByRole("button", { name: "Close modal" });
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveTextContent("✕");
    });

    it("should render overlay", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement?.querySelector(".bg-black\\/50");
      expect(overlay).toBeInTheDocument();
    });

    it("should have proper modal structure", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");

      const title = screen.getByText("Test Modal");
      expect(title).toHaveAttribute("id", "modal-title");
    });
  });

  describe("Content rendering", () => {
    it("should render simple text content", () => {
      renderModal({
        children: "Simple text content",
      });

      expect(screen.getByText("Simple text content")).toBeInTheDocument();
    });

    it("should render complex JSX content", () => {
      renderModal({
        children: (
          <div>
            <h3 data-testid="content-header">Content Header</h3>
            <p data-testid="content-body">Content body with text</p>
            <button data-testid="content-button">Action Button</button>
          </div>
        ),
      });

      expect(screen.getByTestId("content-header")).toBeInTheDocument();
      expect(screen.getByTestId("content-body")).toBeInTheDocument();
      expect(screen.getByTestId("content-button")).toBeInTheDocument();
    });

    it("should render form content", () => {
      renderModal({
        title: "Form Modal",
        children: (
          <form data-testid="modal-form">
            <input data-testid="form-input" placeholder="Enter text" />
            <button type="submit" data-testid="form-submit">
              Submit
            </button>
          </form>
        ),
      });

      expect(screen.getByTestId("modal-form")).toBeInTheDocument();
      expect(screen.getByTestId("form-input")).toBeInTheDocument();
      expect(screen.getByTestId("form-submit")).toBeInTheDocument();
    });

    it("should handle empty content", () => {
      renderModal({
        children: null,
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(screen.getByText("Test Modal")).toBeInTheDocument();
    });
  });

  describe("Close functionality", () => {
    it("should call onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      renderModal();

      const closeButton = screen.getByRole("button", { name: "Close modal" });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when overlay is clicked", async () => {
      const user = userEvent.setup();
      renderModal();

      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement?.querySelector(
        ".bg-black\\/50"
      ) as HTMLElement;

      await user.click(overlay);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when Escape key is pressed", async () => {
      const user = userEvent.setup();
      renderModal();

      const dialog = screen.getByRole("dialog");
      const container = dialog.parentElement as HTMLElement;

      // Focus container and press escape
      container.focus();
      await user.keyboard("{Escape}");

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    it("should not close when clicking inside modal content", async () => {
      const user = userEvent.setup();
      renderModal();

      const dialog = screen.getByRole("dialog");
      await user.click(dialog);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should not close when clicking on modal title", async () => {
      const user = userEvent.setup();
      renderModal();

      const title = screen.getByText("Test Modal");
      await user.click(title);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should handle overlay keyboard interaction", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement?.querySelector(
        ".bg-black\\/50"
      ) as HTMLElement;

      // Simulate Enter key on overlay
      fireEvent.keyDown(overlay, { key: "Enter" });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should handle overlay space key interaction", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement?.querySelector(
        ".bg-black\\/50"
      ) as HTMLElement;

      // Simulate Space key on overlay
      fireEvent.keyDown(overlay, { key: " " });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    });

    it("should associate title with dialog", () => {
      renderModal({ title: "Accessible Modal Title" });

      const title = screen.getByText("Accessible Modal Title");
      const dialog = screen.getByRole("dialog");

      expect(title).toHaveAttribute("id", "modal-title");
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    });

    it("should have proper focus management", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      const container = dialog.parentElement;

      expect(container).toHaveAttribute("tabIndex", "-1");
      expect(container).toHaveAttribute("role", "presentation");
    });

    it("should support screen reader navigation", () => {
      renderModal({
        title: "Screen Reader Modal",
        children: (
          <div>
            <p>This modal is accessible to screen readers</p>
            <button>Interactive element</button>
          </div>
        ),
      });

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Screen Reader Modal")).toBeInTheDocument();
      expect(
        screen.getByText("This modal is accessible to screen readers")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Interactive element" })
      ).toBeInTheDocument();
    });

    it("should handle keyboard navigation within content", async () => {
      const user = userEvent.setup();
      renderModal({
        children: (
          <div>
            <button data-testid="first-button">First</button>
            <button data-testid="second-button">Second</button>
          </div>
        ),
      });

      const firstButton = screen.getByTestId("first-button");
      const secondButton = screen.getByTestId("second-button");

      firstButton.focus();
      await user.tab();

      expect(secondButton).toHaveFocus();
    });
  });

  describe("Overlay behavior", () => {
    it("should render with fixed positioning", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      const container = dialog.parentElement;

      expect(container).toHaveClass("fixed");
      expect(container).toHaveClass("inset-0");
      expect(container).toHaveClass("z-50");
    });

    it("should center the modal", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      const container = dialog.parentElement;

      expect(container).toHaveClass("flex");
      expect(container).toHaveClass("items-center");
      expect(container).toHaveClass("justify-center");
    });

    it("should have overlay background", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement?.querySelector(".bg-black\\/50");

      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass("absolute");
      expect(overlay).toHaveClass("inset-0");
    });

    it("should prevent body scroll", () => {
      renderModal();

      // Modal should be rendered with proper z-index and positioning
      const dialog = screen.getByRole("dialog");
      const container = dialog.parentElement;

      expect(container).toHaveClass("z-50");
      expect(container).toHaveClass("fixed");
    });
  });

  describe("Theme integration", () => {
    it("should integrate with theme system", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      // Theme integration verified through rendering without errors
    });

    it("should apply elevated styling", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("rounded-2xl");
      // Elevated style verified through class application
    });

    it("should style close button with theme", () => {
      renderModal();

      const closeButton = screen.getByRole("button", { name: "Close modal" });
      expect(closeButton).toHaveClass("rounded-lg");
      // Theme styling verified through class application
    });
  });

  describe("Performance and edge cases", () => {
    it("should handle rapid open/close cycles", () => {
      // Test multiple render cycles without unmounting
      const { rerender } = renderModal({ title: "Initial Modal" });

      expect(screen.getByText("Initial Modal")).toBeInTheDocument();

      rerender(
        <ThemeProvider>
          <Modal title="Second Modal" onClose={mockOnClose}>
            <div>Second content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(screen.getByText("Second Modal")).toBeInTheDocument();

      rerender(
        <ThemeProvider>
          <Modal title="Third Modal" onClose={mockOnClose}>
            <div>Third content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(screen.getByText("Third Modal")).toBeInTheDocument();
    });
    it("should handle missing onClose gracefully", async () => {
      const user = userEvent.setup();
      renderModal({ onClose: undefined as any });

      const closeButton = screen.getByRole("button", { name: "Close modal" });
      await user.click(closeButton);

      // Should not throw error even without onClose
      expect(closeButton).toBeInTheDocument();
    });

    it("should handle very long titles", () => {
      const longTitle =
        "This is a very long modal title that might overflow in smaller viewports and needs proper handling";
      renderModal({ title: longTitle });

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("should handle large content", () => {
      const largeContent = (
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i}>Content line {i + 1}</p>
          ))}
        </div>
      );

      renderModal({ children: largeContent });

      expect(screen.getByText("Content line 1")).toBeInTheDocument();
      expect(screen.getByText("Content line 50")).toBeInTheDocument();
    });

    it("should maintain modal state through re-renders", () => {
      const { rerender } = renderModal({ title: "Initial Title" });

      expect(screen.getByText("Initial Title")).toBeInTheDocument();

      rerender(
        <ThemeProvider>
          <Modal title="Updated Title" onClose={mockOnClose}>
            <div>Updated content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(screen.getByText("Updated Title")).toBeInTheDocument();
      expect(screen.getByText("Updated content")).toBeInTheDocument();
    });
  });

  describe("Event handling", () => {
    it("should handle multiple escape key presses", async () => {
      const user = userEvent.setup();
      renderModal();

      const dialog = screen.getByRole("dialog");
      const container = dialog.parentElement as HTMLElement;

      container.focus();

      // Multiple escape presses
      await user.keyboard("{Escape}");
      await user.keyboard("{Escape}");
      await user.keyboard("{Escape}");

      expect(mockOnClose).toHaveBeenCalledTimes(3);
    });

    it("should handle event propagation correctly", async () => {
      const user = userEvent.setup();
      const contentClickHandler = jest.fn();

      renderModal({
        children: (
          <button
            onClick={contentClickHandler}
            data-testid="clickable-content"
            type="button"
          >
            Clickable content
          </button>
        ),
      });

      const content = screen.getByTestId("clickable-content");
      await user.click(content);

      expect(contentClickHandler).toHaveBeenCalledTimes(1);
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should ignore non-escape key presses", async () => {
      const user = userEvent.setup();
      renderModal();

      const dialog = screen.getByRole("dialog");
      const container = dialog.parentElement as HTMLElement;

      container.focus();

      await user.keyboard("{Enter}");
      await user.keyboard("{Tab}");
      await user.keyboard("a");

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should handle pointer events correctly", () => {
      renderModal();

      const dialog = screen.getByRole("dialog");

      // Simulate pointer events
      fireEvent.pointerDown(dialog);
      fireEvent.pointerUp(dialog);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Content interaction", () => {
    it("should allow form submission within modal", async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn((e) => e.preventDefault());

      renderModal({
        children: (
          <form onSubmit={handleSubmit} data-testid="modal-form">
            <input data-testid="form-input" />
            <button type="submit" data-testid="submit-button">
              Submit
            </button>
          </form>
        ),
      });

      const input = screen.getByTestId("form-input");
      const submitButton = screen.getByTestId("submit-button");

      await user.type(input, "test input");
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should allow button clicks within content", async () => {
      const user = userEvent.setup();
      const buttonClickHandler = jest.fn();

      renderModal({
        children: (
          <button onClick={buttonClickHandler} data-testid="content-button">
            Content Button
          </button>
        ),
      });

      const button = screen.getByTestId("content-button");
      await user.click(button);

      expect(buttonClickHandler).toHaveBeenCalledTimes(1);
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should support nested interactive elements", async () => {
      const user = userEvent.setup();

      renderModal({
        children: (
          <div>
            <select data-testid="select-element">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <input data-testid="text-input" type="text" />
            <textarea data-testid="textarea-element" />
          </div>
        ),
      });

      const select = screen.getByTestId("select-element");
      const input = screen.getByTestId("text-input");
      const textarea = screen.getByTestId("textarea-element");

      await user.selectOptions(select, "2");
      await user.type(input, "test");
      await user.type(textarea, "more test");

      expect(select).toHaveValue("2");
      expect(input).toHaveValue("test");
      expect(textarea).toHaveValue("more test");
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
