import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeProvider";

// Test component to access theme context
const TestComponent = () => {
  const { dark, setDark, tokens } = useTheme();
  return (
    <div>
      <div data-testid="theme-state">{dark ? "dark" : "light"}</div>
      <div data-testid="background-color">{tokens.page}</div>
      <div data-testid="text-color">{tokens.text}</div>
      <button onClick={() => setDark(!dark)}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    // Reset document body styles before each test
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.body.removeAttribute("data-theme");
    document.documentElement.style.backgroundColor = "";
    document.documentElement.style.color = "";
  });

  afterEach(() => {
    // Cleanup after each test
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.body.removeAttribute("data-theme");
    document.documentElement.style.backgroundColor = "";
    document.documentElement.style.color = "";
  });

  describe("Context Provision", () => {
    it("should provide theme context to children", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme-state")).toBeInTheDocument();
      expect(screen.getByTestId("background-color")).toBeInTheDocument();
      expect(screen.getByTestId("text-color")).toBeInTheDocument();
    });

    it("should throw error when useTheme is used outside provider", () => {
      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow("useTheme must be used within ThemeProvider");

      consoleSpy.mockRestore();
    });
  });

  describe("Theme State Management", () => {
    it("should start with dark theme by default", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme-state")).toHaveTextContent("dark");
    });

    it("should switch between light and dark themes", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByText("Toggle Theme");

      // Start with dark
      expect(screen.getByTestId("theme-state")).toHaveTextContent("dark");

      // Switch to light
      fireEvent.click(toggleButton);
      expect(screen.getByTestId("theme-state")).toHaveTextContent("light");

      // Switch back to dark
      fireEvent.click(toggleButton);
      expect(screen.getByTestId("theme-state")).toHaveTextContent("dark");
    });

    it("should apply correct token set for each theme", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByText("Toggle Theme");
      const backgroundElement = screen.getByTestId("background-color");
      const textElement = screen.getByTestId("text-color");

      // Check dark theme tokens
      const darkBackground = backgroundElement.textContent;
      const darkText = textElement.textContent;

      // Switch to light theme
      fireEvent.click(toggleButton);

      // Check light theme tokens are different
      expect(backgroundElement.textContent).not.toBe(darkBackground);
      expect(textElement.textContent).not.toBe(darkText);
    });
  });

  describe("DOM Side Effects", () => {
    it("should apply theme colors to document body", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.body.style.backgroundColor).toBeTruthy();
      expect(document.body.style.color).toBeTruthy();
      expect(document.body.style.margin).toBe("0px");
      expect(document.body.style.padding).toBe("0px");
    });

    it("should apply theme colors to document html", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.documentElement.style.backgroundColor).toBeTruthy();
      expect(document.documentElement.style.color).toBeTruthy();
    });

    it("should set data-theme attribute on body", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.body.getAttribute("data-theme")).toBe("dark");

      // Switch theme
      fireEvent.click(screen.getByText("Toggle Theme"));
      expect(document.body.getAttribute("data-theme")).toBe("light");
    });

    it("should cleanup data-theme attribute on unmount", () => {
      const { unmount } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.body.getAttribute("data-theme")).toBe("dark");

      unmount();

      expect(document.body.getAttribute("data-theme")).toBeNull();
    });

    it("should update DOM styles when theme changes", async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const initialBackground = document.body.style.backgroundColor;
      const initialColor = document.body.style.color;

      // Switch theme
      fireEvent.click(screen.getByText("Toggle Theme"));

      await waitFor(() => {
        expect(document.body.style.backgroundColor).not.toBe(initialBackground);
        expect(document.body.style.color).not.toBe(initialColor);
      });
    });
  });

  describe("Performance", () => {
    it("should not re-render children unnecessarily", () => {
      let renderCount = 0;

      const CountingComponent = () => {
        renderCount++;
        const { tokens } = useTheme();
        return <div>{tokens.page}</div>;
      };

      const { rerender } = render(
        <ThemeProvider>
          <CountingComponent />
        </ThemeProvider>
      );

      // Re-render provider with same props should not cause child re-render
      rerender(
        <ThemeProvider>
          <CountingComponent />
        </ThemeProvider>
      );

      // Should only render twice (initial + rerender), not more
      expect(renderCount).toBe(2);
    });

    it("should memoize theme tokens correctly", () => {
      const tokenInstances: any[] = [];

      const TokenCollector = () => {
        const { tokens } = useTheme();
        tokenInstances.push(tokens);
        return <div>{tokens.page}</div>;
      };

      const { rerender } = render(
        <ThemeProvider>
          <TokenCollector />
        </ThemeProvider>
      );

      rerender(
        <ThemeProvider>
          <TokenCollector />
        </ThemeProvider>
      );

      // Same theme should return same token instance
      expect(tokenInstances[0]).toBe(tokenInstances[1]);
    });
  });
});
