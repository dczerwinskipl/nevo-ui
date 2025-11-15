# GitHub Copilot Workspace Prompts

This directory contains custom prompt files for GitHub Copilot to streamline development workflows in the nEvo Ecommerce Admin project.

## What are Prompt Files?

Prompt files are **workflow orchestration tools** that provide context and process instructions to GitHub Copilot. They define WHAT to do and in what order, while **all detailed standards and examples** are stored in `.copilot/` files.

**Key Principle**: Prompt files reference `.copilot/` documentation, they don't duplicate it.

## Available Prompts

| Command      | Purpose                           | When to Use                              |
| ------------ | --------------------------------- | ---------------------------------------- |
| `/spec`      | Create technical specification    | Starting a new feature or task           |
| `/tasks`     | Break down spec into atomic tasks | After spec is created, before coding     |
| `/implement` | Generate production-ready code    | Implementing features/components         |
| `/review`    | Review code against standards     | Before submitting PR, during code review |

## How to Use

### Prerequisites

1. **VS Code** version 1.85.0 or higher
2. **GitHub Copilot** extension installed
3. **GitHub Copilot Chat** extension installed

### Setup (One-Time)

**Good news**: Prompt files work automatically in VS Code! No special settings required.

VS Code automatically detects `.prompt.md` files in your workspace. The extensions are already configured as recommended in `.vscode/extensions.json`.

**To get started**:

1. Ensure GitHub Copilot and Copilot Chat extensions are installed
2. Restart VS Code (if you just cloned the repo)
3. That's it! Prompt files are ready to use

### Verify Setup

1. Open Copilot Chat (`Ctrl+Shift+I` / `Cmd+Shift+I`)
2. Type `/` to see available commands
3. You should see: `/spec`, `/tasks`, `/implement`, `/review`

## Detailed Usage Guide

### 1. Creating a Specification (`/spec`)

**Purpose**: Generate a detailed technical specification following project standards.

**Usage**:

```
/spec [Feature description or GitHub issue link]
```

**Example**:

```
/spec Add ability to filter products by category with multi-select dropdown
```

**What it does**:

- Analyzes existing codebase for related patterns
- Creates spec following `.copilot/recipes/spec-creation.md` template
- Includes all required sections (Summary, Context, Requirements, Acceptance Criteria, etc.)
- Asks clarifying questions before finalizing
- Saves spec to `spec/XXX-epic-name/YYY-story-name.md`

**What you get**:

- Complete specification document
- Detailed requirements with acceptance criteria
- Technical design approach
- Testing strategy
- Definition of done checklist

### 2. Breaking Down into Tasks (`/tasks`)

**Purpose**: Convert a specification into atomic, verifiable tasks with estimates.

**Usage**:

```
/tasks [Path to spec file]
```

**Example**:

```
/tasks spec/003-product-filtering/001-category-filter.md
```

**What it does**:

- Reads the specification
- Breaks down into 1-4 hour tasks
- Identifies dependencies between tasks
- Estimates complexity and effort
- Groups tasks into logical phases
- References Definition of Done for each task

**What you get**:

- Task breakdown with phases
- Clear acceptance criteria per task
- Dependency mapping
- Effort estimates
- Execution order recommendation

### 3. Implementing Code (`/implement`)

**Purpose**: Generate production-ready code following all project standards.

**Usage**:

```
/implement [Spec file path or task description]
```

**Example**:

```
/implement spec/003-product-filtering/001-category-filter.md
```

**What it does**:

- Reads spec or task description
- References `.copilot/conventions.md` for ALL coding standards
- References `.copilot/recipes/component.md` for ALL templates and patterns
- Searches for similar existing code
- Generates implementation following those standards

**What you get**:

- Component implementation (`.tsx`)
- Unit tests (`.test.tsx`)
- Storybook story (`.stories.tsx`)
- TypeScript types and JSDoc comments
- Verification against Definition of Done

**Note**: All code templates and examples are in `.copilot/recipes/component.md`, not in the prompt file.

### 4. Reviewing Code (`/review`)

**Purpose**: Perform comprehensive code review against project standards.

**Usage**:

```
/review [Optional: PR number or file paths]
```

**Example**:

```
/review
```

or

```
/review PR #123
```

or

```
/review src/components/ProductCard.tsx
```

**What it does**:

- Analyzes changed files
- Checks against `.copilot/checklists/pr_review.md`
- Verifies design system compliance
- Checks accessibility (WCAG 2.1 AA)
- Validates test coverage
- Identifies performance issues

**What you get**:

- Prioritized issue list (Critical, Major, Minor)
- Specific file and line number references
- Code examples for fixes
- Checklist verification
- What's done well (positive feedback)

## How Prompt Files Work

### Architecture: Separation of Concerns

```
.github/prompts/*.prompt.md
├─ Role: Workflow orchestration (WHAT to do, in what order)
├─ Content: Process steps, which .copilot/ files to read
└─ NO duplication: Zero code examples or detailed rules

.copilot/conventions.md
├─ Role: SINGLE SOURCE OF TRUTH for coding standards
├─ Content: Design system rules, TypeScript, naming, patterns
└─ Examples: Complete code examples for all patterns

.copilot/recipes/*.md
├─ Role: SINGLE SOURCE OF TRUTH for step-by-step guides
├─ Content: Component templates, test patterns, story templates
└─ Examples: Complete templates and real examples

.copilot/checklists/*.md
├─ Role: SINGLE SOURCE OF TRUTH for quality verification
├─ Content: Definition of Done, PR review criteria
└─ Criteria: Verifiable pass/fail checks
```

### Why This Matters

**Benefits**:
- **Single Source of Truth**: Each rule exists in exactly ONE place
- **Easy Maintenance**: Change a rule once, not in 5+ files
- **No Confusion**: Clear where to find and update information
- **Consistency**: AI always references the same standards

**Example**:
- ❌ OLD: "Use design system primitives" duplicated in 5 files
- ✅ NEW: Rule detailed in `.copilot/conventions.md`, prompts just reference it

### Prompt File Details

Each prompt file:

Each prompt file:

- **Lists which `.copilot/` files to read** for complete context
- **Defines the workflow** - step-by-step process
- **Specifies output format** - what deliverables to produce
- **References, doesn't duplicate** - zero redundancy with `.copilot/`

### Prompt File Locations

```
.github/prompts/
├── spec.prompt.md       # Specification creation
├── tasks.prompt.md      # Task breakdown
├── implement.prompt.md  # Code implementation
└── review.prompt.md     # Code review
```

## Project Context Available to Prompts

All prompts automatically reference:

- `.github/copilot-instructions.md` - Core project assumptions
- `.copilot/conventions.md` - Coding standards
- `.copilot/glossary.md` - Domain terminology
- `.copilot/context/architecture.md` - System architecture
- `.copilot/recipes/` - Step-by-step implementation guides
- `.copilot/checklists/` - Quality verification checklists

## Workflow Example

Complete workflow for implementing a new feature:

```bash
# 1. Create specification
/spec Add category filter to products table

# 2. Review generated spec, answer clarifying questions

# 3. Break down into tasks
/tasks spec/003-product-filtering/001-category-filter.md

# 4. Implement each task
/implement Create CategoryFilter component with tests

# 5. Review implementation
/review src/components/CategoryFilter.tsx

# 6. Address review feedback, then submit PR
```

## Tips & Best Practices

### For `/spec`

- Provide detailed feature descriptions
- Include user stories or use cases
- Mention any constraints or requirements upfront
- Answer clarifying questions thoughtfully

### For `/tasks`

- Ensure spec is complete before breaking down
- Review task breakdown for logical grouping
- Verify dependencies are accurate
- Adjust estimates based on your knowledge

### For `/implement`

- Provide spec file path when possible (better context)
- Review generated code against Definition of Done
- Run tests to verify implementation
- Check accessibility with browser tools

### For `/review`

- Review before major commits
- Use for pre-PR self-review
- Address critical issues first
- Don't skip accessibility checks

## Troubleshooting

### Prompts don't appear in Copilot Chat

**Solution**:

1. Ensure you have GitHub Copilot extension v1.85.0+ installed
2. Verify `.prompt.md` files exist in `.github/prompts/` directory
3. Restart VS Code to refresh workspace
4. Update GitHub Copilot extension to latest version

**Note**: Prompt files are automatically detected by VS Code based on the `.prompt.md` file extension and workspace location. No VS Code settings configuration is required.

### Prompt generates incorrect output

**Solution**:

1. Provide more context in your request
2. Reference specific files or patterns
3. Ask follow-up questions to refine output
4. Correct the AI inline - it learns from your feedback

### Can't find specific prompt

**Solution**:

- Type `/` in Copilot Chat to see all available prompts
- Check `.github/prompts/` directory for prompt files
- Verify prompt file names match command names

### AI doesn't follow project conventions

**Solution**:

- Prompts automatically reference `.copilot/` docs
- If output violates standards, point it out explicitly
- The AI will adjust based on your corrections

## Need Help?

- Read detailed documentation in `.copilot/` folder
- Check `.copilot/README.md` for file organization
- Review `.copilot/instructions.md` for quick reference
- Consult `.copilot/conventions.md` for coding standards

## Extending Prompts

To modify or add prompts:

1. Edit existing files in `.github/prompts/`
2. Follow YAML frontmatter format:
   ```yaml
   ---
   name: promptname
   description: "Brief description"
   argument-hint: "What to provide"
   ---
   ```
3. Test prompt with sample requests
4. Update this README with new command

## Related Documentation

- [Project Guidelines](../.copilot/README.md)
- [Coding Conventions](../.copilot/conventions.md)
- [Spec Creation Guide](../.copilot/recipes/spec-creation.md)
- [Component Development](../.copilot/recipes/component.md)
- [Testing Guide](../.copilot/recipes/testing.md)
