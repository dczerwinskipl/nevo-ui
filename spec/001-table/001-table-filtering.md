# EPIC 001: Table
## Story 001: Filtering

### Feature Description
Implementation of a comprehensive table filtering system with generic design-system components, strong TypeScript typing, and TanStack Query integration.

### Functional Requirements

#### Design System Components
- Stateless components without internal application logic
- Strong typing with generic interfaces
- Support for states: loading, error, disabled
- API based on intent-based design

#### Filter Types
- **Text Filter**: Text search
- **Number Filter**: Numeric values with optional min/max
- **Select Filter**: Option list with single selection

#### Type Architecture

```typescript
// Generic type for filter configuration
type FilterConfig<TFilters extends Record<string, FilterValue>> = {
  [K in keyof TFilters]: {
    name: K;
    label: string;
    type: InferFilterType<TFilters[K]>;
    placeholder?: string;
    options?: TFilters[K] extends string 
      ? Array<{ label: string; value: TFilters[K] }>
      : never;
    min?: TFilters[K] extends number ? number : never;
    max?: TFilters[K] extends number ? number : never;
    disabled?: boolean;
    isError?: boolean;
  }
};

// Automatic filter type inference based on value
type InferFilterType<T> = 
  T extends string ? 'text' | 'select' :
  T extends number ? 'number' | 'select' :
  never;

type FilterValue = string | number;

// Usage example
interface ProductFilters {
  search: string;
  category: 'electronics' | 'clothing' | 'books';
  price: number;
  status: 'active' | 'inactive';
}
```

#### Loading and Error States

**Table:**
- **Skeleton**: When no data is available (initial loading)
- **Overlay**: When data exists but is being refreshed
- **Empty State**: Empty list with configurable texts/icons
- Texts passed as parameters (not hardcoded in design system)

**Filters:**
- **Loading**: Disabled button with loading icon (no texts)
- **Error**: Support for `isError` state for individual fields

#### Filter Application Mechanism
- "Apply" button instead of debounce
- Option to extend with debounce for other use cases
- "Clear/Reset" button to clear filters

### Tasks to Complete

#### Task 001: Filtering Guidelines Documentation
**Description**: Create guidelines for the filtering system in project documentation
**Files**:
- `docs/filtering-guidelines.md`

**Scope**:
- Filter design principles
- Typing standards
- Usage patterns

#### Task 002: Generic Filtering Components
**Description**: Implementation of base design-system components
**Files**:
- `packages/design-system/src/data/FilterGroup.tsx`
- `packages/design-system/src/data/FilterField.tsx`
- `packages/design-system/src/data/TextFilter.tsx`
- `packages/design-system/src/data/NumberFilter.tsx`
- `packages/design-system/src/data/SelectFilter.tsx`
- `packages/design-system/src/data/FilterActions.tsx`

**Component Specifications**:

```typescript
// FilterGroup - container for filters
interface FilterGroupProps<TFilters extends Record<string, FilterValue>> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// FilterField - wrapper for individual filter
interface FilterFieldProps {
  label: string;
  children: React.ReactNode;
  isError?: boolean;
  className?: string;
}

// TextFilter
interface TextFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// NumberFilter
interface NumberFilterProps {
  value: number | '';
  onChange: (value: number | '') => void;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  isError?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// SelectFilter
interface SelectFilterProps<T extends string> {
  value: T | '';
  onChange: (value: T | '') => void;
  options: Array<{ label: string; value: T }>;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// FilterActions
interface FilterActionsProps {
  onApply: () => void;
  onClear: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  applyLabel?: string;
  clearLabel?: string;
}
```

#### Task 003: Filtering Hooks and TanStack Query
**Description**: TanStack Query integration and hook for managing filter state
**Files**:
- `apps/admin/src/hooks/useFilters.ts`
- `apps/admin/src/hooks/useProducts.ts`
- `apps/admin/src/services/productsApi.ts`

**Hook Specifications**:

```typescript
// useFilters - generic hook for filters
function useFilters<TFilters extends Record<string, FilterValue>>(
  initialFilters: TFilters,
  config: FilterConfig<TFilters>
) {
  // Returns: filters, updateFilter, applyFilters, clearFilters, pendingFilters
}

// useProducts - hook for products with filtering
function useProducts(filters: ProductFilters) {
  // TanStack Query with filter parameters
  // Returns: data, isLoading, isFetching, error, refetch
}
```

#### Task 004: Product Filters Implementation
**Description**: Update ProductsFilters component with new components
**Files**:
- `apps/admin/src/features/products/components/ProductsFilters.tsx`
- `apps/admin/src/features/products/hooks/useProductFilters.ts`

**Scope**:
- Replace current components with new generic ones
- Implement typed filter configuration
- Integration with filtering hooks

**Product Filter Configuration**:

```typescript
const productFilterConfig: FilterConfig<ProductFilters> = {
  search: {
    name: 'search',
    label: 'Search Products',
    type: 'text',
    placeholder: 'Name, SKU, description...'
  },
  category: {
    name: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'All Categories',
    options: [
      { label: 'Electronics', value: 'electronics' },
      { label: 'Clothing', value: 'clothing' },
      { label: 'Books', value: 'books' }
    ]
  },
  price: {
    name: 'price',
    label: 'Maximum Price',
    type: 'number',
    placeholder: 'Maximum price',
    min: 0
  },
  status: {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'All Statuses',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]
  }
};
```

#### Task 005: Loading State Components
**Description**: Implementation of components for different table states
**Files**:
- `packages/design-system/src/data/TableSkeleton.tsx`
- `packages/design-system/src/data/TableOverlay.tsx`
- `packages/design-system/src/data/EmptyState.tsx`

**Component Specifications**:

```typescript
```typescript
// TableSkeleton - skeleton for table
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

// TableOverlay - overlay during loading
interface TableOverlayProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

// EmptyState - empty list state
interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}
```

### Acceptance Criteria

#### Functional
- [ ] Filters work with strong TypeScript typing
- [ ] Design-system components are completely stateless
- [ ] Support for loading/error states for filters and table
- [ ] Configurable texts and icons (not hardcoded in design system)
- [ ] Apply button applies filters, Clear resets them

#### Technical
- [ ] Generic types enforce compatibility between configuration and data
- [ ] TanStack Query properly handles filter parameters
- [ ] Components comply with existing design-system architecture
- [ ] No hard dependencies on application logic in components

#### UI/UX
- [ ] Skeleton displays during initial loading
- [ ] Overlay displays during data refresh
- [ ] Empty state with configurable texts/icons
- [ ] Loading state for filter buttons (icon, not text)
- [ ] Consistent design with existing components (size="sm")

### Implementation Notes

#### Flat Architecture Benefits (Option B)
- Easier type compatibility
- Simpler generic management
- Lower interface complexity
- Better IDE/TypeScript support

#### Extensibility
- Option to add debounce for other cases
- Support for additional filter types in the future
- Configurable filter behavior per table

#### Mock Data and Testing
- Using in-memory data with simulated delays
- Testing all loading states
- Validating type correctness at compile time
```

### Kryteria akceptacji

#### Funkcjonalne
- [ ] Filtry działają z silnym typowaniem TypeScript
- [ ] Komponenty design-system są całkowicie stateless
- [ ] Obsługa stanów loading/error dla filtrów i tabeli
- [ ] Konfigurowalność tekstów i ikon (nie zaszyte w design system)
- [ ] Przycisk Apply aplikuje filtry, Clear je resetuje

#### Techniczne
- [ ] Generyczne typy wymuszają zgodność między konfiguracją a danymi
- [ ] TanStack Query poprawnie obsługuje parametry filtrów
- [ ] Komponenty zgodne z istniejącą architekturą design-system
- [ ] Brak twardych zależności od logiki aplikacyjnej w komponentach

#### UI/UX
- [ ] Skeleton wyświetla się podczas pierwszego ładowania
- [ ] Overlay wyświetla się podczas odświeżania danych
- [ ] Empty state z konfigurowalnymi tekstami/ikonami
- [ ] Loading state dla przycisków filtrów (ikona, nie tekst)
- [ ] Spójny design z istniejącymi komponentami (size="sm")

### Uwagi implementacyjne

#### Zalety architektury flat (opcja B)
- Łatwiejsza zgodność typów
- Prostsze zarządzanie generykami
- Mniejsza złożożność interfejsów
- Lepsze wsparcie IDE/TypeScript

#### Rozszerzalność
- Możliwość dodania debounce dla innych przypadków
- Wsparcie dla dodatkowych typów filtrów w przyszłości
- Możliwość konfiguracji zachowania filtrów per tabela

#### Mock data i testowanie
- Używanie in-memory danych z symulowanymi opóźnieniami
- Testowanie wszystkich stanów ładowania
- Walidacja poprawności typów w czasie kompilacji