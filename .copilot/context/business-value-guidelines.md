# Business Value Guidelines

**Purpose**: Prevent accidental removal or modification of business-critical features during implementation.

**Context**: This is a real application, not just a design system showcase. Every page, route, and feature has business value and may be part of a larger product strategy.

---

## Critical Rule

**NEVER modify business value without explicit user confirmation.**

Business value includes:

- User-facing pages and routes
- Navigation structure and menu items
- Core features and workflows
- Data models and entities
- User permissions and access control

**Technical implementation details** (design system components, hooks, utilities) can be refactored freely as long as they don't affect business functionality.

---

## What Constitutes Business Value Change?

### 🚫 High Risk - Always Confirm

These changes **always require user confirmation** before implementation:

1. **Removing Pages/Routes**
   - Deleting existing routes from `routes.tsx`
   - Removing navigation items from `navigation.tsx`
   - Example: "Should I remove the `/products-paginated` route?"

2. **Changing Navigation Structure**
   - Removing menu items or submenus
   - Reordering navigation hierarchy
   - Changing route paths (breaks bookmarks/links)
   - Example: "Should I flatten the Products menu and remove child items?"

3. **Removing Features**
   - Deleting entire feature folders
   - Removing user-facing functionality
   - Example: "Should I remove the export functionality?"

4. **Modifying Workflows**
   - Changing multi-step processes
   - Removing form fields
   - Altering data submission logic
   - Example: "Should I remove the filter reset button?"

5. **Data Model Changes**
   - Removing entity fields
   - Changing API contracts
   - Modifying database schemas
   - Example: "Should I remove the `status` field from Product?"

### ⚠️ Medium Risk - Consider Context

These may or may not affect business value - use judgment:

1. **Renaming Routes** (if preserving old route as redirect)
2. **Combining Similar Pages** (if functionality preserved)
3. **Refactoring Component Structure** (if UI/UX unchanged)
4. **Changing Implementation Details** (if behavior unchanged)

### ✅ Low Risk - Safe to Proceed

These are technical changes with no business impact:

1. **Design System Refactoring**
   - Changing component internals
   - Improving accessibility
   - Performance optimization
   - Code organization

2. **Adding Features** (not removing)
   - New optional features
   - Additional navigation items
   - New pages alongside existing ones

3. **Bug Fixes**
   - Fixing broken functionality
   - Correcting errors
   - Improving error handling

---

## Confirmation Template

When business value change is detected, use this template:

```
⚠️ Business Value Change Detected

I notice the spec/task requires:
- [Specific change, e.g., "Removing the /products-paginated route"]
- [Impact, e.g., "This will remove the paginated products view"]

This affects business value because:
- [Reason, e.g., "Users may have bookmarked this page"]
- [Consequence, e.g., "Future features planned for this page will need a new home"]

Options:
1. Proceed with removal (confirm this is intended)
2. Keep existing page and add new feature alongside
3. Merge functionality into existing page

Please confirm which approach you prefer before I proceed.
```

---

## Common Scenarios

### Scenario 1: Spec Says "Replace Products Page"

**❌ Wrong Approach**:

```
Delete /products route
Create new /products-v2 route
Update navigation
```

**✅ Correct Approach**:

```
1. Ask: "Should I replace the existing /products page, or add a new page alongside?"
2. If replace: "Should I preserve any existing functionality from the old page?"
3. If alongside: "What should the new route be called?"
```

### Scenario 2: Spec Says "Simplify Navigation"

**❌ Wrong Approach**:

```
Remove all child menu items
Flatten navigation to top-level only
```

**✅ Correct Approach**:

```
1. Ask: "I see 'simplify navigation' - should I:
   - Remove child items entirely?
   - Keep child items but hide them in dropdown?
   - Keep structure but rename items?"
2. Confirm each menu item to be removed
```

### Scenario 3: Spec Says "Clean Up Unused Features"

**❌ Wrong Approach**:

```
grep for "TODO"
Delete all files with TODO comments
```

**✅ Correct Approach**:

```
1. List features that appear unused
2. Ask: "These features appear unused, but I can't determine business context:
   - [Feature 1] - last touched 6 months ago
   - [Feature 2] - no tests, but has data model
   Should I remove these or are they planned for future use?"
```

---

## Navigation Changes Checklist

Before modifying `navigation.tsx`, verify:

- [ ] User explicitly requested navigation change
- [ ] Confirmed which items to remove/add
- [ ] Understand future plans for each section
- [ ] Routes are preserved or redirects added
- [ ] No breaking changes to bookmarks/links

**Current Navigation Structure** (as of Nov 2025):

```
- Dashboard
- Products
  - Product List (with pagination)
- Orders
  - Order List (with cursor pagination)
- Users
```

**Future Considerations**:

- Products may add: "Add Product", "Categories", "Settings"
- Orders may add: "Add Order", "Export", "Configuration"
- Do not remove parent items assuming they're "unused"

---

## Route Changes Checklist

Before modifying `routes.tsx`, verify:

- [ ] User explicitly requested route change
- [ ] Old routes have redirects if paths changed
- [ ] Navigation items updated to match
- [ ] No 404s introduced
- [ ] Deep links still work

---

## Integration with Implementation Prompt

This guideline is **automatically referenced** by `implement.prompt.md`.

When implementing:

1. Check if changes affect business value (use lists above)
2. If yes, **STOP** and confirm with user
3. Present options and reasoning
4. Wait for explicit approval
5. Only then proceed with implementation

**Remember**:

- Design system = low risk, refactor freely
- Admin app pages/routes = high risk, always confirm
- When in doubt, ask

---

## Examples from This Project

### ✅ Good: Confirming Before Removal

**User said**: "We don't need two versions of products table"

**Agent response**:

```
I understand - should I:
1. Remove /products-paginated route entirely?
2. Keep /products route and add pagination to it?
3. Keep both but rename to clarify purpose?

Also, the navigation has "Product List" as a child item.
Should I keep this structure for future additions like
"Add Product", "Categories", etc., or flatten it?
```

### ❌ Bad: Assuming Intent

**User said**: "Clean up the products feature"

**Agent action**: Removed /products-paginated, merged everything, flattened navigation

**Problem**: User may have meant "clean up code" not "remove pages". Changed business value without confirmation.

---

## Key Takeaway

**When modifying admin app (apps/admin):**

- Think like a product manager
- Every page has purpose
- Every route has history
- Always confirm before deleting

**When modifying design system (packages/design-system):**

- Think like an engineer
- Refactor for quality
- Optimize freely
- No confirmation needed for internals
