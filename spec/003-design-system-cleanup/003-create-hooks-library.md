# Story 003: Create Hooks Library

## Summary

As a **component developer**, I want **reusable custom hooks extracted and tested** so that **complex component logic is modular, testable, and reusable across components**.

## Context

**Background:** Multiple components (Modal, Select, Input) contain complex logic that should be extracted into custom hooks for better testability, reusability, and maintainability.

**Current State:**
- Modal has inline click-outside logic
- Select has inline dropdown state management
- Input/Select have inline style calculation logic
- Modal has inline focus trap logic

**Desired State:**
- `useClickOutside` hook for detecting clicks outside an element
- `useDropdown` hook for managing dropdown open/close state
- `useInputStyles` hook for Input style calculations
- `useSelectStyles` hook for Select style calculations  
- `useFocusTrap` hook for trapping focus within modals

**Links:**
- Parent Epic: [003-design-system-cleanup/README-UPDATED.md](./README-UPDATED.md)
- Related Audit: [AUDIT-REPORT-COMPLETE.md](./AUDIT-REPORT-COMPLETE.md)

## Detailed Requirements

### 1. useClickOutside Hook
Detects clicks outside a referenced element and calls a callback.

**API:**
```tsx
function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  enabled?: boolean
): RefObject<T>
```

**Behavior:**
- Returns a ref to attach to the element
- Calls callback when click happens outside the element
- Can be disabled via `enabled` parameter
- Cleans up event listeners on unmount

### 2. useDropdown Hook
Manages dropdown open/close state with keyboard support.

**API:**
```tsx
interface UseDropdownReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  dropdownRef: RefObject<HTMLDivElement>;
}

function useDropdown(initialOpen?: boolean): UseDropdownReturn
```

**Behavior:**
- Manages `isOpen` state
- Provides open, close, toggle functions
- Closes on Escape key
- Returns ref for dropdown container

### 3. useInputStyles Hook
Calculates Input component styles based on props.

**API:**
```tsx
interface InputStylesParams {
  intent?: 'default' | 'error' | 'success' | 'warning';
  disabled?: boolean;
  focused?: boolean;
}

function useInputStyles(params: InputStylesParams): string
```

**Behavior:**
- Returns className string based on intent, disabled, focused states
- Uses only Tailwind classes
- Memoized for performance

### 4. useSelectStyles Hook
Calculates Select component styles based on props.

**API:**
```tsx
interface SelectStylesParams {
  intent?: 'default' | 'error' | 'success' | 'warning';
  disabled?: boolean;
  isOpen?: boolean;
}

function useSelectStyles(params: SelectStylesParams): string
```

**Behavior:**
- Returns className string based on intent, disabled, isOpen states
- Uses only Tailwind classes
- Memoized for performance

### 5. useFocusTrap Hook
Traps focus within an element (for modals, dialogs).

**API:**
```tsx
function useFocusTrap<T extends HTMLElement = HTMLElement>(
  enabled?: boolean
): RefObject<T>
```

**Behavior:**
- Returns a ref to attach to the container
- Traps Tab/Shift+Tab within the container
- Focuses first focusable element when enabled
- Restores focus to trigger element when disabled
- Handles edge cases (no focusable elements, etc.)

## Acceptance Criteria

### Hook Files
- [ ] AC1: `useClickOutside.ts` created in `packages/design-system/src/hooks/` (Verification: File exists)
- [ ] AC2: `useDropdown.ts` created (Verification: File exists)
- [ ] AC3: `useInputStyles.ts` created (Verification: File exists)
- [ ] AC4: `useSelectStyles.ts` created (Verification: File exists)
- [ ] AC5: `useFocusTrap.ts` created (Verification: File exists)
- [ ] AC6: `index.ts` created exporting all hooks (Verification: File exists, exports verified)

### Implementation
- [ ] AC7: useClickOutside handles mousedown and touchstart events (Verification: Unit test)
- [ ] AC8: useClickOutside cleans up listeners on unmount (Verification: Unit test)
- [ ] AC9: useDropdown closes on Escape key (Verification: Unit test)
- [ ] AC10: useDropdown manages state correctly (Verification: Unit test)
- [ ] AC11: useInputStyles returns correct classes for all intents (Verification: Unit test)
- [ ] AC12: useSelectStyles returns correct classes for all states (Verification: Unit test)
- [ ] AC13: useFocusTrap traps Tab key navigation (Verification: Unit test)
- [ ] AC14: useFocusTrap restores focus on unmount (Verification: Unit test)

### Testing
- [ ] AC15: useClickOutside.test.ts with ≥80% coverage (Verification: `pnpm test useClickOutside`)
- [ ] AC16: useDropdown.test.ts with ≥80% coverage (Verification: `pnpm test useDropdown`)
- [ ] AC17: useInputStyles.test.ts with ≥80% coverage (Verification: `pnpm test useInputStyles`)
- [ ] AC18: useSelectStyles.test.ts with ≥80% coverage (Verification: `pnpm test useSelectStyles`)
- [ ] AC19: useFocusTrap.test.ts with ≥80% coverage (Verification: `pnpm test useFocusTrap`)

### Documentation
- [ ] AC20: JSDoc comments added to all hooks (Verification: Code review)
- [ ] AC21: Usage examples in JSDoc (Verification: Code review)
- [ ] AC22: `hooks/README.md` created documenting all hooks (Verification: File exists)
- [ ] AC23: All hooks exported from `packages/design-system/src/index.ts` (Verification: Import test)

### Integration
- [ ] AC24: No TypeScript errors (Verification: `pnpm tsc --noEmit`)
- [ ] AC25: No linting errors (Verification: `pnpm lint`)
- [ ] AC26: All tests pass (Verification: `pnpm test`)

## Technical Approach

### Directory Structure
```
packages/design-system/src/hooks/
├── index.ts
├── README.md
├── useClickOutside.ts
├── useClickOutside.test.ts
├── useDropdown.ts
├── useDropdown.test.ts
├── useInputStyles.ts
├── useInputStyles.test.ts
├── useSelectStyles.ts
├── useSelectStyles.test.ts
├── useFocusTrap.ts
└── useFocusTrap.test.ts
```

### Implementation Pattern

Example for useClickOutside:

```tsx
import { useEffect, useRef, RefObject } from 'react';

/**
 * Hook to detect clicks outside a referenced element
 * 
 * @param callback - Function to call when click outside is detected
 * @param enabled - Whether the hook is active (default: true)
 * @returns Ref to attach to the element
 * 
 * @example
 * ```tsx
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useClickOutside(() => setIsOpen(false), isOpen);
 *   
 *   return <div ref={ref}>...</div>;
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  enabled: boolean = true
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [callback, enabled]);

  return ref;
}
```

### Testing Strategy

**Unit Tests (per hook):**
- Test happy path
- Test edge cases
- Test cleanup
- Test with different parameters
- Test TypeScript types

**Example Test:**
```tsx
describe('useClickOutside', () => {
  it('calls callback when clicking outside', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    
    // Simulate click outside
    fireEvent.mouseDown(document.body);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback when clicking inside', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));
    
    // Simulate click inside
    const element = result.current.current;
    fireEvent.mouseDown(element);
    
    expect(callback).not.toHaveBeenCalled();
  });
});
```

## Definition of Done

- [ ] All 5 hooks created with TypeScript
- [ ] All hooks have unit tests with ≥80% coverage
- [ ] All tests passing (`pnpm test`)
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No linting errors (`pnpm lint`)
- [ ] JSDoc comments added to all hooks
- [ ] hooks/README.md created with usage examples
- [ ] All hooks exported from main index.ts
- [ ] Code reviewed and approved
- [ ] PR merged to main

## Dependencies

**Before This Story:**
- None (can start immediately)

**After This Story:**
- Story 007 (Refactor Input) will use useInputStyles
- Story 008 (Refactor Select) will use useDropdown, useSelectStyles, useClickOutside
- Story 010 (Refactor Modal) will use useClickOutside, useFocusTrap

## Effort Estimate

- **Size:** Large (L)
- **Complexity:** Medium
- **Estimated Hours:** 8 hours
  - useClickOutside: 1.5 hours
  - useDropdown: 2 hours
  - useInputStyles: 1 hour
  - useSelectStyles: 1 hour
  - useFocusTrap: 2 hours
  - Documentation: 0.5 hours

## Task Breakdown

### Task 1: Setup Hooks Directory (15 minutes)
- [ ] Create `hooks/` directory
- [ ] Create `hooks/index.ts`
- [ ] Create `hooks/README.md` template

### Task 2: Create useClickOutside (90 minutes)
- [ ] Implement hook
- [ ] Write unit tests
- [ ] Add JSDoc
- [ ] Export from index

### Task 3: Create useDropdown (120 minutes)
- [ ] Implement hook with state management
- [ ] Add keyboard support
- [ ] Write unit tests
- [ ] Add JSDoc
- [ ] Export from index

### Task 4: Create useInputStyles (60 minutes)
- [ ] Implement hook
- [ ] Write unit tests
- [ ] Add JSDoc
- [ ] Export from index

### Task 5: Create useSelectStyles (60 minutes)
- [ ] Implement hook
- [ ] Write unit tests
- [ ] Add JSDoc
- [ ] Export from index

### Task 6: Create useFocusTrap (120 minutes)
- [ ] Implement focus trap logic
- [ ] Handle edge cases
- [ ] Write comprehensive tests
- [ ] Add JSDoc
- [ ] Export from index

### Task 7: Documentation & Integration (30 minutes)
- [ ] Complete hooks/README.md
- [ ] Export all hooks from main index.ts
- [ ] Verify all tests pass
- [ ] Verify TypeScript/linting

## Notes

- These hooks will be used by multiple components
- Keep hooks focused and single-purpose
- Ensure proper TypeScript typing
- Follow React hooks best practices
- Use `useCallback` and `useMemo` where appropriate

## References

- Component Guidelines: [.copilot/conventions.md](../../.copilot/conventions.md)
- Testing Strategy: [.copilot/context/testing-strategy.md](../../.copilot/context/testing-strategy.md)
- React Hooks Documentation: https://react.dev/reference/react
