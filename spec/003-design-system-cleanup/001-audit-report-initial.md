# Design System Audit Report (Initial Findings)

**Date**: November 11, 2025  
**Auditor**: AI Assistant  
**Scope**: packages/design-system/src/

## Executive Summary

Initial audit of design system components reveals several areas that need alignment with current architectural guidelines:

### Key Findings

- **Inline Styles**: 30+ occurrences of `style={{}}` found across components and stories
- **Component Size**: Most components under 200 lines ✅
- **Test Coverage**: Varies by component (needs comprehensive audit)
- **Storybook**: Stories exist but many use raw HTML instead of primitives ❌
- **Theme Tokens**: Mixed usage - some components use theme tokens, others don't
- **Hooks**: Some complex logic not extracted to hooks

### Priority Issues

1. **🔴 Critical**: Stories using raw HTML instead of design system primitives
2. **🟠 High**: Inline styles in components (Button, Badge, Table, etc.)
3. **🟡 Medium**: Missing or incomplete test coverage
4. **🟢 Low**: Documentation improvements

---

## Component-by-Component Findings

### Primitives

#### Button.tsx
**Location**: `packages/design-system/src/primitives/Button.tsx`  
**Lines**: 67 ✅  
**Status**: Needs refactoring

**Issues**:
1. **Inline Styles** (High Priority)
   - Lines 51-61: Using `style={{}}` for background, color, border, boxShadow
   - Should use Tailwind classes with theme tokens
   - **Effort**: 2-3 hours

2. **Loading State** (Medium Priority)
   - Line 63: `{loading ? "Loading..." : children}`
   - Should use `<Spinner />` component
   - **Effort**: 30 minutes

3. **TODO Comment** (Low Priority)
   - Line 10: TODO already resolved (SIZE_CLASSES extracted)
   - Just needs comment removal
   - **Effort**: 1 minute

**Good Practices**:
- ✅ SIZE_CLASSES extracted outside component
- ✅ Proper TypeScript types
- ✅ Good prop interface
- ✅ Under 200 lines

---

#### Badge.tsx
**Location**: `packages/design-system/src/primitives/Badge.tsx`  
**Lines**: 39 ✅  
**Status**: Needs refactoring

**Issues**:
1. **Inline Styles** (High Priority)
   - Lines 29-33: Using `style={{}}` for background, border, color
   - Should use Tailwind classes with theme tokens
   - **Effort**: 1-2 hours

2. **Missing Size Prop** (Medium Priority)
   - No `size` prop (xs, sm, md, lg)
   - Inconsistent with other primitives
   - **Effort**: 1 hour

**Good Practices**:
- ✅ Simple, focused component
- ✅ Proper TypeScript types
- ✅ Under 200 lines

---

#### Typography.tsx
**Location**: `packages/design-system/src/primitives/Typography.tsx`  
**Lines**: 165 ✅  
**Status**: Mostly compliant

**Issues**:
1. **TODO Comments** (Medium Priority)
   - Line 5: TODO about clsx utility (may be already resolved)
   - Line 6: TODO about moving className maps outside
   - **Note**: Maps already extracted (SIZE_CLASSES, WEIGHT_CLASSES, ALIGN_CLASSES)
   - **Effort**: 5 minutes (remove outdated TODOs)

2. **Possible Inline Styles** (Needs verification)
   - Need to check if component uses inline styles
   - **Effort**: TBD after full audit

**Good Practices**:
- ✅ Constants extracted outside component
- ✅ Semantic type system
- ✅ Good TypeScript types
- ✅ Under 200 lines

---

#### Card.tsx
**Status**: Needs audit  
**Priority**: Medium

---

#### Input.tsx
**Status**: Needs audit  
**Priority**: Medium

---

#### Select.tsx
**Status**: Needs audit  
**Priority**: Medium

---

### Data Components

#### Table.tsx
**Location**: `packages/design-system/src/data/Table/Table.tsx`  
**Lines**: 131 ✅  
**Status**: Needs refactoring

**Issues**:
1. **Complex Hook Logic Not Extracted** (High Priority)
   - Lines 30-42: Data snapshot logic embedded in component
   - Should be extracted to `useDataSnapshot` hook
   - **Effort**: 1-2 hours

2. **Inline Styles** (High Priority)
   - Line 94: `style={{ color: tokens.text }}`
   - Should use Tailwind class
   - **Effort**: 15 minutes

**Good Practices**:
- ✅ Under 200 lines (131)
- ✅ Good component decomposition (uses subcomponents)
- ✅ Proper error/empty states

**Recommended**:
- Extract `useDataSnapshot` hook to `packages/design-system/src/hooks/useDataSnapshot.ts`
- Use Tailwind class for text color

---

### Storybook Stories

#### Button.stories.tsx
**Status**: Needs refactoring  
**Priority**: High

**Issues**:
1. **Raw HTML in Stories** (High Priority)
   - Lines 68, 89: Using `<div style={{...}}>` instead of `<Card>` with Tailwind
   - Should use design system primitives
   - **Effort**: 30 minutes

**Example Fix**:
```tsx
// ❌ Current
<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
  <Button>Example</Button>
</div>

// ✅ Should be
<div className="flex flex-wrap gap-4">
  <Button>Example</Button>
</div>
```

---

#### Badge.stories.tsx
**Status**: Needs refactoring  
**Priority**: High

**Issues**:
1. **Extensive Raw HTML Usage** (High Priority)
   - Multiple instances of `<div style={{...}}>` and `<span style={{...}}>`
   - Lines 55, 77-79, 92-93, 106-107, 120-121, 149, 181, 188, 194, 200, 221, 252, 283
   - Should use design system primitives and Tailwind
   - **Effort**: 1-2 hours

---

#### Card.stories.tsx
**Status**: Needs refactoring  
**Priority**: High

**Issues**:
1. **Inline Styles in Stories** (High Priority)
   - Multiple `style={{}}` usages
   - Lines 57, 61, 89, 96, 104, 112, 149, 174, 178, 200
   - Should use Tailwind classes
   - **Effort**: 1 hour

---

### Feedback Components

#### Loading.stories.tsx
**Status**: Needs refactoring  
**Priority**: Medium

**Issues**:
1. **Inline Styles** (Medium Priority)
   - Lines 145, 157: Using `style={{ minHeight: "..." }}`
   - Should use Tailwind: `className="min-h-[200px]"`
   - **Effort**: 15 minutes

---

## Summary of Issues

### By Severity

| Severity | Count | Description |
|----------|-------|-------------|
| 🔴 Critical | 0 | No critical issues found |
| 🟠 High | 8 | Inline styles, complex logic not in hooks, raw HTML in stories |
| 🟡 Medium | 5 | Missing features, incomplete tests, TODO comments |
| 🟢 Low | 2 | Documentation, minor improvements |

### By Category

| Category | Issues | Effort Estimate |
|----------|--------|-----------------|
| Inline Styles (Components) | 4 | 6-10 hours |
| Inline Styles (Stories) | 4 | 3-5 hours |
| Extract to Hooks | 1 | 1-2 hours |
| Missing Features | 1 | 1 hour |
| Documentation | 3 | 1 hour |

**Total Estimated Effort**: 12-19 hours

---

## Recommendations

### Immediate Actions (High Priority)

1. **Refactor Button Component**
   - Replace inline styles with Tailwind + theme tokens
   - Use Spinner component for loading state
   - **Story**: 002

2. **Refactor Badge Component**
   - Replace inline styles with Tailwind + theme tokens
   - Add size prop for consistency
   - **Story**: 002

3. **Extract useDataSnapshot Hook**
   - Extract from Table.tsx to reusable hook
   - Add tests for hook
   - **Story**: 003

4. **Fix All Stories**
   - Replace raw HTML with design system primitives
   - Use Tailwind for layout instead of inline styles
   - **Story**: 002-006 (per component)

### Medium-Term Actions

1. Complete full audit of all components
2. Audit and improve test coverage
3. Add missing Storybook stories
4. Update documentation

### Long-Term Actions

1. Setup visual regression testing
2. Performance optimization audit
3. Accessibility compliance audit (full WCAG 2.1 AA)

---

## Next Steps

1. ✅ Complete detailed audit (Story 001)
2. Create remediation plan with task breakdown
3. Begin Story 002 (Primitives cleanup)
4. Continue with Stories 003-006

---

**Status**: Initial audit complete  
**Next**: Full component-by-component audit  
**Approved By**: TBD  
**Date**: November 11, 2025
