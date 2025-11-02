# Copilot Configuration

This folder contains GitHub Copilot configuration files that help maintain project consistency.

## Files

### `project-guidelines.md`
Comprehensive architectural guidelines and best practices for the project. This document should be referenced for all development decisions.

### `instructions.md` 
GitHub Copilot Chat instructions that are automatically included in chat context when working in this repository.

## How It Works

GitHub Copilot automatically reads files in the `.copilot/` directory and includes them as context when providing assistance. This ensures that all suggestions align with project architecture and coding standards.

## Usage

1. **For Developers**: Review `project-guidelines.md` before starting work
2. **For Copilot**: These files are automatically included in chat context
3. **For Updates**: Modify these files when architectural decisions change

## VS Code Workspace

Use the `nevo-ui-admin.code-workspace` file to open the project with optimal settings:
```bash
code nevo-ui-admin.code-workspace
```

This ensures proper TypeScript configuration, Tailwind CSS support, and recommended extensions.