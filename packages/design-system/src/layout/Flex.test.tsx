import { render, screen } from "@testing-library/react";
import { Flex } from "./Flex";

describe("Flex", () => {
  it("renders with default props", () => {
    render(<Flex data-testid="flex">Content</Flex>);
    const flex = screen.getByTestId("flex");
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass("flex", "flex-row", "gap-4");
  });

  it("renders children correctly", () => {
    render(
      <Flex>
        <div>Child 1</div>
        <div>Child 2</div>
      </Flex>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  describe("direction prop", () => {
    it("applies row direction", () => {
      render(
        <Flex direction="row" data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-row");
    });

    it("applies column direction", () => {
      render(
        <Flex direction="column" data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-col");
    });

    it("applies row-reverse direction", () => {
      render(
        <Flex direction="row-reverse" data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-row-reverse");
    });

    it("applies column-reverse direction", () => {
      render(
        <Flex direction="column-reverse" data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-col-reverse");
    });
  });

  describe("gap prop", () => {
    it.each([
      [0, "gap-0"],
      [1, "gap-1"],
      [2, "gap-2"],
      [3, "gap-3"],
      [4, "gap-4"],
      [5, "gap-5"],
      [6, "gap-6"],
      [8, "gap-8"],
      [10, "gap-10"],
      [12, "gap-12"],
    ])("applies gap-%s class for gap=%s", (gap, expectedClass) => {
      render(
        <Flex gap={gap as any} data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass(expectedClass);
    });
  });

  describe("align prop", () => {
    it.each([
      ["start", "items-start"],
      ["center", "items-center"],
      ["end", "items-end"],
      ["stretch", "items-stretch"],
      ["baseline", "items-baseline"],
    ])("applies %s alignment", (align, expectedClass) => {
      render(
        <Flex align={align as any} data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass(expectedClass);
    });
  });

  describe("justify prop", () => {
    it.each([
      ["start", "justify-start"],
      ["center", "justify-center"],
      ["end", "justify-end"],
      ["between", "justify-between"],
      ["around", "justify-around"],
      ["evenly", "justify-evenly"],
    ])("applies %s justification", (justify, expectedClass) => {
      render(
        <Flex justify={justify as any} data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass(expectedClass);
    });
  });

  describe("wrap prop", () => {
    it("applies flex-wrap when wrap is true", () => {
      render(
        <Flex wrap data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-wrap");
    });

    it('applies flex-wrap-reverse when wrap is "reverse"', () => {
      render(
        <Flex wrap="reverse" data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-wrap-reverse");
    });

    it("does not apply wrap class when wrap is false", () => {
      render(
        <Flex wrap={false} data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).not.toHaveClass("flex-wrap");
      expect(flex).not.toHaveClass("flex-wrap-reverse");
    });
  });

  describe("grow and shrink props", () => {
    it("applies flex-grow when grow is true", () => {
      render(
        <Flex grow data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-grow");
    });

    it("applies flex-shrink-0 when shrink is true", () => {
      render(
        <Flex shrink data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId("flex");
      expect(flex).toHaveClass("flex-shrink-0");
    });
  });

  it("forwards className prop", () => {
    render(
      <Flex className="custom-class" data-testid="flex">
        Content
      </Flex>
    );
    const flex = screen.getByTestId("flex");
    expect(flex).toHaveClass("custom-class");
  });

  it("forwards additional HTML attributes", () => {
    render(
      <Flex id="test-id" role="group" data-testid="flex">
        Content
      </Flex>
    );
    const flex = screen.getByTestId("flex");
    expect(flex).toHaveAttribute("id", "test-id");
    expect(flex).toHaveAttribute("role", "group");
  });

  it("combines multiple props correctly", () => {
    render(
      <Flex
        direction="column"
        gap={8}
        align="center"
        justify="between"
        wrap
        className="custom"
        data-testid="flex"
      >
        Content
      </Flex>
    );
    const flex = screen.getByTestId("flex");
    expect(flex).toHaveClass(
      "flex",
      "flex-col",
      "gap-8",
      "items-center",
      "justify-between",
      "flex-wrap",
      "custom"
    );
  });
});
