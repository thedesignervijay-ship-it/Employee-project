## Context

The client is a React 18 + TypeScript SPA (`client/`) with no third-party UI dependencies. All modals go through one shared component, `client/src/components/Modal.tsx`, styled by hand-rolled classes in `client/src/styles.css` (`.modal-overlay`, `.modal-*`) using CSS custom-property design tokens; danger styling already exists as `.btn-danger`.

Both pages currently gate deletion behind the browser's native popup:

- `client/src/pages/Employees.tsx:75` — `if (!confirm("Delete this employee?")) return;` inside `handleDelete`, reached from two entry points: the row action button (~line 135) and the Delete button in the Employee Detail modal footer (~line 212).
- `client/src/pages/WorkModes.tsx:66` — `if (!confirm("Delete this work mode?")) return;` inside `handleDelete`, reached from the row action button (~line 109).

Failure paths use native `alert()` (`Employees.tsx:81`, `WorkModes.tsx:71`). The API layer (`deleteEmployee` / `deleteWorkMode` in `client/src/api.ts`) and the server are unaffected by this change.

## Goals / Non-Goals

**Goals:**
- One reusable themed confirmation dialog used by both pages, visually consistent with the existing Edit/New modals.
- Works from every current delete entry point, including stacked on top of the open Employee Detail modal.
- Names the item being deleted in the message so the owner knows exactly what will be removed.

**Non-Goals:**
- Replacing the native `alert()` error messages (recorded assumption in proposal.md).
- Undo/soft-delete, bulk delete, keyboard shortcut handling beyond what the shared `Modal` already does.
- Adding a general-purpose notification/toast system.

## Decisions

### 1. New lightweight `ConfirmDialog` component wrapping the existing `Modal`
Create `client/src/components/ConfirmDialog.tsx` that composes `Modal` with a fixed body (icon/message) and footer (Cancel + danger Confirm). Props roughly: `open`, `title`, `message`, `confirmLabel`, `onConfirm`, `onCancel`, plus an internal `pending` flag to disable buttons while the delete request is in flight.

*Alternatives considered:* a third-party dialog library (SweetAlert2, react-confirm-alert) — rejected because the project deliberately has zero UI dependencies and its own token-based stylesheet; a bare ad-hoc modal duplicated in each page — rejected because it duplicates markup and drifts from the theme.

### 2. Per-page "pending delete target" state instead of a boolean
Each page keeps `deleteTarget: Employee | null` / `WorkMode | null`. Row/detail-modal delete buttons set the target; the dialog's confirm calls the existing `handleDelete(id)` path (minus the `confirm()` line), then clears the target. This gives the dialog the item name for free and makes cancel a no-op (just clear state).

*Alternative considered:* a global confirm service/context — overkill for two call sites today.

### 3. Elevate the confirm overlay above other modals explicitly
The Employee Detail modal and the confirmation dialog can be open simultaneously. Rather than relying on DOM order between two `z-index: 1000` overlays, the confirm dialog gets an elevated stacking class (e.g., `.modal-overlay.confirm { z-index: 1100 }`) applied via an optional `className` prop added to `Modal`.

*Alternative considered:* React portal to `document.body` — unnecessary complexity; explicit z-index solves the only real stacking case.

### 4. Reuse existing styles; add only what's missing
Reuse `.btn-danger`, `.btn-secondary`, tokens (`--color-error`, etc.). Additions to `styles.css`: the elevated-overlay rule and minor confirm-dialog styling (message spacing). No redesign of `Modal` itself.

### 5. Alert mode on `ConfirmDialog` for "cannot delete" failures
The server already rejects in-use work modes with 409 and a reason string ("Cannot delete work mode with assigned employees"), which `api.ts` surfaces as the thrown `Error` message. Each page keeps a `deleteError: string | null` state set in the delete catch path; a second `ConfirmDialog` instance renders it as an informational dialog (single OK button, primary styling, no danger/cancel) via new `showCancel` / `danger` props. The native `alert()` is removed from both delete paths.

*Alternatives considered:* reusing the confirm dialog verbatim with relabeled buttons — rejected because a red "Delete"-styled OK button miscommunicates an informational message; a separate `AlertDialog` component — rejected as duplicate markup for one styling difference.

## Risks / Trade-offs

- [Stacking regression if more modal-on-modal cases appear] → The `className` prop on `Modal` keeps elevation explicit and reusable; revisit portals only if stacking cases multiply.
- [Double-click on Confirm fires two DELETE requests] → Disable Cancel/Confirm while the request is pending; clear `deleteTarget` on completion.
- [No focus trap / ESC handling in the shared `Modal`] → Consistent with the app's current modals; overlay click already closes (= cancel). Not expanding scope here.
- [Delete failure leaves user without themed feedback] → Resolved by the alert-mode dialog (Decision 5); server rejection reasons surface in-theme.

## Migration Plan

Frontend-only change; ship with the next client build. Rollback is a plain revert — no data, API, or schema impact.

## Open Questions

None.
