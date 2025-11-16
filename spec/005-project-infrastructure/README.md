# Epic 005 - Project Infrastructure & Developer Experience

## Summary

Improve monorepo development workflow to provide instant hot module replacement (HMR) for design system changes in the admin app, eliminating the need for manual cache clearing and rebuilds during development.

## Business Context

### Problem Statement

Currently, developers experience significant friction during development:

- Changes to design system components don't automatically reflect in the admin app
- Manual cache clearing and rebuilds required multiple times per day
- Development velocity is significantly reduced by constant context switching
- New contributors struggle with unclear development workflow
- Inconsistent behavior between different types of changes

### Value Proposition

**For Developers**: Instant feedback loop when modifying design system components
**For Team**: Faster iteration cycles and reduced frustration
**For Project**: Better developer experience attracts and retains contributors

## Scope

### Included in This Epic

- ✅ Vite configuration for workspace package HMR
- ✅ TypeScript watch mode optimization
- ✅ Turbo task orchestration improvements
- ✅ Cache management strategies
- ✅ Developer documentation and quick-start guides
- ✅ Clean/rebuild utility scripts

### Explicitly Excluded

- ❌ Storybook HMR issues (separate epic if needed)
- ❌ E2E test development workflow
- ❌ Production build optimizations
- ❌ CI/CD pipeline changes

### Dependencies

- None - this is foundational infrastructure work

## Stories Breakdown

1. **[001-monorepo-hmr-setup.md](./001-monorepo-hmr-setup.md)** - Configure Vite and Turbo for workspace package HMR ⭐ **(THIS EPIC)**
2. **002-developer-documentation.md** - Create comprehensive dev workflow documentation
3. **003-cache-management.md** - Implement intelligent cache invalidation strategies

## Epic-Level Acceptance Criteria

### Developer Experience Goals

- [ ] Saving a design system component change reflects in admin app within 1 second
- [ ] No manual cache clearing needed for 95% of development work
- [ ] Clear error messages when manual restart is required
- [ ] Single command to start development environment
- [ ] Single command to perform "nuclear option" rebuild

### Quality Goals

- [ ] Zero configuration needed for new developer onboarding
- [ ] No performance degradation in development server startup time (< 5s)
- [ ] No production build size increase due to dev optimizations
- [ ] All workspace dependencies properly optimized

### Documentation Goals

- [ ] README.md has clear "Quick Start" section
- [ ] Troubleshooting guide for common HMR issues
- [ ] Architecture documentation explains how HMR works in monorepo

## Success Metrics

| Metric                           | Current               | Target  |
| -------------------------------- | --------------------- | ------- |
| Manual cache clears per day      | 5-10                  | 0-1     |
| Time from save to browser update | 10-60s (with rebuild) | <1s     |
| Developer onboarding time        | 30+ min               | <10 min |
| HMR success rate                 | ~20%                  | >95%    |

## Timeline & Dependencies

**Estimated Duration**: 1-2 days (Story 001 is highest priority)

**Story 001 (This Spec)**: 4-6 hours

- Vite config updates: 1-2 hours
- Turbo orchestration: 1 hour
- Testing and validation: 2-3 hours

**Story 002**: 2-3 hours (documentation)

**Story 003**: 2-3 hours (cache utilities)

## Risks & Mitigations

| Risk                                          | Impact | Mitigation                                                   |
| --------------------------------------------- | ------ | ------------------------------------------------------------ |
| Vite caching issues with symlinks             | High   | Use `optimizeDeps.include` with workspace packages           |
| TypeScript incremental build state corruption | Medium | Add clean script, document restart scenarios                 |
| Slow HMR with large dependencies              | Medium | Optimize dependency pre-bundling, use `optimizeDeps.entries` |
| Windows file watching issues                  | Medium | Document WSL2 usage, use `chokidar` options                  |

## Epic Owner

**Owner**: Development Team  
**Stakeholders**: All frontend developers  
**Review Required**: Team Lead approval on Story 001 implementation

---

## Related Documentation

- [Vite Configuration Reference](https://vitejs.dev/config/)
- [Turbo Development Docs](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [PNPM Workspace Protocol](https://pnpm.io/workspaces)
