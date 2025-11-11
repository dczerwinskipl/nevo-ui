# .copilot - AI Development Guidelines

> **AI Assistant context directory for nEvo Ecommerce Admin monorepo**

## 🎯 Start Here

**AI Assistants**: Read [instructions.md](./instructions.md) first - it's your quick index to all context files.

**Developers**: This folder contains all documentation needed for AI-assisted development.

## 📁 File Organization

### 🚀 Quick Reference

- **[instructions.md](./instructions.md)** ← **START HERE** - Quick index and workflow guide for AI assistants

### 📋 Core Standards

- **[conventions.md](./conventions.md)** - Coding standards, naming, patterns, Git conventions, VS Code setup
- **[glossary.md](./glossary.md)** - Domain terminology and definitions
- **[workflow.md](./workflow.md)** - Development workflow, Git workflow, PR process, release process, deployment

```
.copilot/
├── instructions.md              # ⭐ START HERE - Quick index for AI assistants
├── HIERARCHY.md                 # File relationships and usage patterns
├── README.md                    # This file - folder overview
├── conventions.md               # Coding standards and patterns
├── glossary.md                  # Domain terminology
├── workflow.md                  # Development workflow and processes
├── context/                     # Detailed technical context
│   ├── architecture.md          # System architecture
│   ├── ds-api-guidelines.md     # Component API patterns
│   ├── a11y-guidelines.md       # Accessibility (WCAG 2.1 AA)
│   └── testing-strategy.md      # Testing approach
├── recipes/                     # Step-by-step guides
│   ├── component.md             # Creating components
│   ├── storybook.md             # Writing stories
│   └── testing.md               # Writing tests
└── checklists/                  # Quality verification
    ├── component_development.md # Component checklist
    ├── pr_submission.md         # PR submission checklist
    ├── pr_review.md             # PR review checklist
    └── definition_of_done.md    # Definition of done
```

## 🚀 How to Use This Folder

### For AI Assistants (GitHub Copilot, Claude, etc.)

**Default workflow:**

1. **Read [instructions.md](./instructions.md)** - Contains workflow guide and file index
2. **Reference automatically**:
   - [conventions.md](./conventions.md) - for coding standards
   - [glossary.md](./glossary.md) - for domain terms
   - [workflow.md](./workflow.md) - for development processes
   - [context/architecture.md](./context/architecture.md) - for system understanding
3. **Use task-specific files** as needed:
   - Creating component? → [recipes/component.md](./recipes/component.md)
   - Writing tests? → [recipes/testing.md](./recipes/testing.md)
   - Writing stories? → [recipes/storybook.md](./recipes/storybook.md)
   - Submitting PR? → [checklists/pr_submission.md](./checklists/pr_submission.md)
   - Reviewing PR? → [checklists/pr_review.md](./checklists/pr_review.md)

**You don't need to ask which files to read** - start with instructions.md and it will guide you to the right files for each task.

### For Developers

Use these files as:

- Onboarding material for team members
- Reference during code reviews
- Context for AI assistants
- Living documentation that evolves with the project

## 📋 File Index by Task

| When you need to...              | Read this file                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Understand the project**       | [instructions.md](./instructions.md) → [context/architecture.md](./context/architecture.md)                                   |
| **Create a component**           | [recipes/component.md](./recipes/component.md) → [checklists/component_development.md](./checklists/component_development.md) |
| **Write Storybook stories**      | [recipes/storybook.md](./recipes/storybook.md)                                                                                |
| **Write tests**                  | [recipes/testing.md](./recipes/testing.md) → [context/testing-strategy.md](./context/testing-strategy.md)                     |
| **Submit a PR**                  | [checklists/pr_submission.md](./checklists/pr_submission.md) → [workflow.md](./workflow.md)                                   |
| **Review a PR**                  | [checklists/pr_review.md](./checklists/pr_review.md)                                                                          |
| **Check if task is done**        | [checklists/definition_of_done.md](./checklists/definition_of_done.md)                                                        |
| **Understand Git workflow**      | [workflow.md](./workflow.md) (Git workflow, branch naming, commit messages)                                                   |
| **Understand release process**   | [workflow.md](./workflow.md) (Release process, versioning, deployment)                                                        |
| **Understand accessibility**     | [context/a11y-guidelines.md](./context/a11y-guidelines.md)                                                                    |
| **Check component API patterns** | [context/ds-api-guidelines.md](./context/ds-api-guidelines.md)                                                                |
| **Look up a term**               | [glossary.md](./glossary.md)                                                                                                  |
| **Check coding standards**       | [conventions.md](./conventions.md)                                                                                            |

## 🎯 Key Principles (Quick Reference)

All details are in the linked files, but remember:

1. **English Only** - All code, comments, docs
2. **Design System First** - Use primitives (Card, Button, Typography), not raw HTML
3. **Accessibility** - WCAG 2.1 AA compliance mandatory
4. **Type Safety** - TypeScript strict mode, no `any`
5. **Testing** - >80% coverage required
6. **Theme Tokens** - No hardcoded colors/spacing

See [conventions.md](./conventions.md) and [project-guidelines.md](./project-guidelines.md) for full details.

## 🔧 Development Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start all dev servers (Admin app + Storybook)
pnpm test           # Run all tests
pnpm lint           # Check code quality
pnpm build          # Build all packages

# Package-specific
pnpm --filter @nevo/design-system storybook
pnpm --filter @nevo/ecommerce-admin-app test:e2e
```

See [instructions.md](./instructions.md) for more commands and workflows.

## 📚 Related Documentation

### In This Repo

- [Root README](../README.md) - Project overview and AI-powered methodology
- [Design System README](../packages/design-system/README.md) - Component library
- [API Mocks README](../packages/api-mocks/README.md) - MSW setup
- [Filtering Guidelines](../docs/filtering-guidelines.md) - Table filtering patterns
- [Spec Folder](../spec/) - Detailed specifications

### File Relationships

```
instructions.md ──┬──> conventions.md
                  ├──> glossary.md
                  ├──> project-guidelines.md
                  └──> context/
                       ├── architecture.md
                       ├── ds-api-guidelines.md
                       ├── a11y-guidelines.md
                       └── testing-strategy.md

For specific tasks:
  recipes/component.md ──> checklists/component_development.md
  recipes/storybook.md ──> uses conventions.md + ds-api-guidelines.md
  recipes/testing.md ───> context/testing-strategy.md
```

## 🤝 Contributing to This Folder

When adding/updating documentation:

1. Keep files focused and concise
2. Use practical, copy-pasteable examples
3. Cross-reference related files
4. Update [instructions.md](./instructions.md) if adding new workflows
5. Update this README if adding new files

---

**Last Updated**: January 2025  
**Maintained By**: Nevo UI Team

**Quick Start for AI**: Read [instructions.md](./instructions.md) first!
