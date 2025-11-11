import React from "react";
import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";
import { ThemeProvider } from "../theme/ThemeProvider";

interface RenderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  variant?: "spinner" | "dots" | "pulse";
}

function renderLoading(props: RenderProps = {}) {
  const result = render(
    <ThemeProvider>
      <Loading {...props} />
    </ThemeProvider>
  );

  return { ...result, props };
}

describe("Loading", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { container } = renderLoading();
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with text", () => {
      renderLoading({ text: "Loading..." });
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render without text", () => {
      const { container } = renderLoading();
      const text = container.querySelector("span");
      expect(text).not.toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = renderLoading({ className: "custom-loader" });
      const loader = container.firstChild;
      expect(loader).toHaveClass("custom-loader");
    });
  });

  describe("Sizes", () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    sizes.forEach((size) => {
      it(`should render with ${size} size`, () => {
        const { container } = renderLoading({ size });
        expect(container.firstChild).toBeInTheDocument();
      });

      it(`should render text with appropriate size for ${size}`, () => {
        renderLoading({ size, text: "Loading..." });
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    const variants: Array<"spinner" | "dots" | "pulse"> = [
      "spinner",
      "dots",
      "pulse",
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        const { container } = renderLoading({ variant });
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it("should render spinner by default", () => {
      const { container } = renderLoading();
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("should render dots variant with 3 dots", () => {
      const { container } = renderLoading({ variant: "dots" });
      const dots = container.querySelectorAll(".animate-pulse");
      expect(dots).toHaveLength(3);
    });

    it("should render pulse variant", () => {
      const { container } = renderLoading({ variant: "pulse" });
      const pulse = container.querySelector(".animate-pulse");
      expect(pulse).toBeInTheDocument();
    });
  });

  describe("Combination scenarios", () => {
    it("should render loading with all features", () => {
      renderLoading({
        size: "lg",
        text: "Please wait...",
        variant: "spinner",
        className: "my-loader",
      });

      expect(screen.getByText("Please wait...")).toBeInTheDocument();
    });

    it("should render dots with text", () => {
      const { container } = renderLoading({
        variant: "dots",
        text: "Loading data...",
      });

      expect(screen.getByText("Loading data...")).toBeInTheDocument();
      const dots = container.querySelectorAll(".animate-pulse");
      expect(dots.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("should be visible to screen readers", () => {
      renderLoading({ text: "Loading content" });
      expect(screen.getByText("Loading content")).toBeVisible();
    });

    it("should have appropriate structure for loading state", () => {
      const { container } = renderLoading({ text: "Loading..." });
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex");
    });
  });
});
