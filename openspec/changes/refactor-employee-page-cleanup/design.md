## Context

The client app has two page components — `Employees.tsx` (314 lines) and `WorkModes.tsx` (209 lines) — that contain all UI inline with no component abstraction. Both pages share identical patterns: page header, create/edit modal, data table, and empty state. The Employees page also has stat summary cards that need removal. There is no `components/` directory; all code lives in `pages/`.

## Goals / Non-Goals

**Goals:**
- Remove stat cards and their CSS from the Employees page
- Extract shared UI patterns into reusable components under `client/src/components/`
- Establish a consistent component structure that both pages use
- Remove unused CSS classes (`.card`, `.card-header`, `.card-body`, stat-related classes)

**Non-Goals:**
- Changing any application behavior or API calls
- Adding routing (stays state-based navigation)
- Introducing a component library or design system
- Refactoring the server code
- Changing the CSS architecture (stays single `styles.css`)

## Decisions

### 1. Component extraction strategy

**Decision**: Extract three shared components — `DataTable`, `Modal`, and `PageHeader` — into `client/src/components/`.

**Rationale**: Both pages use identical patterns for these three elements. Extracting them reduces duplication and establishes a `components/` directory without over-abstracting. Forms are page-specific (different fields) so they stay inline.

**Alternatives considered**:
- *Extract forms too*: Rejected — employee and work mode forms have different fields and validation logic, making a shared form component overly generic.
- *Extract only Modal*: Too minimal — doesn't address the structural problem.

### 2. Component file organization

**Decision**: One component per file, flat structure under `components/`:
```
components/
  DataTable.tsx
  Modal.tsx
  PageHeader.tsx
```

**Rationale**: The project is small (2 pages, ~500 lines total client code). A flat structure is sufficient; nested folders would be over-engineering.

### 3. Stat card removal approach

**Decision**: Delete the stat card JSX block from `Employees.tsx` (lines 144-164), the stat calculation variables (lines 129-132), and all stat-related CSS classes (`.stats-grid`, `.stat-card`, `.stat-value`, `.stat-label` from `styles.css`).

**Rationale**: Straightforward deletion with no dependencies elsewhere.

### 4. CSS cleanup scope

**Decision**: Remove only classes confirmed unused: `.card`, `.card-header`, `.card-body`, `.stats-grid`, `.stat-card`, `.stat-value`, `.stat-label`. Keep all other CSS intact.

**Rationale**: These classes are defined in `styles.css` but not referenced by any component JSX. Removing them reduces dead code without risk.

## Risks / Trade-offs

- **[Risk] Extracting components may introduce prop-passing overhead** → Mitigation: Components receive simple props (data arrays, callbacks). No context or state management needed.
- **[Risk] Removing stat cards removes at-a-glance summary** → Mitigation: Users explicitly requested this. Data remains accessible via the table.
- **[Trade-off] Forms stay inline rather than being extracted** → Acceptable: Forms are page-specific with different fields; extracting them would create unnecessary abstraction for a 2-page app.
