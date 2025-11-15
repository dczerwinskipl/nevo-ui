# EPIC 001: Table

## Story 002: Pagination

### Feature Description

Implementation of pagination support for the Table component with two operational modes: traditional page-based pagination (with total count) and cursor-style pagination (with hasNext only). This story integrates the existing `Pagination` component and `usePagination` hook with the Table component to enable navigation through large datasets.

**Status**: 📝 **PLANNED**

### Context

#### Current State

- ✅ `Pagination.tsx` component exists but is non-interactive and hardcoded
  - Shows max 5 pages regardless of actual page count
  - No click handlers or callbacks
  - Hardcoded Polish text ("Łącznie X pozycji")
  - Uses inline styles instead of design system primitives
  - ~40 lines, basic implementation
- ✅ `usePagination.ts` hook exists and is production-ready
  - Fully functional with comprehensive state management
  - Has 19 test cases with full coverage
  - Provides: `currentPage`, `totalPages`, `hasNext`, `hasPrevious`, `goToPage`, `nextPage`, `previousPage`
  - Supports `totalItems` mode for calculating exact page count
- ✅ Current usage in `ProductsList.tsx` shows basic pattern
  - Uses `<Pagination total={pagination.totalCount} pageSize={pagination.limit} />`
  - Has TODO comment about total count from API
  - Not connected to Table component
- ✅ Table component has no pagination integration
  - Supports loading/empty/error states
  - Uses modular sub-component architecture
- ✅ API mocks return `PaginatedResponse<T>` with `totalCount`
  - Structure: `{ data: T[], totalCount: number, page: number, limit: number, totalPages: number }`

#### Desired State

- Interactive `Pagination` component using design system primitives
- Two pagination modes supported:
  1. **Page-based**: With known total count (calculate exact pages)
  2. **Cursor-style**: With `hasNext` only (backend fetches N+1 to determine if more data exists)
- Table component accepts pagination props and integrates seamlessly
- Two working showcases in admin-app demonstrating both modes
- Proper keyboard accessibility (arrow keys, Enter, Tab navigation)
- Loading states during page transitions
- Configurable page size selector

### Detailed Requirements

#### 1. Refactor Pagination Component

- Replace all inline styles with design system primitives (`Button`, `Typography`, etc.)
- Remove hardcoded Polish text, make all strings configurable props
- Make component fully interactive with click handlers
- Support both controlled and uncontrolled modes
- Implement keyboard navigation (arrow keys for prev/next, number keys for direct page)
- Add page size selector (optional feature)
- Use SVG icons for prev/next buttons (consistent with table icons)

#### 2. Two Pagination Modes

**Mode 1: Page-based (with totalCount)**

- Backend returns total item count in response
- Calculate exact number of pages: `Math.ceil(totalCount / pageSize)`
- Display page numbers (1, 2, 3, ... N)
- Show "Items X-Y of Z" text
- Enable direct navigation to any page

**Mode 2: Cursor-style (with hasNext)**

- Backend fetches `pageSize + 1` items to determine if next page exists
- Display current page data (first `pageSize` items)
- Show only "Previous" and "Next" buttons (no page numbers)
- Disable "Next" when `hasNext === false`
- Display "Page X" without total count
- More efficient for large datasets where counting is expensive

#### 3. Table Integration

- Add optional `pagination` prop to Table component
- Pagination prop shape:
  ```typescript
  pagination?: {
    currentPage: number;
    totalPages?: number; // Optional - for page-based mode
    hasNext?: boolean;   // Optional - for cursor-style mode
    onPageChange: (page: number) => void;
    pageSize: number;
    totalItems?: number; // Optional - for "showing X of Y" text
  }
  ```
- Render pagination below table (outside scroll container)
- Preserve data snapshot during page transitions (use existing LoadingOverlay)
- Handle empty pages gracefully

#### 4. Create Showcases in Admin App

**Showcase 1: Products with Page-based Pagination**

- Path: `/products-paginated` (new page)
- Use existing products API (already returns `totalCount`)
- Show page numbers, total count, page size selector
- Demonstrate filtering + pagination interaction

**Showcase 2: Orders with Cursor-style Pagination**

- Path: `/orders-cursor` (new page)
- Create new orders mock API with N+1 fetch pattern
- Show only prev/next buttons
- No total count display
- Demonstrate simpler backend logic

#### 5. API Integration Patterns

**Page-based API Response:**

```typescript
{
  data: Product[],
  totalCount: 150,
  page: 2,
  limit: 10,
  totalPages: 15
}
```

**Cursor-style API Response:**

```typescript
{
  data: Order[], // pageSize + 1 items
  page: 2,
  limit: 10,
  hasNext: true // determined by checking if data.length > limit
}
```

### Acceptance Criteria

#### Pagination Component

- [ ] ✅ All inline styles removed (verified by grep `style={{` returns 0 matches in `Pagination.tsx`)
- [ ] ✅ All text strings are configurable props with English defaults
- [ ] ✅ Component accepts `mode: 'pages' | 'cursor'` prop
- [ ] ✅ In 'pages' mode: displays page numbers, requires `totalPages` prop
- [ ] ✅ In 'cursor' mode: displays only prev/next, requires `hasNext` prop
- [ ] ✅ Click handlers call `onPageChange(newPage)` callback
- [ ] ✅ Keyboard navigation works (left/right arrows, Enter on focused page)
- [ ] ✅ Previous button disabled on page 1
- [ ] ✅ Next button disabled when no more pages (pages mode: `currentPage === totalPages`, cursor mode: `!hasNext`)
- [ ] ✅ Component uses only design system primitives (verified by code review)

#### Table Integration

- [ ] ✅ Table accepts optional `pagination` prop
- [ ] ✅ When `pagination` provided, Pagination component renders below table
- [ ] ✅ Page changes trigger `onPageChange` callback
- [ ] ✅ Data persists during page transitions (LoadingOverlay shows during fetch)
- [ ] ✅ No TypeScript errors in Table.tsx (verified by `tsc --noEmit`)

#### Showcase: Products (Page-based)

- [ ] ✅ New route `/products-paginated` exists in admin router
- [ ] ✅ Page displays products table with page-based pagination
- [ ] ✅ Shows page numbers (1, 2, 3, ...)
- [ ] ✅ Shows total count text ("Showing 11-20 of 150 items")
- [ ] ✅ Clicking page number navigates correctly
- [ ] ✅ Page size selector changes items per page (10, 20, 50)
- [ ] ✅ Filtering preserves and resets to page 1
- [ ] ✅ E2E test verifies pagination works (`products-paginated.spec.ts`)

#### Showcase: Orders (Cursor-style)

- [ ] ✅ New route `/orders-cursor` exists in admin router
- [ ] ✅ Mock API endpoint `/api/orders` created with N+1 fetch pattern
- [ ] ✅ Page displays orders table with cursor-style pagination
- [ ] ✅ Shows only "Previous" and "Next" buttons
- [ ] ✅ Shows current page number ("Page 3")
- [ ] ✅ No total count displayed
- [ ] ✅ Next button disabled when `hasNext === false`
- [ ] ✅ E2E test verifies cursor navigation (`orders-cursor.spec.ts`)

#### Testing

- [ ] ✅ Unit tests for Pagination component in both modes (`Pagination.test.tsx`)
- [ ] ✅ Unit tests for pagination state in Table (`Table.test.tsx`)
- [ ] ✅ Storybook stories show both pagination modes (`Pagination.stories.tsx` updated)
- [ ] ✅ E2E tests for both showcases pass
- [ ] ✅ Test coverage ≥80% for new/changed files (verified by `pnpm test:coverage`)

#### Accessibility

- [ ] ✅ Pagination has proper ARIA labels (`aria-label="Pagination navigation"`)
- [ ] ✅ Current page has `aria-current="page"`
- [ ] ✅ Disabled buttons have `aria-disabled="true"`
- [ ] ✅ Keyboard navigation tested with screen reader
- [ ] ✅ Focus indicators visible on all interactive elements

### Technical Approach

#### Files to Create/Modify

**Design System:**

1. `packages/design-system/src/data/Pagination.tsx` - Complete refactor
   - Add props: `mode`, `currentPage`, `totalPages`, `hasNext`, `onPageChange`, `pageSize`, `totalItems`
   - Replace inline styles with `Button`, `Typography` primitives
   - Add keyboard event handlers
   - Support both modes with conditional rendering

2. `packages/design-system/src/data/Pagination.test.tsx` - New file
   - Test page-based mode rendering
   - Test cursor-style mode rendering
   - Test click handlers
   - Test keyboard navigation
   - Test disabled states

3. `packages/design-system/src/data/Pagination.stories.tsx` - Update
   - Add story for page-based mode
   - Add story for cursor-style mode
   - Add story with page size selector
   - Add story showing keyboard navigation

4. `packages/design-system/src/data/Table/Table.tsx` - Modify
   - Add optional `pagination` prop to `TableProps`
   - Render Pagination component conditionally
   - Pass through pagination callbacks

**Admin App - Products Showcase (Page-based):** 5. `apps/admin/src/features/products-paginated/` - New feature folder

- `pages/ProductsPaginatedList.tsx` - Container component
- `hooks/useProductsPaginated.ts` - Hook managing page state + TanStack Query
- `types/Product.ts` - Reuse existing types

6. `apps/admin/src/router/routes.tsx` - Add route
   - Add `/products-paginated` route

**Admin App - Orders Showcase (Cursor-style):** 7. `apps/admin/src/features/orders/` - New feature folder

- `pages/OrdersCursorList.tsx` - Container component
- `hooks/useOrdersCursor.ts` - Hook managing cursor pagination
- `types/Order.ts` - New types
- `components/OrdersTable.tsx` - Table component for orders

8. `apps/admin/src/mocks/api/orders/` - New mock API
   - `database.ts` - In-memory orders database
   - `handlers.ts` - MSW handlers with N+1 fetch logic
   - `index.ts` - Exports

9. `apps/admin/src/services/ordersApi.ts` - New API client
   - `fetchOrders` function with cursor pagination

**E2E Tests:** 10. `apps/admin/e2e/tests/products-paginated.spec.ts` - New test - Test page navigation - Test page size selector - Test filtering resets to page 1

11. `apps/admin/e2e/tests/orders-cursor.spec.ts` - New test
    - Test prev/next navigation
    - Test hasNext disabling
    - Test no total count displayed

#### Implementation Strategy

**Phase 1: Refactor Pagination Component (1-2 hours)**

- Remove inline styles, use design system primitives
- Add mode prop and conditional rendering
- Implement click handlers and keyboard navigation
- Add comprehensive prop types

**Phase 2: Table Integration (30 mins)**

- Add pagination prop to Table
- Conditionally render Pagination below table
- Wire up callbacks

**Phase 3: Products Showcase (1 hour)**

- Create new feature folder with page component
- Create hook integrating usePagination + TanStack Query
- Add router config
- Test manually

**Phase 4: Orders Showcase (1.5 hours)**

- Create orders types and components
- Implement N+1 fetch pattern in mock API
- Create cursor-style page
- Add router config
- Test manually

**Phase 5: Testing (1.5 hours)**

- Write Pagination unit tests
- Write Table pagination tests
- Update Storybook stories
- Write E2E tests for both showcases

**Phase 6: Accessibility Review (30 mins)**

- Add ARIA labels
- Test keyboard navigation
- Verify screen reader compatibility

**Total Estimated Effort: 6-7 hours**

### Data Flow Diagrams

#### Page-based Pagination Flow:

```
User clicks page 3
  ↓
Pagination.onPageChange(3)
  ↓
Parent component updates page state
  ↓
TanStack Query refetches with { page: 3, limit: 10 }
  ↓
API returns { data: [...], totalCount: 150, page: 3, ... }
  ↓
Table shows LoadingOverlay (preserves old data)
  ↓
New data rendered, overlay removed
```

#### Cursor-style Pagination Flow:

```
User clicks Next
  ↓
Pagination.onPageChange(currentPage + 1)
  ↓
Parent component updates page state
  ↓
TanStack Query refetches with { page: 4, limit: 10 }
  ↓
Backend fetches 11 items (limit + 1)
  ↓
API returns { data: [11 items], page: 4, hasNext: true }
  ↓
Frontend displays first 10 items
  ↓
hasNext determines if Next button enabled
```

### Testing Strategy

#### Unit Tests

- **Pagination Component**:
  - Renders correct number of pages in page-based mode
  - Shows only prev/next in cursor mode
  - Calls onPageChange with correct page number
  - Disables prev on page 1
  - Disables next when totalPages reached or !hasNext
  - Keyboard arrow keys navigate pages
  - Enter key activates focused page button
- **Table with Pagination**:
  - Renders pagination when prop provided
  - Doesn't render pagination when prop undefined
  - Passes callbacks correctly
  - Shows LoadingOverlay during page transition

#### Integration Tests (Storybook)

- Interactive pagination in page-based mode
- Interactive pagination in cursor mode
- Table + Pagination integration
- Page size selector changes
- Filtering + pagination interaction

#### E2E Tests

- **Products Paginated**:
  - Navigate through pages
  - Change page size
  - Apply filter → resets to page 1
  - Verify URL params update (optional)
- **Orders Cursor**:
  - Navigate to next page
  - Navigate to previous page
  - Verify Next disabled on last page
  - Verify no total count text visible

### Definition of Done

- [ ] All acceptance criteria met and verified
- [ ] Code complete and reviewed
- [ ] All tests passing:
  - [ ] Unit tests for Pagination component (≥80% coverage)
  - [ ] Unit tests for Table integration
  - [ ] E2E tests for both showcases
- [ ] Storybook stories updated with both modes
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Accessibility verified:
  - [ ] ARIA labels present
  - [ ] Keyboard navigation works
  - [ ] Screen reader tested
- [ ] Documentation updated:
  - [ ] Component props documented in JSDoc
  - [ ] Storybook docs include usage examples
- [ ] Both showcases deployed and functional in preview environment

### Dependencies

- ✅ **Epic 001 Story 001** (Table Filtering) - COMPLETED
  - Provides Table component architecture
  - Establishes filtering patterns
  - Provides ProductsList as reference

### Estimated Effort

- **Size**: Large (L)
- **Complexity**: Medium
- **Time Estimate**: 6-7 hours
- **Risk**: Low (existing components provide solid foundation)

### Notes

- The `usePagination` hook is production-ready and well-tested, minimal changes needed
- Current `Pagination.tsx` component needs complete refactor but is small (~40 lines)
- Existing `LoadingOverlay` pattern in Table will handle page transition states elegantly
- N+1 fetch pattern for cursor pagination is simple to implement in MSW mocks
- Two showcases provide clear comparison between pagination strategies
- This pattern establishes foundation for all future paginated tables in the admin app
