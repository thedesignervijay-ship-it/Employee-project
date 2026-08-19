## Why

The codebase lacks inline documentation, making it harder for new developers to understand the purpose and functionality of each file and code section. Adding consistent inline comments will improve maintainability and onboarding experience.

## What Changes

- Add inline comments to all server-side TypeScript files (routes, validations, middleware, utilities)
- Add inline comments to all client-side TypeScript/React files (pages, API client, components)
- Add inline comments to configuration files
- No behavioral changes - documentation only

## Capabilities

### New Capabilities

None - this is a documentation-only change.

### Modified Capabilities

None - no spec-level behavior changes.

## Impact

- **Affected code**: All 14 TypeScript files in `server/src/` and `client/src/`
- **No API changes**: REST endpoints remain identical
- **No dependency changes**: No new packages required
- **No breaking changes**: Purely additive documentation

## Notes

This change sets `skip_specs: true` because no system behavior is changing. Inline comments describe existing behavior without modifying it.