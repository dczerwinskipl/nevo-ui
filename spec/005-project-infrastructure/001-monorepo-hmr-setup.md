# Story 001: Configure Monorepo HMR for Design System Changes

## Summary

**As a** frontend developer  
**I want** design system changes to automatically reflect in the admin app without manual rebuilds  
**So that** I can iterate quickly without breaking my development flow

## Context

### Current State (Problems Identified)

**Problem 1: Vite doesn't detect workspace package changes**

- Changes to `@nevo/design-system` source files don't trigger HMR in admin app
- Vite caches the initial build of workspace packages
- `node_modules/.vite` contains stale optimized dependencies

**Problem 2: TypeScript compilation bottleneck**

- Design system builds with `tsc --watch` but output isn't immediately detected
- Admin app's Vite dev server doesn't watch design system's `dist/` folder
- No coordination between TypeScript compilation and Vite rebuild

**Problem 3: Unclear development workflow**

- Multiple commands needed: `pnpm dev` vs `pnpm dev:admin` vs manual design-system watch
- No clear guidance on when to use which command
- Clean script exists but requires manual invocation

**Problem 4: Turborepo task orchestration**

- `turbo dev` runs tasks in parallel but doesn't handle inter-package dependencies
- No mechanism to ensure design-system is building before admin app starts
- Dev task has `cache: false` but no dependency tracking

### Desired State

**After implementation:**

1. Developer runs single command: `pnpm dev`
2. Design system builds in watch mode automatically
3. Admin app detects design system changes immediately
4. Browser hot-reloads within 1 second of file save
5. Clear error messages when manual restart needed
6. Clean script available for edge cases

**Technical Flow:**

```
Developer saves Select.tsx
  ↓
TypeScript watch compiles to dist/
  ↓
Vite detects dist/ change via file watcher
  ↓
Vite invalidates module cache
  ↓
HMR updates browser without full reload
  ↓
⏱️ Total time: <1 second
```

## Requirements

### 1. Vite Configuration for Workspace Dependencies

- [ ] Configure Vite to watch workspace package source files
- [ ] Add `optimizeDeps.include` for all `@nevo/*` packages
- [ ] Configure `server.watch` to monitor workspace packages
- [ ] Disable aggressive caching for workspace dependencies
- [ ] Add proper `resolve.alias` for workspace packages (if needed)

### 2. TypeScript Watch Mode Optimization

- [ ] Design system runs `tsc --watch` with optimized settings
- [ ] Incremental compilation enabled for faster rebuilds
- [ ] Proper `rootDir` and `outDir` configuration
- [ ] Source maps enabled for debugging

### 3. Turbo Task Orchestration

- [ ] `dev` task properly depends on workspace package watch modes
- [ ] Turbo recognizes design-system must start before admin app
- [ ] Parallel execution for independent tasks
- [ ] Proper task persistence configuration

### 4. Cache Management

- [ ] Development-specific cache directory (`.vite-dev`)
- [ ] Cache invalidation strategy for workspace packages
- [ ] Clear distinction between dev and build caches
- [ ] Comprehensive clean script

### 5. Developer Experience

- [ ] Single `pnpm dev` command starts entire development environment
- [ ] `pnpm dev:fresh` command for clean start
- [ ] `pnpm clean` command clears all caches and artifacts
- [ ] Error messages guide developer when restart needed

## Technical Design

### File Changes

#### 1. `apps/admin/vite.config.ts` (MODIFY)

**Current issues:**

- `watch.ignored` pattern may not be working correctly
- `optimizeDeps.force` only works with env var
- Cache directory strategy unclear

**Proposed changes (Simple approach - Start here):**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    watch: {
      // Watch workspace packages - Vite should detect changes in node_modules/@nevo
      ignored: ["!**/node_modules/@nevo/**"],
    },
  },

  resolve: {
    dedupe: ["react", "react-dom"],
  },

  optimizeDeps: {
    // Force Vite to include workspace packages in optimization
    // This ensures changes to these packages trigger HMR
    include: ["@nevo/design-system", "@nevo/api-client", "@nevo/api-mocks"],
  },
});
```

**Key improvements:**

1. Simplified `watch.ignored` - just watch `@nevo` packages
2. `optimizeDeps.include` forces proper detection of workspace packages
3. Removed experimental features (source aliasing, custom cache dirs)
4. Cross-platform compatible (no polling needed for most cases)

#### 2. `turbo.json` (MODIFY)

**Current issues:**

- `dev` task has no dependency tracking
- No guarantee design-system builds before admin consumes it

**Proposed changes:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["^dev:setup"]
    },
    "dev:setup": {
      "cache": false,
      "outputs": ["dist/**"]
    },
    "lint": {},
    "msw:init": {
      "outputs": ["public/mockServiceWorker.js"]
    }
  }
}
```

**Key improvements:**

1. `dev` depends on `^dev:setup` (upstream packages initialize first)
2. `dev:setup` task for one-time initialization
3. Proper dependency chain ensures design-system compiles before admin starts

#### 3. `packages/design-system/package.json` (MODIFY - scripts section)

**Add new scripts:**

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "build:watch": "tsc -p tsconfig.build.json --watch",
    "dev": "tsc -p tsconfig.build.json --watch",
    "dev:setup": "tsc -p tsconfig.build.json"
    // ... existing scripts
  }
}
```

**Rationale:**

- `dev:setup` does initial build (for Turbo dependency)
- `dev` continues in watch mode
- Clear separation between one-time and continuous tasks

#### 4. `packages/design-system/tsconfig.build.json` (VERIFY/OPTIMIZE)

**Ensure optimal settings:**

```jsonc
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true, // For IDE navigation
    "sourceMap": true, // For debugging
    "incremental": true, // For faster rebuilds
    "tsBuildInfoFile": "dist/.tsbuildinfo",
    "emitDeclarationOnly": false,
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test.*", "src/**/*.spec.*", "src/**/*.stories.*"],
}
```

**Key improvements:**

1. `incremental: true` - Faster watch mode rebuilds
2. `declarationMap: true` - Better IDE support
3. `sourceMap: true` - Debug original source
4. `tsBuildInfoFile` - Persistent incremental state

#### 5. `package.json` (ROOT - scripts section)

**Update dev scripts:**

```json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "dev:admin": "pnpm --filter @nevo/ecommerce-admin-app dev",
    "dev:fresh": "pnpm clean-dev && pnpm dev",
    "clean-dev": "pnpm clean-cache && pnpm clean-dist",
    "clean-cache": "pnpm --filter @nevo/ecommerce-admin-app clean-cache",
    "clean-dist": "pnpm -r exec -- node -e \"const fs = require('fs'); ['dist', '.tsbuildinfo'].forEach(d => { try { fs.rmSync(d, {recursive: true, force: true}); } catch(e) {} })\"",
    "clean-all": "pnpm clean-dev && pnpm clean-turbo && pnpm install",
    "clean-turbo": "node -e \"const fs = require('fs'); ['.turbo', 'node_modules/.cache'].forEach(d => { try { fs.rmSync(d, {recursive: true, force: true}); } catch(e) {} })\""
    // ... existing scripts
  }
}
```

**New scripts (cross-platform compatible):**

- `dev:fresh` - Restart dev environment cleanly (cache + dist)
- `clean-dev` - Clean dev artifacts only (cache + dist)
- `clean-dist` - Remove all compiled outputs (cross-platform with Node.js)
- `clean-turbo` - Clear Turbo cache (only in `clean-all`, not needed for normal dev)
- `clean-all` - Nuclear option (everything + reinstall)

#### 6. `apps/admin/package.json` (MODIFY - scripts)

**Update clean-cache script:**

```json
{
  "scripts": {
    "clean-cache": "node -e \"const fs = require('fs'); const dirs = ['node_modules/.vite', '.vite-dev', '.vite']; dirs.forEach(d => { try { fs.rmSync(d, {recursive: true, force: true}); console.log(`✓ Cleaned ${d}`); } catch(e) { console.log(`✗ ${d} not found`); } })\""
    // ... existing scripts
  }
}
```

**Improvements:**

- Clears both `.vite-dev` and `.vite`
- Adds console output for visibility

### Implementation Approach

**Phase 1: Vite Configuration (30-60 min)**

1. Update `apps/admin/vite.config.ts` with simplified watch and optimization settings
2. Test with simple design system component change (e.g., Button color)
3. Verify HMR triggers within 1 second
4. If issues arise, document for troubleshooting

**Phase 2: Turbo Orchestration (30-60 min)**

1. Update `turbo.json` with dependency chain
2. Add `dev:setup` script to design-system
3. Test `pnpm dev` starts both packages correctly
4. Verify design-system compiles before admin starts

**Phase 3: Cache Management (30 min)**

1. Update clean scripts across package.json files (use Node.js for cross-platform)
2. Test `pnpm dev:fresh` for clean restart
3. Test `pnpm clean-all` for nuclear option
4. Verify scripts work on both Windows and macOS

**Phase 4: Testing & Validation (1-2 hours)**

1. Test various change scenarios (components, hooks, theme tokens)
2. Test on both Windows and macOS (developer platforms)
3. Test with fresh clone (new developer experience)
4. Document when to use `dev:fresh` vs normal restart

### Risk Areas & Mitigation

**Risk 1: File watching on Windows/macOS**

- **Mitigation**: Simplified `watch.ignored` pattern works on both platforms
- **Fallback**: If issues arise, can add polling via `server.watch.usePolling`

**Risk 2: TypeScript incremental state corruption**

- **Mitigation**: `.tsbuildinfo` in `dist/` (cleaned with `clean-dist`)
- **Quick fix**: `pnpm dev:fresh` for single-command clean restart

**Risk 3: Vite not detecting workspace package changes**

- **Mitigation**: `optimizeDeps.include` forces Vite to watch `@nevo` packages
- **Fallback**: Manual restart with `pnpm dev:fresh` (acceptable for config changes)

**Risk 4: Cross-platform script compatibility**

- **Mitigation**: Use Node.js `fs.rmSync()` instead of shell commands (`rm -rf`)
- **Result**: Clean scripts work identically on Windows, macOS, and Linux

## Acceptance Criteria

### Functional Requirements

#### HMR Functionality

- [ ] **Given** design system component is open in editor  
       **When** developer saves file  
       **Then** admin app browser updates within 1 second without full reload

- [ ] **Given** design system hook is modified  
       **When** developer saves file  
       **Then** components using that hook re-render with new behavior

- [ ] **Given** theme token is changed  
       **When** developer saves `tokens.ts`  
       **Then** all themed components update with new colors/spacing

- [ ] **Given** new component is exported from design system  
       **When** `index.ts` is updated  
       **Then** admin app can import new component (after browser refresh)

#### Development Workflow

- [ ] **Given** fresh repository clone  
       **When** developer runs `pnpm install && pnpm dev`  
       **Then** both admin and design-system dev servers start successfully

- [ ] **Given** development environment is running  
       **When** developer modifies 3+ different design system files in sequence  
       **Then** each change reflects in admin app without manual intervention

- [ ] **Given** something feels wrong (cache, stale build, etc.)  
       **When** developer runs `pnpm dev:fresh`  
       **Then** dev cache and dist folders clear, and dev servers restart within 15 seconds

- [ ] **Given** nuclear option needed (config changes, dependency issues)  
       **When** developer runs `pnpm clean-all`  
       **Then** all caches, dist folders, and Turbo cache are removed

#### Error Handling

- [ ] **Given** TypeScript compilation error in design system  
       **When** developer saves invalid file  
       **Then** clear error message shown in both terminal and browser

- [ ] **Given** manual restart is required (e.g., tsconfig change)  
       **When** such change is detected  
       **Then** error message guides developer to run `pnpm dev:fresh`

### Quality Requirements

#### Performance

- [ ] Development server startup time ≤ 5 seconds (from command to ready)
- [ ] HMR update time ≤ 1 second (from file save to browser update)
- [ ] No performance regression in production build size
- [ ] TypeScript incremental rebuild ≤ 500ms for single component change

#### Reliability

- [ ] HMR success rate ≥ 95% for component changes
- [ ] Zero false negatives (changes not detected)
- [ ] Acceptable false positives (unnecessary rebuilds) < 5%
- [ ] No memory leaks in long-running watch mode (4+ hours)

#### Developer Experience

- [ ] Single command to start: `pnpm dev`
- [ ] Single command to clean restart: `pnpm dev:fresh` (clears cache + dist)
- [ ] Single command to nuclear option: `pnpm clean-all` (everything + Turbo)
- [ ] All scripts work on both Windows and macOS
- [ ] Clear console output showing which packages are building
- [ ] Config changes can be applied with simple `pnpm dev:fresh`

### Testing Verification

#### Manual Testing Scenarios

**Test 1: Component HMR**

1. Start dev environment: `pnpm dev`
2. Open admin app in browser
3. Open `packages/design-system/src/primitives/Button.tsx`
4. Change button background color in theme
5. Save file
6. **Expected**: Browser updates within 1s without refresh

**Test 2: Hook HMR**

1. Dev environment running
2. Open `packages/design-system/src/hooks/useDisclosure.ts`
3. Modify hook logic (e.g., add console.log)
4. Save file
5. **Expected**: Components using hook re-render with new behavior

**Test 3: Fresh Start**

1. Stop all dev servers
2. Run `pnpm dev:fresh`
3. **Expected**: Clean start within 10 seconds, no errors

**Test 4: New Component Export**

1. Create new component `NewButton.tsx`
2. Export from `packages/design-system/src/index.ts`
3. Import in admin app
4. **Expected**: TypeScript recognizes export, browser refresh shows component

**Test 5: Cache Corruption Recovery**

1. Manually corrupt `.vite-dev` folder
2. Run `pnpm clean`
3. Run `pnpm dev`
4. **Expected**: Clean rebuild, no errors

#### Automated Testing

- [ ] Add E2E test: verify HMR works in CI environment (optional)
- [ ] Add smoke test: `pnpm dev` starts without errors
- [ ] Add script test: all clean scripts execute without errors

#### Cross-Platform Testing

- [ ] Test on Windows 10/11
- [ ] Test on macOS (Intel and Apple Silicon)
- [ ] Test on Linux (Ubuntu/Debian)
- [ ] Test on WSL2 (if Windows symlink issues arise)

## Definition of Done

### Code Complete

- [ ] All file changes implemented and tested
- [ ] Vite config optimized for workspace dependencies
- [ ] Turbo tasks properly orchestrated
- [ ] Clean scripts comprehensive and tested
- [ ] No TypeScript errors
- [ ] No ESLint errors

### Testing Complete

- [ ] All 5 manual testing scenarios pass
- [ ] Cross-platform testing complete (at least 2 platforms)
- [ ] HMR success rate measured at ≥95%
- [ ] Performance benchmarks meet criteria

### Documentation Complete

- [ ] Root `README.md` updated with new dev commands
- [ ] Troubleshooting section added for common HMR issues
- [ ] Comments added to Vite config explaining each setting
- [ ] CHANGELOG.md entry for infrastructure improvements (optional)

### Quality Assurance

- [ ] PR approved by at least one team member
- [ ] No regressions in production build
- [ ] No regressions in existing dev workflow
- [ ] Clean install on fresh machine verified

### Deployment Ready

- [ ] Changes merged to main branch
- [ ] Team notified of new development workflow
- [ ] Old cache directories cleaned on developer machines (via Slack announcement)

## Dependencies

**Upstream Dependencies:**

- None - this is foundational work

**Downstream Dependencies:**

- Story 002 (Developer Documentation) - can proceed in parallel
- Story 003 (Cache Management) - builds on this work

## Risks & Mitigations

### Technical Risks

**Risk 1: Vite file watcher limitations on Windows**

- **Probability**: Medium
- **Impact**: High (breaks HMR for Windows developers)
- **Mitigation**: Add `usePolling` option, document WSL2 alternative
- **Fallback**: Source aliasing bypasses dist/ watching

**Risk 2: TypeScript watch mode instability**

- **Probability**: Low
- **Impact**: Medium (intermittent HMR failures)
- **Mitigation**: Incremental build state in dist/ (auto-cleaned)
- **Fallback**: `dev:fresh` command for quick recovery

**Risk 3: Over-optimization by Vite**

- **Probability**: Medium
- **Impact**: Medium (stale dependencies cached)
- **Mitigation**: `optimizeDeps.force` in dev mode
- **Fallback**: Manual cache clear documented

### Process Risks

**Risk 4: Breaking existing workflows**

- **Probability**: Low
- **Impact**: High (team productivity loss)
- **Mitigation**: Keep existing commands (`dev:admin`, etc.)
- **Rollback Plan**: Git revert, keep old Vite config in comments

**Risk 5: Incomplete testing across platforms**

- **Probability**: Medium
- **Impact**: Medium (some developers still have issues)
- **Mitigation**: Test matrix (Windows/Mac/Linux)
- **Documentation**: Troubleshooting guide for platform-specific issues

## Timeline Estimate

| Phase                | Duration      | Dependencies        |
| -------------------- | ------------- | ------------------- |
| Vite Configuration   | 30-60 min     | None                |
| Turbo Orchestration  | 30-60 min     | None                |
| Cache Management     | 30 min        | None                |
| Testing & Validation | 1-2 hours     | Phases 1-3 complete |
| **Total**            | **2-4 hours** |                     |

**Recommended Approach**: Start with simplest solution (Phase 1), test, then proceed. Can implement in single session.

---

## Related Documentation

- [Vite Server Options](https://vitejs.dev/config/server-options.html)
- [Vite Dep Optimization](https://vitejs.dev/guide/dep-pre-bundling.html)
- [Turbo Dev Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks#dev)
- [PNPM Workspace](https://pnpm.io/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

## Appendix: Alternative Approaches Considered

### Approach A: Source Aliasing (Bypassing dist/)

**Pros:**

- Instant HMR (no TypeScript compilation step)
- Simpler mental model
- Fewer moving parts

**Cons:**

- Type checking happens in admin app (slower)
- No isolated type errors in design system
- Production build still uses dist/ (dev/prod parity issue)

**Verdict**: Considered for future optimization, not initial implementation

### Approach B: Vite Plugin for Workspace Packages

**Pros:**

- Explicit control over invalidation
- Can optimize for specific patterns
- Better debugging

**Cons:**

- Custom code to maintain
- Overkill for current needs
- Vite built-ins should suffice

**Verdict**: Rejected - use Vite's native capabilities first

### Approach C: Separate Dev Server for Design System

**Pros:**

- Design system serves itself via HTTP
- Clear separation of concerns
- Could enable Storybook integration

**Cons:**

- Complex setup
- Network dependency
- Slower than file watching

**Verdict**: Rejected - over-engineered for current needs
