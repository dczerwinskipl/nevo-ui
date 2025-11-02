# Filtering Guidelines

This document describes conventions and best practices for implementing table filters across the nEvo admin applications.

## Language
All docs, examples and in-code comments must be written in English.

## Goals
- Provide stateless, strongly-typed, reusable filter UI primitives in the design system.
- Keep business logic and API calls inside application code (hooks/services), not in the design system.
- Make filters configurable and typed at the table/feature level.

## Component Responsibilities
- Design-system filter components must be presentational and stateless.
- Accept all data and callbacks via props only.
- Expose clear typing in props so application code can enforce types.
- Avoid embedding text strings — labels/placeholders/empty messages must be provided by the app.

## Typing & Config
Prefer a flat typed configuration per table using a generic `FilterConfig<TFilters>` where `TFilters` is a plain object whose keys are filter names and values are the value types. This enables the compiler to ensure configuration matches the expected shape.

Example contract (conceptual):

```ts
// TFilters is a flat object: { search: string; category: CategoryType; price: number }
type FilterConfig<TFilters extends Record<string, string | number>> = {
  [K in keyof TFilters]: {
    name: K;
    label: string; // provided by the app
    type: 'text' | 'number' | 'select';
    placeholder?: string;
    options?: TFilters[K] extends string ? Array<{ label: string; value: TFilters[K] }> : never;
    min?: TFilters[K] extends number ? number : never;
    max?: TFilters[K] extends number ? number : never;
    disabled?: boolean;
    isError?: boolean; // presentational error state
  }
}
```

Key rules:
- If a filter value type is `number`, the filter `type` must be `number` or `select`.
- If a filter value type is a union of strings, `select` options must use that same union type.
- The design system should not coerce or validate types — validation and mapping belongs to the application hooks/services.

## UX & Behavior
- An explicit `Apply` button should be used to apply filters by default (no debounce required).
- Provide a `Clear` action to reset filters to defaults.
- For lists with no data (initial load) show a `TableSkeleton`.
- When data already exists but a refresh is happening show a subtle `TableOverlay` to indicate background refresh.
- For empty results show an `EmptyState` component — icon and copy must be passed from the app, not embedded in the design system.
- Filter action buttons when performing a network request should be disabled and show a loading icon (no text change required).

## Accessibility
- All inputs must have accessible labels (either visually visible or via `aria-label`).
- Buttons should have appropriate `aria-pressed`/`aria-busy` or `aria-disabled` states when applicable.

## Testing & Mocking
- Use in-memory mock data with simulated delays when testing loading/empty/refresh states.
- Unit-test hooks and mapping logic separately from presentational components.
- Integration tests should verify: applying filters, clearing filters, empty results, and refresh overlay behavior.

## Implementation notes
- Keep the design system minimal: small, composable components (FilterField, TextFilter, NumberFilter, SelectFilter, FilterActions).
- Provide clear TypeScript types and export them from the design-system package.
- Provide examples in the app feature (e.g. `apps/admin`) showing how to configure and use the filters with `useFilters` and TanStack Query.

## Example flow
1. App defines a typed `ProductFilters` interface and `FilterConfig<ProductFilters>`.
2. App uses `useFilters<ProductFilters>(initialValues, config)` to manage local pending values and `apply` operation.
3. App passes current filters to `useProducts(filters)` which uses TanStack Query to fetch data.
4. Table component displays `TableSkeleton` / `TableOverlay` / `EmptyState` depending on query state.

---

If you want, I will implement the first design-system components next (FilterGroup, FilterField, TextFilter, NumberFilter, SelectFilter, FilterActions) as minimal, typed, stateless React components in `packages/design-system/src/data` and then run a build to ensure compilation passes.