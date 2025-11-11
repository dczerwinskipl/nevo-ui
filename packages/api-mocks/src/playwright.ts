/**
 * Playwright helpers for controlling MSW mock scenarios in E2E tests
 * 
 * @example
 * ```typescript
 * import { setScenario, resetScenario } from '@nevo/api-mocks/playwright';
 * 
 * test.beforeEach(async ({ page }) => {
 *   await resetScenario(page);
 * });
 * 
 * test('handles rate limiting', async ({ page }) => {
 *   await setScenario(page, 'rate-limit');
 *   await page.goto('/products');
 *   await expect(page.getByText(/rate limit/i)).toBeVisible();
 * });
 * ```
 */

import type { Scenario } from './foundation/scenarios';

/**
 * Minimal Playwright Page interface to avoid requiring @playwright/test as a dependency
 * Compatible with Playwright's Page type
 */
interface PlaywrightPage {
  evaluate<R, Arg>(pageFunction: (arg: Arg) => R, arg: Arg): Promise<R>;
  evaluate<R>(pageFunction: () => R): Promise<R>;
  waitForTimeout(timeout: number): Promise<void>;
}

/**
 * Set mock scenario in Playwright test
 * Uses window.setMockScenario() which is available in the browser context
 * 
 * @param page - Playwright page object
 * @param scenario - Scenario to activate
 * 
 * @example
 * ```typescript
 * await setScenario(page, 'rate-limit');
 * ```
 */
export async function setScenario(
  page: PlaywrightPage,
  scenario: Scenario
): Promise<void> {
  await page.evaluate((s: Scenario) => {
    if (typeof window.setMockScenario === 'function') {
      window.setMockScenario(s);
    } else {
      console.warn('window.setMockScenario is not available. Make sure MSW is initialized.');
    }
  }, scenario);
}

/**
 * Get current mock scenario in Playwright test
 * 
 * @param page - Playwright page object
 * @returns Current scenario
 * 
 * @example
 * ```typescript
 * const scenario = await getScenario(page);
 * expect(scenario).toBe('success');
 * ```
 */
export async function getScenario(page: PlaywrightPage): Promise<Scenario> {
  return await page.evaluate(() => {
    if (typeof window.getMockScenario === 'function') {
      return window.getMockScenario();
    }
    return 'success'; // default
  });
}

/**
 * Reset mock scenario to 'success' in Playwright test
 * 
 * @param page - Playwright page object
 * 
 * @example
 * ```typescript
 * test.beforeEach(async ({ page }) => {
 *   await resetScenario(page);
 * });
 * ```
 */
export async function resetScenario(page: PlaywrightPage): Promise<void> {
  await page.evaluate(() => {
    if (typeof window.resetMockScenario === 'function') {
      window.resetMockScenario();
    }
  });
}

/**
 * Wait for scenario to be applied
 * Sets the scenario and waits briefly for it to take effect
 * 
 * @param page - Playwright page object
 * @param scenario - Scenario to activate
 * @param waitMs - Time to wait after setting scenario (default: 100ms)
 * 
 * @example
 * ```typescript
 * await waitForScenario(page, 'server-error');
 * // Scenario is now active and handlers will use it
 * ```
 */
export async function waitForScenario(
  page: PlaywrightPage,
  scenario: Scenario,
  waitMs: number = 100
): Promise<void> {
  await setScenario(page, scenario);
  await page.waitForTimeout(waitMs);
}

/**
 * Get list of all available scenarios
 * 
 * @param page - Playwright page object
 * @returns Array of available scenario names
 */
export async function listScenarios(page: PlaywrightPage): Promise<Scenario[]> {
  return await page.evaluate(() => {
    if (typeof window.listMockScenarios === 'function') {
      return window.listMockScenarios();
    }
    return ['success', 'empty', 'loading-slow', 'rate-limit', 'server-error', 'validation-error', 'network-error'];
  });
}

// Re-export Scenario type for convenience
export type { Scenario } from './foundation/scenarios';
