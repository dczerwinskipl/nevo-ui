# Story 002: Reorganize Documentation Structure to Eliminate Duplication

## Summary

**As a** developer using AI assistance  
**I want** a clear, non-duplicated documentation structure  
**So that** I know exactly where to find and update information without confusion

## Context

### Current State (Problems Identified)

After implementing GitHub Copilot workspace prompts, we identified significant documentation duplication and unclear hierarchy:

**Problem 1: Excessive Duplication**
- Design system rules ("use primitives, not raw HTML") duplicated in 5+ files:
  - `.github/copilot-instructions.md` (detailed + examples)
  - `.github/prompts/implement.prompt.md` (detailed + examples)
  - `.github/prompts/spec.prompt.md` (brief mentions)
  - `.github/prompts/review.prompt.md` (brief mentions)
  - `.copilot/recipes/component.md` (detailed + examples)

**Problem 2: Unclear Hierarchy**
- Hard to determine which file is the "source of truth"
- `.github/copilot-instructions.md` contains both overview AND detailed examples
- `.github/prompts/implement.prompt.md` contains both workflow AND coding standards
- `.copilot/recipes/component.md` also contains same information

**Problem 3: Maintenance Burden**
- When rules change, must update 5+ files
- Risk of inconsistencies between files
- New developers confused about which file to read/update

**Problem 4: Mixed Responsibilities**
- Prompt files (.prompt.md) contain both workflow orchestration AND detailed technical rules
- Should only contain workflow, not duplicate technical details

### Desired State

**Clear hierarchy with Single Source of Truth principle:**

```
.github/copilot-instructions.md
├─ Role: Quick overview (~100 lines)
├─ Content: Tech stack, key principles, links to .copilot/
└─ Details: NONE - everything defers to .copilot/

.github/prompts/*.prompt.md
├─ Role: Workflow orchestration (WHAT to do, in what order)
├─ Content: Process steps, which files to read, output format
└─ Details: ZERO code examples or duplicated rules

.copilot/conventions.md
├─ Role: SINGLE SOURCE OF TRUTH for all coding standards
├─ Content: TypeScript, naming, patterns, design system rules
└─ Details: Complete with examples

.copilot/recipes/component.md
├─ Role: SINGLE SOURCE OF TRUTH for component creation
├─ Content: Complete step-by-step guide with templates
└─ Details: All examples, patterns, checklists
```

## Requirements

### 1. Simplify `.github/copilot-instructions.md`

- [ ] Reduce to ~100 lines maximum
- [ ] Keep only: tech stack overview, monorepo structure, critical rules list
- [ ] Remove all code examples
- [ ] Remove all detailed explanations
- [ ] Add clear references to `.copilot/` files for all details
- [ ] Maintain section: "Detailed Documentation" with links

### 2. Refactor Prompt Files to Remove Duplication

**For `.github/prompts/spec.prompt.md`:**
- [ ] Remove all detailed coding standard examples
- [ ] Remove duplicate accessibility requirements
- [ ] Keep only: workflow steps, which files to read, output format
- [ ] Add clear references to `.copilot/conventions.md` for standards

**For `.github/prompts/tasks.prompt.md`:**
- [ ] Remove duplicate Definition of Done criteria
- [ ] Keep only: workflow steps, task breakdown principles
- [ ] Reference `.copilot/checklists/definition_of_done.md` for criteria

**For `.github/prompts/implement.prompt.md`:**
- [ ] Remove all code example templates (component, test, story)
- [ ] Remove duplicate TypeScript/accessibility rules
- [ ] Keep only: implementation workflow, which files to read
- [ ] Reference `.copilot/recipes/component.md` for all templates
- [ ] Reference `.copilot/conventions.md` for all coding standards

**For `.github/prompts/review.prompt.md`:**
- [ ] Remove duplicate checklist items
- [ ] Keep only: review workflow, which files to read
- [ ] Reference `.copilot/checklists/pr_review.md` for complete checklist

### 3. Consolidate Standards in `.copilot/conventions.md`

- [ ] Add any missing coding standards from prompt files
- [ ] Ensure design system rules are comprehensive
- [ ] Ensure TypeScript rules are complete with examples
- [ ] Ensure accessibility rules reference `.copilot/context/a11y-guidelines.md`
- [ ] Keep all code examples here (not in prompt files)

### 4. Ensure `.copilot/recipes/component.md` is Complete

- [ ] Verify all component templates are present
- [ ] Verify all test templates are present  
- [ ] Verify all story templates are present
- [ ] Ensure no information from `implement.prompt.md` is lost
- [ ] Keep this as the definitive guide for component creation

### 5. Update Cross-References

- [ ] Update `.github/prompts/README.md` to explain new structure
- [ ] Update `.copilot/instructions.md` if needed
- [ ] Ensure all files correctly reference the new hierarchy
- [ ] Remove any broken or outdated references

## Acceptance Criteria

### Verifiability Checks

- [ ] `grep -r "design system primitives" .github/ .copilot/` shows max 1 detailed explanation per concept
- [ ] `.github/copilot-instructions.md` is ≤ 150 lines (verified by `wc -l`)
- [ ] Each `.github/prompts/*.prompt.md` contains ZERO code example blocks (verified by grep for triple backticks)
- [ ] All coding standards exist in `.copilot/conventions.md` (manual review)
- [ ] All component templates exist in `.copilot/recipes/component.md` (manual review)
- [ ] No information loss: all rules from prompt files are preserved in `.copilot/` (manual verification)

### Functional Criteria

**Documentation Organization:**
- [ ] Each concept has exactly ONE source of truth
- [ ] All other files reference that source, never duplicate
- [ ] Clear distinction between "what to do" (prompts) and "how to do it" (recipes/conventions)

**File Responsibilities:**
- [ ] `.github/copilot-instructions.md` = Quick overview + navigation
- [ ] `.github/prompts/*.prompt.md` = Workflow orchestration only
- [ ] `.copilot/conventions.md` = All coding standards
- [ ] `.copilot/recipes/*.md` = All detailed guides with examples

**Maintainability:**
- [ ] When a coding rule changes, only 1 file needs update
- [ ] When a template changes, only 1 file needs update
- [ ] Clear for new developers where to find/update information

## Technical Design

### Files to Modify

**Simplification (remove details, keep references):**
1. `.github/copilot-instructions.md` - Reduce from ~200 to ~100 lines
2. `.github/prompts/spec.prompt.md` - Remove examples, keep workflow
3. `.github/prompts/tasks.prompt.md` - Remove duplicate DoD
4. `.github/prompts/implement.prompt.md` - Remove all templates/examples
5. `.github/prompts/review.prompt.md` - Remove duplicate checklist items

**Consolidation (ensure completeness):**
6. `.copilot/conventions.md` - Add any missing standards from prompts
7. `.copilot/recipes/component.md` - Verify completeness (already good)

**Documentation:**
8. `.github/prompts/README.md` - Update to explain new structure
9. `.copilot/instructions.md` - Verify references are accurate

### Implementation Approach

**Phase 1: Analysis (prevent information loss)**
- Extract all unique information from `.github/prompts/*.prompt.md`
- Verify it exists in `.copilot/` files
- Document any gaps

**Phase 2: Consolidation**
- Add missing information to `.copilot/conventions.md`
- Ensure `.copilot/recipes/component.md` has all templates

**Phase 3: Simplification**
- Reduce `.github/copilot-instructions.md` to overview
- Remove duplicates from prompt files
- Replace with clear references

**Phase 4: Verification**
- Check no information was lost
- Verify all references are correct
- Test that prompt files still provide clear workflow guidance

### Key Principle: Reference, Don't Duplicate

**Before (BAD):**
```markdown
# implement.prompt.md

## TypeScript Requirements:
- Strict mode enabled
- No `any` types
- Proper interfaces

## Example Component:
```typescript
export interface ButtonProps {
  intent?: ComponentIntent;
}
```

**After (GOOD):**
```markdown
# implement.prompt.md

## Your Process

1. **Read coding standards**: `.copilot/conventions.md`
   - Contains ALL TypeScript requirements
   - Contains ALL naming conventions
   
2. **Read component guide**: `.copilot/recipes/component.md`
   - Contains ALL component templates
   - Contains ALL implementation patterns

3. **Implement following those standards**
```

## Testing Strategy

### Manual Verification

**Before refactoring:**
1. Create inventory of all unique information in `.github/prompts/`
2. Verify each item exists in `.copilot/`
3. Document any gaps to be filled

**After refactoring:**
1. Search for duplicated code examples across files
2. Verify `.github/copilot-instructions.md` line count ≤ 150
3. Verify prompt files contain zero code blocks
4. Manual review: can developer find all needed info in `.copilot/`?

### Automated Checks

```bash
# Verify line count
wc -l .github/copilot-instructions.md
# Expected: ≤ 150 lines

# Count code blocks in prompt files
grep -c '```' .github/prompts/*.prompt.md
# Expected: Only in "Output Format" sections, NOT in "Rules" sections

# Find duplicated design system mentions
grep -r "design system primitives" .github/ .copilot/ | wc -l
# Expected: Significant reduction from current count
```

## Definition of Done

- [ ] All requirements completed
- [ ] All acceptance criteria verified
- [ ] No information lost from original files
- [ ] `.github/copilot-instructions.md` ≤ 150 lines
- [ ] Prompt files contain only workflow, no code examples
- [ ] `.copilot/conventions.md` is complete source of truth
- [ ] `.copilot/recipes/component.md` contains all templates
- [ ] All cross-references are correct and working
- [ ] Documentation updated (`.github/prompts/README.md`)
- [ ] Manual review confirms improved clarity
- [ ] Git commit follows conventional commits format

## Dependencies

- Depends on: Story 001 (GitHub Copilot workspace prompts integration)
- Blocks: None
- External: None

## Estimated Effort

- **Size**: Medium (M)
- **Complexity**: Medium
- **Time**: 2-3 hours
  - Analysis: 0.5h
  - Consolidation: 0.5h
  - Simplification: 1h
  - Verification: 0.5-1h

## Notes

**Why this matters:**
- Reduces maintenance burden (update 1 file vs. 5 files)
- Improves developer experience (clear where to find info)
- Prevents inconsistencies between files
- Makes AI assistance more reliable (clear source of truth)

**Migration strategy:**
- This is a documentation-only change
- No code changes required
- No risk to existing functionality
- Can be done incrementally if needed

**Success metrics:**
- Time to find information decreases
- Fewer questions about "which file to update"
- AI provides more consistent responses (uses single source)
