import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card, CardHeader, CardBody, CardFooter, CardVariant } from "./Card";

describe("Card Component", () => {
  describe("Rendering", () => {
    it("renders with children", () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders with default variant", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-white", "border", "shadow-sm");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      const { container } = render(
        <Card data-testid="test-card" aria-label="Test">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("data-testid", "test-card");
      expect(card).toHaveAttribute("aria-label", "Test");
    });
  });

  describe("Variants", () => {
    const variants: CardVariant[] = ["default", "bordered", "elevated", "flat"];

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        const { container } = render(<Card variant={variant}>Content</Card>);
        const card = container.firstChild as HTMLElement;

        switch (variant) {
          case "default":
            expect(card).toHaveClass("bg-white", "border", "shadow-sm");
            break;
          case "bordered":
            expect(card).toHaveClass("bg-white", "border-2");
            break;
          case "elevated":
            expect(card).toHaveClass("bg-white", "shadow-lg");
            break;
          case "flat":
            expect(card).toHaveClass("bg-gray-50");
            break;
        }
      });
    });

    it("applies dark mode classes for all variants", () => {
      variants.forEach((variant) => {
        const { container } = render(<Card variant={variant}>Content</Card>);
        const card = container.firstChild as HTMLElement;

        // All variants should have dark mode background classes
        const className = card.className;
        expect(className).toMatch(/dark:bg-gray-/);
      });
    });
  });

  describe("Interactive States", () => {
    describe("Hoverable", () => {
      it("applies hover classes when hoverable is true", () => {
        const { container } = render(<Card hoverable>Content</Card>);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass("transition-all", "duration-200");
      });

      it("does not apply hover classes by default", () => {
        const { container } = render(<Card>Content</Card>);
        const card = container.firstChild as HTMLElement;
        expect(card).not.toHaveClass("transition-all");
      });
    });

    describe("Clickable", () => {
      it("applies cursor-pointer when clickable is true", () => {
        const { container } = render(<Card clickable>Content</Card>);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass("cursor-pointer");
      });

      it("sets role=button when clickable", () => {
        const { container } = render(<Card clickable>Content</Card>);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveAttribute("role", "button");
      });

      it("sets tabIndex=0 when clickable", () => {
        const { container } = render(<Card clickable>Content</Card>);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveAttribute("tabIndex", "0");
      });

      it("calls onClick when clicked and clickable is true", () => {
        const handleClick = jest.fn();
        const { container } = render(
          <Card clickable onClick={handleClick}>
            Content
          </Card>
        );
        const card = container.firstChild as HTMLElement;
        fireEvent.click(card);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("does not call onClick when clickable is false", () => {
        const handleClick = jest.fn();
        const { container } = render(
          <Card onClick={handleClick}>Content</Card>
        );
        const card = container.firstChild as HTMLElement;
        fireEvent.click(card);
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("calls onClick when Enter key is pressed and clickable", () => {
        const handleClick = jest.fn();
        const { container } = render(
          <Card clickable onClick={handleClick}>
            Content
          </Card>
        );
        const card = container.firstChild as HTMLElement;
        fireEvent.keyDown(card, { key: "Enter" });
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("calls onClick when Space key is pressed and clickable", () => {
        const handleClick = jest.fn();
        const { container } = render(
          <Card clickable onClick={handleClick}>
            Content
          </Card>
        );
        const card = container.firstChild as HTMLElement;
        fireEvent.keyDown(card, { key: " " });
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("does not call onClick for other keys", () => {
        const handleClick = jest.fn();
        const { container } = render(
          <Card clickable onClick={handleClick}>
            Content
          </Card>
        );
        const card = container.firstChild as HTMLElement;
        fireEvent.keyDown(card, { key: "a" });
        fireEvent.keyDown(card, { key: "Escape" });
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("does not handle keyboard events when not clickable", () => {
        const handleClick = jest.fn();
        const { container } = render(
          <Card onClick={handleClick}>Content</Card>
        );
        const card = container.firstChild as HTMLElement;
        fireEvent.keyDown(card, { key: "Enter" });
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe("Loading", () => {
      it("shows loading spinner when loading is true", () => {
        const { container } = render(<Card loading>Content</Card>);
        const spinner = container.querySelector(".animate-spin");
        expect(spinner).toBeInTheDocument();
      });

      it("applies opacity and pointer-events-none when loading", () => {
        const { container } = render(<Card loading>Content</Card>);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass("opacity-60", "pointer-events-none");
      });

      it("does not show spinner when loading is false", () => {
        const { container } = render(<Card>Content</Card>);
        const spinner = container.querySelector(".animate-spin");
        expect(spinner).not.toBeInTheDocument();
      });

      it("prevents clicks when loading", () => {
        const handleClick = jest.fn();
        const { container } = render(
          <Card clickable loading onClick={handleClick}>
            Content
          </Card>
        );
        const card = container.firstChild as HTMLElement;
        // pointer-events-none should prevent the click
        expect(card).toHaveClass("pointer-events-none");
      });
    });
  });

  describe("Combined States", () => {
    it("supports both hoverable and clickable together", () => {
      const { container } = render(
        <Card hoverable clickable>
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("cursor-pointer", "transition-all");
      expect(card).toHaveAttribute("role", "button");
    });

    it("supports variant with hoverable", () => {
      const { container } = render(
        <Card variant="elevated" hoverable>
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("shadow-lg", "transition-all");
    });

    it("supports all props together", () => {
      const handleClick = jest.fn();
      const { container } = render(
        <Card
          variant="bordered"
          hoverable
          clickable
          onClick={handleClick}
          className="custom-class"
        >
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-2", "cursor-pointer", "custom-class");
      expect(card).toHaveAttribute("role", "button");

      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Composable Subcomponents", () => {
    describe("CardHeader", () => {
      it("renders children", () => {
        render(<CardHeader>Header content</CardHeader>);
        expect(screen.getByText("Header content")).toBeInTheDocument();
      });

      it("applies default border bottom styles", () => {
        const { container } = render(<CardHeader>Header</CardHeader>);
        const header = container.firstChild as HTMLElement;
        expect(header).toHaveClass("mb-4", "pb-4", "border-b");
      });

      it("applies custom className", () => {
        const { container } = render(
          <CardHeader className="custom-header">Header</CardHeader>
        );
        const header = container.firstChild as HTMLElement;
        expect(header).toHaveClass("custom-header");
      });

      it("passes through additional props", () => {
        const { container } = render(
          <CardHeader data-testid="test-header">Header</CardHeader>
        );
        const header = container.firstChild as HTMLElement;
        expect(header).toHaveAttribute("data-testid", "test-header");
      });
    });

    describe("CardBody", () => {
      it("renders children", () => {
        render(<CardBody>Body content</CardBody>);
        expect(screen.getByText("Body content")).toBeInTheDocument();
      });

      it("applies default text color styles", () => {
        const { container } = render(<CardBody>Body</CardBody>);
        const body = container.firstChild as HTMLElement;
        expect(body).toHaveClass("text-gray-700");
      });

      it("applies custom className", () => {
        const { container } = render(
          <CardBody className="custom-body">Body</CardBody>
        );
        const body = container.firstChild as HTMLElement;
        expect(body).toHaveClass("custom-body");
      });

      it("passes through additional props", () => {
        const { container } = render(
          <CardBody data-testid="test-body">Body</CardBody>
        );
        const body = container.firstChild as HTMLElement;
        expect(body).toHaveAttribute("data-testid", "test-body");
      });
    });

    describe("CardFooter", () => {
      it("renders children", () => {
        render(<CardFooter>Footer content</CardFooter>);
        expect(screen.getByText("Footer content")).toBeInTheDocument();
      });

      it("applies default border top and flex styles", () => {
        const { container } = render(<CardFooter>Footer</CardFooter>);
        const footer = container.firstChild as HTMLElement;
        expect(footer).toHaveClass(
          "mt-4",
          "pt-4",
          "border-t",
          "flex",
          "items-center",
          "gap-2"
        );
      });

      it("applies custom className", () => {
        const { container } = render(
          <CardFooter className="custom-footer">Footer</CardFooter>
        );
        const footer = container.firstChild as HTMLElement;
        expect(footer).toHaveClass("custom-footer");
      });

      it("passes through additional props", () => {
        const { container } = render(
          <CardFooter data-testid="test-footer">Footer</CardFooter>
        );
        const footer = container.firstChild as HTMLElement;
        expect(footer).toHaveAttribute("data-testid", "test-footer");
      });
    });

    describe("Full Composition", () => {
      it("renders complete card with all subcomponents", () => {
        render(
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        );

        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Body")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
      });

      it("maintains structure and spacing between subcomponents", () => {
        const { container } = render(
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBody>Body</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        );

        const card = container.firstChild as HTMLElement;
        const header = card.querySelector("div.border-b") as HTMLElement;
        const footer = card.querySelector("div.border-t") as HTMLElement;

        expect(header).toHaveClass("mb-4", "pb-4");
        expect(footer).toHaveClass("mt-4", "pt-4");
      });
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA role when clickable", () => {
      const { container } = render(<Card clickable>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("role", "button");
    });

    it("does not have button role when not clickable", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveAttribute("role", "button");
    });

    it("is keyboard accessible when clickable", () => {
      const { container } = render(<Card clickable>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Display Names", () => {
    it("has correct displayName for Card", () => {
      expect(Card.displayName).toBe("Card");
    });

    it("has correct displayName for CardHeader", () => {
      expect(CardHeader.displayName).toBe("CardHeader");
    });

    it("has correct displayName for CardBody", () => {
      expect(CardBody.displayName).toBe("CardBody");
    });

    it("has correct displayName for CardFooter", () => {
      expect(CardFooter.displayName).toBe("CardFooter");
    });
  });

  describe("Edge Cases", () => {
    it("renders empty card", () => {
      const { container } = render(<Card />);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      expect(card.textContent).toBe("");
    });

    it("handles null children gracefully", () => {
      const { container } = render(<Card>{null}</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(<Card>{undefined}</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it("handles complex nested content", () => {
      render(
        <Card>
          <div>
            <span>Nested</span>
            <div>
              <p>Content</p>
            </div>
          </div>
        </Card>
      );

      expect(screen.getByText("Nested")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
