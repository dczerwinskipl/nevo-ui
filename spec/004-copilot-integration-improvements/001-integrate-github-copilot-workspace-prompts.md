# Story 001: Integrate GitHub Copilot Workspace Prompts

## Summary

**As a** developer  
**I want to** integrate GitHub Copilot's native workspace prompt files mechanism  
**So that** AI assistants automatically use project context without manual prompt copying

## Context

### Current State (Problems Identified)

**Problem 1: Existing .copilot Folder Structure**

- Project already has `.copilot/` folder with comprehensive documentation
- Contains instructions, conventions, architecture, recipes, checklists
- Currently requires manual reference by developers/AI
- No native integration with GitHub Copilot's prompt system

**Problem 2: Manual Prompt Management**

- Developers must manually attach context or reference files
- AI assistants don't automatically load project standards
- Inconsistent context across different AI sessions
- No streamlined workflow for spec creation → planning → implementation

**Problem 3: Multi-Model Workflow Requirements**

- Need different models for different tasks:
  - **Analysis** (spec creation) → Claude Sonnet or GPT-4 for deep reasoning
  - **Planning** (task breakdown) → GPT-4 for structured planning
  - **Implementation** (coding) → Codex/GPT-4 for code generation
- Currently no mechanism to route tasks to appropriate models

### Desired State

- GitHub Copilot automatically loads project context from workspace
- Structured prompt files for common workflows (spec, tasks, implementation)
- Custom agents for different development phases
- Project assumptions and guidelines always available to AI
- Zero manual prompt copying or file attachment

## Requirements

### 1. GitHub Copilot Custom Instructions (Base Context)

**Goal**: Provide persistent project context to all Copilot sessions

- [ ] Create `.github/copilot-instructions.md` file
- [ ] Include core project assumptions:
  - Technology stack (React, TypeScript, Tailwind, Vite, pnpm)
  - Architecture approach (monorepo, design system, feature modules)
  - Code style preferences (English only, TypeScript strict mode)
  - Testing requirements (Vitest, Playwright, Storybook)
- [ ] Reference existing `.copilot/` documentation structure
- [ ] Keep concise - this loads automatically for all Copilot interactions
- [ ] Link to detailed docs in `.copilot/` for deeper context

**Content Guidelines**:

- Maximum 500-800 words (Copilot has token limits for instructions)
- Focus on "always true" project facts
- Avoid task-specific instructions (those go in prompt files)

### 2. Workspace Prompt Files

**Goal**: Create reusable prompt templates for common development tasks

- [ ] Create `.github/prompts/` directory
- [ ] Enable `chat.promptFiles` in VS Code settings (document in README)
- [ ] Create prompt files for core workflows:

#### 2.1 Spec Creation Prompt (`spec.prompt.md`)

- [ ] Create file: `.github/prompts/spec.prompt.md`
- [ ] Define agent: `architect` (for deep analysis)
- [ ] Define model preference: Claude Sonnet or GPT-4
- [ ] Instruction template:
  - Read feature description from user
  - Analyze existing code/architecture
  - Reference `.copilot/recipes/spec-creation.md`
  - Follow spec template structure
  - Generate spec in `spec/XXX-epic-name/YYY-story-name.md` format
  - Ask clarifying questions before finalizing
- [ ] Include argument hint: "Feature description or issue link"

#### 2.2 Task Planning Prompt (`tasks.prompt.md`)

- [ ] Create file: `.github/prompts/tasks.prompt.md`
- [ ] Define agent: `planner` (for structured decomposition)
- [ ] Define model preference: GPT-4
- [ ] Instruction template:
  - Read spec file (from spec/ folder)
  - Break down into atomic, verifiable tasks
  - Reference `.copilot/checklists/definition_of_done.md`
  - Create checklist format
  - Estimate complexity/effort
  - Identify dependencies between tasks
- [ ] Include argument hint: "Spec file path"

#### 2.3 Implementation Prompt (`implement.prompt.md`)

- [ ] Create file: `.github/prompts/implement.prompt.md`
- [ ] Define agent: `coder` (for code generation)
- [ ] Define model preference: GPT-4 or Codex
- [ ] Instruction template:
  - Read spec and task list
  - Follow `.copilot/conventions.md` strictly
  - Use design system primitives only
  - Reference `.copilot/recipes/component.md` if creating components
  - Reference `.copilot/recipes/testing.md` for tests
  - Verify against `.copilot/checklists/component_development.md`
  - Include tests with implementation
- [ ] Include argument hint: "Spec file path or task description"

#### 2.4 Code Review Prompt (`review.prompt.md`)

- [ ] Create file: `.github/prompts/review.prompt.md`
- [ ] Define agent: `reviewer` (for quality assurance)
- [ ] Instruction template:
  - Analyze changed files
  - Check against `.copilot/checklists/pr_review.md`
  - Verify conventions from `.copilot/conventions.md`
  - Check accessibility compliance
  - Review test coverage
  - Suggest improvements
- [ ] Include argument hint: "PR number or file paths"

### 3. Custom Agents

**Goal**: Define specialized AI personas for different development phases

- [ ] Create `.github/agents/` directory
- [ ] Create agent definitions:

#### 3.1 Architect Agent (`architect.agent.md`)

- [ ] Create file: `.github/agents/architect.agent.md`
- [ ] Define role: Solution architect for deep analysis and spec creation
- [ ] Set model: Claude Sonnet 4 or GPT-4
- [ ] Enable tools:
  - `githubRepo` - for searching codebase
  - `search/codebase` - for finding patterns
- [ ] Define priorities:
  - Understand existing architecture from `.copilot/context/architecture.md`
  - Analyze domain context from `.copilot/glossary.md`
  - Propose minimal, pattern-consistent changes
  - Identify architectural decisions and consequences

#### 3.2 Planner Agent (`planner.agent.md`)

- [ ] Create file: `.github/agents/planner.agent.md`
- [ ] Define role: Task breakdown and planning specialist
- [ ] Set model: GPT-4
- [ ] Enable tools:
  - `search/codebase` - for understanding scope
- [ ] Define priorities:
  - Break work into small, verifiable chunks
  - Identify dependencies
  - Estimate complexity
  - Create actionable checklists

#### 3.3 Coder Agent (`coder.agent.md`)

- [ ] Create file: `.github/agents/coder.agent.md`
- [ ] Define role: Code generation and implementation
- [ ] Set model: GPT-4 or Codex
- [ ] Enable tools:
  - `edit` - for file modifications
  - `create` - for new files
  - `search/codebase` - for finding examples
- [ ] Define priorities:
  - Follow `.copilot/conventions.md` strictly
  - Use design system primitives
  - Generate complete implementations with tests
  - Never use raw HTML, always design system components

#### 3.4 Reviewer Agent (`reviewer.agent.md`)

- [ ] Create file: `.github/agents/reviewer.agent.md`
- [ ] Define role: Code quality and standards verification
- [ ] Set model: GPT-4
- [ ] Enable tools:
  - `search/codebase` - for finding anti-patterns
  - `githubRepo` - for PR analysis
- [ ] Define priorities:
  - Verify against all checklists
  - Check accessibility compliance
  - Review test coverage
  - Validate conventions

### 4. Project Assumptions Documentation

**Goal**: Centralize project-wide assumptions readable by all agents

- [ ] Enhance `.github/copilot-instructions.md` with:
  - **Technology Stack**: React 18, TypeScript 5, Vite, pnpm, Tailwind CSS
  - **Architecture**: Turborepo monorepo, design-system-first approach
  - **Package Structure**: apps/admin, packages/design-system, packages/api-client, packages/api-mocks
  - **Code Standards**: English only, strict TypeScript, ESLint/Prettier
  - **Design System Rules**:
    - Never use raw HTML (div, button, span)
    - Always use primitives (Card, Button, Typography)
    - Use theme tokens, never hardcoded colors
  - **Testing Requirements**: Vitest for unit, Playwright for E2E, Storybook for visual
  - **Accessibility**: WCAG 2.1 AA compliance mandatory
- [ ] Keep synchronized with `.copilot/` folder (single source of truth)
- [ ] Document which context is for which agent:
  - **Architect & Coder**: Architecture, technology stack, design patterns
  - **Architect only**: Deep domain knowledge, DDD concepts
  - **Coder only**: Style guide, naming conventions, file structure
  - **Planner**: Definition of Done, task breakdown patterns
  - **All**: English-only requirement, Git conventions

### 5. VS Code Configuration

**Goal**: Enable prompt files and recommend settings

- [ ] Document required VS Code settings in project README
- [ ] Create `.vscode/settings.json` (if not exists) with:
  ```json
  {
    "chat.promptFiles": true,
    "chat.promptFilesRecommendations": true
  }
  ```
- [ ] Add to `.vscode/extensions.json` recommended extension:
  ```json
  {
    "recommendations": ["GitHub.copilot", "GitHub.copilot-chat"]
  }
  ```

### 6. Documentation and Onboarding

**Goal**: Help developers (especially new joiners) adopt the AI-assisted workflow

- [ ] Create `.github/prompts/README.md` explaining:
  - What are prompt files and how they work
  - How to use them (e.g., `/spec Feature description`)
  - Available prompts and when to use each one
  - How custom agents enhance the workflow
  - Quick start examples
- [ ] Update main project README.md with comprehensive AI workflow section:
  - **"AI-Assisted Development Workflow"** section prominently placed
  - **Prerequisites**:
    - VS Code version requirements
    - GitHub Copilot extension installation
    - GitHub Copilot Chat extension installation
  - **Initial Setup** (one-time configuration):
    - How to enable prompt files in VS Code settings
    - How to verify Copilot is connected
    - How to test prompt files are working
  - **Complete Workflow Walkthrough** with real examples:
    - Creating specs with `/spec` command
    - Breaking down into tasks with `/tasks`
    - Implementing features with `/implement`
    - Reviewing code with `/review`
  - **Quick Reference Table**:
    - All available prompts with descriptions
    - When to use each prompt
    - Example invocations
  - **Link to detailed documentation** in `.copilot/` folder
  - **Troubleshooting Section**:
    - Common issues and solutions
    - How to verify setup
    - Where to get help
  - **Best Practices** for working with AI assistants:
    - How to write effective prompts
    - How to verify AI-generated code
    - When to use which agent
- [ ] Create workflow diagram showing:
  - Analysis phase → `/spec` → generates specification
  - Planning phase → `/tasks` → breaks down into tasks
  - Implementation phase → `/implement` → generates code
  - Review phase → `/review` → validates quality
- [ ] Add "New Joiner Onboarding Checklist" section to main README:
  - [ ] Install required VS Code extensions
  - [ ] Configure prompt files in settings
  - [ ] Test `/spec` prompt with sample request
  - [ ] Read `.copilot/` documentation overview
  - [ ] Review project conventions and standards
  - [ ] Complete first task using AI workflow

## Technical Design

### File Structure After Implementation

```
.github/
  copilot-instructions.md         # Base context for all Copilot sessions
  prompts/
    README.md                      # How to use prompt files
    spec.prompt.md                 # Analysis & spec creation
    tasks.prompt.md                # Task breakdown
    implement.prompt.md            # Code implementation
    review.prompt.md               # Code review
  agents/
    architect.agent.md             # Deep analysis agent
    planner.agent.md               # Planning agent
    coder.agent.md                 # Implementation agent
    reviewer.agent.md              # Quality assurance agent

.copilot/                          # Existing documentation (unchanged)
  instructions.md
  conventions.md
  glossary.md
  workflow.md
  context/
  recipes/
  checklists/

.vscode/
  settings.json                    # Enable prompt files
  extensions.json                  # Recommend Copilot extensions
```

### Prompt File Example Structure

```yaml
---
name: spec
description: "Create technical specification for a feature"
agent: architect
model: claude-sonnet-4  # or gpt-4
argument-hint: "Feature description or GitHub issue link"
---

You are an expert solution architect for the nEvo Ecommerce Admin project.

**Your task**: Create a detailed technical specification following project standards.

**Context files to reference**:
- `.copilot/recipes/spec-creation.md` - Spec template and structure
- `.copilot/context/architecture.md` - System architecture
- `.copilot/conventions.md` - Coding standards
- `.copilot/glossary.md` - Domain terminology

**Process**:
1. Read the feature description provided by the user
2. Search codebase for related existing code
3. Analyze impact on architecture
4. Create spec following the template in `spec-creation.md`
5. Ask 3-5 clarifying questions before finalizing

**Output format**:
- Create spec file in: `spec/XXX-epic-name/YYY-story-name.md`
- Follow exact structure from spec-creation.md
- Include all required sections
- Be specific and verifiable
```

### Agent File Example Structure

```yaml
---
name: architect
description: "Solution architect for deep analysis and spec creation"
model: claude-sonnet-4
tools:
  - githubRepo
  - search/codebase
---

You are a senior solution architect specializing in React/TypeScript applications.

**Your expertise**:
- Domain-Driven Design (DDD)
- Component-based architecture
- Design systems and UI patterns
- Monorepo architecture with Turborepo
- React 18, TypeScript 5, Vite, Tailwind CSS

**Your priorities**:
1. **Understand context deeply** - Read existing architecture docs before proposing changes
2. **Minimal invasiveness** - Propose changes that fit existing patterns
3. **Explicit decisions** - Mark all architectural decisions and their consequences
4. **Domain alignment** - Use terminology from project glossary consistently

**Project-specific knowledge**:
- Read `.copilot/context/architecture.md` for system overview
- Read `.copilot/glossary.md` for domain terms
- Follow design patterns from `.copilot/conventions.md`
- This is a design-system-first project - never suggest raw HTML

**When creating specs**:
- Use template from `.copilot/recipes/spec-creation.md`
- Make requirements verifiable and testable
- Include edge cases and error scenarios
- Reference existing components and patterns
```

### Workflow Integration

**Developer workflow with prompt files**:

1. **Create Specification**

   ```
   User: /spec Implement order cancellation feature with refund logic
   Copilot (architect agent): [Analyzes codebase, creates detailed spec]
   ```

2. **Break Down into Tasks**

   ```
   User: /tasks spec/005-order-management/003-order-cancellation.md
   Copilot (planner agent): [Creates task breakdown with checklist]
   ```

3. **Implement Feature**

   ```
   User: /implement spec/005-order-management/003-order-cancellation.md
   Copilot (coder agent): [Generates code following conventions]
   ```

4. **Review Changes**
   ```
   User: /review
   Copilot (reviewer agent): [Validates against checklists and standards]
   ```

### Example README.md Section for New Joiners

The main README.md should include a section like this:

````markdown
## 🤖 AI-Assisted Development Workflow

This project uses GitHub Copilot with custom workspace prompts to streamline development. All prompts follow project standards automatically.

### Prerequisites

- **VS Code**: Version 1.85.0 or higher
- **Extensions**:
  - `GitHub.copilot` - GitHub Copilot
  - `GitHub.copilot-chat` - GitHub Copilot Chat

### Initial Setup (One-Time)

1. **Install Extensions**

   ```bash
   # VS Code will prompt you to install recommended extensions
   # Or install manually from Extensions marketplace
   ```

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
   Copilot: [Should respond using architect agent and reference project standards]
   ```

### Development Workflow

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

- Architect agent analyzes existing codebase
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

- Planner agent reads the spec
- Breaks down into atomic, verifiable tasks
- Creates checklist with dependencies
- Estimates complexity

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

- Coder agent follows `.copilot/conventions.md` strictly
- Uses design system primitives only (never raw HTML)
- Generates tests alongside implementation
- References component recipes and patterns

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

- Reviewer agent checks against `.copilot/checklists/pr_review.md`
- Verifies conventions, accessibility, test coverage
- Suggests improvements

### Quick Reference

| Command      | Purpose               | Agent Used | When to Use                       |
| ------------ | --------------------- | ---------- | --------------------------------- |
| `/spec`      | Create specification  | Architect  | Starting new feature/task         |
| `/tasks`     | Break down into tasks | Planner    | After spec created, before coding |
| `/implement` | Generate code         | Coder      | Implementing features/components  |
| `/review`    | Review code quality   | Reviewer   | Before submitting PR, during CR   |

### Project Context Available to AI

All AI agents automatically have access to:

- **`.github/copilot-instructions.md`** - Core project assumptions
- **`.copilot/conventions.md`** - Coding standards
- **`.copilot/glossary.md`** - Domain terminology
- **`.copilot/context/architecture.md`** - System architecture
- **`.copilot/recipes/`** - Step-by-step guides
- **`.copilot/checklists/`** - Quality verification

👉 **Read `.copilot/README.md` for detailed documentation**

### Troubleshooting

#### Prompts not appearing

- Verify `chat.promptFiles: true` in settings
- Restart VS Code
- Check Copilot extension is up to date

#### AI not following project conventions

- Prompts automatically reference `.copilot/` docs
- If output doesn't match, report in the prompt what's wrong
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

### New Joiner Checklist

- [ ] Install VS Code extensions (Copilot + Copilot Chat)
- [ ] Verify prompt files are enabled in settings
- [ ] Test `/spec` with a sample feature request
- [ ] Read `.copilot/README.md` and `.copilot/instructions.md`
- [ ] Review `.copilot/conventions.md` for coding standards
- [ ] Complete first task using full AI workflow (spec → tasks → implement → review)
- [ ] Review `.copilot/checklists/definition_of_done.md`

---
````

## Acceptance Criteria

### Functional Requirements

- [ ] `.github/copilot-instructions.md` exists and contains core project context
- [ ] All 4 prompt files created and functional (`spec`, `tasks`, `implement`, `review`)
- [ ] All 4 agent files created with proper model and tool configuration
- [ ] Prompt files can be invoked with `/promptname` in Copilot Chat
- [ ] VS Code settings enable prompt file features
- [ ] Documentation explains how to use the new workflow

### Quality Requirements

- [ ] Copilot-instructions.md is concise (under 800 words)
- [ ] Prompt files follow YAML frontmatter format correctly
- [ ] Agent definitions specify appropriate models for each task type
- [ ] All prompts reference existing `.copilot/` documentation (no duplication)
- [ ] Documentation includes workflow diagram or clear step-by-step guide

### Testing Verification

- [ ] Test `/spec` prompt with sample feature request
- [ ] Verify spec output follows `.copilot/recipes/spec-creation.md` template
- [ ] Test `/tasks` prompt with generated spec
- [ ] Verify task breakdown includes dependencies and checklist format
- [ ] Test `/implement` prompt with spec file
- [ ] Verify generated code follows `.copilot/conventions.md`
- [ ] Test `/review` prompt on sample PR
- [ ] Verify review checks against `.copilot/checklists/pr_review.md`

### Documentation Requirements

- [ ] `.github/prompts/README.md` explains usage
- [ ] Main README.md updated with comprehensive "AI-Assisted Development Workflow" section including:
  - Prerequisites and setup instructions
  - Step-by-step onboarding guide for new joiners
  - Complete workflow examples with all prompts
  - Quick reference table
  - Troubleshooting guide
- [ ] Clear examples of each prompt usage (in both .github/prompts/README.md and main README.md)
- [ ] Explanation of when to use which agent
- [ ] Migration guide from manual prompt copying to prompt files
- [ ] New joiner checklist for verifying AI workflow setup

## Implementation Plan

### Phase 1: Base Infrastructure (Est: 2h)

1. Create `.github/` directory structure (if not exists)
2. Create `.github/copilot-instructions.md` with core project context
3. Create `.github/prompts/` directory
4. Create `.github/agents/` directory
5. Update `.vscode/settings.json` and `.vscode/extensions.json`

### Phase 2: Prompt Files (Est: 3h)

1. Create `spec.prompt.md` with architect agent
2. Create `tasks.prompt.md` with planner agent
3. Create `implement.prompt.md` with coder agent
4. Create `review.prompt.md` with reviewer agent
5. Create `.github/prompts/README.md`

### Phase 3: Agent Definitions (Est: 2h)

1. Create `architect.agent.md`
2. Create `planner.agent.md`
3. Create `coder.agent.md`
4. Create `reviewer.agent.md`

### Phase 4: Documentation (Est: 2h)

1. Update main README.md with comprehensive AI workflow section:
   - Add "AI-Assisted Development Workflow" section
   - Include prerequisites (VS Code version, Copilot extensions)
   - Write setup verification steps
   - Document complete workflow with real examples
   - Create quick reference table of all prompts
   - Add troubleshooting section
   - Include best practices for new joiners
2. Create workflow diagram (text-based or image)
3. Write usage examples for each prompt
4. Document best practices
5. Create new joiner onboarding checklist

### Phase 5: Testing & Refinement (Est: 2h)

1. Test each prompt file with real scenarios
2. Refine prompt instructions based on results
3. Verify agent model selections
4. Validate against existing `.copilot/` standards
5. Get team feedback and iterate

**Total Estimated Effort**: ~11 hours

## Dependencies

- GitHub Copilot extension in VS Code (already in use)
- VS Code with prompt files support (Chat API)
- Existing `.copilot/` folder structure (already exists)
- Team familiarity with Copilot Chat (assumed)

## Success Metrics

- Reduction in time to create specs (measure before/after)
- Consistency of spec format (all specs follow template)
- Reduction in manual prompt copying/pasting
- Developer satisfaction with AI workflow (survey after 2 weeks)
- Adoption rate of prompt files vs. manual prompts (track usage)

## Risks & Mitigations

### Risk 1: Prompt file feature not available

**Mitigation**: Feature is available in latest VS Code + Copilot extension. Document required versions.

### Risk 2: Token limits in copilot-instructions.md

**Mitigation**: Keep instructions concise, link to detailed docs instead of embedding everything.

### Risk 3: Developers continue using manual prompts

**Mitigation**: Create compelling documentation, show time savings, make prompt files easily discoverable.

### Risk 4: Prompt files don't reference .copilot/ docs correctly

**Mitigation**: Test thoroughly, ensure prompts explicitly tell AI to read existing documentation.

### Risk 5: Model selection not honored

**Mitigation**: Document current limitations, provide fallback to default model if specific model unavailable.

## Open Questions

1. **Model availability**: Are Claude Sonnet 4 and GPT-4 available in GitHub Copilot's model selector? May need to adjust model preferences based on available models.

2. **Custom agents support**: Are custom agents (`.agent.md` files) fully supported in current Copilot version? May need to verify feature availability.

3. **Prompt file discovery**: Will prompt files be automatically suggested in Copilot Chat, or do developers need to memorize commands?

4. **Token limits**: What are the exact token limits for `copilot-instructions.md`? May need to adjust content length.

5. **Sync strategy**: How to keep `.github/copilot-instructions.md` in sync with `.copilot/` folder? Consider automation or clear ownership.

## References

- [GitHub Copilot Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [VS Code Copilot Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-chat#_prompt-files)
- [VS Code Copilot Custom Agents](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview)
- Existing documentation: `.copilot/recipes/spec-creation.md`
- Existing documentation: `.copilot/conventions.md`

## Notes

- This implementation chooses the **simplest approach**: native GitHub Copilot features (no custom VS Code extensions, no external routing)
- Existing `.copilot/` folder remains the single source of truth for detailed documentation
- `.github/` files act as entry points and orchestration layer for AI workflows
- Future enhancement possibility: Create VS Code extension for "Ask with Full Context" command if needed
