import { render, screen } from "@testing-library/react";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders with default props", () => {
    render(<Grid data-testid="grid">Content</Grid>);
    const grid = screen.getByTestId("grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid", "grid-cols-1", "gap-4");
  });

  it("renders children correctly", () => {
    render(
      <Grid>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  describe("cols prop", () => {
    it.each([
      [1, "grid-cols-1"],
      [2, "grid-cols-2"],
      [3, "grid-cols-3"],
      [4, "grid-cols-4"],
      [5, "grid-cols-5"],
      [6, "grid-cols-6"],
      [12, "grid-cols-12"],
    ])("applies grid-cols-%s class for cols=%s", (cols, expectedClass) => {
      render(
        <Grid cols={cols as any} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass(expectedClass);
    });

    it('applies auto-cols class for cols="auto"', () => {
      render(
        <Grid cols="auto" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid-cols-auto");
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
        <Grid gap={gap as any} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass(expectedClass);
    });
  });

  describe("rows prop", () => {
    it("applies grid-rows-{n} class for numeric rows", () => {
      render(
        <Grid rows={3} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("grid-rows-3");
    });

    it('applies auto-rows class for rows="auto"', () => {
      render(
        <Grid rows="auto" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass("auto-rows-auto");
    });

    it("does not apply rows class when rows is undefined", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      const grid = screen.getByTestId("grid");
      expect(grid.className).not.toMatch(/grid-rows/);
      expect(grid.className).not.toMatch(/auto-rows/);
    });
  });

  describe("alignItems prop", () => {
    it.each([
      ["start", "items-start"],
      ["center", "items-center"],
      ["end", "items-end"],
      ["stretch", "items-stretch"],
    ])("applies %s alignment", (alignItems, expectedClass) => {
      render(
        <Grid alignItems={alignItems as any} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass(expectedClass);
    });
  });

  describe("justifyItems prop", () => {
    it.each([
      ["start", "justify-items-start"],
      ["center", "justify-items-center"],
      ["end", "justify-items-end"],
      ["stretch", "justify-items-stretch"],
    ])("applies %s justification", (justifyItems, expectedClass) => {
      render(
        <Grid justifyItems={justifyItems as any} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId("grid");
      expect(grid).toHaveClass(expectedClass);
    });
  });

  it("forwards className prop", () => {
    render(
      <Grid className="custom-class" data-testid="grid">
        Content
      </Grid>
    );
    const grid = screen.getByTestId("grid");
    expect(grid).toHaveClass("custom-class");
  });

  it("forwards additional HTML attributes", () => {
    render(
      <Grid id="test-id" role="grid" data-testid="grid">
        Content
      </Grid>
    );
    const grid = screen.getByTestId("grid");
    expect(grid).toHaveAttribute("id", "test-id");
    expect(grid).toHaveAttribute("role", "grid");
  });

  it("combines multiple props correctly", () => {
    render(
      <Grid
        cols={3}
        gap={6}
        rows={2}
        alignItems="center"
        justifyItems="start"
        className="custom"
        data-testid="grid"
      >
        Content
      </Grid>
    );
    const grid = screen.getByTestId("grid");
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-3",
      "gap-6",
      "grid-rows-2",
      "items-center",
      "justify-items-start",
      "custom"
    );
  });
});
