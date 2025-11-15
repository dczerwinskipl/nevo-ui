import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("Stack", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Stack>
          <div>Child 1</div>
          <div>Child 2</div>
        </Stack>
      );

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      const stack = screen.getByTestId("stack");

      expect(stack).toHaveClass("flex", "flex-col", "gap-4");
    });

    it("forwards custom className", () => {
      render(
        <Stack className="custom-class" data-testid="stack">
          Content
        </Stack>
      );
      const stack = screen.getByTestId("stack");

      expect(stack).toHaveClass("custom-class");
    });

    it("forwards HTML attributes", () => {
      render(
        <Stack data-testid="stack" id="my-stack" aria-label="Test stack">
          Content
        </Stack>
      );
      const stack = screen.getByTestId("stack");

      expect(stack).toHaveAttribute("id", "my-stack");
      expect(stack).toHaveAttribute("aria-label", "Test stack");
    });
  });

  describe("Direction prop", () => {
    it("applies row direction", () => {
      render(
        <Stack direction="row" data-testid="stack">
          Content
        </Stack>
      );
      const stack = screen.getByTestId("stack");

      expect(stack).toHaveClass("flex-row");
      expect(stack).not.toHaveClass("flex-col");
    });

    it("applies column direction (default)", () => {
      render(
        <Stack direction="column" data-testid="stack">
          Content
        </Stack>
      );
      const stack = screen.getByTestId("stack");

      expect(stack).toHaveClass("flex-col");
      expect(stack).not.toHaveClass("flex-row");
    });
  });

  describe("Gap prop", () => {
    it("applies gap-0", () => {
      render(
        <Stack gap={0} data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("gap-0");
    });

    it("applies gap-1", () => {
      render(
        <Stack gap={1} data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("gap-1");
    });

    it("applies gap-4 (default)", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack")).toHaveClass("gap-4");
    });

    it("applies gap-12", () => {
      render(
        <Stack gap={12} data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("gap-12");
    });
  });

  describe("Align prop", () => {
    it("applies items-start", () => {
      render(
        <Stack align="start" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("items-start");
    });

    it("applies items-center", () => {
      render(
        <Stack align="center" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("items-center");
    });

    it("applies items-end", () => {
      render(
        <Stack align="end" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("items-end");
    });

    it("applies items-stretch", () => {
      render(
        <Stack align="stretch" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("items-stretch");
    });

    it("does not apply alignment class when prop is undefined", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      const stack = screen.getByTestId("stack");

      expect(stack).not.toHaveClass("items-start");
      expect(stack).not.toHaveClass("items-center");
    });
  });

  describe("Justify prop", () => {
    it("applies justify-start", () => {
      render(
        <Stack justify="start" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("justify-start");
    });

    it("applies justify-center", () => {
      render(
        <Stack justify="center" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("justify-center");
    });

    it("applies justify-end", () => {
      render(
        <Stack justify="end" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("justify-end");
    });

    it("applies justify-between", () => {
      render(
        <Stack justify="between" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("justify-between");
    });

    it("applies justify-around", () => {
      render(
        <Stack justify="around" data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("justify-around");
    });
  });

  describe("Wrap prop", () => {
    it("applies flex-wrap when wrap is true", () => {
      render(
        <Stack wrap data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).toHaveClass("flex-wrap");
    });

    it("does not apply flex-wrap when wrap is false", () => {
      render(
        <Stack wrap={false} data-testid="stack">
          Content
        </Stack>
      );
      expect(screen.getByTestId("stack")).not.toHaveClass("flex-wrap");
    });

    it("does not apply flex-wrap by default", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack")).not.toHaveClass("flex-wrap");
    });
  });

  describe("Combined props", () => {
    it("applies multiple props correctly", () => {
      render(
        <Stack
          direction="row"
          gap={6}
          align="center"
          justify="between"
          wrap
          className="custom"
          data-testid="stack"
        >
          Content
        </Stack>
      );
      const stack = screen.getByTestId("stack");

      expect(stack).toHaveClass(
        "flex",
        "flex-row",
        "gap-6",
        "items-center",
        "justify-between",
        "flex-wrap",
        "custom"
      );
    });
  });
});
