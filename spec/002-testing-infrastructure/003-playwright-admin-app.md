# 003 - Playwright for Admin App ✅ COMPLETED

## Epic: 002-testing-infrastructure

## Task: 003-playwright-admin-app ✅ COMPLETED

**Status**: ✅ COMPLETED  
**Completion Date**: November 11, 2025  
**Implementation**: 14 E2E tests passing, integrated into CI/CD pipeline

### Completion Summary

Playwright E2E testing successfully implemented:

- ✅ Playwright 1.56.1 with TypeScript support
- ✅ MSW integration for controlled API responses
- ✅ 14 comprehensive E2E tests for products page
  - Initial load and navigation (3 tests)
  - Filtering functionality (4 tests)
  - Error states (3 tests)
  - User interactions (3 tests)
  - Accessibility (1 test)
- ✅ Custom test fixtures with MSW scenario helpers
- ✅ Integrated into main CI/CD pipeline
- ✅ Runs in parallel with deployments
- ✅ HTML report generation
- ✅ Screenshot and video on failure
- ✅ All tests passing locally (18s) and in CI (~35s)

### Overview

This specification defines the implementation of **Playwright** for end-to-end (E2E) testing of the `@nevo/ecommerce-admin-app`. Playwright will enable automated browser testing to verify critical user flows, interactions, and error handling.

The initial implementation will focus on:

1. **Products Page Navigation**: Verify user can navigate to products page
2. **Product Filtering**: Test filter interactions and result verification
3. **MSW Integration**: Use existing `@nevo/api-mocks` for predictable test scenarios

This setup will serve as the foundation for comprehensive E2E testing across the admin application.

### Objectives

- Install and configure Playwright with TypeScript support
- Setup MSW integration for controlled API responses during tests
- Create test: Navigate to products page and verify page loads
- Create test: Apply product filters and verify filtered results
- Configure Playwright for CI/CD environments
- Document how to run tests locally and in CI

---

## Architecture Decisions

### Why Playwright?

1. **Multi-Browser Support**: Test in Chromium, Firefox, WebKit
2. **Fast & Reliable**: Auto-waiting, retry mechanisms, parallel execution
3. **Modern API**: Async/await, strong TypeScript support
4. **Network Control**: Intercept/mock requests (works with MSW)
5. **CI/CD Ready**: Headless mode, screenshot/video capture on failure

### MSW Integration Strategy

We'll leverage the existing `@nevo/api-mocks` package:

```typescript
// Instead of real API calls during tests, MSW intercepts them
GET /api/products -> MSW handler returns mock data
```

**Benefits**:

- Predictable test data (no flaky tests from real API)
- Test error scenarios (rate limits, server errors)
- Faster test execution (no network delays)
- No backend dependency

### Test Structure

```
/apps/admin
  /e2e                    # Playwright tests directory
    /fixtures
      msw.ts              # MSW setup for tests
      test.ts             # Custom test fixtures
    /tests
      products.spec.ts    # Products page tests
    playwright.config.ts  # Playwright configuration
```

---

## Requirements

### 1. Directory Structure

```
/apps/admin
  /e2e
    /fixtures
      msw.ts              # MSW worker setup for tests
      test.ts             # Custom Playwright fixtures with MSW
    /tests
      products.spec.ts    # Product page E2E tests
  playwright.config.ts    # Playwright configuration
  .gitignore              # Add playwright reports
```

### 2. Playwright Configuration

#### `apps/admin/playwright.config.ts`

```typescript
import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for @nevo/ecommerce-admin-app
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e/tests",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"],
    ...(process.env.CI ? [["github"]] : []),
  ],

  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: "http://localhost:5173",

    /* Collect trace when retrying the failed test */
    trace: "on-first-retry",

    /* Screenshot on failure */
    screenshot: "only-on-failure",

    /* Video on failure */
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Uncomment to test in more browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
```

### 3. MSW Integration for Tests

#### `apps/admin/e2e/fixtures/msw.ts`

```typescript
import { setupWorker } from "msw/browser";
import { handlers } from "../../src/mocks";

/**
 * Setup MSW worker for Playwright tests
 * This ensures API requests are intercepted during E2E tests
 */
export async function setupMSW() {
  const worker = setupWorker(...handlers);

  await worker.start({
    onUnhandledRequest: "warn",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });

  return worker;
}

/**
 * Helper to set scenario for tests
 */
export async function setScenario(scenario: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("mock-scenario", scenario);
  }
}
```

#### `apps/admin/e2e/fixtures/test.ts`

```typescript
import { test as base } from "@playwright/test";

/**
 * Custom Playwright test fixture with MSW support
 * This ensures MSW is initialized before each test
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Setup MSW before each test
    await page.addInitScript(() => {
      // MSW is already initialized in the app via main.tsx
      // We just need to ensure service worker is ready
    });

    // Wait for service worker to be ready
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await use(page);
  },
});

export { expect } from "@playwright/test";
```

### 4. Products Page Tests

#### `apps/admin/e2e/tests/products.spec.ts`

```typescript
import { test, expect } from "../fixtures/test";

test.describe("Products Page", () => {
  test.beforeEach(async ({ page }) => {
    // Reset scenario to success before each test
    await page.evaluate(() => {
      localStorage.setItem("mock-scenario", "success");
    });
  });

  test("should navigate to products page and display products table", async ({
    page,
  }) => {
    // Navigate to home
    await page.goto("/");

    // Verify home page loads
    await expect(page).toHaveTitle(/Admin/i);

    // Navigate to products page (adjust selector based on your routing)
    // Option 1: Direct navigation
    await page.goto("/products");

    // Option 2: Click navigation link (if exists)
    // await page.getByRole('link', { name: /products/i }).click();

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Verify URL
    await expect(page).toHaveURL(/.*products/);

    // Verify page heading
    await expect(
      page.getByRole("heading", { name: /products/i })
    ).toBeVisible();

    // Verify table is rendered
    await expect(page.getByRole("table")).toBeVisible();

    // Verify table has data (at least one row)
    const rows = page.getByRole("row");
    await expect(rows).toHaveCount(await rows.count());
    expect(await rows.count()).toBeGreaterThan(1); // Header + at least 1 data row
  });

  test("should filter products by category", async ({ page }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    // Wait for initial products to load
    await expect(page.getByRole("table")).toBeVisible();

    // Get initial row count
    const initialRows = await page.getByRole("row").count();

    // Find and interact with category filter
    // Adjust selectors based on your actual implementation
    const categoryFilter = page
      .getByLabel(/category/i)
      .or(page.getByPlaceholder(/category/i));

    await expect(categoryFilter).toBeVisible();

    // Select a category (adjust value based on your data)
    await categoryFilter.click();
    await categoryFilter.selectOption("Electronics"); // Or use fill() for text input

    // Wait for filter to apply (you might have a debounce)
    await page.waitForTimeout(500);

    // Verify filtered results
    const filteredRows = await page.getByRole("row").count();

    // Should have fewer rows (or at least not more)
    expect(filteredRows).toBeLessThanOrEqual(initialRows);

    // Verify filtered products contain "Electronics" category
    // Adjust based on your table structure
    const categoryCell = page
      .getByRole("cell", { name: /electronics/i })
      .first();
    await expect(categoryCell).toBeVisible();
  });

  test("should filter products by search text", async ({ page }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    // Find search input
    const searchInput = page
      .getByRole("searchbox")
      .or(page.getByPlaceholder(/search/i));

    await expect(searchInput).toBeVisible();

    // Enter search term
    await searchInput.fill("laptop");

    // Wait for debounced search
    await page.waitForTimeout(500);

    // Verify results contain search term
    const tableContent = await page.getByRole("table").textContent();
    expect(tableContent?.toLowerCase()).toContain("laptop");

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(500);

    // Verify all products are shown again
    const rows = await page.getByRole("row").count();
    expect(rows).toBeGreaterThan(1);
  });

  test("should display empty state when filters return no results", async ({
    page,
  }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    // Search for something that doesn't exist
    const searchInput = page
      .getByRole("searchbox")
      .or(page.getByPlaceholder(/search/i));

    await searchInput.fill("xyznonexistent123");
    await page.waitForTimeout(500);

    // Verify empty state is shown
    // Adjust based on your EmptyState component
    await expect(page.getByText(/no products found/i)).toBeVisible();

    // Or verify table has no data rows (just header)
    const rows = await page.getByRole("row").count();
    expect(rows).toBe(1); // Only header row
  });

  test("should handle pagination", async ({ page }) => {
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    // Wait for table to load
    await expect(page.getByRole("table")).toBeVisible();

    // Find pagination controls
    const nextButton = page.getByRole("button", { name: /next/i });
    const prevButton = page.getByRole("button", { name: /previous/i });

    // Verify previous is disabled on first page
    await expect(prevButton).toBeDisabled();

    // Get first page product IDs
    const firstPageContent = await page.getByRole("table").textContent();

    // Click next
    await nextButton.click();
    await page.waitForLoadState("networkidle");

    // Verify content changed
    const secondPageContent = await page.getByRole("table").textContent();
    expect(secondPageContent).not.toBe(firstPageContent);

    // Verify previous is now enabled
    await expect(prevButton).toBeEnabled();

    // Go back to first page
    await prevButton.click();
    await page.waitForLoadState("networkidle");

    // Verify we're back to original content
    const backToFirstPage = await page.getByRole("table").textContent();
    expect(backToFirstPage).toBe(firstPageContent);
  });

  test("should handle server error scenario", async ({ page }) => {
    // Set error scenario
    await page.evaluate(() => {
      localStorage.setItem("mock-scenario", "server-error");
    });

    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    // Verify error state is shown
    await expect(page.getByText(/error/i)).toBeVisible();
    await expect(page.getByText(/something went wrong/i)).toBeVisible();

    // Verify retry button exists
    const retryButton = page.getByRole("button", { name: /retry/i });
    await expect(retryButton).toBeVisible();
  });

  test("should handle rate limit scenario", async ({ page }) => {
    // Set rate limit scenario
    await page.evaluate(() => {
      localStorage.setItem("mock-scenario", "rate-limit");
    });

    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    // Verify rate limit message is shown
    await expect(page.getByText(/rate limit/i)).toBeVisible();
    await expect(page.getByText(/too many requests/i)).toBeVisible();
  });
});
```

### 5. Package.json Updates

Add scripts to `apps/admin/package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report"
  }
}
```

### 6. Dependencies to Install

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

### 7. .gitignore Updates

Add to `apps/admin/.gitignore`:

```
playwright-report/
test-results/
playwright/.cache/
```

---

## Execution Plan (Tasks)

### Phase 1: Installation & Configuration (20 min)

#### Task 1.1: Install Playwright

- [ ] Navigate to `apps/admin`
- [ ] Run `pnpm add -D @playwright/test`
- [ ] Run `pnpm exec playwright install` (installs browsers)
- [ ] Run `pnpm exec playwright install-deps` (installs system dependencies)
- [ ] Verify installation: `pnpm exec playwright --version`

#### Task 1.2: Create Playwright Configuration

- [ ] Create `apps/admin/playwright.config.ts`
- [ ] Configure `testDir: './e2e/tests'`
- [ ] Configure `baseURL: 'http://localhost:5173'` (Vite default)
- [ ] Configure `webServer` to auto-start dev server
- [ ] Configure retry logic (2 retries on CI, 0 locally)
- [ ] Configure reporters: html, list, github (CI only)
- [ ] Configure browser projects (Chromium initially)

#### Task 1.3: Create Directory Structure

- [ ] Create `apps/admin/e2e/` directory
- [ ] Create `apps/admin/e2e/fixtures/` directory
- [ ] Create `apps/admin/e2e/tests/` directory

#### Task 1.4: Setup MSW Fixtures

- [ ] Create `e2e/fixtures/msw.ts` with MSW setup helper
- [ ] Create `e2e/fixtures/test.ts` with custom Playwright test fixture
- [ ] Ensure MSW service worker is initialized before tests
- [ ] Add scenario helper functions

#### Task 1.5: Update Package Scripts

- [ ] Add `"test:e2e": "playwright test"` to package.json
- [ ] Add `"test:e2e:ui": "playwright test --ui"` for interactive mode
- [ ] Add `"test:e2e:headed": "playwright test --headed"` for debugging
- [ ] Add `"test:e2e:debug": "playwright test --debug"` for step debugging
- [ ] Add `"test:e2e:report": "playwright show-report"` for viewing results

#### Task 1.6: Update .gitignore

- [ ] Add `playwright-report/` to .gitignore
- [ ] Add `test-results/` to .gitignore
- [ ] Add `playwright/.cache/` to .gitignore

---

### Phase 2: Products Navigation Test (30 min)

#### Task 2.1: Create Products Test File

- [ ] Create `e2e/tests/products.spec.ts`
- [ ] Import custom test fixture: `import { test, expect } from '../fixtures/test'`
- [ ] Create `test.describe('Products Page')` block

#### Task 2.2: Setup Test Hooks

- [ ] Add `test.beforeEach()` to reset scenario to 'success'
- [ ] Clear localStorage in beforeEach
- [ ] Navigate to base URL

#### Task 2.3: Write Navigation Test

- [ ] Create test: "should navigate to products page and display products table"
- [ ] Navigate to home page: `await page.goto('/')`
- [ ] Verify page title contains "Admin"
- [ ] Navigate to products page (direct or via link)
- [ ] Verify URL contains "/products"
- [ ] Verify page heading is visible
- [ ] Verify table element is visible
- [ ] Verify table has at least one data row

#### Task 2.4: Run & Debug Navigation Test

- [ ] Run test: `pnpm test:e2e products.spec.ts`
- [ ] Verify test passes
- [ ] If failures, run in headed mode: `pnpm test:e2e:headed`
- [ ] Adjust selectors based on actual DOM structure
- [ ] Re-run until passing

---

### Phase 3: Product Filtering Tests (45 min)

#### Task 3.1: Write Category Filter Test

- [ ] Create test: "should filter products by category"
- [ ] Navigate to products page
- [ ] Wait for table to be visible
- [ ] Get initial row count
- [ ] Locate category filter (dropdown or input)
- [ ] Select "Electronics" category
- [ ] Wait for filter debounce (500ms)
- [ ] Verify row count changed
- [ ] Verify filtered results contain "Electronics"

#### Task 3.2: Write Search Filter Test

- [ ] Create test: "should filter products by search text"
- [ ] Navigate to products page
- [ ] Locate search input
- [ ] Type "laptop" into search
- [ ] Wait for debounce
- [ ] Verify table content contains "laptop"
- [ ] Clear search input
- [ ] Verify all products are shown again

#### Task 3.3: Write Empty State Test

- [ ] Create test: "should display empty state when filters return no results"
- [ ] Navigate to products page
- [ ] Enter search term that returns no results
- [ ] Verify empty state component is visible
- [ ] Verify message "No products found" is shown

#### Task 3.4: Write Pagination Test

- [ ] Create test: "should handle pagination"
- [ ] Navigate to products page
- [ ] Verify "Previous" button is disabled on first page
- [ ] Capture first page content
- [ ] Click "Next" button
- [ ] Verify content changed (different products)
- [ ] Verify "Previous" button is now enabled
- [ ] Click "Previous" button
- [ ] Verify back to original content

#### Task 3.5: Run & Debug Filter Tests

- [ ] Run all filter tests: `pnpm test:e2e`
- [ ] Verify all tests pass
- [ ] If failures, use `--debug` mode to step through
- [ ] Adjust selectors/waits based on actual behavior
- [ ] Handle debouncing properly (increase timeout if needed)

---

### Phase 4: Error Scenario Tests (30 min)

#### Task 4.1: Write Server Error Test

- [ ] Create test: "should handle server error scenario"
- [ ] Set MSW scenario to 'server-error' via localStorage
- [ ] Navigate to products page
- [ ] Verify error state component is visible
- [ ] Verify error message is displayed
- [ ] Verify "Retry" button exists

#### Task 4.2: Write Rate Limit Test

- [ ] Create test: "should handle rate limit scenario"
- [ ] Set MSW scenario to 'rate-limit' via localStorage
- [ ] Navigate to products page
- [ ] Verify rate limit message is displayed
- [ ] Verify appropriate retry information is shown

#### Task 4.3: Test Scenario Switching

- [ ] Verify localStorage scenario setting works
- [ ] Test switching scenarios mid-test
- [ ] Verify MSW picks up scenario changes

#### Task 4.4: Run & Debug Error Tests

- [ ] Run error scenario tests
- [ ] Verify MSW intercepts requests correctly
- [ ] Verify error states render as expected
- [ ] Check console for MSW warnings/errors

---

### Phase 5: CI/CD Integration (20 min)

#### Task 5.1: Test CI Configuration

- [ ] Set `CI=true` environment variable
- [ ] Run tests: `CI=true pnpm test:e2e`
- [ ] Verify tests run in headless mode
- [ ] Verify retries are enabled (2 retries)
- [ ] Verify GitHub reporter is used

#### Task 5.2: Verify Artifacts

- [ ] Run tests to generate artifacts
- [ ] Check `playwright-report/` for HTML report
- [ ] Check `test-results/` for screenshots/videos
- [ ] Open HTML report: `pnpm test:e2e:report`
- [ ] Verify videos captured on failure

#### Task 5.3: Optimize for CI Performance

- [ ] Configure `workers: 1` on CI to avoid flakiness
- [ ] Configure `fullyParallel: true` for local development
- [ ] Test parallel execution locally
- [ ] Ensure no test interdependencies

#### Task 5.4: Add CI Script (Future)

- [ ] Document CI integration steps for GitHub Actions
- [ ] Suggest caching strategy for Playwright browsers
- [ ] Recommend parallel execution strategy

---

### Phase 6: Documentation & Cleanup (15 min)

#### Task 6.1: Update README

- [ ] Add "E2E Testing" section to `apps/admin/README.md`
- [ ] Document how to run tests locally
- [ ] Document how to debug failing tests
- [ ] Document how to view test reports
- [ ] Explain MSW integration

#### Task 6.2: Add Code Comments

- [ ] Comment Playwright config explaining each option
- [ ] Comment test fixtures explaining MSW setup
- [ ] Add JSDoc to helper functions

#### Task 6.3: Create Testing Guidelines Document

- [ ] Create `apps/admin/e2e/README.md`
- [ ] Document test structure and patterns
- [ ] Document selector strategies (prefer role-based)
- [ ] Document waiting strategies (avoid arbitrary timeouts)
- [ ] Document scenario testing patterns

#### Task 6.4: Verify Everything Works

- [ ] Run full test suite: `pnpm test:e2e`
- [ ] Run in UI mode: `pnpm test:e2e:ui`
- [ ] Verify all tests pass
- [ ] Generate and review HTML report
- [ ] Commit all changes

---

## Success Criteria

- [ ] Playwright installed and browsers configured
- [ ] Configuration file created with proper settings
- [ ] MSW integration working with test fixtures
- [ ] Navigation test passes (products page loads)
- [ ] Filter tests pass (category, search, pagination)
- [ ] Error scenario tests pass (server error, rate limit)
- [ ] Tests run in CI mode successfully
- [ ] HTML reports generated with screenshots/videos
- [ ] Documentation updated with testing instructions

---

## Future Enhancements (Not in Scope)

- [ ] Visual regression testing (Playwright screenshots comparison)
- [ ] Component-level testing with Playwright CT
- [ ] Cross-browser testing (Firefox, WebKit)
- [ ] Mobile viewport testing
- [ ] Network throttling tests
- [ ] Authentication flow testing
- [ ] File upload/download testing
- [ ] Accessibility testing integration (axe-playwright)
- [ ] Performance testing (Web Vitals)

---

## Notes

### Test Writing Best Practices

1. **Use Role-Based Selectors**: `getByRole('button', { name: /submit/i })`
2. **Avoid Brittle Selectors**: Don't use CSS classes or IDs specific to styling
3. **Auto-Waiting**: Playwright auto-waits, avoid `waitForTimeout` when possible
4. **Isolate Tests**: Each test should be independent (use beforeEach)
5. **Meaningful Assertions**: Test user-visible behavior, not implementation

### MSW Integration Notes

- MSW worker is already initialized in `main.tsx` for development
- Tests leverage the same worker setup
- Scenario switching via localStorage persists across page loads
- MSW intercepts happen at the service worker level (HTTP realistic)

### Known Limitations

- **Service Worker Scope**: MSW requires `mockServiceWorker.js` in `/public`
- **Scenario Timing**: localStorage changes may require page reload
- **Debouncing**: Filters might have debounce delays (adjust waits accordingly)

### Debugging Tips

```bash
# Run with headed browser to see what's happening
pnpm test:e2e:headed

# Run with Playwright Inspector for step-by-step debugging
pnpm test:e2e:debug

# Run specific test file
pnpm test:e2e products.spec.ts

# Run with specific browser
pnpm test:e2e --project=chromium

# Update snapshots (if using visual regression)
pnpm test:e2e --update-snapshots
```

---

## Related Specifications

- **002-storybook-design-system.md**: Component-level visual testing
- **004-api-mocks-testing-integration.md**: Enhanced MSW integration for testing
- **001-introduce-modular-api-mocks.md**: Foundation of the MSW setup

---

## References

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [MSW with Playwright](https://mswjs.io/docs/integrations/node)
- [Playwright CI/CD](https://playwright.dev/docs/ci)
