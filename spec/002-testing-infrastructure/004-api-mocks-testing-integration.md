# 004 - API Mocks Testing Integration

## Epic: 002-testing-infrastructure

## Task: 004-api-mocks-testing-integration

### Overview

This specification defines enhancements to the `@nevo/api-mocks` package to better support **Storybook** and **Playwright** testing workflows. The goal is to make scenario switching more flexible and testable through programmatic APIs, not just localStorage.

This is a **follow-up specification** to:
- **002-storybook-design-system.md**: Needs scenario controls in Storybook toolbar
- **003-playwright-admin-app.md**: Needs programmatic scenario APIs for test automation

### Current State

The existing `@nevo/api-mocks` package provides:
- ✅ Scenario management via `ScenarioManager` class
- ✅ localStorage persistence for scenario state
- ✅ `withScenarios` HOC for MSW handlers
- ✅ Predefined scenarios: success, empty, loading-slow, rate-limit, server-error, etc.

### Gaps to Address

1. **Programmatic API**: Currently relies on localStorage, needs runtime API
2. **Storybook Integration**: No toolbar addon to switch scenarios visually
3. **Playwright Helpers**: No test utilities for scenario control
4. **Documentation**: Limited examples for testing workflows
5. **Type Safety**: Scenario types could be more strongly typed

### Objectives

- Add programmatic API to set scenarios without localStorage
- Create Storybook toolbar addon for scenario switching
- Create Playwright helper utilities for test scenarios
- Improve TypeScript types for scenario management
- Document testing patterns with examples
- Ensure backward compatibility with existing code

---

## Architecture Decisions

### Programmatic API Design

```typescript
// Before (localStorage only)
localStorage.setItem('mock-scenario', 'rate-limit');

// After (programmatic API)
import { scenarios } from '@nevo/api-mocks';
scenarios.set('rate-limit');

// Also available in window (for Playwright)
window.setMockScenario('rate-limit');
```

### Storybook Integration

```typescript
// Storybook toolbar addon
// Users can switch scenarios via Storybook UI toolbar
// Automatically reloads stories when scenario changes
```

### Playwright Integration

```typescript
// Playwright helper
import { setScenario } from '@nevo/api-mocks/playwright';

test('rate limit handling', async ({ page }) => {
  await setScenario(page, 'rate-limit');
  await page.goto('/products');
  // Test rate limit UI
});
```

---

## Requirements

### 1. Enhanced Scenario Manager

#### `packages/api-mocks/src/foundation/scenarios.ts`

Add global window API and event dispatching:

```typescript
type Scenario = 
  | 'success'
  | 'empty' 
  | 'loading-slow'
  | 'rate-limit'
  | 'server-error'
  | 'validation-error'
  | 'network-error';

export type { Scenario };

class ScenarioManager {
  private currentScenario: Scenario = 'success';
  private listeners: Set<(scenario: Scenario) => void> = new Set();

  set(scenario: Scenario): void {
    const previous = this.currentScenario;
    this.currentScenario = scenario;
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock-scenario', scenario);
      
      // Dispatch custom event for UI updates
      window.dispatchEvent(new CustomEvent('mock-scenario-change', {
        detail: { scenario, previous }
      }));
    }
    
    // Notify listeners
    this.listeners.forEach(listener => listener(scenario));
  }

  current(): Scenario {
    // Check localStorage first for persistence
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mock-scenario') as Scenario;
      if (stored && this.isValidScenario(stored)) {
        this.currentScenario = stored;
      }
    }
    return this.currentScenario;
  }

  reset(): void {
    this.set('success');
  }

  list(): Scenario[] {
    return [
      'success',
      'empty',
      'loading-slow', 
      'rate-limit',
      'server-error',
      'validation-error',
      'network-error'
    ];
  }

  subscribe(listener: (scenario: Scenario) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private isValidScenario(value: string): value is Scenario {
    return this.list().includes(value as Scenario);
  }
}

export const scenarios = new ScenarioManager();

// Global window API (for Storybook/Playwright)
if (typeof window !== 'undefined') {
  (window as any).setMockScenario = (scenario: Scenario) => scenarios.set(scenario);
  (window as any).getMockScenario = () => scenarios.current();
  (window as any).resetMockScenario = () => scenarios.reset();
  (window as any).listMockScenarios = () => scenarios.list();
}

export function getCurrentScenario(): Scenario {
  return scenarios.current();
}

export function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 2. Playwright Helpers

#### `packages/api-mocks/src/playwright.ts` (NEW)

```typescript
import type { Page } from '@playwright/test';
import type { Scenario } from './foundation/scenarios';

/**
 * Playwright helper to set mock scenario
 * @param page - Playwright page object
 * @param scenario - Scenario to activate
 */
export async function setScenario(page: Page, scenario: Scenario): Promise<void> {
  await page.evaluate((s) => {
    (window as any).setMockScenario(s);
  }, scenario);
}

/**
 * Get current scenario in Playwright test
 */
export async function getScenario(page: Page): Promise<Scenario> {
  return await page.evaluate(() => {
    return (window as any).getMockScenario();
  });
}

/**
 * Reset scenario to 'success' in Playwright test
 */
export async function resetScenario(page: Page): Promise<void> {
  await page.evaluate(() => {
    (window as any).resetMockScenario();
  });
}

/**
 * Wait for scenario to be applied (waits for network idle)
 */
export async function waitForScenario(page: Page, scenario: Scenario): Promise<void> {
  await setScenario(page, scenario);
  // Wait a bit for scenario to take effect
  await page.waitForTimeout(100);
}
```

### 3. Storybook Toolbar Addon

#### `packages/api-mocks/src/storybook/addon.ts` (NEW)

```typescript
import { useEffect, useCallback } from 'react';
import { useGlobals } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { scenarios, Scenario } from '../foundation/scenarios';

export const ADDON_ID = 'nevo/mock-scenarios';
export const TOOL_ID = `${ADDON_ID}/toolbar`;
export const PARAM_KEY = 'mockScenario';

/**
 * Storybook toolbar addon for scenario switching
 */
export const MockScenarioToolbar = () => {
  const [globals, updateGlobals] = useGlobals();
  const currentScenario = globals[PARAM_KEY] || 'success';

  const handleScenarioChange = useCallback((scenario: Scenario) => {
    // Update Storybook global state
    updateGlobals({ [PARAM_KEY]: scenario });
    
    // Update scenario manager
    scenarios.set(scenario);
  }, [updateGlobals]);

  useEffect(() => {
    // Sync initial scenario
    scenarios.set(currentScenario);
  }, [currentScenario]);

  return (
    <div>
      {/* Toolbar implementation */}
    </div>
  );
};
```

#### `packages/api-mocks/src/storybook/decorator.tsx` (NEW)

```typescript
import type { Decorator } from '@storybook/react';
import { useEffect } from 'react';
import { scenarios } from '../foundation/scenarios';

/**
 * Storybook decorator to sync scenario changes
 */
export const withMockScenario: Decorator = (Story, context) => {
  const scenario = context.globals.mockScenario || 'success';

  useEffect(() => {
    scenarios.set(scenario);
  }, [scenario]);

  return <Story />;
};
```

### 4. Package Exports Updates

#### `packages/api-mocks/package.json`

Add new export paths:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./browser": "./src/browser.ts",
    "./node": "./src/node.ts",
    "./playwright": "./src/playwright.ts",
    "./storybook": "./src/storybook/index.ts"
  }
}
```

### 5. TypeScript Types Export

#### `packages/api-mocks/src/index.ts`

```typescript
export { scenarios, getCurrentScenario, simulateDelay } from './foundation/scenarios';
export type { Scenario } from './foundation/scenarios';
export { withScenarios } from './foundation/withScenarios';
export { generateErrorResponse } from './foundation/errors';
```

### 6. Documentation

#### `packages/api-mocks/README.md` Updates

Add new sections:

````markdown
## Testing Integration

### Playwright

```typescript
import { test, expect } from '@playwright/test';
import { setScenario, resetScenario } from '@nevo/api-mocks/playwright';

test.beforeEach(async ({ page }) => {
  await resetScenario(page);
});

test('handles rate limiting', async ({ page }) => {
  await setScenario(page, 'rate-limit');
  await page.goto('/products');
  
  await expect(page.getByText(/rate limit/i)).toBeVisible();
});
```

### Storybook

```typescript
// .storybook/preview.tsx
import { withMockScenario } from '@nevo/api-mocks/storybook';

export const decorators = [withMockScenario];

export const globalTypes = {
  mockScenario: {
    description: 'API Mock Scenario',
    defaultValue: 'success',
    toolbar: {
      title: 'Mock Scenario',
      items: [
        { value: 'success', title: 'Success' },
        { value: 'empty', title: 'Empty' },
        { value: 'loading-slow', title: 'Slow Loading' },
        { value: 'rate-limit', title: 'Rate Limit' },
        { value: 'server-error', title: 'Server Error' },
      ],
      dynamicTitle: true,
    },
  },
};
```

### Programmatic API

```typescript
import { scenarios } from '@nevo/api-mocks';

// Set scenario
scenarios.set('rate-limit');

// Get current scenario
const current = scenarios.current(); // 'rate-limit'

// Subscribe to changes
const unsubscribe = scenarios.subscribe((scenario) => {
  console.log('Scenario changed to:', scenario);
});

// Reset to success
scenarios.reset();
```
````

---

## Execution Plan (Tasks)

### Phase 1: Core API Enhancements (45 min)

#### Task 1.1: Enhance ScenarioManager Class
- [ ] Open `packages/api-mocks/src/foundation/scenarios.ts`
- [ ] Add `listeners` Set to track subscribers
- [ ] Add `subscribe()` method for reactive updates
- [ ] Add `isValidScenario()` private method for type checking
- [ ] Update `set()` to dispatch window event and notify listeners
- [ ] Export `Scenario` type

#### Task 1.2: Add Window Global API
- [ ] Add `window.setMockScenario()` function
- [ ] Add `window.getMockScenario()` function
- [ ] Add `window.resetMockScenario()` function
- [ ] Add `window.listMockScenarios()` function
- [ ] Add TypeScript declarations for window extensions

#### Task 1.3: Update Exports
- [ ] Update `packages/api-mocks/src/index.ts` to export Scenario type
- [ ] Export scenarios instance
- [ ] Ensure backward compatibility

#### Task 1.4: Test Core Changes
- [ ] Create test file `scenarios.test.ts`
- [ ] Test scenario setting and getting
- [ ] Test subscription mechanism
- [ ] Test localStorage persistence
- [ ] Test event dispatching

---

### Phase 2: Playwright Integration (30 min)

#### Task 2.1: Create Playwright Helper Module
- [ ] Create `packages/api-mocks/src/playwright.ts`
- [ ] Implement `setScenario(page, scenario)` helper
- [ ] Implement `getScenario(page)` helper
- [ ] Implement `resetScenario(page)` helper
- [ ] Implement `waitForScenario(page, scenario)` helper
- [ ] Add JSDoc documentation

#### Task 2.2: Add TypeScript Types
- [ ] Add Playwright types as peer dependency (optional)
- [ ] Add proper type definitions for all helpers
- [ ] Export types from playwright module

#### Task 2.3: Update Package Exports
- [ ] Add `"./playwright": "./src/playwright.ts"` to package.json exports
- [ ] Verify export works in TypeScript projects

#### Task 2.4: Create Playwright Examples
- [ ] Add example test in README showing scenario usage
- [ ] Document beforeEach pattern for resetting scenarios
- [ ] Document common test patterns

---

### Phase 3: Storybook Integration (60 min)

#### Task 3.1: Create Storybook Decorator
- [ ] Create `packages/api-mocks/src/storybook/` directory
- [ ] Create `decorator.tsx` with `withMockScenario` decorator
- [ ] Implement scenario syncing with Storybook globals
- [ ] Add React hooks for scenario management

#### Task 3.2: Create Toolbar Configuration
- [ ] Create `addon.ts` for toolbar configuration (optional full addon)
- [ ] OR document how to use Storybook's built-in toolbar
- [ ] Define scenario items for toolbar dropdown

#### Task 3.3: Create Storybook Index
- [ ] Create `packages/api-mocks/src/storybook/index.ts`
- [ ] Export decorator
- [ ] Export toolbar config (if applicable)
- [ ] Add TypeScript types

#### Task 3.4: Add Package Export
- [ ] Add `"./storybook": "./src/storybook/index.ts"` to package.json
- [ ] Verify Storybook can import the decorator

#### Task 3.5: Create Storybook Documentation
- [ ] Add Storybook section to README
- [ ] Show how to add decorator to `.storybook/preview.tsx`
- [ ] Show how to configure globalTypes for toolbar
- [ ] Add example story using scenario switching

#### Task 3.6: Create Example Story
- [ ] Create example story showing scenario switching
- [ ] Demonstrate error states, loading states, etc.
- [ ] Add to README as reference

---

### Phase 4: Documentation & Examples (30 min)

#### Task 4.1: Update Main README
- [ ] Add "Testing Integration" section
- [ ] Add Playwright usage examples
- [ ] Add Storybook usage examples
- [ ] Add programmatic API examples
- [ ] Update quick start guide

#### Task 4.2: Create Testing Patterns Guide
- [ ] Document common testing scenarios
- [ ] Show how to test error handling
- [ ] Show how to test loading states
- [ ] Show how to test empty states
- [ ] Document best practices

#### Task 4.3: Add TypeScript Examples
- [ ] Ensure all examples are TypeScript
- [ ] Show proper type imports
- [ ] Demonstrate type safety

#### Task 4.4: Create Migration Guide
- [ ] Document changes from v1 (if applicable)
- [ ] Show backward compatibility
- [ ] Highlight new features

---

### Phase 5: Testing & Verification (40 min)

#### Task 5.1: Test Playwright Integration
- [ ] Create test app with Playwright
- [ ] Import `@nevo/api-mocks/playwright`
- [ ] Test `setScenario()` helper
- [ ] Verify scenarios actually change in tests
- [ ] Test with multiple scenarios

#### Task 5.2: Test Storybook Integration
- [ ] Add decorator to Storybook instance
- [ ] Configure toolbar in preview.tsx
- [ ] Verify toolbar appears in Storybook UI
- [ ] Test switching scenarios via toolbar
- [ ] Verify stories update when scenario changes

#### Task 5.3: Test Programmatic API
- [ ] Test `scenarios.set()` in browser
- [ ] Test `scenarios.subscribe()` reactivity
- [ ] Test window global functions
- [ ] Verify localStorage persistence

#### Task 5.4: Test Type Safety
- [ ] Verify TypeScript types work correctly
- [ ] Test IDE autocomplete for scenarios
- [ ] Verify type errors for invalid scenarios

#### Task 5.5: Integration Testing
- [ ] Test with actual design-system Storybook (from spec 002)
- [ ] Test with actual admin Playwright tests (from spec 003)
- [ ] Verify no breaking changes to existing code

---

### Phase 6: Polish & Release (20 min)

#### Task 6.1: Code Review
- [ ] Review all new code for quality
- [ ] Ensure consistent code style
- [ ] Add missing JSDoc comments
- [ ] Remove console.logs and debug code

#### Task 6.2: Update Changelog
- [ ] Document new features
- [ ] Document breaking changes (if any)
- [ ] Add migration notes

#### Task 6.3: Version Bump
- [ ] Update package version (minor bump)
- [ ] Update dependencies if needed

#### Task 6.4: Final Verification
- [ ] Run all package tests
- [ ] Verify build succeeds
- [ ] Test in design-system package
- [ ] Test in admin app

---

## Success Criteria

- [ ] Programmatic API works (`scenarios.set()`, `scenarios.subscribe()`)
- [ ] Window global functions available (`window.setMockScenario()`)
- [ ] Playwright helpers work in E2E tests
- [ ] Storybook decorator syncs scenarios with toolbar
- [ ] TypeScript types properly exported
- [ ] Documentation updated with examples
- [ ] Backward compatible with existing code
- [ ] All tests pass

---

## Future Enhancements (Not in Scope)

- [ ] Custom scenario definitions (user-defined scenarios)
- [ ] Scenario presets/combinations (e.g., "slow + error")
- [ ] Scenario recording/playback
- [ ] Visual scenario timeline in Storybook
- [ ] Scenario analytics (track which scenarios used in tests)
- [ ] Network waterfall visualization
- [ ] Response time randomization
- [ ] Scenario templates for common patterns

---

## Notes

### Breaking Changes

**None expected** - all new features are additive. Existing code using localStorage or `withScenarios` will continue to work.

### Design Decisions

1. **Window Global API**: Makes it easy for Playwright to control scenarios
2. **Event System**: Allows UI components to react to scenario changes
3. **Subscription Pattern**: Enables reactive updates in Storybook
4. **Separate Exports**: `@nevo/api-mocks/playwright` keeps main bundle small

### TypeScript Considerations

```typescript
// Strong typing for scenarios
type Scenario = 'success' | 'empty' | 'loading-slow' | ...;

// Prevents typos
scenarios.set('sucess'); // ❌ TypeScript error
scenarios.set('success'); // ✅ OK
```

### Storybook Toolbar vs Full Addon

**Approach**: Use Storybook's built-in `globalTypes` toolbar instead of building a full addon.

**Pros**:
- Simpler implementation
- No addon registration needed
- Uses standard Storybook API

**Cons**:
- Less customization (fine for v1)

### Testing Philosophy

- **Playwright**: Control scenarios programmatically via helpers
- **Storybook**: Control scenarios visually via toolbar
- **Both**: Use same underlying ScenarioManager for consistency

---

## Related Specifications

- **002-storybook-design-system.md**: Will use Storybook decorator
- **003-playwright-admin-app.md**: Will use Playwright helpers
- **001-introduce-modular-api-mocks.md**: Original MSW foundation

---

## References

- [Storybook Decorators](https://storybook.js.org/docs/react/writing-stories/decorators)
- [Storybook Toolbars](https://storybook.js.org/docs/react/essentials/toolbars-and-globals)
- [Playwright Page API](https://playwright.dev/docs/api/class-page)
- [MSW Best Practices](https://mswjs.io/docs/best-practices)
