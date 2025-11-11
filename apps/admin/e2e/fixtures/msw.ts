import { Page } from "@playwright/test";

/**
 * MSW helpers for Playwright tests
 * These utilities help set scenarios for testing different API responses
 */

/**
 * Set MSW scenario for the current test
 * This uses localStorage to communicate with the MSW worker
 */
export async function setScenario(
  page: Page,
  scenario: "success" | "server-error" | "rate-limit" | "empty"
) {
  await page.evaluate((scenario: string) => {
    localStorage.setItem("mock-scenario", scenario);
  }, scenario);
}

/**
 * Reset MSW scenario to default (success)
 */
export async function resetScenario(page: Page) {
  await page.evaluate(() => {
    localStorage.setItem("mock-scenario", "success");
  });
}

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
