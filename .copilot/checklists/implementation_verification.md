# Implementation Verification Checklist

**Purpose**: Ensure every code change is verified before completion to prevent regressions and maintain app stability.

**When to use**: After implementing changes following `implement.prompt.md` instructions.

---

## Mandatory Verification Steps

After making ANY code changes, verify the following **in order**:

### 1. TypeScript Compilation ✅

**Check**: No TypeScript errors in affected packages

```bash
# For design system changes:
pnpm --filter @nevo/design-system tsc --noEmit

# For admin app changes:
pnpm --filter @nevo/ecommerce-admin-app tsc --noEmit

# For all packages:
pnpm run type-check
```

**Pass Criteria**:

- Zero TypeScript errors
- No new `any` types introduced
- All imports resolve correctly

**If Failed**:

- Fix TypeScript errors before proceeding
- Do not suppress errors with `@ts-ignore` without justification
- Ensure all new files have proper type definitions

---

### 2. Application Compilation ✅

**Check**: App builds without errors

```bash
# Start dev server and verify it starts:
pnpm dev

# Or build for production:
pnpm build
```

**Pass Criteria**:

- Dev server starts successfully (Vite ready message appears)
- No build errors in console
- No missing dependency errors

**If Failed**:

- Check for missing imports
- Verify all dependencies are installed (`pnpm install`)
- Check for circular dependencies
- Review recent file changes for syntax errors

---

### 3. Runtime Verification ✅

**Check**: App runs without console errors

```bash
# Start dev server if not already running:
pnpm dev

# Open browser to http://localhost:5173/
# Check browser console (F12)
```

**Pass Criteria**:

- No runtime errors in browser console
- No "Cannot read property of undefined" errors
- No "Component not found" errors
- Routes load correctly
- No CORS or network errors

**Common Issues**:

- Undefined variables (check imports)
- Missing props (verify component interfaces)
- Broken routes (verify route paths match navigation config)
- Portal rendering issues (check createPortal usage)

---

### 4. Visual Regression Check ✅

**Check**: No unintended UI changes

**Manual Verification**:

1. Navigate to affected pages/components
2. Verify intended changes appear correctly
3. Check that unrelated UI elements are unchanged
4. Test responsive behavior (resize browser)
5. Verify dark/light theme switching works

**Affected Areas to Check**:

- **Design System Changes**: Check Storybook stories
- **Component Changes**: Check usage in admin app
- **Layout Changes**: Check all viewport sizes
- **Theme Changes**: Toggle dark/light mode

**Pass Criteria**:

- Intended changes are visible and correct
- No layout shifts in unrelated components
- No broken styling or missing CSS
- Theme switching works correctly
- Responsive breakpoints work as expected

**If Failed**:

- Review CSS class changes
- Check for missing Tailwind classes
- Verify design system primitives are used correctly
- Test in different viewport sizes

---

### 5. Functional Regression Check ✅

**Check**: Existing functionality still works

**Test Scenarios**:

1. **Navigation**: All routes load correctly
2. **Forms**: Input fields work, validation works
3. **Tables**: Filtering, sorting, pagination work
4. **Modals/Dropdowns**: Open/close correctly
5. **API Calls**: Data loads, error states work

**Pass Criteria**:

- All interactive elements respond to user input
- No broken event handlers
- No infinite loops or performance issues
- Previous features continue working

**If Failed**:

- Review event handler changes
- Check for accidental prop removals
- Verify callback functions are passed correctly
- Check for scope/closure issues

---

### 6. Automated Tests ✅

**Check**: All tests pass

```bash
# Run all tests:
pnpm test

# Run tests for specific package:
pnpm --filter @nevo/design-system test
pnpm --filter @nevo/ecommerce-admin-app test

# Run with coverage:
pnpm test:coverage
```

**Pass Criteria**:

- All existing tests pass
- New tests added for new functionality
- Test coverage ≥ 80% for changed files
- No skipped tests without justification

**If Failed**:

- Fix broken tests immediately
- Update test snapshots if changes are intentional
- Add missing test cases
- Do not skip tests to make them "pass"

---

## Quick Verification Workflow

For standard implementations, run this sequence:

```bash
# 1. Type check
pnpm run type-check

# 2. Build/start dev
pnpm dev

# 3. Visual + runtime check
# → Open http://localhost:5173/
# → Navigate to changed pages
# → Check browser console

# 4. Run tests
pnpm test

# 5. (Optional) E2E tests
pnpm --filter @nevo/ecommerce-admin-app test:e2e
```

**Expected Time**: 2-5 minutes for basic changes

---

## Edge Cases & Special Scenarios

### When Changing Design System Components

**Additional Verification**:

1. Check Storybook stories render correctly
2. Verify component usage in admin app
3. Test all component variants (sizes, intents, states)
4. Verify accessibility (keyboard navigation, ARIA)

```bash
# Build design system first:
pnpm --filter @nevo/design-system build

# Then start admin app:
pnpm --filter @nevo/ecommerce-admin-app dev
```

### When Changing Routes

**Additional Verification**:

1. Check `routes.tsx` has no undefined references
2. Verify navigation config matches route paths
3. Test direct URL navigation
4. Verify nested routes work
5. Check 404 handling

### When Changing API Integration

**Additional Verification**:

1. Verify MSW handlers are updated
2. Check API response types match
3. Test loading states
4. Test error states
5. Verify pagination/filtering params

### When Changing Hooks

**Additional Verification**:

1. Check for infinite render loops
2. Verify dependency arrays are correct
3. Test cleanup functions run
4. Check for memory leaks
5. Verify hook usage in multiple components

---

## Regression Prevention Guidelines

### Before Committing

**Always**:

- [ ] Run full type check
- [ ] Verify app starts without errors
- [ ] Check browser console for errors
- [ ] Test affected features manually
- [ ] Run relevant test suites

**Never Commit**:

- Code with TypeScript errors
- Code that breaks the build
- Code with console errors
- Code without tests (for new features)
- Code that breaks existing tests

### PR Submission Requirements

Before creating PR, verify:

- [ ] All verification steps pass
- [ ] No regressions identified
- [ ] Tests added/updated
- [ ] Storybook stories updated (if UI change)
- [ ] Documentation updated (if API change)

See `.copilot/checklists/pr_submission.md` for complete PR checklist.

---

## Troubleshooting Common Issues

### "ROUTES is not defined"

**Cause**: Removed import or constant definition
**Fix**: Replace `ROUTES.X` with hardcoded string `"/x"`

### "Cannot find module"

**Cause**: Missing import or incorrect path
**Fix**: Verify import path, run `pnpm install`

### "Component X is not exported"

**Cause**: Missing export in barrel file
**Fix**: Add export to `index.ts`

### "Hydration error"

**Cause**: Server/client mismatch
**Fix**: Check for browser-only APIs, verify SSR compatibility

### "Portal target not found"

**Cause**: Portal rendered before DOM ready
**Fix**: Add null check, use `useLayoutEffect` for timing

---

## Integration with Implementation Prompt

This checklist is **automatically referenced** by `implement.prompt.md`.

When implementing:

1. Follow `implement.prompt.md` for code generation
2. Apply changes to codebase
3. Run verification steps from **this checklist**
4. Fix any issues before marking task complete
5. Document any issues in PR description

**Critical Rule**: No implementation is complete until all verification steps pass.
