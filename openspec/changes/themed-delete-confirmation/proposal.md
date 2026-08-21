## Why

On both the Employees and Work Modes pages, the Edit action opens a properly themed modal, but the Delete action still triggers the browser's native `confirm()` popup. This default popup clashes with the app's visual theme and makes the delete flow feel broken compared to the rest of the UI.

## What Changes

- Add a reusable themed confirmation dialog built on the existing `Modal` component and the app's design tokens (danger-styled confirm button, cancel button).
- Replace the native `confirm()` call in the Employees delete flow with the themed dialog. This covers both delete entry points: the row action button and the Delete button in the Employee Detail modal.
- Replace the native `confirm()` call in the Work Modes delete flow with the themed dialog.
- Deletion behavior itself is unchanged: cancelling still does nothing, confirming still calls the existing delete API.
- When a deletion is rejected by the server (e.g., a work mode that still has assigned employees), show the reason in the same themed dialog style with a single OK button instead of the browser's native `alert()`.

## Capabilities

### New Capabilities
- `delete-confirmation`: Themed confirmation dialog shown before destructive delete actions on the Employees and Work Modes pages, replacing the browser's native confirm popup.

### Modified Capabilities
<!-- None - openspec/specs/ has no archived capabilities yet; the delete API contracts from employee-salary-management are unchanged. -->

## Impact

- **Frontend only**: new shared confirm-dialog component (`client/src/components/`), updates to `client/src/pages/Employees.tsx` and `client/src/pages/WorkModes.tsx`, minor additions to `client/src/styles.css`. Reuses the existing `Modal` component and `.btn-danger` styles.
- **No backend changes**: API routes, validation, and database are untouched.
- **No new dependencies**: no third-party dialog library is introduced.
