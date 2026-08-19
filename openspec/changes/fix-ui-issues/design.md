## Context

The UI redesign introduced some alignment issues and an overly complex delete confirmation modal. The stat cards on the Employees page add visual clutter without significant value.

## Goals / Non-Goals

**Goals:**
- Fix table content alignment to be consistently left-aligned
- Simplify delete confirmation to use browser's native `confirm()` dialog
- Remove unnecessary stat cards from Employees page

**Non-Goals:**
- Adding new features
- Changing the data model or API
- Major restructuring of components

## Decisions

### 1. Table Alignment

**Decision**: Left-align ALL table content including numbers

**Why**:
- Consistent alignment across all columns
- Left-aligned numbers are easier to scan in a list
- Actions column can remain centered

**Implementation**: Remove `text-right` and `text-center` classes from all columns except actions

### 2. Delete Confirmation

**Decision**: Use browser's native `confirm()` dialog

**Why**:
- Simpler implementation
- More reliable (no state management issues)
- Consistent with the original pre-redesign behavior
- Modal-based confirmation was causing issues

**Implementation**: Revert to simple `confirm("Delete this item?")` before API call

### 3. Remove Stat Cards

**Decision**: Remove the stats grid from Employees page

**Why**:
- User explicitly requested removal
- Reduces visual clutter
- Simplifies the page layout

**Implementation**: Remove the stats-grid section and related computed values

## Risks / Trade-offs

1. **Risk**: None - these are simple, targeted fixes
   → **Mitigation**: N/A
