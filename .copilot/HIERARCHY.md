# .copilot Folder - File Hierarchy and Usage

## 📊 Document Hierarchy

```
Level 1: ENTRY POINT
└── instructions.md ⭐ START HERE
    │
    ├─→ Level 2: CORE STANDARDS (Read automatically for all tasks)
    │   ├── conventions.md        - How to write code
    │   ├── glossary.md           - What terms mean
    │   ├── workflow.md           - Development workflow & processes
    │   └── context/architecture.md - How system is structured
    │
    ├─→ Level 3: DETAILED REFERENCES (Read when needed)
    │   ├── context/ds-api-guidelines.md - Component API patterns
    │   ├── context/a11y-guidelines.md   - Accessibility details
    │   └── context/testing-strategy.md  - Testing approach
    │
    └─→ Level 4: TASK-SPECIFIC (Read for specific tasks only)
        ├── recipes/
        │   ├── component.md    - HOW to create components
        │   ├── storybook.md    - HOW to write stories
        │   ├── testing.md      - HOW to write tests
        │   └── spec-creation.md - HOW to create specs
        └── checklists/
            ├── component_development.md - VERIFY component completion
            ├── pr_review.md             - VERIFY PR quality
            ├── pr_submission.md         - VERIFY before submitting PR
            └── definition_of_done.md    - VERIFY task completion
```

## 🎯 Which Files to Read When?

### Every Time (Default Context)

**Always load these files automatically:**

1. `instructions.md` - Your index and quick reference
2. `conventions.md` - Coding standards
3. `glossary.md` - Domain terms
4. `workflow.md` - Development workflow and processes
5. `context/architecture.md` - System structure

### On Demand (Task-Specific)

#### Creating a Component

```
READ: recipes/component.md
      context/ds-api-guidelines.md
      context/a11y-guidelines.md
VERIFY: checklists/component_development.md
        checklists/definition_of_done.md
```

#### Submitting a Pull Request

```
READ: workflow.md (Git workflow, PR process)
VERIFY: checklists/pr_submission.md
        checklists/definition_of_done.md
```

#### Reviewing a Pull Request

```
READ: checklists/pr_review.md
      conventions.md (already loaded)
VERIFY: All items in pr_review.md checklist
```

#### Writing Storybook Stories

```
READ: recipes/storybook.md
      conventions.md (already loaded)
      context/ds-api-guidelines.md
```

#### Writing Tests

```
READ: recipes/testing.md
      context/testing-strategy.md
```

#### Understanding Release Process

```
READ: workflow.md (Release process, versioning, deployment)
```

#### Understanding Specification Management

```
READ: workflow.md (Spec folder structure, branch naming, templates)
      recipes/spec-creation.md (How to create granular, verifiable specs)
```

#### Creating Epic or Story Specs

```
READ: recipes/spec-creation.md (Detailed templates and guidelines)
      workflow.md (Specification management process)
VERIFY: Templates in spec-creation.md
        Epic/story acceptance criteria are verifiable
```

## 📝 File Purposes

### Entry Point

- **instructions.md** - Quick index, workflow guide, which files to read for what

### Core Standards (Always Reference)

- **conventions.md** - Coding patterns, naming, structure, Git conventions, VS Code setup
- **glossary.md** - Domain terminology
- **workflow.md** - Development workflow, specification management, Git workflow, PR process, release process, deployment
- **README.md** - Folder overview (for humans)

### Detailed Context (Reference as Needed)

- **context/architecture.md** - System overview, tech stack, monorepo structure
- **context/ds-api-guidelines.md** - Component API patterns and examples
- **context/a11y-guidelines.md** - WCAG 2.1 AA standards and implementation
- **context/testing-strategy.md** - Testing philosophy and patterns

### Task Guides (Use for Specific Tasks)

- **recipes/component.md** - Step-by-step component creation
- **recipes/storybook.md** - How to write effective stories
- **recipes/testing.md** - How to write tests with examples
- **recipes/spec-creation.md** - How to create granular, verifiable epic and story specifications

### Quality Gates (Verification)

- **checklists/component_development.md** - Complete component checklist
- **checklists/pr_review.md** - PR review checklist
- **checklists/pr_submission.md** - PR submission checklist (before creating PR)
- **checklists/definition_of_done.md** - Definition of done for all tasks

## 🔄 Relationship Between Files

### Content Overlap (By Design)

Some concepts appear in multiple files with different levels of detail:

**Example: Git Workflow**

- `conventions.md` → Branch naming, commit message format
- `workflow.md` → Complete Git workflow, PR process, release process
- `checklists/pr_submission.md` → PR submission checklist
- `checklists/pr_review.md` → PR review checklist
- `checklists/definition_of_done.md` → When is a task complete?

**Example: Component API Patterns**

- `conventions.md` → Brief mention of patterns
- `context/ds-api-guidelines.md` → Detailed API guidelines
- `recipes/component.md` → Step-by-step with examples
- `checklists/component_development.md` → Verification checklist

**Why?**

- Quick reference vs. detailed guide vs. step-by-step vs. verification
- Different files serve different purposes in the workflow

### No Duplication in:

- Specific technical details (only in one place)
- Code examples (recipes have most examples)
- Checklists (only in checklists/)

## 💡 Usage Patterns

### Pattern 1: Quick Task

```
User: "Create a Button component"
AI reads: instructions.md → recipes/component.md → conventions.md
AI verifies: checklists/component_development.md → checklists/definition_of_done.md
```

### Pattern 2: Understanding System

```
User: "Explain the architecture"
AI reads: instructions.md → context/architecture.md → workflow.md
```

### Pattern 3: Code Review

```
User: "Review this PR"
AI reads: instructions.md → checklists/pr_review.md → conventions.md
```

### Pattern 4: Submitting PR

```
User: "I'm ready to submit a PR"
AI reads: instructions.md → checklists/pr_submission.md → workflow.md (Git workflow)
AI verifies: All items in pr_submission.md → definition_of_done.md
```

### Pattern 5: Accessibility Question

```
User: "How to make this accessible?"
AI reads: instructions.md → context/a11y-guidelines.md
```

### Pattern 6: Release Process

```
User: "How do I release a new version?"
AI reads: instructions.md → workflow.md (Release Process section)
```

## 🚫 What NOT to Do

❌ Read all files for every task
❌ Skip instructions.md
❌ Ignore checklists after implementation
❌ Use only project-guidelines.md (it's comprehensive but verbose)
❌ Mix up recipes (HOW) with context (WHY)

## ✅ What TO Do

✅ Start with instructions.md always
✅ Load core standards (conventions, glossary, architecture) by default
✅ Read task-specific files when relevant
✅ Use checklists to verify completion
✅ Reference project-guidelines.md for complete picture

---

## Summary

**TL;DR for AI Assistants:**

1. **Always read first**: `instructions.md`
2. **Load by default**: `conventions.md`, `glossary.md`, `context/architecture.md`
3. **Read when relevant**: Task-specific recipes and context files
4. **Verify with**: Checklists before saying you're done

You don't need to ask which files to read - `instructions.md` will guide you!
