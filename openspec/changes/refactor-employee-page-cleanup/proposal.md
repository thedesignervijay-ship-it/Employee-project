## Why

The Employees page contains stat summary cards (Total Employees, Work Modes, Total Payroll, Avg Salary) that add visual clutter without meaningful value for day-to-day employee management. Additionally, the client codebase has no component abstraction — all UI is written inline in two monolithic page files (Employees.tsx at 314 lines, WorkModes.tsx at 209 lines) with no reusable components directory. The code needs structural cleanup to be maintainable.

## What Changes

- **Remove stat cards**: Delete the 4 summary stat boxes from the top of the Employees page and all related CSS classes (`.stats-grid`, `.stat-card`, `.stat-value`, `.stat-label`)
- **Extract reusable components**: Break monolithic page files into smaller, focused components (table, modal, form)
- **Create components directory**: Establish `client/src/components/` with proper component organization
- **Clean up unused CSS**: Remove `.card`, `.card-header`, `.card-body` classes that are defined but never used in any component
- **Archive completed changes**: Move fully completed openspec changes (`add-inline-documentation`, `redesign-ui-modern-dashboard`) to the archive

## Capabilities

### New Capabilities

(none — this is a pure refactor, no behavioral changes)

### Modified Capabilities

(none — no spec-level behavior changes)

## Impact

- **Affected files**:
  - `client/src/pages/Employees.tsx` — remove stat cards, extract components
  - `client/src/pages/WorkModes.tsx` — extract components
  - `client/src/styles.css` — remove unused card and stat CSS classes
  - New: `client/src/components/` directory with extracted components
- **Dependencies**: None
- **API changes**: None
- **Breaking changes**: None
