# Definition of Done Checklist

This checklist defines when a feature, component, or task is considered "done" and ready for review and release.

---

## ✅ Implementation Checklist

### Code Complete

- [ ] **Implementation is complete and functional**
  - All acceptance criteria met
  - Feature works as specified
  - Edge cases handled
  - Error states implemented

- [ ] **TypeScript types are properly defined**
  - No `any` types without justification
  - Proper interface/type definitions
  - Generic types used where appropriate
  - JSDoc comments for public APIs

- [ ] **Code follows project conventions**
  - Naming conventions followed (see [Conventions](../conventions.md))
  - File structure matches project standards
  - Component structure follows patterns (see [Component Recipe](../recipes/component.md))
  - Proper imports and exports

- [ ] **Code is clean and maintainable**
  - No commented-out code
  - No console.logs or debug statements
  - No unused imports or variables
  - Proper code organization and readability

---

## 🧪 Testing Complete

- [ ] **Unit tests written and passing**
  - All functions/methods tested
  - Edge cases covered
  - Error handling tested
  - Test coverage meets minimum threshold (80%+)

- [ ] **Component tests written** (for UI components)
  - Rendering tests
  - User interaction tests
  - State management tests
  - Prop validation tests

- [ ] **Integration tests written** (when applicable)
  - API integration tested
  - Data flow tested
  - Component composition tested

- [ ] **E2E tests written** (for critical user flows)
  - Happy path tested
  - Error scenarios tested
  - User workflows validated

- [ ] **All tests passing**
  - `pnpm run test` passes
  - No failing or skipped tests
  - No flaky tests
  - CI pipeline passes

---

## 🎨 Design System (for components)

- [ ] **Component documented in Storybook**
  - All variants have stories
  - All states have stories (default, hover, focus, disabled, loading, error)
  - Interactive controls configured
  - Usage examples provided

- [ ] **Component follows design system patterns**
  - Uses theme tokens (Tailwind classes)
  - Supports all required intents (primary, success, error, warning, info, neutral)
  - Supports all required sizes (sm, md, lg)
  - Consistent with existing components

- [ ] **Accessibility requirements met**
  - ARIA attributes present where needed
  - Keyboard navigation works
  - Focus management implemented
  - Screen reader friendly
  - Color contrast meets WCAG 2.1 AA
  - Accessibility tests passing

---

## 📖 Documentation Complete

- [ ] **Code documentation**
  - JSDoc comments for public APIs
  - Complex logic explained with comments
  - README updated (if applicable)
  - Type definitions documented

- [ ] **Usage documentation**
  - How to use the feature/component
  - Common use cases covered
  - Props/API documented
  - Examples provided

- [ ] **Migration guide** (for breaking changes)
  - What changed
  - Why it changed
  - How to migrate
  - Code examples

---

## 🔍 Code Quality

- [ ] **TypeScript compilation passes**
  - `pnpm run typecheck` passes
  - No type errors
  - Strict mode enabled

- [ ] **ESLint passes without warnings**
  - `pnpm run lint` passes
  - No ESLint errors
  - No ESLint warnings
  - Prettier formatting applied

- [ ] **Build successful**
  - `pnpm run build` passes
  - No build errors
  - No build warnings
  - Bundle size acceptable

---

## 👁️ Code Review

- [ ] **Pull request created**
  - Descriptive PR title (follows conventional commits)
  - PR description explains changes
  - Links to related issues/specs
  - Screenshots/videos included (for UI changes)

- [ ] **Code review approved**
  - At least one approval from team member
  - All review comments addressed
  - No unresolved conversations
  - Reviewer validated functionality

- [ ] **PR checklist completed**
  - All items in [PR Review Checklist](./pr_review.md) checked
  - Self-review completed
  - No merge conflicts

---

## 🚀 Ready for Release

- [ ] **CI/CD pipeline passes**
  - All CI checks green
  - Tests passing in CI
  - Build successful in CI
  - No deployment blockers

- [ ] **Performance validated**
  - No performance regressions
  - Bundle size checked
  - Runtime performance acceptable
  - No memory leaks

- [ ] **Accessibility validated**
  - Manual accessibility testing done
  - Automated a11y tests passing
  - Keyboard navigation tested
  - Screen reader tested (if critical component)

- [ ] **Cross-browser tested** (for UI changes)
  - Chrome tested
  - Firefox tested
  - Safari tested (if Mac available)
  - Edge tested

- [ ] **Responsive design validated** (for UI changes)
  - Mobile viewport tested
  - Tablet viewport tested
  - Desktop viewport tested
  - Breakpoints work correctly

---

## 📋 Feature-Specific Checklists

### For New Components

- [ ] Component added to design system index
- [ ] Component follows [Component Development Checklist](./component_development.md)
- [ ] Storybook stories complete
- [ ] Unit tests for all props and states
- [ ] Accessibility tests passing
- [ ] Theme integration validated

### For API Changes

- [ ] API client updated
- [ ] TypeScript types updated
- [ ] Mock data updated
- [ ] MSW handlers updated
- [ ] Integration tests updated
- [ ] Documentation updated

### For Bug Fixes

- [ ] Root cause identified
- [ ] Regression test added
- [ ] Related bugs checked
- [ ] Fix verified in production-like environment
- [ ] Changelog updated

### For Refactoring

- [ ] Behavior unchanged (no functional changes)
- [ ] All tests still passing
- [ ] No performance regressions
- [ ] Code more maintainable
- [ ] Documentation updated if APIs changed

---

## 🎯 Summary

**A feature is "done" when**:

1. ✅ Code is complete, tested, and functional
2. ✅ All tests passing (unit, integration, E2E, accessibility)
3. ✅ Code quality checks passing (TypeScript, ESLint, build)
4. ✅ Documentation complete (JSDoc, Storybook, README)
5. ✅ Code review approved
6. ✅ CI/CD pipeline passes
7. ✅ Accessibility requirements met
8. ✅ Ready for deployment

**When in doubt**: Ask yourself, "Would I be comfortable deploying this to production right now?" If the answer is no, it's not done.

---

## 🔗 Related Resources

- [Component Development Checklist](./component_development.md)
- [PR Review Checklist](./pr_review.md)
- [Testing Strategy](../context/testing-strategy.md)
- [Accessibility Guidelines](../context/a11y-guidelines.md)
- [Coding Conventions](../conventions.md)
