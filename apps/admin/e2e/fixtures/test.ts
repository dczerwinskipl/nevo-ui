import { test as base } from "@playwright/test";
import { resetScenario, waitForMSW } from "./msw";

/**
 * Custom Playwright test fixture with MSW support
 * This ensures MSW is initialized and ready before each test
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Navigate to the app root to initialize MSW
    await page.goto("/");

    // Wait for service worker to be ready
    await waitForMSW(page);

    // Reset to success scenario before each test
    await resetScenario(page);

    // Use the page (tests will navigate to their specific routes)
    await use(page);
  },
});

export { expect } from "@playwright/test";
