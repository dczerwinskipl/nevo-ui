# nEvo Ecommerce Admin - AI-Powered Development Showcase

> **A demonstration of AI-assisted full-stack development** using advanced prompting techniques, iterative refinement, and systematic architecture design.

This monorepo showcases how modern AI coding assistants can build production-quality applications through strategic collaboration, detailed specifications, and continuous validation.

## Project Overview

Modern React admin interface with comprehensive design system, built entirely through AI-assisted development:

- **Turbo + pnpm workspaces** for efficient monorepo management
- **`packages/design-system`**: Complete React component library with Tailwind CSS → `@nevo/design-system`
- **`apps/admin`**: Production-ready Vite React application → `@nevo/ecommerce-admin-app`
- **Full Storybook documentation** with interactive component stories
- **Comprehensive testing infrastructure** with Playwright and Jest
- **Mock API integration** for realistic data scenarios

## Quick Start

1. Install pnpm: https://pnpm.io
2. `pnpm install`
3. `pnpm dev` to run development servers in parallel
4. Open `http://localhost:5173` (or other port if busy)

## 🤖 AI-Assisted Development Workflow

This project uses GitHub Copilot with custom workspace prompts to streamline development. All prompts follow project standards automatically.

### Prerequisites

- **VS Code**: Version 1.85.0 or higher
- **Extensions**:
  - `GitHub.copilot` - GitHub Copilot
  - `GitHub.copilot-chat` - GitHub Copilot Chat

### Initial Setup (One-Time)

1. **Install Extensions**

   VS Code will prompt you to install recommended extensions when you open the workspace, or install manually from the Extensions marketplace.

2. **Enable Prompt Files**

   Open VS Code settings (`Ctrl+,` / `Cmd+,`) and verify:

   ```json
   {
     "chat.promptFiles": true,
     "chat.promptFilesRecommendations": true
   }
   ```

   These settings are already configured in `.vscode/settings.json`.

3. **Verify Copilot Connection**
   - Open Copilot Chat (`Ctrl+Shift+I` / `Cmd+Shift+I`)
   - Type `/help` to see available commands
   - You should see custom prompts: `/spec`, `/tasks`, `/implement`, `/review`

4. **Test Setup**

   ```
   You: /spec Test feature - add a simple button component
   Copilot: [Should respond using project standards and reference conventions]
   ```

### Development Workflow with AI

#### 1. **Creating a Specification** 📝

Use when starting a new feature or task.

```
/spec [Feature description or GitHub issue link]
```

**Example**:

```
/spec Add ability to filter products by category in the products table
```

**What happens**:

- AI analyzes existing codebase for patterns
- References `.copilot/recipes/spec-creation.md` for template
- Creates spec file in `spec/XXX-epic-name/YYY-story-name.md`
- Asks clarifying questions before finalizing

#### 2. **Breaking Down into Tasks** 📋

Use after spec is created to plan implementation.

```
/tasks [Path to spec file]
```

**Example**:

```
/tasks spec/003-product-filtering/001-category-filter.md
```

**What happens**:

- AI reads the spec
- Breaks down into atomic, verifiable tasks (1-4 hours each)
- Creates checklist with dependencies
- Estimates complexity and effort

#### 3. **Implementing Features** 💻

Use to generate code following project conventions.

```
/implement [Path to spec file or task description]
```

**Example**:

```
/implement spec/003-product-filtering/001-category-filter.md
```

**What happens**:

- AI follows `.copilot/conventions.md` strictly
- Uses design system primitives only (never raw HTML)
- Generates tests alongside implementation
- Creates Storybook stories with variants

#### 4. **Reviewing Code** 🔍

Use to validate changes against project standards.

```
/review [Optional: PR number or file paths]
```

**Example**:

```
/review
```

**What happens**:

- AI checks against `.copilot/checklists/pr_review.md`
- Verifies conventions, accessibility, test coverage
- Identifies design system violations
- Suggests improvements

### Quick Reference

| Command      | Purpose               | When to Use                       |
| ------------ | --------------------- | --------------------------------- |
| `/spec`      | Create specification  | Starting new feature/task         |
| `/tasks`     | Break down into tasks | After spec created, before coding |
| `/implement` | Generate code         | Implementing features/components  |
| `/review`    | Review code quality   | Before submitting PR, during CR   |

### Project Context Available to AI

All AI assistants automatically have access to:

- **`.github/copilot-instructions.md`** - Core project assumptions
- **`.copilot/conventions.md`** - Coding standards
- **`.copilot/glossary.md`** - Domain terminology
- **`.copilot/context/architecture.md`** - System architecture
- **`.copilot/recipes/`** - Step-by-step guides
- **`.copilot/checklists/`** - Quality verification

👉 **Read [`.github/prompts/README.md`](.github/prompts/README.md) for detailed prompt usage guide**

👉 **Read [`.copilot/README.md`](.copilot/README.md) for comprehensive project documentation**

### Troubleshooting

#### Prompts not appearing

- Verify `chat.promptFiles: true` in VS Code settings
- Restart VS Code
- Check Copilot extension is up to date

#### AI not following project conventions

- Prompts automatically reference `.copilot/` docs
- If output doesn't match standards, point it out explicitly
- Copilot learns from corrections within the session

#### Can't find a specific prompt

- Type `/` in Copilot Chat to see all available prompts
- All custom prompts are in `.github/prompts/`

### Best Practices

✅ **Do**:

- Use prompts for repetitive tasks (specs, task breakdown, boilerplate)
- Verify AI-generated code against `.copilot/checklists/`
- Ask follow-up questions to refine output
- Reference existing components when asking for new ones

❌ **Don't**:

- Blindly accept AI suggestions without review
- Skip reading generated specs before implementing
- Forget to run tests on AI-generated code
- Use AI for critical security or business logic without thorough review

### New Joiner Onboarding Checklist

- [ ] Install VS Code extensions (Copilot + Copilot Chat)
- [ ] Verify prompt files are enabled in settings
- [ ] Test `/spec` with a sample feature request
- [ ] Read `.copilot/README.md` and `.copilot/instructions.md`
- [ ] Review `.copilot/conventions.md` for coding standards
- [ ] Complete first task using full AI workflow (spec → tasks → implement → review)
- [ ] Review `.copilot/checklists/definition_of_done.md`

---

## AI Development Methodology

This project exemplifies effective AI-assisted software development through:

### 📋 Specification-First Approach

- Detailed architecture specs define structure before implementation
- Component APIs designed with clear interfaces and responsibilities
- Testing strategies outlined before writing code
- See `/spec` folder for comprehensive planning documents

### 🔄 Iterative Refinement Process

1. **Initial Build**: AI generates components based on specifications
2. **Validation**: Review functionality, types, accessibility, tests
3. **Audit Pass**: Systematic review of patterns, consistency, best practices
4. **Refinement**: Update based on findings, ensure alignment across codebase
5. **Documentation**: Update stories, tests, and README files

### 🎯 Quality Assurance Through AI

- **Systematic Audits**: Regular passes to ensure consistency (e.g., primitives usage in stories)
- **Pattern Enforcement**: AI identifies and fixes inconsistencies across files
- **Accessibility Validation**: WCAG compliance checked and documented
- **Test Coverage**: Comprehensive test suites generated alongside components

### 📚 Documentation as Development

- Storybook stories written for every component
- README files updated continuously
- Session summaries track progress and decisions
- Completion documents validate quality gates

## Architecture Overview

### Design System (`packages/design-system`)

```
src/
├── primitives/     # Button, Input, Select, Badge, Card, Typography
├── layout/         # Grid, Stack, Container components
├── navigation/     # Topbar, Sidebar navigation
├── data/          # Data display and filtering system
│   ├── Table/      # Modular table components (149 lines main component)
│   │   ├── Table.tsx           # Main orchestrator component
│   │   ├── TableHeader.tsx     # Header with centered titles
│   │   ├── TableRow.tsx        # Row rendering with actions
│   │   ├── TableActions.tsx    # Action button groups
│   │   ├── TableSkeleton.tsx   # Loading skeleton state
│   │   └── LoadingOverlay.tsx  # Data refresh overlay
│   ├── FilterGroup.tsx         # Filter container
│   ├── FiltersForm.tsx         # Filter form with submit/reset
│   ├── TextFilter.tsx          # Text input filtering
│   ├── NumberFilter.tsx        # Number input filtering
│   ├── SelectFilter.tsx        # Dropdown select filtering
│   └── FilterActions.tsx       # Apply/Clear button group
├── icons/         # SVG icon system (lucide-react)
├── feedback/      # Loading, Progress, Alert, Toast, EmptyState, ErrorState
├── overlays/      # Modal system
├── theme/         # ThemeProvider, tokens, style helpers
└── utils/         # Utility functions and hooks
```

### Admin App (`apps/admin`)

```
src/
├── features/      # Vertical slices (products, dashboard, orders, users)
│   └── products/   # Product management feature
│       ├── components/     # ProductsTable, ProductsFilters
│       ├── hooks/          # useProductFilters
│       ├── pages/          # ProductsList
│       └── types/          # Product interface
├── hooks/         # Generic application hooks (useFilters, useProducts)
├── services/      # API integration (productsApi)
├── shared/        # Shared components, hooks, utils, constants
├── router/        # React Router configuration
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Key Features

### 🤖 AI-Powered Development Approach

This project demonstrates advanced AI-assisted development techniques:

- **Iterative Specification-Driven Design**: Detailed architecture specs guide implementation
- **Systematic Component Development**: Built from primitives up to complex features
- **Comprehensive Documentation**: Storybook stories for every component
- **Test-First Methodology**: Playwright E2E and Jest unit tests validate functionality
- **Continuous Refinement**: Multiple audit passes ensure quality and consistency

### 🎨 Production-Ready Design System

- **50+ Components**: Primitives, forms, navigation, data display, feedback, overlays
- **Theme System**: Light/dark mode with comprehensive token system
- **Accessibility-First**: WCAG 2.1 AA compliance, proper semantic HTML
- **Type-Safe**: Full TypeScript coverage with exported types
- **Storybook Documentation**: Interactive component playground with live examples

### 📊 Advanced Data Management

- **Modular Table System**: Composable table components with filtering, sorting, pagination
- **Generic Filter Framework**: Strongly-typed filter system with TanStack Query
- **Multiple Loading States**: Skeleton screens, overlays, empty states, error handling
- **Mock Service Worker Integration**: Realistic API scenarios for development and testing
- **Apply/Clear Pattern**: Manual filter application with optimistic updates

### 🧪 Comprehensive Testing Infrastructure

- **Playwright E2E Tests**: Full user flow validation with MSW integration
- **Jest Unit Tests**: Component and hook testing with React Testing Library
- **Storybook Visual Testing**: Component story coverage for visual regression
- **CI/CD Pipeline**: Automated testing on every commit

## Development Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev                    # Start all dev servers (Admin app + Design system watch mode)
pnpm dev:admin             # Run only admin app (http://localhost:5173)
pnpm storybook             # Run Storybook (http://localhost:6006)

# Build
pnpm build                 # Build all packages
pnpm build:design-system   # Build design system only
pnpm build:admin           # Build admin app only
pnpm storybook:build       # Build Storybook for deployment

# Testing
pnpm test                           # Run all tests
pnpm test:design-system            # Run design system Jest tests
pnpm test:design-system:ui         # Run design system tests with UI
pnpm --filter @nevo/admin test:e2e # Run Playwright E2E tests

# Utilities
pnpm dev:fresh             # Clean cache and start fresh dev server
pnpm clean-cache           # Clear Vite cache
```

## Project Structure Highlights

### `/spec` - Architecture Specifications

Detailed planning documents that guided AI-assisted development:

- Testing infrastructure design
- Component audit reports
- Feature implementation plans
- Progress summaries and completion documents

### `/packages/design-system` - Complete Component Library

- 50+ production-ready components
- Full Storybook documentation
- Comprehensive test coverage
- Accessibility-first design

### `/packages/api-mocks` - MSW Integration

- Realistic API mocking for development
- Scenario-based testing support
- Browser, Node, and Playwright integrations

### `/apps/admin` - Production Application

- Feature-based architecture
- TanStack Query for data management
- React Router for navigation
- Playwright E2E test coverage

## AI Development Insights

### What Worked Well

✅ **Detailed Specifications**: Clear, comprehensive specs enabled accurate AI implementation
✅ **Iterative Refinement**: Multiple audit passes caught inconsistencies and improved quality
✅ **Pattern Enforcement**: AI could systematically update all files to match patterns
✅ **Documentation-Driven**: Writing stories and docs alongside code ensured completeness
✅ **Test Coverage**: AI-generated tests provided confidence in changes

### Key Learnings

💡 **Start with Primitives**: Building foundational components first made complex features easier
💡 **Consistent Patterns**: Establishing patterns early (intents, variants, sizes) scaled well
💡 **Validation at Every Step**: Regular checks prevented compound errors
💡 **Session Summaries**: Documenting progress made context switching efficient
💡 **Type Safety**: Strong typing caught issues AI might miss

## Resources

- **Design System Storybook**: Full component documentation and interactive examples
- **Admin App**: Live demo of the integrated design system
- **Spec Documents**: `/spec` folder contains all planning and audit documents
- **Completion Summaries**: Track implementation progress and quality gates
