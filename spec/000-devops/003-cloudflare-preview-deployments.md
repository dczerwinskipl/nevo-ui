# 003 - Cloudflare Preview Deployments

## Epic: 000-devops

## Task: 003-cloudflare-preview-deployments

### Overview

This specification defines the implementation of automated preview deployments to Cloudflare Pages for the admin application. The system will create preview environments for pull requests and maintain a main deployment, with automatic cleanup when PRs are closed.

### Objectives

- Enable **manual** preview deployments for pull requests (maintainer-triggered)
- Maintain a stable main branch deployment (automatic)
- Implement proper routing for multiple app versions under one domain
- Provide easy access to preview environments for testing
- Manual cleanup of PR deployments when no longer needed

### Requirements

#### 1. Cloudflare Pages Configuration

- **Platform**: Cloudflare Pages (free tier)
- **Build Output**: `apps/admin/dist/` directory
- **Deployment Structure**:
  - Main: `<domain>/master/`
  - PR Previews: `<domain>/pull-requests/<pr-id>/`

#### 2. Router Configuration

**Challenge**: Multiple app versions under different paths require router adaptation.

**Recommended Solution**: Environment-based base path configuration

```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  // ... other config
});

// router/index.tsx
const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_PATH || "/",
});
```

**Environment Variables**:

- `VITE_BASE_PATH=/master/` for main deployment
- `VITE_BASE_PATH=/pull-requests/123/` for PR deployments

#### 3. GitHub Actions Integration

- **Trigger Events**:
  - Push to `main` → **Automatic** deploy to `/master/`
  - **Manual trigger** → Deploy PR to `/pull-requests/<pr-id>/` (maintainer only)
  - **Manual trigger** → Cleanup specific deployment
- **Security**: Only repository maintainers can trigger preview deployments
- **Build Process**: Build admin app with appropriate base path
- **Deployment**: Upload to Cloudflare Pages via API

#### 4. Preview Access & Management

- **Manual Trigger**: GitHub Actions `workflow_dispatch` with PR selection
- **PR Comments**: Manual comment with preview link (optional)
- **Status Tracking**: List of active preview deployments
- **Manual Cleanup**: Remove preview when no longer needed

### Implementation Tasks

#### Task 1: Configure Vite for Dynamic Base Path

**Files to modify**:

- `apps/admin/vite.config.ts`
- `apps/admin/src/router/index.tsx`

**Implementation**:

```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  // Ensure assets work with dynamic base path
  experimental: {
    renderBuiltUrl(
      filename: string,
      { hostType }: { hostType: "js" | "css" | "html" }
    ) {
      if (hostType === "js") {
        return { js: `import.meta.env.BASE_URL + ${JSON.stringify(filename)}` };
      }
    },
  },
});

// router/index.tsx
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
```

#### Task 2: Create Cloudflare Deployment Workflow

**File**: `.github/workflows/cloudflare-deploy.yml`

**Features**:

- **Automatic**: Deploy main branch to `/master/` path
- **Manual**: Deploy PR previews to `/pull-requests/<pr-id>/` path (workflow_dispatch)
- **Manual**: Cleanup deployments (workflow_dispatch)
- Set appropriate environment variables for each deployment
- Use Cloudflare Pages API for deployment
- **Security**: Restrict manual triggers to repository maintainers only

**Workflow Structure**:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      action:
        description: "Action to perform"
        required: true
        type: choice
        options:
          - "deploy-pr"
          - "cleanup-pr"
      pr_number:
        description: "PR number"
        required: true
        type: string
```

#### Task 3: Implement PR Preview Management

**Features**:

- **Manual trigger**: GitHub Actions workflow_dispatch in repository Actions tab
- **PR selection**: Input field to specify which PR to deploy
- **Deployment tracking**: List/document active deployments for management
- **Manual cleanup**: Remove specific deployments when no longer needed
- **Security**: Only maintainers with write access can trigger deployments

#### Task 4: Configure Cloudflare Pages Project

**Manual Setup** (via Cloudflare Dashboard):

- Create new Cloudflare Pages project
- Connect to GitHub repository
- Configure build settings
- Set up custom domain (optional)
- Generate API tokens for GitHub Actions

### Technical Implementation Details

#### Environment Variables for GitHub Actions

```yaml
# Required secrets in GitHub repository
CLOUDFLARE_API_TOKEN: # Cloudflare API token with Pages permissions
CLOUDFLARE_ACCOUNT_ID: # Cloudflare account identifier
CLOUDFLARE_PROJECT_NAME: # Pages project name
```

#### Build Configuration

````yaml
# Manual deployment workflow
name: Cloudflare Deploy
on:
  push:
    branches: [main]  # Auto-deploy main only
  workflow_dispatch:  # Manual trigger for PR previews
    inputs:
      action:
        description: 'Action to perform'
        required: true
        type: choice
        options:
          - 'deploy-pr'
          - 'cleanup-pr'
      pr_number:
        description: 'PR number'
        required: true
        type: string

jobs:
  deploy-main:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: Build for main
        run: |
          cd apps/admin
          VITE_BASE_PATH=/master/ npm run build

  deploy-pr:
    if: github.event_name == 'workflow_dispatch' && github.event.inputs.action == 'deploy-pr'
    runs-on: ubuntu-latest
    steps:
      - name: Build for PR preview
        run: |
          cd apps/admin
          VITE_BASE_PATH=/pull-requests/${{ github.event.inputs.pr_number }}/ npm run build
```#### Routing Solution Analysis

**Option A: Hash Router** (Simpler, works immediately)

```typescript
const router = createHashRouter(routes);
// URLs: domain.com/master/#/products
````

**Option B: Browser Router with Base Path** (Recommended, cleaner URLs)

```typescript
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
// URLs: domain.com/master/products
```

**Recommendation**: Option B (Browser Router) for cleaner URLs and better SEO.

#### Asset Handling

Ensure all assets (CSS, JS, images) work with dynamic base paths:

```typescript
// vite.config.ts - Configure asset paths
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
```

### Success Criteria

1. **Main Deployment**: Automatic deployment to `/master/` on main branch push
2. **Manual PR Previews**: Secure manual deployment of PRs under `/pull-requests/<id>/`
3. **Security**: Only repository maintainers can trigger preview deployments
4. **Routing**: All app routes work correctly under both base paths
5. **Assets**: All CSS, JS, and static assets load correctly in both environments
6. **Manual Management**:
   - Easy workflow dispatch interface in GitHub Actions
   - Clear input validation for PR numbers
   - Deployment success/failure feedback
7. **Manual Cleanup**: Ability to remove specific preview deployments
8. **Performance**: Build and deployment complete within 5 minutes

### Testing Strategy

#### Manual Testing

1. **Main Branch**: Verify automatic deployment works at `/master/` path
2. **Manual PR Deploy**: Test workflow_dispatch trigger for PR deployment
3. **Security**: Verify only maintainers can trigger manual deployments
4. **Navigation**: Test all routes work in both environments
5. **Assets**: Verify images, fonts, and styles load correctly
6. **Manual Cleanup**: Test removal of specific preview deployments
7. **Invalid Input**: Test workflow with invalid PR numbers

#### Automated Testing

1. **Build Tests**: Ensure builds work with different base paths
2. **Router Tests**: Test router configuration with various base paths
3. **Integration Tests**: Verify GitHub Actions workflow execution

### Security Considerations

- **Manual Triggers Only**: PR previews require explicit maintainer action
- **Repository Permissions**: Only users with write access can trigger workflows
- **API Tokens**: Secure storage of Cloudflare API credentials
- **Branch Protection**: Automatic deployments only for protected main branch
- **Input Validation**: Validate PR numbers and prevent malicious input
- **Resource Limits**: Monitor Cloudflare Pages usage to avoid overage
- **Access Control**: Consider IP restrictions or password protection for previews

### Cost Considerations

- **Cloudflare Pages Free Tier**: 500 builds per month, 20,000 requests per day
- **Storage**: Each preview uses storage space
- **Build Minutes**: GitHub Actions usage for builds
- **Cleanup Strategy**: Regular cleanup to manage resource usage

### Future Enhancements

- **Multiple Apps**: Extend to deploy design system documentation
- **Custom Domains**: Configure custom domains for different environments
- **Authentication**: Add preview authentication for sensitive content
- **Analytics**: Track preview usage and performance
- **Notifications**: Slack/Discord notifications for deployments

### Troubleshooting Guide

#### Common Issues

1. **Assets not loading**: Check base path configuration in Vite
2. **Routes not working**: Verify router basename configuration
3. **Deployment fails**: Check Cloudflare API credentials and permissions
4. **Build errors**: Ensure environment variables are set correctly

#### Debug Steps

1. Check GitHub Actions logs for build errors
2. Verify Cloudflare Pages dashboard for deployment status
3. Test locally with same environment variables
4. Check browser console for asset loading errors

### Manual Deployment Workflow

#### How to Deploy a PR Preview

1. **Navigate to Actions**: Go to repository → Actions tab
2. **Select Workflow**: Click "Cloudflare Deploy" workflow
3. **Run Workflow**: Click "Run workflow" button
4. **Configure**:
   - Action: Select "deploy-pr"
   - PR Number: Enter the PR number (e.g., "123")
5. **Execute**: Click "Run workflow" to start deployment
6. **Monitor**: Watch workflow execution and get deployment URL

#### How to Cleanup a Preview

1. **Navigate to Actions**: Go to repository → Actions tab
2. **Select Workflow**: Click "Cloudflare Deploy" workflow
3. **Run Workflow**: Click "Run workflow" button
4. **Configure**:
   - Action: Select "cleanup-pr"
   - PR Number: Enter the PR number to remove
5. **Execute**: Click "Run workflow" to cleanup deployment

#### Deployment URL Structure

- **Main**: `https://<your-domain>.pages.dev/master/`
- **PR Preview**: `https://<your-domain>.pages.dev/pull-requests/123/`

### Integration with Existing CI/CD

This deployment system will integrate with existing CI/CD pipeline:

- **Branch Policy**: Deployments only for authorized branch patterns
- **Status Checks**: Deployment status becomes part of PR checks
- **Quality Gates**: Deployment only after CI/CD pipeline passes
- **Code Review**: Preview available for reviewers before merge
