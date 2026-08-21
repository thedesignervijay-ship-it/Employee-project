## 1. Remove Stat Cards

- [x] 1.1 Delete stat card JSX block from `Employees.tsx` (lines 144-164)
- [x] 1.2 Delete stat calculation variables from `Employees.tsx` (lines 129-132)
- [x] 1.3 Remove stat CSS classes from `styles.css` (`.stats-grid`, `.stat-card`, `.stat-value`, `.stat-label`)

## 2. Extract Shared Components

- [x] 2.1 Create `client/src/components/` directory
- [x] 2.2 Create `Modal.tsx` component with overlay, header, body, footer props
- [x] 2.3 Create `PageHeader.tsx` component with title and action slot props
- [x] 2.4 Create `DataTable.tsx` component with columns and rows props

## 3. Refactor Employees Page

- [x] 3.1 Update `Employees.tsx` to import and use extracted `Modal`, `PageHeader`, `DataTable` components
- [x] 3.2 Remove inline modal, header, and table code replaced by components

## 4. Refactor WorkModes Page

- [x] 4.1 Update `WorkModes.tsx` to import and use extracted `Modal`, `PageHeader`, `DataTable` components
- [x] 4.2 Remove inline modal, header, and table code replaced by components

## 5. CSS Cleanup

- [ ] 5.1 Remove unused `.card`, `.card-header`, `.card-body` classes from `styles.css`
- [ ] 5.2 Verify no other references to removed classes exist

## 6. Archive Completed Changes

- [ ] 6.1 Archive `add-inline-documentation` change to `openspec/changes/archive/`
- [ ] 6.2 Archive `redesign-ui-modern-dashboard` change to `openspec/changes/archive/`
