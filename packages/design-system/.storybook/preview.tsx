import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider, ThemeCtx, useTheme } from "../src/theme/ThemeProvider";
import {
  withMockScenario,
  mockScenarioGlobalTypes,
} from "@nevo/api-mocks/storybook";
import "../src/styles.css";

// Initialize MSW for Storybook
if (typeof window !== "undefined") {
  // Dynamically import and start MSW
  import("@nevo/api-mocks/browser")
    .then(async ({ setupMocks }) => {
      const { http, HttpResponse, delay } = await import("msw");
      const { withScenarios, getCurrentScenario } = await import(
        "@nevo/api-mocks"
      );

      const handlers = [
        http.get(
          "/api/products",
          withScenarios(async () => {
            const scenario = getCurrentScenario();

            // Handle different scenarios
            switch (scenario) {
              case "empty":
                await delay(300);
                return HttpResponse.json({
                  data: [],
                  totalCount: 0,
                  page: 1,
                  limit: 10,
                  totalPages: 0,
                });

              case "loading-slow":
                await delay(3000);
                return HttpResponse.json({
                  data: [
                    { id: "1", name: "Product 1", price: 100 },
                    { id: "2", name: "Product 2", price: 200 },
                    { id: "3", name: "Product 3", price: 300 },
                  ],
                  totalCount: 3,
                  page: 1,
                  limit: 10,
                  totalPages: 1,
                });

              case "rate-limit":
                await delay(300);
                return HttpResponse.json(
                  { error: "Too many requests. Please try again later." },
                  { status: 429 }
                );

              case "server-error":
                await delay(300);
                return HttpResponse.json(
                  { error: "Internal server error" },
                  { status: 500 }
                );

              case "validation-error":
                await delay(300);
                return HttpResponse.json(
                  {
                    error: "Validation failed",
                    details: ["Invalid product data"],
                  },
                  { status: 422 }
                );

              case "network-error":
                await delay(300);
                return HttpResponse.error();

              case "success":
              default:
                await delay(300);
                return HttpResponse.json({
                  data: [
                    { id: "1", name: "Product 1", price: 100 },
                    { id: "2", name: "Product 2", price: 200 },
                    { id: "3", name: "Product 3", price: 300 },
                  ],
                  totalCount: 3,
                  page: 1,
                  limit: 10,
                  totalPages: 1,
                });
            }
          })
        ),
      ];

      const mockService = setupMocks(handlers);
      await mockService.start();
      console.log("[Storybook MSW] Service worker started");
    })
    .catch((error) => {
      console.error("[Storybook MSW] Failed to start:", error);
    });
}

// Component to sync Storybook's theme toggle with ThemeProvider
function ThemeSynchronizer({ isDark }: { isDark: boolean }) {
  const theme = useTheme();

  React.useEffect(() => {
    theme.setDark(isDark);
  }, [isDark, theme]);

  return null;
}

// Global decorator to wrap all stories with ThemeProvider
const withTheme = (Story: any, context: any) => {
  const isDark = context.globals.theme === "dark";

  return (
    <ThemeProvider initialDark={isDark}>
      <ThemeSynchronizer isDark={isDark} />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withMockScenario, withTheme],
  globalTypes: {
    ...mockScenarioGlobalTypes,
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Configure axe-core rules
      config: {
        rules: [
          {
            // Example: Enable color-contrast checks
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
