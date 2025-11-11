# Pull Request Review Checklist

Use this checklist when reviewing pull requests for the Nevo UI project.

## General Requirements

### Code Quality

- [ ] Code follows project conventions (see `.copilot/conventions.md`)
- [ ] TypeScript types are properly defined
- [ ] No TypeScript errors or warnings
- [ ] No ESLint errors or warnings
- [ ] Code is properly formatted (Prettier)
- [ ] No console.log statements (use proper logging)
- [ ] No commented-out code blocks
- [ ] Meaningful variable and function names

### Documentation

- [ ] JSDoc comments on public APIs
- [ ] Complex logic has explanatory comments
- [ ] README updated if needed
- [ ] Storybook stories added/updated
- [ ] Type definitions include descriptions

### Testing

- [ ] Unit tests added for new functionality
- [ ] Tests cover edge cases
- [ ] Tests are meaningful (not just for coverage)
- [ ] All tests pass locally
- [ ] No skipped or disabled tests without explanation
- [ ] Test coverage meets minimum threshold (>80%)

### Git Hygiene

- [ ] Clear, descriptive commit messages
- [ ] Logical commit organization
- [ ] No merge commits (rebase preferred)
- [ ] No large binary files
- [ ] No sensitive data (keys, passwords, tokens)

## Design System Specific

### Component Development

- [ ] Uses design system primitives (Card, Button, Typography, etc.)
- [ ] No raw HTML elements where primitives exist
- [ ] Follows component API patterns (see `ds-api-guidelines.md`)
- [ ] Proper TypeScript types exported
- [ ] RefForwarding implemented correctly
- [ ] className prop supported and merged properly
- [ ] Renders children appropriately
- [ ] **Component files are under 150-200 lines**
- [ ] **Complex logic extracted to custom hooks**
- [ ] **Subcomponents extracted to separate files when needed**
- [ ] **Uses existing feedback components (EmptyState, ErrorState, Loading)**
- [ ] **No custom empty/error/loading implementations**

### Styling

- [ ] Uses Tailwind CSS utility classes
- [ ] Uses design tokens (colors, spacing, typography)
- [ ] **Avoids inline styles (except for dynamic values)**
- [ ] **Theme tokens use Tailwind classes, not CSS values**
- [ ] No magic numbers (use theme variables)
- [ ] Follows responsive design patterns
- [ ] Dark mode support implemented

### Accessibility

- [ ] Semantic HTML used
- [ ] ARIA attributes added where needed
- [ ] Keyboard navigation works
- [ ] Focus management correct
- [ ] Focus indicators visible
- [ ] Screen reader tested (if applicable)
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] No reliance on color alone

### Storybook

- [ ] Stories demonstrate all variants
- [ ] Stories show all sizes
- [ ] Interactive examples provided
- [ ] Uses design system components in stories (not raw HTML)
- [ ] Realistic data used
- [ ] No console errors in Storybook
- [ ] Dark mode stories included
- [ ] Component description clear

## Application Development (Admin App)

### React Best Practices

- [ ] Hooks used correctly (no rules violations)
- [ ] useEffect dependencies correct
- [ ] No unnecessary re-renders
- [ ] State management appropriate
- [ ] Props properly typed
- [ ] No prop drilling (use context if needed)

### Data Fetching

- [ ] Uses TanStack Query for API calls
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Optimistic updates where appropriate
- [ ] Cache invalidation correct

### Routing

- [ ] Routes properly configured
- [ ] Navigation works correctly
- [ ] Browser back/forward work
- [ ] Deep linking supported

### Forms

- [ ] Uses React Hook Form
- [ ] Validation rules defined
- [ ] Error messages user-friendly
- [ ] Submit handling correct
- [ ] Disabled state during submission

## API & Mocks

### API Client

- [ ] Types generated/updated from OpenAPI
- [ ] Error handling implemented
- [ ] Request/response interceptors correct
- [ ] Environment variables used properly

### MSW Mocks

- [ ] Handlers defined for new endpoints
- [ ] Mock data realistic
- [ ] Error scenarios covered
- [ ] Exported from appropriate entry points

## Performance

### Bundle Size

- [ ] No unnecessary dependencies added
- [ ] Large libraries lazy-loaded if possible
- [ ] Tree-shaking working correctly

### Runtime Performance

- [ ] No obvious performance issues
- [ ] Large lists virtualized if needed
- [ ] Images optimized
- [ ] Debouncing/throttling used appropriately

## Security

- [ ] No XSS vulnerabilities
- [ ] User input sanitized
- [ ] No SQL injection risks
- [ ] Authentication checks in place
- [ ] Authorization verified
- [ ] CSRF protection if applicable

## Breaking Changes

- [ ] Breaking changes documented
- [ ] Migration guide provided if needed
- [ ] Deprecation warnings added
- [ ] Changelog updated

## Deployment

- [ ] Changes work in production build
- [ ] Environment variables documented
- [ ] Database migrations included (if applicable)
- [ ] Backward compatible or migration path clear

## Review Process

### Before Requesting Review

1. Self-review your changes
2. Run all tests locally
3. Check Storybook renders correctly
4. Verify build succeeds
5. Test in both light and dark mode
6. Check accessibility with axe DevTools
7. Ensure no TypeScript/ESLint errors

### During Review

1. Read the PR description
2. Understand the context and goal
3. Check out the branch locally if needed
4. Test the functionality
5. Review code changes
6. Check tests
7. Verify Storybook stories
8. Leave constructive feedback

### Providing Feedback

#### ✅ Good Feedback

- Specific and actionable
- Explains the "why"
- Suggests alternatives
- References conventions/guidelines
- Positive when appropriate

**Example:**

```
This component uses a raw <button> element. Consider using the
Button primitive from the design system instead for consistency:

<Button variant="primary" onClick={handleClick}>
  Save
</Button>

See: packages/design-system/src/primitives/Button
```

#### ❌ Poor Feedback

- Vague or unclear
- Opinionated without reason
- Nitpicky without value
- Negative tone

**Example:**

```
Don't do it this way.
```

### Review Comments Categories

**🚨 Blocking (Must Fix)**

- Critical bugs
- Security issues
- Breaking changes without migration
- Accessibility violations
- Test failures

**💡 Suggestion (Should Consider)**

- Code quality improvements
- Better patterns
- Performance optimizations
- Missing edge cases

**🤔 Question (Discussion)**

- Clarifications needed
- Alternative approaches
- Understanding implementation choices

**📝 Nit (Optional)**

- Minor style preferences
- Small refactoring opportunities
- Typos in comments

## Approval Criteria

### Required for Approval

- [ ] All blocking issues resolved
- [ ] Tests pass in CI
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Storybook builds successfully
- [ ] Meets accessibility standards
- [ ] Follows project conventions

### Nice to Have

- [ ] All suggestions addressed
- [ ] Questions answered
- [ ] Documentation improved
- [ ] Edge cases covered
- [ ] Performance optimized

## Common Issues and Solutions

### Issue: Raw HTML in Stories

**Problem:** Stories use `<div>`, `<button>`, etc.
**Solution:** Replace with primitives: `<Card>`, `<Button>`, etc.

### Issue: Missing Accessibility

**Problem:** No keyboard support, missing ARIA
**Solution:** Add keyboard handlers, proper ARIA attributes

### Issue: Inconsistent Styling

**Problem:** Custom CSS, inline styles, magic values
**Solution:** Use Tailwind classes and design tokens

### Issue: Missing Tests

**Problem:** New code not covered by tests
**Solution:** Add unit tests, update coverage

### Issue: Breaking Changes

**Problem:** Changes break existing functionality
**Solution:** Add deprecation warnings, migration guide

### Issue: Large PR

**Problem:** Too many changes to review effectively
**Solution:** Split into smaller, focused PRs

### Issue: Large Component Files

**Problem:** Component file exceeds 200 lines
**Solution:** Extract subcomponents to separate files

### Issue: Complex Logic in Component

**Problem:** Component has complex state management embedded
**Solution:** Extract logic to custom hook in `hooks/` folder

### Issue: Custom Empty/Error States

**Problem:** Component implements custom empty or error state
**Solution:** Use existing `EmptyState`, `ErrorState`, `LoadingOverlay` components

### Issue: Inline Styles

**Problem:** Component uses inline styles instead of Tailwind
**Solution:** Replace with Tailwind utility classes; use inline only for dynamic values
