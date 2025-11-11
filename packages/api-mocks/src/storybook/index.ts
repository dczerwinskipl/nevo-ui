/**
 * Storybook integration for MSW mock scenarios
 * 
 * @example
 * ```typescript
 * // .storybook/preview.tsx
 * import { withMockScenario, mockScenarioGlobalTypes } from '@nevo/api-mocks/storybook';
 * 
 * export const decorators = [withMockScenario];
 * export const globalTypes = mockScenarioGlobalTypes;
 * ```
 */

export { withMockScenario, mockScenarioGlobalTypes } from './decorator';
export type { Scenario } from '../foundation/scenarios';
