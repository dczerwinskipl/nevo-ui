# 003 - Cloudflare Preview Deployments

## Epic: 000-devops

## Task: 003-cloudflare-preview-deployments

### Overview

This specification defines the implementation of on-demand preview deployments using Cloudflare Pages native preview system. Instead of automatic deployments for all PRs, we'll use a controlled approach where previews are triggered manually for security while leveraging Cloudflare's built-in preview branch functionality.

### Objectives

- Use Cloudflare Pages native preview branch system
- Enable **on-demand** preview deployments (security-controlled)
- Automatic deployment for main branch only
- Manual trigger for preview deployments via GitHub Actions
- No custom folder structure - leverage Cloudflare's native preview URLs

### Approach

**Native Cloudflare Pages with Manual Control:**

1. **Main Branch**: Automatic deployment via Cloudflare Pages
2. **Preview Branches**: Disabled by default in Cloudflare settings
3. **On-Demand**: GitHub Actions trigger Cloudflare deployments via API for specific PRs
4. **Security**: Only maintainers can trigger preview deployments

### Requirements

#### 1. Cloudflare Pages Native Configuration

- **Platform**: Cloudflare Pages with GitHub integration
- **Production Branch**: `main` (automatic)
- **Preview Branches**: Disabled in UI, triggered via API on-demand
- **Native URLs**:
  - Main: `<project>.pages.dev`
  - Previews: `<commit-hash>.<project>.pages.dev` (Cloudflare's native format)

#### 2. GitHub Actions On-Demand System

**Trigger Methods**:

- **Option A**: Manual workflow dispatch in GitHub Actions UI
- **Option B**: PR comment commands (e.g., `/deploy-preview`)
- **Option C**: GitHub API call from external tool/script

**Security**: Only repository maintainers can trigger deployments

#### 3. Cloudflare API Integration

Use Cloudflare Pages API to:

- Trigger deployment for specific commit/branch
- Get deployment status and URL
- List active deployments
- Delete/cleanup old deployments

### Implementation Tasks

#### Task 1: Configure Cloudflare Pages Project

**Cloudflare Dashboard Setup**:

1. **Create Project**: Connect GitHub repository
2. **Build Settings**:
   - Framework preset: `Vite`
   - Build command: `cd apps/admin && pnpm build`
   - Build output directory: `apps/admin/dist`
   - Root directory: `/`
3. **Branch Configuration**:
   - **Production branch**: `main`
   - **Preview deployments**: **Disabled** (we'll use API)
4. **Environment Variables**: None needed for basic setup

#### Task 2: Create Manual Deployment Workflow

**File**: `.github/workflows/cloudflare-preview.yml`

```yaml
name: Cloudflare Preview Deploy

on:
  workflow_dispatch:
    inputs:
      pr_number:
        description: "PR number to deploy"
        required: true
        type: string
      action:
        description: "Action to perform"
        required: true
        type: choice
        options:
          - "deploy"
          - "delete"

jobs:
  deploy-preview:
    if: github.event.inputs.action == 'deploy'
    runs-on: ubuntu-latest
    steps:
      - name: Get PR details
        id: pr
        uses: actions/github-script@v7
        with:
          script: |
            const pr = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: ${{ github.event.inputs.pr_number }}
            });
            return {
              sha: pr.data.head.sha,
              ref: pr.data.head.ref,
              repo: pr.data.head.repo.full_name
            };

      - name: Trigger Cloudflare deployment
        uses: actions/github-script@v7
        with:
          script: |
            const response = await fetch('https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID }}/pages/projects/${{ secrets.CLOUDFLARE_PROJECT_NAME }}/deployments', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                type: 'branch',
                branch: '${{ fromJson(steps.pr.outputs.result).ref }}',
                commit_sha: '${{ fromJson(steps.pr.outputs.result).sha }}'
              })
            });

            const deployment = await response.json();
            if (deployment.success) {
              console.log(`Preview deployed: ${deployment.result.url}`);
              
              // Comment on PR with preview URL
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: ${{ github.event.inputs.pr_number }},
                body: `🚀 **Preview deployed!**\n\n📱 **Preview URL**: ${deployment.result.url}\n\n_Deployment ID: ${deployment.result.id}_`
              });
            } else {
              throw new Error(`Deployment failed: ${JSON.stringify(deployment.errors)}`);
            }

  delete-preview:
    if: github.event.inputs.action == 'delete'
    runs-on: ubuntu-latest
    steps:
      - name: List and delete deployments
        uses: actions/github-script@v7
        with:
          script: |
            // List deployments for the PR branch
            const deploymentsResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID }}/pages/projects/${{ secrets.CLOUDFLARE_PROJECT_NAME }}/deployments`, {
              headers: {
                'Authorization': 'Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}'
              }
            });

            const deployments = await deploymentsResponse.json();

            // Find deployments for this PR (you may need to adjust the filtering logic)
            // This is a simplified version - you might want to store deployment IDs in PR comments

            console.log('Available deployments:', deployments.result.map(d => ({id: d.id, url: d.url})));
```

#### Task 3: Alternative - PR Comment Trigger

**File**: `.github/workflows/pr-commands.yml`

```yaml
name: PR Commands

on:
  issue_comment:
    types: [created]

jobs:
  deploy-preview:
    if: github.event.issue.pull_request && contains(github.event.comment.body, '/deploy-preview')
    runs-on: ubuntu-latest
    steps:
      - name: Check permissions
        uses: actions/github-script@v7
        with:
          script: |
            const { data: collaborator } = await github.rest.repos.getCollaboratorPermissionLevel({
              owner: context.repo.owner,
              repo: context.repo.repo,
              username: context.actor
            });

            if (!['admin', 'write'].includes(collaborator.permission)) {
              throw new Error('Only maintainers can deploy previews');
            }

      - name: React to comment
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.reactions.createForIssueComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              comment_id: context.payload.comment.id,
              content: 'rocket'
            });

      - name: Trigger deployment
        # Similar logic as above workflow
```

#### Task 4: Automatic Cleanup on PR Close

**File**: `.github/workflows/pr-cleanup.yml`

```yaml
name: PR Preview Cleanup

on:
  pull_request:
    types: [closed]

jobs:
  cleanup-preview:
    runs-on: ubuntu-latest
    steps:
      - name: Find and delete preview deployments
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = context.payload.pull_request.number;
            const headSha = context.payload.pull_request.head.sha;
            const branchName = context.payload.pull_request.head.ref;

            console.log(`Cleaning up previews for PR #${prNumber}, branch: ${branchName}, sha: ${headSha}`);

            try {
              // List all deployments
              const deploymentsResponse = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID }}/pages/projects/${{ secrets.CLOUDFLARE_PROJECT_NAME }}/deployments`,
                {
                  headers: {
                    'Authorization': 'Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}',
                    'Content-Type': 'application/json'
                  }
                }
              );
              
              if (!deploymentsResponse.ok) {
                throw new Error(`Failed to fetch deployments: ${deploymentsResponse.status}`);
              }
              
              const deployments = await deploymentsResponse.json();
              
              // Find deployments for this PR (by branch name or commit SHA)
              const prDeployments = deployments.result.filter(deployment => 
                deployment.deployment_trigger?.metadata?.branch === branchName ||
                deployment.deployment_trigger?.metadata?.commit_hash === headSha ||
                deployment.source?.config?.repo_name?.includes(`pull/${prNumber}/`)
              );
              
              console.log(`Found ${prDeployments.length} deployments to cleanup`);
              
              // Delete each deployment
              for (const deployment of prDeployments) {
                console.log(`Deleting deployment: ${deployment.id} (${deployment.url})`);
                
                const deleteResponse = await fetch(
                  `https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID }}/pages/projects/${{ secrets.CLOUDFLARE_PROJECT_NAME }}/deployments/${deployment.id}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Authorization': 'Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}'
                    }
                  }
                );
                
                if (deleteResponse.ok) {
                  console.log(`Successfully deleted deployment ${deployment.id}`);
                } else {
                  console.error(`Failed to delete deployment ${deployment.id}: ${deleteResponse.status}`);
                }
              }
              
              // Comment on PR about cleanup
              if (prDeployments.length > 0) {
                await github.rest.issues.createComment({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  issue_number: prNumber,
                  body: `🧹 **Preview cleanup completed**\n\n✅ Removed ${prDeployments.length} preview deployment(s) for this PR.`
                });
              }
              
            } catch (error) {
              console.error('Cleanup failed:', error);
              
              // Comment on PR about cleanup failure
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: prNumber,
                body: `⚠️ **Preview cleanup failed**\n\nAutomatic cleanup encountered an error. Manual cleanup may be required.\n\nError: ${error.message}`
              });
            }
```

#### Task 5: Setup Required Secrets**GitHub Repository Secrets**:

```
CLOUDFLARE_API_TOKEN - API token with Pages:Edit permissions
CLOUDFLARE_ACCOUNT_ID - Your Cloudflare account ID
CLOUDFLARE_PROJECT_NAME - Name of your Pages project
```

**API Token Permissions**:

- `Cloudflare Pages:Edit`
- `Account:Read`

### API Endpoints Reference

#### Cloudflare Pages API

**Create Deployment**:

```
POST /accounts/{account_id}/pages/projects/{project_name}/deployments
{
  "type": "branch",
  "branch": "feature-branch-name",
  "commit_sha": "abc123..."
}
```

**List Deployments**:

```
GET /accounts/{account_id}/pages/projects/{project_name}/deployments
```

**Delete Deployment**:

```
DELETE /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}
```

### Usage Workflows

#### Option 1: Manual Workflow Dispatch

1. Go to **Actions** → **Cloudflare Preview Deploy**
2. Click **Run workflow**
3. Enter PR number and select "deploy"
4. Monitor workflow execution
5. Get preview URL from PR comment

#### Option 2: PR Comment Commands

1. Comment `/deploy-preview` on any PR
2. Only maintainers can trigger (automatic permission check)
3. Bot reacts with 🚀 and deploys
4. Preview URL posted as comment

#### Option 3: Automatic Cleanup

1. **Automatic**: When PR is closed/merged, cleanup runs automatically
2. **Detection**: Finds deployments by branch name or commit SHA
3. **Cleanup**: Deletes all associated preview deployments
4. **Notification**: Comments on PR about cleanup status

#### Option 4: External API Call

```bash
# Trigger via GitHub API
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/owner/repo/actions/workflows/cloudflare-preview.yml/dispatches \
  -d '{"ref":"main","inputs":{"pr_number":"123","action":"deploy"}}'
```

### Security Features

- **Permission Check**: Only repo maintainers can trigger
- **No Auto-Deploy**: PRs don't automatically deploy
- **API Control**: All deployments via controlled API calls
- **Audit Trail**: All actions logged in GitHub Actions
- **Comment Tracking**: Deployment URLs tracked in PR comments

### Success Criteria

1. **Main Deployment**: Automatic deployment of main branch
2. **On-Demand Preview**: Manual deployment via GitHub Actions
3. **Security**: Only maintainers can trigger previews
4. **Native URLs**: Use Cloudflare's native preview URL format
5. **Easy Cleanup**: Simple deletion of old previews
6. **Comment Integration**: Preview URLs automatically posted to PRs
7. **Permission Control**: Automatic validation of user permissions

### Advantages of This Approach

- **Native Integration**: Uses Cloudflare's built-in preview system
- **No Custom Routing**: No need for base path modifications
- **Automatic URLs**: Cloudflare generates preview URLs automatically
- **Security**: Manual control over what gets deployed
- **Simple Setup**: Minimal configuration required
- **Cost Effective**: Uses free Cloudflare Pages features

### Testing Strategy

1. **Manual Deploy**: Test workflow dispatch deployment
2. **PR Comments**: Test comment-triggered deployment (if implemented)
3. **Permission Check**: Verify only maintainers can deploy
4. **URL Generation**: Verify preview URLs work correctly
5. **Cleanup**: Test deployment deletion
6. **Multiple PRs**: Test concurrent preview deployments
