# nEvo Ecommerce Admin - Project Context

> Quick reference for GitHub Copilot. For complete details, see `.copilot/` directory.

## Project Overview

**nEvo Ecommerce Admin** is a modern ecommerce administration panel built as a TypeScript monorepo with a design-system-first approach.

## Technology Stack

- **Framework**: React 18 + TypeScript 5 + Vite
- **Monorepo**: Turborepo + pnpm
- **Styling**: Tailwind CSS with custom theme
- **Testing**: Vitest, Playwright, Storybook
- **API**: MSW for mocking

## Monorepo Structure

```
apps/admin/              - Main admin application
packages/design-system/  - UI component library
packages/api-client/     - API integration
packages/api-mocks/      - MSW mock handlers
```

## Critical Rules (Summary)

1. **English only** - All code, comments, documentation
2. **Design system first** - Use primitives (`Card`, `Button`), never raw HTML (`div`, `button`)
3. **TypeScript strict** - No `any` types without justification
4. **Tests required** - Unit + E2E + Storybook stories
5. **WCAG 2.1 AA** - Accessibility compliance mandatory

## File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Tests: `ComponentName.test.tsx`
- Stories: `ComponentName.stories.tsx`
- Folders: `kebab-case/`

## Complete Documentation

**All details are in `.copilot/` directory:**

### Core Standards
- **`.copilot/conventions.md`** - Complete coding standards, naming, patterns
- **`.copilot/glossary.md`** - Domain terminology
- **`.copilot/workflow.md`** - Git workflow, PR process, releases

### Context
- **`.copilot/context/architecture.md`** - System architecture
- **`.copilot/context/a11y-guidelines.md`** - Accessibility requirements
- **`.copilot/context/testing-strategy.md`** - Testing approach

### Step-by-Step Guides
- **`.copilot/recipes/component.md`** - Creating components (templates, examples)
- **`.copilot/recipes/testing.md`** - Writing tests
- **`.copilot/recipes/storybook.md`** - Writing stories
- **`.copilot/recipes/spec-creation.md`** - Creating specifications

### Checklists
- **`.copilot/checklists/definition_of_done.md`** - When is work complete?
- **`.copilot/checklists/pr_submission.md`** - Before submitting PR
- **`.copilot/checklists/pr_review.md`** - Code review checklist
- **`.copilot/checklists/component_development.md`** - Component quality gates

## Quick Workflow Reference

| Task | Read This |
|------|-----------|
| Create component | `.copilot/recipes/component.md` |
| Write tests | `.copilot/recipes/testing.md` |
| Write stories | `.copilot/recipes/storybook.md` |
| Create spec | `.copilot/recipes/spec-creation.md` |
| Submit PR | `.copilot/checklists/pr_submission.md` |
| Review PR | `.copilot/checklists/pr_review.md` |
| Check if done | `.copilot/checklists/definition_of_done.md` |

---

**Important**: This file is a quick overview only. For all implementation details, coding standards, examples, and templates, refer to the `.copilot/` directory. That is the single source of truth.
