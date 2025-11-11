# Development Workflow

This document describes the development workflow, processes, and procedures for the nEvo Ecommerce Admin project.

---

## 📋 Specification Management

### Task Specifications Location

**Rule**: All task specifications must be placed in `spec/<epic-number>-<epic-name>/` folder.

**File Naming Convention**: `<task-number>-<task-name>.md`

**Examples**:
- `spec/000-devops/001-ci-cd-tests.md`
- `spec/000-devops/002-repository-governance.md`
- `spec/000-devops/003-cloudflare-preview-deployments.md`
- `spec/001-ui-components/001-button-component.md`
- `spec/002-testing-infrastructure/001-introduce-modular-api-mocks.md`

### Epic and Story Structure

**Epic**: Large body of work that can be broken down into stories

**Story**: Discrete unit of work that can be completed in 1-3 days

**Format**:
```
spec/
└── <epic-number>-<epic-name>/
    ├── README.md                        # Epic overview
    ├── <story-number>-<story-name>.md   # Story details
    └── ...
```

**Example**:
```
spec/
└── 003-design-system-cleanup/
    ├── README.md                              # Epic overview
    ├── 001-audit-components.md                # Story 001
    ├── 002-refactor-primitives.md             # Story 002
    ├── 003-refactor-data-components.md        # Story 003
    └── 001-audit-report.md                    # Deliverables
```

### Creating Granular, Verifiable Tasks

**Rule**: Break stories into small, verifiable tasks that can be checked off incrementally.

**Good Task Characteristics**:
- ✅ Clear, specific action ("Audit Button.tsx for inline styles")
- ✅ Measurable outcome ("All inline styles documented")
- ✅ Estimated time (15 min, 1 hour, 2 hours)
- ✅ Can be completed independently
- ✅ Easy to verify completion

**Bad Task Characteristics**:
- ❌ Too vague ("Improve Button component")
- ❌ No clear outcome ("Look at styling")
- ❌ No estimate
- ❌ Depends on too many other tasks
- ❌ Difficult to verify

**Example - Good Task Breakdown**:

```markdown
### Task 002-1: Audit Button Component
**Estimate**: 30 minutes

- [ ] Count lines of code (target: < 200)
- [ ] Identify all inline styles (list line numbers)
- [ ] Document constants not extracted (if any)
- [ ] Check test coverage (target: > 80%)
- [ ] Verify Storybook stories coverage
- [ ] List accessibility issues (if any)

**Deliverable**: Audit checklist completed in story document

### Task 002-2: Replace Inline Styles with Tailwind
**Estimate**: 1-2 hours
**Depends on**: Task 002-1

- [ ] Convert `background` style to Tailwind classes
- [ ] Convert `color` style to Tailwind classes
- [ ] Convert `border` style to Tailwind classes
- [ ] Convert `boxShadow` style to Tailwind classes
- [ ] Remove inline `style={{}}` prop
- [ ] Test all variants still render correctly
- [ ] Verify dark mode still works

**Deliverable**: Button.tsx with zero inline styles (except dynamic values)

### Task 002-3: Improve Loading State
**Estimate**: 30 minutes
**Depends on**: Task 002-2

- [ ] Import Spinner component
- [ ] Replace "Loading..." text with <Spinner />
- [ ] Add size prop to match button size
- [ ] Update tests for loading state
- [ ] Update Storybook story for loading state

**Deliverable**: Button shows proper loading indicator
```

### Branch Naming Convention

**Rule**: Branch names must follow the pattern `features/<epic>/<task>-<description>`

**Format**: `features/<epic-number>-<epic-name>/<task-number>-<task-description>`

**Examples**:
- `features/000-devops/001-ci-cd-tests`
- `features/000-devops/002-repository-governance`
- `features/000-devops/003-cloudflare-preview-deployments`
- `features/001-ui-components/001-button-component`
- `features/002-testing-infrastructure/001-introduce-modular-api-mocks`
- `features/003-design-system-cleanup/001-audit-components`

**Alternative branch naming** (for smaller tasks):
- Feature: `feature/component-name` or `feature/feature-description`
- Bug fix: `fix/issue-description`
- Refactor: `refactor/area-being-refactored`
- Chore: `chore/task-description`

### Specification Template

Each specification should include:

1. **Epic and Task Identification**
   - Epic number and name
   - Task number and name
   - Related issues or dependencies

2. **Overview and Objectives**
   - What problem does this solve?
   - What are the goals?
   - What is the expected outcome?

3. **Technical Requirements**
   - Technical constraints
   - Required technologies
   - Performance requirements
   - Accessibility requirements

4. **Implementation Tasks**
   - Step-by-step tasks
   - Acceptance criteria for each task
   - Dependencies

5. **Success Criteria**
   - How do we know it's done?
   - What metrics or tests validate success?

6. **Testing Strategy**
   - Unit tests
   - Integration tests
   - E2E tests
   - Manual testing scenarios

**Example Specification Structure**:

```markdown
# Epic 001 - UI Components / Task 001 - Button Component

## Overview
Create a reusable Button component for the design system with support for multiple intents, variants, sizes, and states.

## Objectives
- Provide a consistent button interface across the application
- Support theming and accessibility requirements
- Ensure full test coverage and Storybook documentation

## Technical Requirements
- TypeScript with full type safety
- Radix UI Primitives for accessibility
- Tailwind CSS for styling
- Support for all theme intents (primary, success, error, warning, info, neutral)
- WCAG 2.1 Level AA compliance

## Implementation Tasks
- [ ] Define ButtonProps interface
- [ ] Implement Button component with variants
- [ ] Add loading state support
- [ ] Create Storybook stories for all variants
- [ ] Write unit tests (Jest/Vitest)
- [ ] Write accessibility tests
- [ ] Document usage with JSDoc

## Success Criteria
- All tests passing (unit, a11y, visual regression)
- Storybook documentation complete
- TypeScript types fully defined
- No ESLint warnings
- Peer review approved

## Testing Strategy
- Unit tests: Test all props, states, and event handlers
- Accessibility tests: Verify ARIA attributes, keyboard navigation, screen reader support
- Visual regression: Storybook snapshots for all variants
- Integration tests: Test in real application context
```

---

## 🔄 Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

**Scopes** (optional but recommended):
- Component name: `button`, `modal`, `table`
- Package: `design-system`, `api-client`, `admin`
- Area: `theme`, `a11y`, `routing`, `state`

**Examples**:
```bash
feat(button): add loading state support
fix(theme): resolve token inheritance issue
test(modal): add accessibility tests
docs(readme): update installation instructions
refactor(table): extract row component to separate file
perf(filters): optimize filter computation with useMemo
ci: add Playwright E2E tests to CI pipeline
```

**Good commit practices**:
- Keep commits atomic (one logical change per commit)
- Write clear, descriptive commit messages
- Reference issue numbers when applicable (`fixes #123`, `relates to #456`)
- Keep the subject line under 72 characters
- Use imperative mood ("add feature" not "added feature")

---

## 📦 Release Process

### Version Management

Follow [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

### Release Steps

1. **Prepare Release**
   ```bash
   # Ensure you're on main branch and up to date
   git checkout main
   git pull origin main
   
   # Create release branch
   git checkout -b release/v1.2.0
   ```

2. **Update Version**
   - Update version in `package.json` files (root and affected packages)
   - Use `pnpm version` for automatic version bumping:
     ```bash
     pnpm version patch  # 0.0.1 -> 0.0.2
     pnpm version minor  # 0.0.1 -> 0.1.0
     pnpm version major  # 0.0.1 -> 1.0.0
     ```

3. **Update CHANGELOG**
   - Update `CHANGELOG.md` with release notes
   - Include all changes since last release
   - Categorize changes: Added, Changed, Deprecated, Removed, Fixed, Security

4. **Create Release PR**
   - Push release branch
   - Create PR from release branch to `main`
   - PR title: `Release v1.2.0`
   - Include changelog in PR description

5. **Review and Merge**
   - Ensure all CI checks pass
   - Get approval from at least one team member
   - Merge to `main` using "Create a merge commit" (not squash)

6. **Tag Release**
   ```bash
   git checkout main
   git pull origin main
   git tag -a v1.2.0 -m "Release version 1.2.0"
   git push origin v1.2.0
   ```

7. **Publish** (if applicable)
   - Automated CI/CD will publish to npm registry
   - Verify publication on npm
   - Create GitHub release from tag

8. **Announce Release**
   - Update team on new release
   - Update documentation if needed
   - Deploy to staging/production environments

### Hotfix Process

For urgent bug fixes in production:

1. Create hotfix branch from latest release tag:
   ```bash
   git checkout -b hotfix/v1.2.1 v1.2.0
   ```

2. Fix the bug and commit changes

3. Update version (patch bump) and CHANGELOG

4. Create PR to `main`

5. After merge, tag and publish hotfix

6. Cherry-pick or merge changes to `develop` if needed

---

## 🚀 Deployment Workflow

### Development Environment

- **Branch**: `main`
- **Trigger**: Push to `main` branch
- **URL**: Auto-generated preview URL (Cloudflare Pages)
- **Purpose**: Testing and QA

### Staging Environment

- **Branch**: `staging` (if applicable)
- **Trigger**: Manual or scheduled
- **URL**: `staging.nevo-admin.example.com`
- **Purpose**: Pre-production testing

### Production Environment

- **Trigger**: Git tag `v*.*.*`
- **URL**: `admin.nevo.example.com`
- **Purpose**: Live production environment

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **pnpm**: v8+
- **Git**: Latest version
- **VS Code**: Latest version (recommended)

### Initial Setup

```bash
# Clone repository
git clone https://github.com/your-org/nevo-ui-v2.git
cd nevo-ui-v2

# Install dependencies
pnpm install

# Verify setup
pnpm run typecheck
pnpm run lint
pnpm run test
```

### Development Commands

```bash
# Start design system Storybook
pnpm --filter @nevo/design-system dev

# Start admin application
pnpm --filter @nevo/ecommerce-admin dev

# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Type checking
pnpm run typecheck

# Linting
pnpm run lint

# Build all packages
pnpm run build

# Run Playwright E2E tests
pnpm --filter @nevo/ecommerce-admin test:e2e

# Run Playwright E2E tests in UI mode
pnpm --filter @nevo/ecommerce-admin test:e2e:ui
```

---

## 📞 Support

### Getting Help

**For questions or issues**:
1. Check existing documentation in `.copilot/` and `docs/`
2. Search GitHub issues and PRs
3. Ask in team chat or Slack for urgent matters
4. Create a new GitHub issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Environment details (OS, Node version, etc.)

### Escalation

**For urgent production issues**:
1. Notify team lead immediately
2. Create hotfix branch
3. Follow hotfix process (see Release Process)
4. Document incident and resolution

---

## 📚 Additional Resources

- [Architecture Overview](./context/architecture.md)
- [Testing Strategy](./context/testing-strategy.md)
- [Accessibility Guidelines](./context/a11y-guidelines.md)
- [Design System API Guidelines](./context/ds-api-guidelines.md)
- [Coding Conventions](./conventions.md)
- [Component Development Checklist](./checklists/component_development.md)
- [PR Review Checklist](./checklists/pr_review.md)

---

**Remember**: Quality over speed. Well-tested, accessible, and maintainable code is always preferred over quick implementations.
