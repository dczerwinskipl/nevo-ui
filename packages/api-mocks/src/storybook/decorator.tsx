/**
 * Storybook decorator for MSW mock scenario management
 * 
 * @example
 * ```typescript
 * // .storybook/preview.tsx
 * import { withMockScenario } from '@nevo/api-mocks/storybook';
 * 
 * export const decorators = [withMockScenario];
 * 
 * export const globalTypes = {
 *   mockScenario: {
 *     description: 'API Mock Scenario',
 *     defaultValue: 'success',
 *     toolbar: {
 *       title: 'Mock Scenario',
 *       icon: 'database',
 *       items: [
 *         { value: 'success', title: 'Success', icon: 'check' },
 *         { value: 'empty', title: 'Empty', icon: 'circle' },
 *         { value: 'loading-slow', title: 'Slow Loading', icon: 'time' },
 *         { value: 'rate-limit', title: 'Rate Limit', icon: 'stop' },
 *         { value: 'server-error', title: 'Server Error', icon: 'alert' },
 *         { value: 'validation-error', title: 'Validation Error', icon: 'cross' },
 *         { value: 'network-error', title: 'Network Error', icon: 'globe' },
 *       ],
 *       dynamicTitle: true,
 *     },
 *   },
 * };
 * ```
 */

import { scenarios } from '../foundation/scenarios';
import type { Scenario } from '../foundation/scenarios';

/**
 * Storybook decorator to sync mock scenarios with Storybook toolbar
 * 
 * This decorator listens to the `mockScenario` global and updates the
 * ScenarioManager accordingly. This allows you to switch scenarios
 * using the Storybook toolbar.
 * 
 * Note: This uses dynamic imports to avoid requiring React as a dependency
 * 
 * @example
 * ```typescript
 * export const decorators = [withMockScenario];
 * ```
 */
export const withMockScenario: any = (Story: any, context: any) => {
  const scenario = (context.globals.mockScenario as Scenario) || 'success';

  // We use dynamic require to avoid React dependency at build time
  // React will be available in the Storybook environment
  if (typeof window !== 'undefined' && 'React' in window) {
    const React = (window as any).React;
    React.useEffect(() => {
      scenarios.set(scenario);
    }, [scenario]);
  } else {
    // Fallback if React hooks are not available
    scenarios.set(scenario);
  }

  return Story();
};

/**
 * Example globalTypes configuration for Storybook toolbar
 * Copy this to your .storybook/preview.tsx
 */
export const mockScenarioGlobalTypes = {
  mockScenario: {
    description: 'API Mock Scenario',
    defaultValue: 'success',
    toolbar: {
      title: 'Mock Scenario',
      icon: 'database',
      items: [
        { value: 'success', title: '✅ Success', icon: 'check' },
        { value: 'empty', title: '⭕ Empty', icon: 'circle' },
        { value: 'loading-slow', title: '⏱️ Slow Loading', icon: 'time' },
        { value: 'rate-limit', title: '🛑 Rate Limit', icon: 'stop' },
        { value: 'server-error', title: '❌ Server Error', icon: 'alert' },
        { value: 'validation-error', title: '⚠️ Validation Error', icon: 'cross' },
        { value: 'network-error', title: '🌐 Network Error', icon: 'globe' },
      ],
      dynamicTitle: true,
    },
  },
};
