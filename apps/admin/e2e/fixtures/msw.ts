/**
 * MSW helpers for Playwright tests
 * Re-exports helpers from @nevo/api-mocks package for convenience
 */

export {
  setScenario,
  getScenario,
  resetScenario,
  waitForScenario,
  listScenarios,
} from "@nevo/api-mocks/playwright";
export type { Scenario } from "@nevo/api-mocks/playwright";

import { Page } from "@playwright/test";

/**
 * Wait for MSW service worker to be ready
 * This ensures the service worker is active before tests run
 */
export async function waitForMSW(page: Page) {
  await page.waitForFunction(() => {
    return (
      navigator.serviceWorker.controller !== null &&
      navigator.serviceWorker.controller.state === "activated"
    );
  });
}
