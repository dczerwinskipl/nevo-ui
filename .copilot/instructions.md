# GitHub Copilot Chat Instructions

## Project Context
This project is a monorepo containing:
- **packages/design-system**: Reusable design system components (@nevo/design-system)
- **apps/admin**: Ecommerce admin dashboard application (@nevo/ecommerce-admin)

## Always Include Guidelines
When providing assistance, always reference and follow the architectural guidelines defined in `.copilot/project-guidelines.md`.

## Key Principles to Remember
1. **Separation of Concerns**: Design system package contains only reusable components, no business logic
2. **Theme-Based Colors**: No hardcoded colors, use semantic color tokens
3. **Performance First**: Constants outside components, proper memoization
4. **TypeScript Strict**: Explicit types, no any usage
5. **Responsive Design**: Mobile-first approach with Tailwind
6. **Accessibility**: WCAG 2.1 AA compliance

## Code Review Checklist
Before suggesting any code changes, verify:
- [ ] Components follow the defined prop interface patterns
- [ ] Colors use theme tokens, not hardcoded values
- [ ] Constants are defined outside component scope
- [ ] TypeScript types are properly defined
- [ ] Responsive design is implemented
- [ ] Accessibility considerations are included

## Architecture Patterns
- **packages/design-system**: primitives/ → layout/ → data/ → overlays/ structure
- **apps/admin**: Vertical slices in features/ folder
- **Routing**: React Router v6 with nested routes
- **State**: useState/useReducer + TanStack Query + Zustand if needed

## File Naming
- Components: PascalCase (StatusBadge.tsx)
- Hooks: camelCase with use prefix (useOrderData.ts)
- Types: PascalCase (OrderStatus.ts)
- Constants: SCREAMING_SNAKE_CASE (API_ENDPOINTS.ts)