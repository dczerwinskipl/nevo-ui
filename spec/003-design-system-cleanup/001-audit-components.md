# Story 001 - Audit Design System Components

**Epic**: 003 - Design System Clean Up  
**Story**: 001  
**Priority**: High  
**Estimate**: 2-4 hours

## Overview

Conduct a comprehensive audit of all design system components to identify deviations from architectural guidelines and create a detailed remediation plan.

## Objectives

- Audit all components in `packages/design-system/src/`
- Identify violations of coding standards
- Document all issues with specific file locations and line numbers
- Create prioritized remediation checklist
- Estimate effort for each fix

## Acceptance Criteria

- [ ] All components audited against `.copilot/conventions.md`
- [ ] Audit report generated with specific issues
- [ ] Issues categorized by severity (critical, high, medium, low)
- [ ] Remediation plan with task breakdown
- [ ] Effort estimates for each task

## Tasks

### Task 001-1: Setup Audit Framework
**Estimate**: 30 minutes

- [ ] Review all guidelines in `.copilot/` folder
- [ ] Create audit checklist based on conventions.md
- [ ] Setup audit tracking document
- [ ] Define severity levels for issues

**Checklist**:
```
For each component, verify:
- ✅ Uses Tailwind CSS (not inline styles)
- ✅ Under 150-200 lines
- ✅ Constants defined outside component
- ✅ Complex logic in hooks
- ✅ Proper TypeScript types
- ✅ Has unit tests (>80% coverage)
- ✅ Has Storybook stories
- ✅ Accessibility compliant
- ✅ Uses theme tokens correctly
- ✅ Follows naming conventions
- ✅ Has JSDoc comments
```

### Task 001-2: Audit Primitives
**Estimate**: 1 hour

**Components to audit**:
- [ ] `primitives/Button.tsx`
- [ ] `primitives/Badge.tsx`
- [ ] `primitives/Typography.tsx`
- [ ] `primitives/Card.tsx`
- [ ] `primitives/Input.tsx`
- [ ] `primitives/Select.tsx`
- [ ] `primitives/Spinner.tsx`

**For each component, document**:
1. Lines of code (should be < 200)
2. Inline styles count and locations
3. Constants that should be extracted
4. Complex logic that should be in hooks
5. Missing tests
6. Missing stories
7. Accessibility issues
8. TypeScript issues

### Task 001-3: Audit Data Components
**Estimate**: 45 minutes

**Components to audit**:
- [ ] `data/Table/Table.tsx` and subcomponents
- [ ] `data/FilterGroup.tsx`
- [ ] `data/FiltersForm.tsx`
- [ ] `data/TextFilter.tsx`
- [ ] `data/NumberFilter.tsx`
- [ ] `data/SelectFilter.tsx`
- [ ] `data/FilterActions.tsx`
- [ ] `data/Pagination.tsx`

### Task 001-4: Audit Feedback Components
**Estimate**: 30 minutes

**Components to audit**:
- [ ] `feedback/Loading.tsx`
- [ ] `feedback/EmptyState.tsx`
- [ ] `feedback/ErrorState.tsx`
- [ ] `feedback/Alert.tsx` (if exists)
- [ ] `feedback/Toast.tsx` (if exists)

### Task 001-5: Audit Navigation Components
**Estimate**: 30 minutes

**Components to audit**:
- [ ] `navigation/Topbar.tsx`
- [ ] `navigation/Sidebar.tsx`
- [ ] `navigation/Nav.tsx` (if exists)

### Task 001-6: Audit Overlay Components
**Estimate**: 20 minutes

**Components to audit**:
- [ ] `overlays/Modal.tsx`
- [ ] `overlays/Tooltip.tsx` (if exists)
- [ ] `overlays/Dropdown.tsx` (if exists)

### Task 001-7: Create Remediation Plan
**Estimate**: 30 minutes

- [ ] Compile all audit findings
- [ ] Categorize issues by severity:
  - **Critical**: Breaks accessibility, security, or functionality
  - **High**: Violates core guidelines (inline styles, >200 lines)
  - **Medium**: Missing tests, incomplete stories
  - **Low**: Documentation, minor improvements
- [ ] Create task breakdown for Stories 002-006
- [ ] Assign effort estimates
- [ ] Prioritize tasks

## Deliverables

1. **Audit Report** (`spec/003-design-system-cleanup/001-audit-report.md`)
   - Summary of findings
   - Component-by-component breakdown
   - Issue categories and counts
   - Severity distribution

2. **Remediation Plan** (`spec/003-design-system-cleanup/001-remediation-plan.md`)
   - Prioritized task list
   - Effort estimates
   - Dependencies
   - Recommended order of execution

3. **Issues Spreadsheet** (optional)
   - Detailed tracking of all issues
   - Component | Issue | Severity | Effort | Story

## Audit Criteria

### ❌ **Critical Issues** (Fix Immediately)
- Accessibility violations (WCAG 2.1 AA)
- TypeScript errors in strict mode
- Missing or broken functionality
- Security vulnerabilities

### ⚠️ **High Priority Issues**
- Inline styles that should be Tailwind classes
- Components over 200 lines
- Complex logic not extracted to hooks
- Missing or inadequate tests (< 50% coverage)
- Theme tokens not used correctly

### 📋 **Medium Priority Issues**
- Missing Storybook stories
- Incomplete test coverage (50-80%)
- Missing JSDoc comments
- Constants not extracted outside components
- Inconsistent naming

### 💡 **Low Priority Issues**
- Documentation improvements
- Code organization/structure
- Minor refactoring opportunities
- Performance optimizations (non-critical)

## Example Audit Entry

```markdown
### Button.tsx

**Location**: `packages/design-system/src/primitives/Button.tsx`
**Lines**: 67 (✅ Under 200)
**Issues Found**: 3

#### Issue #1: Inline Styles (High Priority)
- **Lines**: 51-61
- **Problem**: Using inline `style={{}}` instead of Tailwind classes
- **Current**:
  ```tsx
  style={{
    background: style.background,
    color: style.color,
    border: style.border,
  }}
  ```
- **Should be**: Use Tailwind classes with theme tokens
- **Effort**: 1-2 hours
- **Story**: 002

#### Issue #2: TODO Comment Not Resolved (Medium Priority)
- **Line**: 10
- **Problem**: `// TODO: TASK-020 - Move sizeClasses map outside component`
- **Note**: SIZE_CLASSES already extracted (✅ Fixed)
- **Action**: Remove TODO comment
- **Effort**: 2 minutes
- **Story**: 002

#### Issue #3: Loading State Not Using Component (Medium Priority)
- **Line**: 63
- **Problem**: `{loading ? "Loading..." : children}`
- **Should be**: Use `<Spinner />` component
- **Effort**: 15 minutes
- **Story**: 002
```

## Success Metrics

- All components audited ✅
- All issues documented ✅
- Remediation plan approved ✅
- Task breakdown ready for Stories 002-006 ✅

## Definition of Done

- [ ] All components in design-system audited
- [ ] Audit report complete with all findings
- [ ] Remediation plan created and reviewed
- [ ] Issues categorized and prioritized
- [ ] Task breakdown for subsequent stories finalized
- [ ] Team review and approval completed

---

**Assigned To**: TBD  
**Status**: Not Started  
**Created**: November 11, 2025  
**Dependencies**: None
