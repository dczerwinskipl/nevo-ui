# AI Assistant Instructions for Nevo UI

> **Quick reference for GitHub Copilot, Claude, and other AI assistants**

## 🎯 Primary Context Files

When working on this project, **automatically reference these files**:

### Core Documentation (Read First)

1. **[conventions.md](./conventions.md)** - Coding standards, naming, patterns, Git conventions, VS Code setup
2. **[glossary.md](./glossary.md)** - Domain terminology and definitions
3. **[workflow.md](./workflow.md)** - Development workflow, Git workflow, PR process, release process, deployment
4. **[context/architecture.md](./context/architecture.md)** - System architecture overview

### Detailed Guidelines (Reference as Needed)

5. **[context/ds-api-guidelines.md](./context/ds-api-guidelines.md)** - Component API patterns
6. **[context/a11y-guidelines.md](./context/a11y-guidelines.md)** - Accessibility standards (WCAG 2.1 AA)
7. **[context/testing-strategy.md](./context/testing-strategy.md)** - Testing approach

### Task-Specific Guides (Use for Specific Tasks)

- **Creating components**: [recipes/component.md](./recipes/component.md) + [checklists/component_development.md](./checklists/component_development.md)
- **Writing stories**: [recipes/storybook.md](./recipes/storybook.md)
- **Writing tests**: [recipes/testing.md](./recipes/testing.md)
- **Creating specs**: [recipes/spec-creation.md](./recipes/spec-creation.md)
- **Submitting PRs**: [checklists/pr_submission.md](./checklists/pr_submission.md)
- **Reviewing PRs**: [checklists/pr_review.md](./checklists/pr_review.md)
- **Definition of Done**: [checklists/definition_of_done.md](./checklists/definition_of_done.md)

## 📦 Project Structure

```
packages/design-system/  → Reusable UI components (@nevo/design-system)
apps/admin/             → Ecommerce admin app (@nevo/ecommerce-admin)
packages/api-mocks/     → MSW mock handlers
packages/api-client/    → API integration
```

## ✅ Pre-Flight Checklist

Before suggesting code changes, verify:

- [ ] Follows [conventions.md](./conventions.md) patterns
- [ ] Uses design system primitives (not raw HTML)
- [ ] Uses theme tokens (no hardcoded colors)
- [ ] TypeScript types properly defined
- [ ] Accessibility compliant (WCAG 2.1 AA)
- [ ] Tests included
- [ ] All text in English

## 🚀 Quick Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start all dev servers
pnpm test           # Run all tests
pnpm lint           # Check code quality
pnpm build          # Build all packages
```

## 💡 Default Workflow

### When user asks to create a component:

1. Read [recipes/component.md](./recipes/component.md)
2. Follow [conventions.md](./conventions.md)
3. Check [context/ds-api-guidelines.md](./context/ds-api-guidelines.md)
4. Ensure [context/a11y-guidelines.md](./context/a11y-guidelines.md) compliance
5. Use [checklists/component_development.md](./checklists/component_development.md) to verify
6. Check [checklists/definition_of_done.md](./checklists/definition_of_done.md) before marking complete

### When user asks to submit a PR:

1. Read [workflow.md](./workflow.md) (Git workflow section)
2. Use [checklists/pr_submission.md](./checklists/pr_submission.md) to verify readiness
3. Ensure [checklists/definition_of_done.md](./checklists/definition_of_done.md) criteria met

### When user asks to write tests:

1. Read [recipes/testing.md](./recipes/testing.md)
2. Follow [context/testing-strategy.md](./context/testing-strategy.md)

### When user asks to write stories:

1. Read [recipes/storybook.md](./recipes/storybook.md)
2. **Always use design system primitives** (Card, Button, Typography)
3. **Never use raw HTML** (div, button, h1)

### When reviewing code:

1. Use [checklists/pr_review.md](./checklists/pr_review.md)
2. Check against [conventions.md](./conventions.md)

### When asking about release/deployment:

1. Read [workflow.md](./workflow.md) (Release Process, Deployment sections)
2. Follow semantic versioning rules
3. Update CHANGELOG.md

## 🎨 Key Principles

1. **English Only**: All code, comments, docs in English
2. **Design System First**: Use primitives, not raw HTML
3. **Accessibility**: WCAG 2.1 AA compliance mandatory
4. **Type Safety**: TypeScript strict mode, no `any`
5. **Testing**: >80% coverage required
6. **Theme Tokens**: No hardcoded colors/spacing

## 📚 File Organization

Files are organized so you can reference them efficiently:

- **conventions.md** → What to do (coding standards, naming, Git conventions)
- **workflow.md** → Development processes (Git, PR, release, deployment)
- **recipes/** → How to do it (step-by-step guides)
- **context/** → Why and architectural context
- **checklists/** → Verification and quality gates (before submitting, reviewing, or completing tasks)

---

**For detailed information, always reference the specific files listed above.  
This instruction file is just a quick index - the real knowledge is in the other `.copilot/` files.**

**Note**: The old `project-guidelines.md` has been replaced with specialized files:

- Coding standards → `conventions.md`
- Workflow and processes → `workflow.md`
- Component development → `recipes/component.md` + `checklists/component_development.md`
- PR process → `checklists/pr_submission.md` + `checklists/pr_review.md`
- Definition of done → `checklists/definition_of_done.md`
