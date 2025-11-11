import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  it("renders with default props", () => {
    render(<Container data-testid="container">Content</Container>);
    const container = screen.getByTestId("container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("max-w-7xl", "px-4");
  });

  it("renders children correctly", () => {
    render(
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
      </Container>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  describe("size prop", () => {
    it.each([
      ["sm", "max-w-sm"],
      ["md", "max-w-md"],
      ["lg", "max-w-lg"],
      ["xl", "max-w-xl"],
      ["2xl", "max-w-2xl"],
      ["4xl", "max-w-4xl"],
      ["7xl", "max-w-7xl"],
      ["full", "max-w-full"],
    ])("applies %s max-width class for size=%s", (size, expectedClass) => {
      render(
        <Container size={size as any} data-testid="container">
          Content
        </Container>
      );
      const container = screen.getByTestId("container");
      expect(container).toHaveClass(expectedClass);
    });
  });

  describe("padding prop", () => {
    it.each([
      [0, "px-0"],
      [2, "px-2"],
      [4, "px-4"],
      [6, "px-6"],
      [8, "px-8"],
    ])("applies px-%s class for padding=%s", (padding, expectedClass) => {
      render(
        <Container padding={padding as any} data-testid="container">
          Content
        </Container>
      );
      const container = screen.getByTestId("container");
      expect(container).toHaveClass(expectedClass);
    });
  });

  describe("center prop", () => {
    it("applies mx-auto when center is true", () => {
      render(
        <Container center data-testid="container">
          Content
        </Container>
      );
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("mx-auto");
    });

    it("does not apply mx-auto when center is false", () => {
      render(
        <Container center={false} data-testid="container">
          Content
        </Container>
      );
      const container = screen.getByTestId("container");
      expect(container).not.toHaveClass("mx-auto");
    });
  });

  it("forwards className prop", () => {
    render(
      <Container className="custom-class" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId("container");
    expect(container).toHaveClass("custom-class");
  });

  it("forwards additional HTML attributes", () => {
    render(
      <Container id="test-id" role="main" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId("container");
    expect(container).toHaveAttribute("id", "test-id");
    expect(container).toHaveAttribute("role", "main");
  });

  it("combines multiple props correctly", () => {
    render(
      <Container
        size="xl"
        padding={8}
        center
        className="custom"
        data-testid="container"
      >
        Content
      </Container>
    );
    const container = screen.getByTestId("container");
    expect(container).toHaveClass("max-w-xl", "px-8", "mx-auto", "custom");
  });
});
