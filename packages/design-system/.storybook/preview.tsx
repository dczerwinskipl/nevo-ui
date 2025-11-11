import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider, ThemeCtx, useTheme } from "../src/theme/ThemeProvider";
import { withMockScenario, mockScenarioGlobalTypes } from "@nevo/api-mocks/storybook";
import "../src/styles.css";

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
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
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
