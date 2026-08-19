## Why

The recently redesigned UI has several issues that need fixing:
1. Table content alignment is inconsistent - some columns are centered when they should be left-aligned
2. The delete confirmation uses a modal popup which doesn't work properly - should use the browser's native `confirm()` dialog instead
3. The summary stat cards on the Employees page are unnecessary and should be removed

## What Changes

- **Fix table alignment**: Left-align all table content (names, work modes, salaries) instead of centering
- **Fix delete confirmation**: Replace modal-based delete confirmation with simple `confirm()` dialog
- **Remove stat cards**: Remove the summary statistics cards from the top of the Employees page

## Capabilities

### New Capabilities

(none - this is a bug fix, not a behavioral change)

### Modified Capabilities

(none - existing functionality remains the same, only presentation fixes)

## Impact

- **Affected files**: 
  - `client/src/pages/WorkModes.tsx` - Fix table alignment, fix delete confirmation
  - `client/src/pages/Employees.tsx` - Fix table alignment, remove stat cards
  - `client/src/styles.css` - Minor CSS adjustments if needed
- **Dependencies**: None
- **API changes**: None
- **Breaking changes**: None
