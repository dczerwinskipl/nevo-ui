# Pull Request Submission Checklist

This checklist ensures that your pull request is complete and ready for review before submitting.

---

## 📝 Before Creating PR

### Code Quality

- [ ] **TypeScript compilation passes**

  ```bash
  pnpm run typecheck
  ```

  - No type errors
  - All types properly defined
  - No `any` types without justification

- [ ] **ESLint validation passes**

  ```bash
  pnpm run lint
  ```

  - No ESLint errors
  - No ESLint warnings
  - Code formatted with Prettier

- [ ] **All tests passing**

  ```bash
  pnpm run test
  ```

  - Unit tests passing
  - Integration tests passing
  - E2E tests passing (if applicable)
  - No skipped or disabled tests

- [ ] **Build successful**
  ```bash
  pnpm run build
  ```

  - Build completes without errors
  - No build warnings
  - Bundle size acceptable

### Code Review Preparation

- [ ] **Self-review completed**
  - Review your own changes before submitting
  - Check for any debug code, console.logs, or commented-out code
  - Verify code follows project conventions
  - Ensure code is clean and readable

- [ ] **No merge conflicts**
  - Pull latest changes from target branch
  - Resolve any merge conflicts
  - Test after resolving conflicts

- [ ] **Commits are clean**
  - Follow conventional commit format
  - Commits are atomic (one logical change per commit)
  - Commit messages are clear and descriptive

---

## 📋 PR Description

### Required Information

- [ ] **Descriptive title**
  - Follows conventional commit format
  - Clearly states what the PR does
  - Examples:
    - `feat(button): add loading state support`
    - `fix(table): resolve filter reset issue`
    - `refactor(hooks): extract useFilters to separate file`

- [ ] **What does this PR do?**
  - Clear description of changes
  - Why these changes were made
  - What problem it solves

- [ ] **Related issues/specs**
  - Link to GitHub issue (`Closes #123`, `Fixes #456`)
  - Link to specification document
  - Link to related PRs

- [ ] **Testing instructions**
  - How to test the changes
  - What to look for
  - Edge cases to verify

### For UI Changes

- [ ] **Screenshots/videos included**
  - Before and after screenshots
  - All states shown (default, hover, focus, disabled, loading, error)
  - Different viewports if responsive changes
  - Screen recording for complex interactions

- [ ] **Design approval** (if applicable)
  - Design reviewed by designer
  - Matches design specs
  - Accessibility considerations addressed

---

## 🧪 Testing Requirements

### Unit Tests

- [ ] **New tests added for new code**
  - All new functions/methods tested
  - All new components tested
  - Edge cases covered

- [ ] **Existing tests updated** (if behavior changed)
  - Tests reflect new behavior
  - No tests disabled or skipped
  - Test descriptions are clear

- [ ] **Test coverage meets threshold**
  - Minimum 80% coverage for new code
  - No significant coverage drop
  - Critical paths fully tested

### Component Tests (for UI changes)

- [ ] **Rendering tests**
  - Component renders without errors
  - Props are applied correctly
  - Conditional rendering works

- [ ] **Interaction tests**
  - User interactions work (click, type, etc.)
  - Event handlers called correctly
  - State updates as expected

- [ ] **Accessibility tests**
  - ARIA attributes present
  - Keyboard navigation works
  - Focus management correct
  - Color contrast meets WCAG AA

### Integration/E2E Tests (when applicable)

- [ ] **Critical user flows tested**
  - Happy path works
  - Error scenarios handled
  - Data flow validated

---

## 📖 Documentation

### Code Documentation

- [ ] **JSDoc comments added**
  - Public APIs documented
  - Complex logic explained
  - Type parameters documented

- [ ] **README updated** (if applicable)
  - Usage instructions updated
  - New features documented
  - Examples provided

### Storybook Documentation (for components)

- [ ] **Storybook stories added/updated**
  - All variants have stories
  - All states documented
  - Interactive controls configured
  - Usage examples provided

- [ ] **Stories build successfully**
  ```bash
  pnpm --filter @nevo/design-system storybook:build
  ```

---

## ♿ Accessibility

- [ ] **ARIA attributes**
  - Proper roles assigned
  - Labels and descriptions provided
  - Live regions used appropriately

- [ ] **Keyboard navigation**
  - All interactive elements keyboard accessible
  - Focus order logical
  - Focus indicators visible
  - Escape key works (for modals, dropdowns)

- [ ] **Screen reader friendly**
  - Meaningful text for screen readers
  - Hidden decorative elements
  - Form labels properly associated

- [ ] **Color contrast**
  - Text meets WCAG AA (4.5:1 for normal text)
  - Interactive elements clearly distinguishable
  - No color-only information

---

## 🎨 Design System (for component changes)

- [ ] **Theme tokens used**
  - Tailwind CSS classes used (not inline styles)
  - Theme intents supported (primary, success, error, warning, info, neutral)
  - Design tokens referenced correctly

- [ ] **Consistent with existing components**
  - API follows design system patterns
  - Naming conventions match
  - Props structure consistent

- [ ] **Responsive design**
  - Works on all screen sizes
  - Breakpoints used correctly
  - No horizontal scroll on mobile

---

## 🔍 Code Quality

### Code Style

- [ ] **Follows naming conventions**
  - Files: PascalCase for components, camelCase for utilities
  - Variables: camelCase
  - Constants: UPPER_SNAKE_CASE (if truly constant)
  - Types/Interfaces: PascalCase

- [ ] **No code smells**
  - No deeply nested code
  - No overly long functions (>50 lines)
  - No overly complex logic (cyclomatic complexity)
  - No duplicated code

- [ ] **Proper error handling**
  - Errors caught and handled
  - Error states displayed to user
  - Error boundaries in place (for React)

### Performance

- [ ] **No performance regressions**
  - Bundle size not significantly increased
  - No unnecessary re-renders
  - Expensive operations memoized
  - Large lists virtualized (if applicable)

- [ ] **Optimizations applied**
  - `useMemo` for expensive computations
  - `useCallback` for functions passed to children
  - `React.memo` for pure components
  - Code splitting where appropriate

---

## 🔒 Security

- [ ] **No sensitive data exposed**
  - No API keys, tokens, or passwords in code
  - No sensitive data in console.logs
  - Environment variables used correctly

- [ ] **Input validation**
  - User input validated
  - XSS prevention in place
  - SQL injection prevention (if applicable)

- [ ] **Dependencies checked**
  - No new dependencies with known vulnerabilities
  - Dependencies up to date
  - Unused dependencies removed

---

## 🚀 Deployment Readiness

- [ ] **Environment variables documented**
  - New env vars documented in README
  - Example `.env` file updated
  - Default values provided

- [ ] **Database migrations** (if applicable)
  - Migration scripts created
  - Rollback plan documented
  - Migration tested

- [ ] **Feature flags** (if applicable)
  - Feature flag configured
  - Default state documented
  - Rollout plan defined

---

## ✅ Final Checks

### Pre-Submit

- [ ] **Branch is up to date**

  ```bash
  git pull origin main
  # Resolve conflicts if any
  ```

- [ ] **All CI checks will pass**
  - Locally run all checks that CI will run
  - Fix any issues before submitting

- [ ] **PR is ready for review**
  - All checklist items completed
  - PR description is complete
  - Reviewers assigned

### After Creating PR

- [ ] **Monitor CI pipeline**
  - Watch for CI failures
  - Fix issues immediately if CI fails

- [ ] **Respond to review comments**
  - Address all feedback
  - Answer questions
  - Make requested changes

- [ ] **Keep PR updated**
  - Rebase/merge if main branch advances
  - Resolve new conflicts promptly

---

## 📊 PR Checklist Summary

**Before creating PR**:

1. ✅ Code quality checks pass (typecheck, lint, test, build)
2. ✅ Self-review completed
3. ✅ No merge conflicts

**PR description includes**:

1. ✅ Descriptive title
2. ✅ What/why/how description
3. ✅ Related issues/specs
4. ✅ Screenshots (for UI changes)

**Testing complete**:

1. ✅ Unit tests added/updated
2. ✅ Integration/E2E tests (if applicable)
3. ✅ Accessibility tested
4. ✅ All tests passing

**Documentation updated**:

1. ✅ JSDoc comments
2. ✅ README (if applicable)
3. ✅ Storybook stories (for components)

**Quality validated**:

1. ✅ Accessibility requirements met
2. ✅ Performance validated
3. ✅ Security checked
4. ✅ Deployment ready

---

## 🔗 Related Resources

- [Definition of Done](./definition_of_done.md)
- [PR Review Checklist](./pr_review.md)
- [Component Development Checklist](./component_development.md)
- [Coding Conventions](../conventions.md)
- [Workflow Guide](../workflow.md)
