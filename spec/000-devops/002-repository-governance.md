# 002 - Repository Governance and Branch Protection

## Epic: 000-devops

## Story: 002-repository-governance

### Overview

This specification defines repository governance policies including branch protection rules, code ownership, and pull request validation to ensure code quality and proper workflow enforcement.

### Objectives

- Implement proper repository permissions and branch protection
- Set up code ownership for mandatory reviews
- Create branch naming validation and pull request direction policies
- Ensure secure and controlled development workflow

### Requirements

#### 1. Code Ownership Configuration

- **File**: `.github/CODEOWNERS`
- **Purpose**: Define mandatory reviewers for different parts of the codebase
- **Requirements**:
  - Design system components require review from design system maintainers
  - CI/CD workflows require review from DevOps team
  - Documentation requires review from technical writers or maintainers
  - Root configuration files require review from lead developers

#### 2. Branch Protection Rules (via GitHub Settings)

- **Target Branch**: `main`
- **Protection Rules**:
  - Require pull request reviews before merging
  - Require status checks to pass before merging
  - Require branches to be up to date before merging
  - Restrict pushes that create merge commits
  - Require signed commits (optional but recommended)
  - Include administrators in restrictions

#### 3. Branch Policy Validation Workflow

- **File**: `.github/workflows/branch-policy.yml`
- **Purpose**: Validate branch naming conventions and pull request directions
- **Requirements**:
  - Validate branch names follow convention: `main`, `features/*`, `bugfix/*`
  - Validate pull request directions:
    - `features/*` → `main` ✅
    - `bugfix/*` → `main` ✅
    - All other directions ❌
  - Use English language for all messages
  - Fail the check if policies are violated

#### 4. Enhanced CI/CD Integration

- **File**: `.github/workflows/ci.yml` (existing)
- **Enhancements**:
  - Add dependency on branch policy validation
  - Make CI/CD pipeline required for pull request merging
  - Ensure all quality gates are enforced before merge
  - Update triggers to include branch policy validation
  - Add security scanning (future consideration)

#### 5. Branch Creation Restrictions (GitHub UI Configuration)

- **Purpose**: Prevent creation of branches that don't follow naming patterns
- **Implementation**: GitHub Branch Protection Rules and Repository Settings
- **Restriction Methods**:
  - **Option 1 (Recommended)**: Repository Settings → Branches → Branch name patterns
    - Add patterns: `main`, `features/*`, `bugfix/*`, `hotfix/*`, `release/*`
    - Enable "Restrict pushes that create new branches"
  - **Option 2**: GitHub Enterprise Server Hooks (more aggressive)
    - Pre-receive hooks to validate branch names
    - Reject branch creation if pattern doesn't match
  - **Option 3**: GitHub Apps/Actions (current approach)
    - Use workflows to validate and alert on invalid branch names
    - Automatically delete branches that don't match patterns (optional)

### Implementation Tasks

#### Task 1: Create CODEOWNERS File

```
# Global owner for entire repository
* @dczerwinskipl

# Specific ownership patterns (all require dczerwinskipl approval)
/packages/ @dczerwinskipl
/apps/ @dczerwinskipl
/.github/ @dczerwinskipl
/spec/ @dczerwinskipl
/docs/ @dczerwinskipl
*.md @dczerwinskipl
/package.json @dczerwinskipl
/pnpm-workspace.yaml @dczerwinskipl
/turbo.json @dczerwinskipl
/tsconfig.json @dczerwinskipl
```

#### Task 2: Create Branch Policy Workflow

Create `.github/workflows/branch-policy.yml` with:

- Branch naming validation for pushes
- Pull request direction validation
- English error messages
- Support for `main`, `features/*`, `bugfix/*` only

#### Task 3: Update CI/CD Pipeline

- Add branch policy as a required check for all pull requests
- Ensure proper dependency chain: branch-policy → ci-pipeline → merge
- Update status reporting for branch protection requirements
- Make CI/CD pipeline mandatory for pull request approval

#### Task 4: Configure Branch Creation Restrictions

**Recommended Approach - GitHub Repository Settings:**

1. Navigate to Settings → Branches in GitHub UI
2. Add Branch protection rule for `main`:
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Require pull request reviews before merging
   - Include administrators
3. Add Branch name patterns (if available in your GitHub plan):
   - Pattern: `main`
   - Pattern: `features/*`
   - Pattern: `bugfix/*`
   - Pattern: `hotfix/*` (future)
   - Pattern: `release/*` (future)
4. Enable "Restrict pushes that create new branches" if available

**Alternative Approach - Workflow-based:**

- Create workflow that validates branch names on creation
- Send notifications for invalid branch names
- Optionally auto-delete branches that don't match patterns

### Branch Naming Convention

```
main                     # Main branch
features/<epic>/<story>  # Feature branches
bugfix/<description>     # Bug fix branches

# Future patterns:
hotfix/<description>     # Hotfix branches
release/<version>        # Release branches
```

### Pull Request Direction Policy

```
✅ Currently Allowed:
features/* → main
bugfix/* → main

❌ Not allowed:
main → features/*
features/* → features/*
Any other combinations

🔮 Future Allowed:
hotfix/* → main
hotfix/* → release/*
release/* → main
```

### Success Criteria

1. CODEOWNERS file is created with dczerwinskipl as sole owner
2. Branch policy workflow validates naming and PR directions
3. All validation messages are in English
4. CI/CD pipeline is required for all pull requests to main
5. Repository is protected against unauthorized changes
6. Pull requests require proper reviews before merge
7. Branch creation restrictions are configured (GitHub UI settings)
8. Invalid branch names are prevented or flagged

### GitHub Repository Configuration Guide

#### Branch Protection Rules (Settings → Branches)

1. **Add rule for `main` branch:**
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 minimum)
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - Add: `CI Success` (from ci.yml)
     - Add: `Branch Policy` (from branch-policy.yml)
   - ✅ Require branches to be up to date before merging
   - ✅ Require signed commits (recommended)
   - ✅ Include administrators
   - ✅ Restrict pushes that create merge commits

2. **Branch name patterns (if GitHub plan supports):**
   - Create allowlist patterns: `main`, `features/*`, `bugfix/*`
   - Enable "Restrict creation of branches that don't match patterns"

#### Repository Settings

- **General → Features:**
  - ✅ Restrict repository creation
  - ✅ Restrict forking if private repo
- **General → Pull Requests:**
  - ✅ Allow merge commits (optional)
  - ✅ Allow squash merging
  - ✅ Allow rebase merging
  - ✅ Automatically delete head branches

### Testing Strategy

1. **Branch naming validation:**
   - Test valid names: `main`, `features/000-devops/test`, `bugfix/fix-issue`
   - Test invalid names: `develop`, `feature-branch`, `fix/something`
2. **Pull request direction validation:**
   - Test allowed: `features/test → main`, `bugfix/test → main`
   - Test disallowed: `main → features/test`, `features/a → features/b`
3. **CODEOWNERS enforcement:**
   - Verify dczerwinskipl approval required for all changes
   - Test with pull requests from different contributors
4. **CI/CD pipeline integration:**
   - Ensure branch policy runs before CI/CD
   - Verify CI/CD failures block pull request merging
   - Test with various file changes (packages, workflows, docs)
5. **Branch creation restrictions:**
   - Attempt to create branches with invalid names
   - Verify restrictions work via GitHub UI and git commands

### Security Considerations

- Branch protection prevents force pushes to main
- Code ownership ensures proper review coverage
- Branch policies prevent unauthorized workflow changes
- All changes must go through pull request process

### Future Enhancements

- Security scanning integration
- Automated dependency updates
- Advanced branch protection rules
- Integration with external review tools
