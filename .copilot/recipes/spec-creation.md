# Creating Granular, Verifiable Specs and Stories

## Overview

This guide defines the standard for creating specifications in the `spec/` folder that are granular, verifiable, and actionable.

## Folder Structure

```
spec/
  XXX-epic-name/          # Epic folder with sequential number
    README.md             # Epic overview and acceptance criteria
    001-story-name.md     # Individual story/task
    002-story-name.md
    XXX-audit-report.md   # Optional: detailed audit findings
```

## Epic Structure (README.md)

### Required Sections

1. **Epic Title & Summary**
   - Clear, concise title describing the epic
   - 2-3 sentence summary of the epic's purpose

2. **Business Context**
   - Why is this work important?
   - What problem does it solve?
   - Who benefits from this change?

3. **Scope**
   - What is included in this epic
   - What is explicitly excluded
   - Dependencies on other work

4. **Stories Breakdown**
   - List of all stories in the epic
   - Each story should be independently deliverable
   - Stories should be ordered by dependency/priority

5. **Acceptance Criteria (Epic-Level)**
   - High-level criteria that define epic completion
   - Must be measurable and testable
   - Should cover all stories

6. **Success Metrics**
   - How will we measure success?
   - What are the key performance indicators?

7. **Timeline & Dependencies**
   - Estimated timeline for epic completion
   - Dependencies on other epics/work

## Story Structure (001-story-name.md)

### Required Sections

1. **Story Title & Summary**
   - Clear, actionable title
   - User story format: "As a [role], I want [feature] so that [benefit]"
   - Or task format: "Refactor [component] to [improvement]"

2. **Context**
   - Background information
   - Current state vs. desired state
   - Link to relevant epic/parent work

3. **Detailed Requirements**
   - Specific, actionable requirements
   - Each requirement should be independently testable
   - Use numbered lists for clarity

4. **Acceptance Criteria**
   - MUST be verifiable (pass/fail)
   - Use "Given/When/Then" format when applicable
   - Include both functional and non-functional criteria
   - Each criterion should be independently testable

5. **Technical Approach** (optional but recommended)
   - High-level technical design
   - Files to be changed
   - Key implementation details
   - Risk areas and mitigation strategies

6. **Testing Strategy**
   - Unit tests to add/update
   - Integration tests needed
   - Manual testing steps
   - Edge cases to cover

7. **Definition of Done**
   - Code complete and reviewed
   - Tests passing (with coverage requirements)
   - Documentation updated
   - No new linting/type errors
   - Storybook stories updated (if applicable)

8. **Dependencies**
   - Other stories that must be completed first
   - External dependencies

9. **Estimated Effort**
   - T-shirt size (S/M/L) or hours
   - Complexity rating (Low/Medium/High)

## Granularity Guidelines

### Story Size

- A story should be completable in 1-4 hours
- If larger, break it down into multiple stories
- Each story should deliver demonstrable value

### Task Breakdown

Within a story, break complex work into granular tasks:

- Each task should be 15-30 minutes of work
- Use checkboxes for tasks: `- [ ] Task description`
- Tasks should be sequential and logical

### Audit Reports

For cleanup/refactoring epics, create detailed audit reports:

- Document current state with code examples
- Identify specific issues with line numbers
- Categorize issues by type (inline styles, missing tests, etc.)
- Quantify the scope (X files affected, Y instances found)

## Verifiable Acceptance Criteria

### Good Examples

✅ **Verifiable:**

- "All inline styles removed from Button.tsx (verified by grep search for `style={{`)"
- "Test coverage for Input component is ≥80% (verified by jest --coverage)"
- "Button.stories.tsx uses only design system primitives (verified by code review)"
- "No TypeScript errors in changed files (verified by tsc --noEmit)"

### Bad Examples

❌ **Not Verifiable:**

- "Code looks clean" (subjective)
- "Component is better" (unmeasurable)
- "Performance is improved" (no specific metric)
- "Tests are good enough" (no threshold)

### Verification Methods

Each acceptance criterion should specify HOW to verify:

- Automated tests (unit, integration, e2e)
- Static analysis (linting, type checking, coverage)
- Code search (grep for specific patterns)
- Manual verification (specific steps listed)
- Tool output (specific command and expected result)

## Branch Naming

Follow the branch naming convention from `.copilot/workflow.md`:

```
<type>/<epic-number>-<story-number>-<brief-description>

Examples:
- refactor/003-001-audit-button-component
- fix/003-002-remove-inline-styles-button
- feat/003-003-extract-button-hooks
```

## Story Workflow

1. **Create Spec**
   - Write detailed story spec before starting work
   - Get feedback on approach if needed
   - Ensure acceptance criteria are verifiable

2. **Create Branch**
   - Follow branch naming convention
   - Branch from main (or epic branch if applicable)

3. **Implement**
   - Follow acceptance criteria exactly
   - Complete all tasks
   - Verify each criterion as you go

4. **Verify**
   - Run all verification steps listed
   - Check off each acceptance criterion
   - Document any deviations

5. **Submit PR**
   - Reference story in PR description
   - List completed acceptance criteria
   - Note any testing performed

6. **Update Spec**
   - Mark story as complete
   - Document any learnings or deviations
   - Update epic progress

## Templates

### Epic Template

```markdown
# Epic: [Epic Name]

## Summary

[2-3 sentence summary]

## Business Context

[Why this matters]

## Scope

**Included:**

- Item 1
- Item 2

**Excluded:**

- Item 1
- Item 2

## Stories

1. [001-story-name](./001-story-name.md) - [Brief description]
2. [002-story-name](./002-story-name.md) - [Brief description]

## Epic Acceptance Criteria

- [ ] Criterion 1 (verification method)
- [ ] Criterion 2 (verification method)

## Success Metrics

- Metric 1: [Target value]
- Metric 2: [Target value]

## Dependencies

- Dependency 1
- Dependency 2

## Timeline

- Estimated Duration: [X weeks]
- Target Completion: [Date or milestone]
```

### Story Template

```markdown
# Story: [Story Name]

## Summary

As a [role], I want [feature] so that [benefit].

## Context

[Background and current state]

## Requirements

1. Requirement 1
2. Requirement 2
3. Requirement 3

## Acceptance Criteria

- [ ] AC1: [Specific criterion] (Verification: [method])
- [ ] AC2: [Specific criterion] (Verification: [method])
- [ ] AC3: [Specific criterion] (Verification: [method])

## Technical Approach

**Files to Change:**

- `path/to/file1.tsx` - [What changes]
- `path/to/file2.tsx` - [What changes]

**Implementation Steps:**

1. Step 1
2. Step 2
3. Step 3

## Testing Strategy

**Unit Tests:**

- [ ] Test case 1
- [ ] Test case 2

**Manual Testing:**

1. Step 1
2. Step 2

## Definition of Done

- [ ] Code complete and reviewed
- [ ] Unit tests passing with ≥80% coverage
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Storybook stories updated
- [ ] Documentation updated

## Dependencies

- Story XXX must be completed first

## Effort Estimate

- Size: [S/M/L]
- Complexity: [Low/Medium/High]
- Estimated Hours: [X]
```

## Best Practices

### Do's

✅ Write specs before coding
✅ Make acceptance criteria measurable
✅ Break large stories into smaller ones
✅ Include verification methods
✅ Update specs as work progresses
✅ Document learnings and deviations
✅ Reference related issues/PRs
✅ Keep stories independent when possible

### Don'ts

❌ Start coding without a spec
❌ Use vague acceptance criteria
❌ Create stories that take >1 day
❌ Skip verification steps
❌ Leave specs outdated
❌ Make stories dependent on many others
❌ Forget to update epic progress

## Review Checklist

Before finalizing a spec, verify:

- [ ] Title is clear and actionable
- [ ] Summary provides sufficient context
- [ ] All acceptance criteria are verifiable
- [ ] Verification methods are specified
- [ ] Story is appropriately sized (1-4 hours)
- [ ] Dependencies are clearly stated
- [ ] Testing strategy is comprehensive
- [ ] Definition of done is complete
- [ ] Follows templates and conventions

## Examples

See existing examples in the `spec/` folder:

- `spec/002-testing-infrastructure/` - Testing infrastructure epic
- `spec/003-design-system-cleanup/` - Design system cleanup epic
