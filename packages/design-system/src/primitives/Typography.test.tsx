import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Typography, TypographyType } from "./Typography";
import { ComponentIntent } from "../theme";

describe("Typography Component", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(<Typography>Test content</Typography>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders with default type (body)", () => {
      const { container } = render(<Typography>Content</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-base", "font-normal");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Typography className="custom-class">Content</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      const { container } = render(
        <Typography data-testid="test-typography" aria-label="Test">
          Content
        </Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-testid", "test-typography");
      expect(element).toHaveAttribute("aria-label", "Test");
    });
  });

  describe("Typography Types", () => {
    const types: {
      type: TypographyType;
      expectedTag: string;
      expectedClasses: string[];
      expectedStyle?: { color: string };
    }[] = [
      {
        type: "page-title",
        expectedTag: "H1",
        expectedClasses: ["text-3xl", "font-bold"],
      },
      {
        type: "section-title",
        expectedTag: "H2",
        expectedClasses: ["text-xl", "font-semibold"],
      },
      {
        type: "card-title",
        expectedTag: "H3",
        expectedClasses: ["text-lg", "font-semibold"],
      },
      {
        type: "subtitle",
        expectedTag: "H4",
        expectedClasses: ["text-base", "font-medium"],
      },
      {
        type: "body",
        expectedTag: "P",
        expectedClasses: ["text-base", "font-normal"],
      },
      {
        type: "label",
        expectedTag: "LABEL",
        expectedClasses: ["text-sm", "font-medium"],
      },
      {
        type: "caption",
        expectedTag: "SPAN",
        expectedClasses: ["text-sm", "font-normal"],
      },
      {
        type: "button",
        expectedTag: "SPAN",
        expectedClasses: ["text-base", "font-medium"],
      },
      {
        type: "error",
        expectedTag: "SPAN",
        expectedClasses: ["text-sm", "font-normal"],
        expectedStyle: { color: "var(--color-intent-error-text)" },
      },
      {
        type: "success",
        expectedTag: "SPAN",
        expectedClasses: ["text-sm", "font-normal"],
        expectedStyle: { color: "var(--color-intent-success-text)" },
      },
    ];

    types.forEach(({ type, expectedTag, expectedClasses, expectedStyle }) => {
      it(`renders ${type} type correctly`, () => {
        const { container } = render(
          <Typography type={type}>Content</Typography>
        );
        const element = container.firstChild as HTMLElement;

        expect(element.tagName).toBe(expectedTag);
        expectedClasses.forEach((className) => {
          expect(element).toHaveClass(className);
        });
        if (expectedStyle) {
          expect(element).toHaveStyle(expectedStyle);
        }
      });
    });
  });

  describe("Intent Prop", () => {
    const intents: { intent: ComponentIntent; cssVar: string }[] = [
      { intent: "primary", cssVar: "var(--color-intent-primary-text)" },
      { intent: "success", cssVar: "var(--color-intent-success-text)" },
      { intent: "warning", cssVar: "var(--color-intent-warning-text)" },
      { intent: "error", cssVar: "var(--color-intent-error-text)" },
      { intent: "info", cssVar: "var(--color-intent-info-text)" },
      { intent: "neutral", cssVar: "var(--color-intent-neutral-text)" },
    ];

    intents.forEach(({ intent, cssVar }) => {
      it(`applies ${intent} intent color correctly`, () => {
        const { container } = render(
          <Typography intent={intent}>Content</Typography>
        );
        const element = container.firstChild as HTMLElement;
        // Check that the inline style contains the CSS variable
        expect(element).toHaveStyle({ color: cssVar });
      });
    });

    it("intent prop overrides default type intent", () => {
      const { container } = render(
        <Typography type="error" intent="success">
          Content
        </Typography>
      );
      const element = container.firstChild as HTMLElement;
      // Should use success color variable instead of error
      expect(element).toHaveStyle({ color: "var(--color-intent-success-text)" });
    });
  });

  describe("Alignment", () => {
    it("defaults to left alignment", () => {
      const { container } = render(<Typography>Content</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("text-left");
    });

    it("applies center alignment", () => {
      const { container } = render(
        <Typography align="center">Content</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("text-center");
    });

    it("applies right alignment", () => {
      const { container } = render(
        <Typography align="right">Content</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("text-right");
    });
  });

  describe("Custom Element Override", () => {
    it("allows overriding element tag with 'as' prop", () => {
      const { container } = render(
        <Typography type="body" as="div">
          Content
        </Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("DIV");
    });

    it("preserves type styles when overriding tag", () => {
      const { container } = render(
        <Typography type="section-title" as="div">
          Content
        </Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("text-xl", "font-semibold");
    });
  });

  describe("Size Override", () => {
    const sizes: Array<
      "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
    > = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"];

    const sizeClasses: Record<string, string> = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    };

    sizes.forEach((size) => {
      it(`applies ${size} size override`, () => {
        const { container } = render(
          <Typography size={size}>Content</Typography>
        );
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(sizeClasses[size]!);
      });
    });

    it("size override takes precedence over type default", () => {
      const { container } = render(
        <Typography type="page-title" size="xs">
          Content
        </Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("text-xs");
      expect(element).not.toHaveClass("text-3xl");
    });
  });

  describe("Weight Override", () => {
    const weights: Array<"normal" | "medium" | "semibold" | "bold"> = [
      "normal",
      "medium",
      "semibold",
      "bold",
    ];

    const weightClasses: Record<string, string> = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    weights.forEach((weight) => {
      it(`applies ${weight} weight override`, () => {
        const { container } = render(
          <Typography weight={weight}>Content</Typography>
        );
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(weightClasses[weight]!);
      });
    });

    it("weight override takes precedence over type default", () => {
      const { container } = render(
        <Typography type="body" weight="bold">
          Content
        </Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("font-bold");
      expect(element).not.toHaveClass("font-normal");
    });
  });

  describe("Default Styles", () => {
    it("applies margin reset", () => {
      const { container } = render(<Typography>Content</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("m-0");
    });

    it("applies default text color", () => {
      const { container } = render(<Typography>Content</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("text-gray-900");
    });

    it("applies dark mode text color", () => {
      const { container } = render(<Typography>Content</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("dark:text-gray-100");
    });
  });

  describe("Combined Props", () => {
    it("handles multiple props together", () => {
      const { container } = render(
        <Typography
          type="section-title"
          intent="primary"
          align="center"
          size="2xl"
          weight="bold"
          className="custom-class"
        >
          Content
        </Typography>
      );
      const element = container.firstChild as HTMLElement;

      expect(element.tagName).toBe("H2");
      expect(element).toHaveClass("text-2xl");
      expect(element).toHaveClass("font-bold");
      expect(element).toHaveClass("text-center");
      expect(element).toHaveStyle({ color: "var(--color-intent-primary-text)" });
      expect(element).toHaveClass("custom-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      const { container } = render(<Typography>{""}</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe("");
    });

    it("handles null children gracefully", () => {
      const { container } = render(<Typography>{null}</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(<Typography>{undefined}</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("handles complex nested content", () => {
      render(
        <Typography>
          <strong>Bold</strong> and <em>italic</em> text
        </Typography>
      );

      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML tags by default", () => {
      const { container: h1Container } = render(
        <Typography type="page-title">Heading</Typography>
      );
      expect(h1Container.querySelector("h1")).toBeInTheDocument();

      const { container: pContainer } = render(
        <Typography type="body">Body text</Typography>
      );
      expect(pContainer.querySelector("p")).toBeInTheDocument();

      const { container: labelContainer } = render(
        <Typography type="label">Label</Typography>
      );
      expect(labelContainer.querySelector("label")).toBeInTheDocument();
    });

    it("maintains heading hierarchy", () => {
      const { container } = render(
        <div>
          <Typography type="page-title">H1</Typography>
          <Typography type="section-title">H2</Typography>
          <Typography type="card-title">H3</Typography>
          <Typography type="subtitle">H4</Typography>
        </div>
      );

      expect(container.querySelector("h1")).toBeInTheDocument();
      expect(container.querySelector("h2")).toBeInTheDocument();
      expect(container.querySelector("h3")).toBeInTheDocument();
      expect(container.querySelector("h4")).toBeInTheDocument();
    });
  });
});
