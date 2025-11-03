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
  - Ensure all quality gates are enforced before merge
  - Add security scanning (future consideration)

### Implementation Tasks

#### Task 1: Create CODEOWNERS File
```
# Global owners for repository
* @dczerwinskipl

# Design system components
/packages/design-system/ @dczerwinskipl @design-system-team

# CI/CD workflows and configuration
/.github/ @dczerwinskipl @devops-team
/turbo.json @dczerwinskipl @devops-team
/pnpm-workspace.yaml @dczerwinskipl @devops-team

# Documentation
/docs/ @dczerwinskipl @tech-writers
*.md @dczerwinskipl @tech-writers

# Root configuration
/package.json @dczerwinskipl
/tsconfig.json @dczerwinskipl
```

#### Task 2: Create Branch Policy Workflow
Create `.github/workflows/branch-policy.yml` with:
- Branch naming validation for pushes
- Pull request direction validation
- English error messages
- Support for `main`, `features/*`, `bugfix/*` only

#### Task 3: Update CI/CD Pipeline
- Add branch policy as a required check
- Ensure proper dependency chain
- Update status reporting

### Branch Naming Convention
```
main                     # Main branch
features/<epic>/<story>  # Feature branches
bugfix/<description>     # Bug fix branches
```

### Pull Request Direction Policy
```
✅ Allowed:
features/* → main
bugfix/* → main

❌ Not allowed:
main → features/*
features/* → features/*
Any other combinations
```

### Success Criteria
1. CODEOWNERS file is created and properly configured
2. Branch policy workflow validates naming and PR directions
3. All validation messages are in English
4. CI/CD pipeline includes branch policy validation
5. Repository is protected against unauthorized changes
6. Pull requests require proper reviews before merge

### Testing Strategy
1. Test branch naming validation with valid/invalid names
2. Test pull request direction validation with allowed/disallowed combinations
3. Verify CODEOWNERS enforcement on pull requests
4. Ensure CI/CD pipeline fails on policy violations

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