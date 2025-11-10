# Storybook Deployment & Theme Testing Guide

## Overview

This guide covers two important features:

1. **Dark/Light Theme Testing** in Storybook
2. **Storybook Preview Deployments** on pull requests

## 1. Testing Dark/Light Themes in Storybook

### How to Use

Storybook now includes a **Theme Toggle** in the toolbar that allows you to test all components in both light and dark themes.

#### Steps:

1. **Start Storybook** (if not already running):

   ```bash
   cd packages/design-system
   pnpm storybook
   ```

2. **Locate the Theme Toggle** in the Storybook toolbar (top of the screen)
   - Look for the theme icon (circle hollow icon)
   - Default is set to "Dark" theme

3. **Switch Themes**:
   - Click the theme dropdown
   - Select **"Light"** (☀️ sun icon) or **"Dark"** (🌙 moon icon)
   - All stories will immediately re-render with the selected theme

### Implementation Details

The theme toggle is implemented using Storybook's global toolbar feature:

- **Location**: `.storybook/preview.tsx`
- **Component**: `ThemeSynchronizer` syncs Storybook's toolbar with the `ThemeProvider`
- **Props**: `ThemeProvider` now accepts `initialDark` prop for Storybook integration

**Key Features**:

- ✅ Live theme switching without page reload
- ✅ All components automatically update with theme changes
- ✅ Theme state is preserved across story navigation
- ✅ Works with all existing component stories

### Testing Checklist

When creating or reviewing components, test both themes:

- [ ] Component renders correctly in Dark theme
- [ ] Component renders correctly in Light theme
- [ ] Colors meet contrast requirements (use a11y addon)
- [ ] Text is readable in both themes
- [ ] Interactive states (hover, active, disabled) work in both themes
- [ ] Icons and graphics are visible in both themes

## 2. Storybook Preview Deployments

### Overview

Storybook is automatically deployed as a preview for every pull request, allowing reviewers to:

- View component changes in a live environment
- Test dark/light themes in the deployed preview
- Share design system updates with stakeholders
- Perform visual regression testing

### Deployment Workflow

#### File: `.github/workflows/storybook-deploy.yml`

**Triggers**:

- Pull requests to `main` branch (when design-system files change)
- Pushes to `main` branch (production deployment)

**Jobs**:

1. **build-storybook**: Builds static Storybook files
2. **preview-deploy**: Deploys to Cloudflare Pages (manual approval required)
3. **production-deploy**: Deploys to production on main branch
4. **cleanup-preview**: Removes preview on PR close

### Setup Requirements

#### 1. GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

```
CLOUDFLARE_API_TOKEN=<your-cloudflare-api-token>
CLOUDFLARE_ACCOUNT_ID=<your-cloudflare-account-id>
```

#### 2. GitHub Environments

Create two environments in GitHub (`Settings > Environments`):

**Environment: `storybook-preview`**

- **Protection rules**:
  - ✅ Required reviewers (optional, for manual approval)
  - Can be set to auto-approve for faster deployments
- **Purpose**: Preview deployments for pull requests

**Environment: `storybook-production`**

- **Protection rules**: None (auto-deploy on main)
- **Purpose**: Production Storybook deployment

#### 3. Cloudflare Pages Project

1. **Create a new Cloudflare Pages project**:
   - Name: `nevo-design-system-storybook`
   - Can be created manually or will auto-create on first deployment

2. **Configure build settings** (optional, handled by GitHub Actions):
   - Build command: Not needed (built in CI)
   - Build output directory: `storybook-static`
   - Root directory: `packages/design-system`

### Usage

#### For Pull Requests:

1. **Create a PR** with design-system changes
2. **Wait for build** to complete (~2-5 minutes)
3. **Approve deployment** (if manual approval is required)
4. **View the preview** - URL will be posted as a comment on the PR

Example PR comment:

```
## 🎨 Storybook Preview Deployed Successfully

🔗 Storybook URL: https://abc123.nevo-design-system-storybook.pages.dev

📋 Deployment Details:
- Branch: feature/new-component
- Commit: a1b2c3d
- Deployed at: 2025-11-10T10:30:00Z

✨ Features Available:
- 🌓 Toggle between Light/Dark themes using the toolbar
- ♿ Accessibility (a11y) testing with axe-core
- 🎮 Interactive controls for all component props

> 🧹 Preview will be automatically cleaned up when this PR is closed.
```

#### For Production (main branch):

- **Automatic deployment** on every merge to main
- **URL**: `https://nevo-design-system-storybook.pages.dev` (production URL)
- **No approval required**

### Manual Deployment

If you need to deploy Storybook manually (outside of CI):

```bash
# Build Storybook
cd packages/design-system
pnpm storybook:build

# Deploy using Cloudflare CLI (if installed)
# npx wrangler pages deploy storybook-static --project-name=nevo-design-system-storybook
```

### Benefits

✅ **Visual Review**: Reviewers can see component changes live  
✅ **Theme Testing**: Test dark/light themes in deployed environment  
✅ **Stakeholder Sharing**: Share design system updates without local setup  
✅ **Documentation**: Always up-to-date component documentation  
✅ **Accessibility**: A11y testing available in preview  
✅ **Fast Feedback**: Catch visual bugs before merging

### Troubleshooting

#### Preview deployment not starting:

- Check that design-system files were modified in the PR
- Verify GitHub Actions workflow is enabled
- Check GitHub Secrets are configured correctly

#### Build failures:

- Ensure all dependencies are in `package.json`
- Check Storybook builds locally: `pnpm storybook:build`
- Review GitHub Actions logs for specific errors

#### Theme toggle not working:

- Verify `.storybook/preview.tsx` is correctly configured
- Check browser console for errors
- Ensure `ThemeProvider` is exported from `src/theme/ThemeProvider.tsx`

## Configuration Files

### Modified Files:

1. **`packages/design-system/src/theme/ThemeProvider.tsx`**
   - Added `ThemeCtx` export
   - Added `initialDark` prop to `ThemeProvider`

2. **`packages/design-system/.storybook/preview.tsx`**
   - Added theme toggle toolbar
   - Added `ThemeSynchronizer` component
   - Configured global theme state

3. **`.github/workflows/storybook-deploy.yml`** (new)
   - Storybook build and deployment workflow
   - Preview and production deployment jobs
   - PR comment automation

## Next Steps

- [ ] Set up GitHub Secrets for Cloudflare
- [ ] Create GitHub Environments (storybook-preview, storybook-production)
- [ ] Create Cloudflare Pages project
- [ ] Test theme toggle in local Storybook
- [ ] Create a test PR to verify preview deployment
- [ ] Update team documentation with Storybook preview URL

## Related Documentation

- [Storybook Setup Spec](../spec/002-testing-infrastructure/002-storybook-design-system.md)
- [Cloudflare Deployments](../spec/000-devops/003-cloudflare-preview-deployments.md)
- [CI/CD Pipeline](.github/workflows/ci.yml)
