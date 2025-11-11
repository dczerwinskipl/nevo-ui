# Migration from project-guidelines.md

**Date**: November 11, 2025

The monolithic `project-guidelines.md` file has been **replaced** with a specialized, well-organized structure in the `.copilot/` folder.

## ✅ Migration Complete

All content from `project-guidelines.md` has been distributed to appropriate files:

### Core Standards
- **Language Requirements** → `conventions.md` (Language & Documentation section)
- **Git Workflow** → `workflow.md` + `conventions.md` (Git Conventions section)
- **Code Quality Standards** → `conventions.md` (TypeScript, ESLint sections)
- **File Naming Conventions** → `conventions.md` (Naming Conventions section)
- **TypeScript Standards** → `conventions.md`
- **Performance Guidelines** → `conventions.md` (Performance Best Practices section)
- **Responsive Design** → `conventions.md` (Responsive Design section)
- **State Management** → `conventions.md` (State Management section)
- **VS Code Configuration** → `conventions.md` (VS Code Configuration section)

### Workflow & Processes
- **Specification Management** → `workflow.md` (Specification Management section)
- **Branch Naming Convention** → `workflow.md` + `conventions.md`
- **Getting Started** → `workflow.md` (Getting Started section)
- **Pull Request Requirements** → `checklists/pr_submission.md`
- **Definition of Done** → `checklists/definition_of_done.md`
- **Release Process** → `workflow.md` (Release Process section)
- **Deployment** → `workflow.md` (Deployment Workflow section)
- **Support** → `workflow.md` (Support section)
- **Tooling & Infrastructure** → `workflow.md`

### Architecture & Design
- **Project Structure & Responsibilities** → `context/architecture.md`
- **Color System & Theming** → `context/ds-api-guidelines.md`
- **Component Design Patterns** → `context/ds-api-guidelines.md`
- **Intent-Based Component API** → `context/ds-api-guidelines.md`
- **Data Management Patterns** → `context/ds-api-guidelines.md`
- **Routing Architecture** → `context/architecture.md`

### Component Development
- **Component Simplicity and Modularity** → `conventions.md` (Component Design Principles)
- **Extract Complex Logic to Hooks** → `conventions.md`
- **Extract Subcomponents** → `conventions.md`
- **Reuse Feedback Components** → `conventions.md`
- **Tailwind CSS First** → `conventions.md` (Styling section)

### Testing
- **Testing Requirements** → `context/testing-strategy.md`
- **Test Structure** → `context/testing-strategy.md`
- **Testing Standards** → `context/testing-strategy.md`

### Accessibility
- **Accessibility Standards** → `context/a11y-guidelines.md`
- **WCAG 2.1 AA Compliance** → `context/a11y-guidelines.md`

## 📁 New File Structure

```
.copilot/
├── instructions.md              # ⭐ START HERE
├── HIERARCHY.md                 # File relationships
├── README.md                    # Folder overview
├── conventions.md               # Coding standards (all-in-one)
├── glossary.md                  # Domain terminology
├── workflow.md                  # Development processes
├── context/
│   ├── architecture.md          # System architecture
│   ├── ds-api-guidelines.md     # Component API patterns
│   ├── a11y-guidelines.md       # Accessibility
│   └── testing-strategy.md      # Testing approach
├── recipes/
│   ├── component.md             # How to create components
│   ├── storybook.md             # How to write stories
│   └── testing.md               # How to write tests
└── checklists/
    ├── component_development.md # Component checklist
    ├── pr_submission.md         # Before submitting PR
    ├── pr_review.md             # PR review checklist
    └── definition_of_done.md    # When is a task complete?
```

## 🎯 Benefits of New Structure

### Before (project-guidelines.md)
- ❌ 1156 lines in single file
- ❌ Hard to navigate
- ❌ Mix of different concerns
- ❌ Difficult to maintain
- ❌ Information overload

### After (Specialized Files)
- ✅ Clear separation of concerns
- ✅ Easy to find information
- ✅ Focused, task-specific content
- ✅ Better maintainability
- ✅ Scalable structure

## 📚 How to Find Information

| What you need | Where to look |
|---------------|---------------|
| Coding standards | `conventions.md` |
| Development workflow | `workflow.md` |
| Git/PR process | `workflow.md` + `checklists/pr_submission.md` |
| Component creation | `recipes/component.md` |
| Architecture | `context/architecture.md` |
| API patterns | `context/ds-api-guidelines.md` |
| Testing | `context/testing-strategy.md` |
| Accessibility | `context/a11y-guidelines.md` |

## 🔄 For AI Assistants

When referencing guidelines, use:
- `conventions.md` for coding standards
- `workflow.md` for processes
- `recipes/*.md` for how-to guides
- `checklists/*.md` for verification
- `context/*.md` for detailed context

**Do not reference** `project-guidelines.md` - it has been deprecated and removed.

## 📝 Notes

- All new guidelines (component simplicity, hook extraction, Tailwind-first, modularity, feedback component reuse) have been incorporated
- Checklists have been updated to reflect all new standards
- File hierarchy and usage patterns are documented in `HIERARCHY.md`
- AI assistant instructions updated in `instructions.md`

---

**Migration Status**: ✅ COMPLETE  
**Old File**: `project-guidelines.md` → **DEPRECATED**  
**Action Required**: None - all content migrated successfully
