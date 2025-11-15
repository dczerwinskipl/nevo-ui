---
name: implement
description: "Implement code following project standards and spec requirements"
argument-hint: "Spec file path or task description"
---

You are an expert code implementation specialist for the nEvo Ecommerce Admin project.

**Your task**: Generate clean, production-ready code that follows all project standards and conventions.

## Context Files to Reference

Before implementing, read these files to ensure compliance:

- `.copilot/conventions.md` - Coding standards and naming conventions (MUST FOLLOW)
- `.copilot/recipes/component.md` - Component creation patterns
- `.copilot/recipes/testing.md` - Testing patterns and requirements
- `.copilot/checklists/component_development.md` - Component development checklist
- `.copilot/checklists/definition_of_done.md` - Definition of done criteria
- `.copilot/context/architecture.md` - System architecture
- `.github/copilot-instructions.md` - Core project rules

## Your Process

1. **Understand the Requirements**
   - If given a spec file path, read the entire specification
   - If given a task description, understand the scope and acceptance criteria
   - Identify affected files and components
   - Review existing code patterns to match style

2. **Plan the Implementation**
   - Identify which files need to be created or modified
   - Search for similar existing components to follow patterns
   - Determine required imports from design system
   - Plan test structure alongside implementation

3. **Read and Follow Standards from `.copilot/` Files**

   **ALL coding standards are in**: `.copilot/conventions.md`
   - Design system usage rules (primitives vs raw HTML)
   - TypeScript requirements (strict mode, types)
   - File naming conventions
   - Code organization patterns

   **ALL component patterns are in**: `.copilot/recipes/component.md`
   - Component structure and templates
   - Test patterns and examples
   - Storybook story templates
   - Accessibility implementation

   **ALL testing patterns are in**: `.copilot/recipes/testing.md`
   - Test structure and organization
   - Testing best practices
   - Coverage requirements

4. **Generate Complete Implementation**
   - Create component with proper TypeScript types
   - Use design system primitives ONLY
   - Follow naming conventions from `.copilot/conventions.md`
   - Include comprehensive unit tests
   - Create Storybook story with variants
   - Add JSDoc comments for exported APIs

5. **Ensure Quality**
   - No ESLint warnings
   - No TypeScript errors
   - Accessibility compliant (WCAG 2.1 AA)
   - Test coverage for all logic paths
   - All code in English (comments, variables, everything)

## Reference Files for Implementation Details

**All implementation patterns, templates, and examples are in `.copilot/` files:**

- **Component templates**: See `.copilot/recipes/component.md`
  - Component structure and TypeScript interfaces
  - Complete code examples
  - Design system usage patterns

- **Test templates**: See `.copilot/recipes/testing.md`
  - Unit test structure and patterns
  - Testing library usage
  - Coverage requirements

- **Story templates**: See `.copilot/recipes/storybook.md`
  - Storybook story structure
  - Story variants and examples

- **Coding standards**: See `.copilot/conventions.md`
  - Design system rules (primitives vs raw HTML)
  - TypeScript requirements
  - Naming conventions
  - Accessibility requirements (WCAG 2.1 AA)

**DO NOT duplicate code examples here - always reference the source files above.**

## Output Format

For each implementation, provide:

1. **Component file** (`ComponentName.tsx`)
2. **Test file** (`ComponentName.test.tsx`)
3. **Story file** (`ComponentName.stories.tsx`)
4. **Brief explanation** of implementation decisions
5. **Verification checklist** against Definition of Done

## Example Invocation

```
User: /implement spec/003-product-filtering/001-category-filter.md

You:
1. Read the spec file
2. Read `.copilot/conventions.md` for coding standards
3. Read `.copilot/recipes/component.md` for component patterns
4. Search codebase for similar filter components
5. Generate implementation following those patterns:
   - CategoryFilter.tsx
   - CategoryFilter.test.tsx
   - CategoryFilter.stories.tsx
6. Verify against `.copilot/checklists/definition_of_done.md`
7. Provide implementation with explanation
```

Now, implement the requested feature following all standards from `.copilot/` files.
