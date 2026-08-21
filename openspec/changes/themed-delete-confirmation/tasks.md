## 1. Shared confirmation dialog foundation

- [x] 1.1 Add optional `className` prop to `client/src/components/Modal.tsx` and apply it to the overlay div
- [x] 1.2 Create `client/src/components/ConfirmDialog.tsx` wrapping `Modal` with message area and Cancel/Confirm footer, danger-styled confirm button, and a `pending` flag that disables both buttons while the delete request is in flight
- [x] 1.3 Extend `client/src/styles.css`: elevated overlay rule (`.modal-overlay.confirm { z-index: 1100 }`) and confirm-dialog message styling

## 2. Employees page integration

- [x] 2.1 In `client/src/pages/Employees.tsx`, add `deleteTarget` state; row delete button sets the target instead of deleting directly
- [x] 2.2 Route the Employee Detail modal's Delete button through the same `deleteTarget` state
- [x] 2.3 Remove the native `confirm()` call from `handleDelete`; render `ConfirmDialog` whose confirm invokes the existing delete API, clears `deleteTarget`, closes the detail modal, and refreshes the list; cancel just clears `deleteTarget`

## 3. Work Modes page integration

- [x] 3.1 In `client/src/pages/WorkModes.tsx`, add `deleteTarget` state; row delete button sets the target instead of deleting directly
- [x] 3.2 Remove the native `confirm()` call from `handleDelete`; render `ConfirmDialog` whose confirm invokes the existing delete API, clears `deleteTarget`, and refreshes the list; cancel just clears `deleteTarget`

## 4. Verification

- [x] 4.1 Run typecheck/lint/build for the client and fix any issues
- [ ] 4.2 Manually verify all spec scenarios: themed dialog on both pages, cancel makes no request, confirm deletes and refreshes, dialog stacks above Employee Detail modal, message names the item, danger-styled confirm button

## 5. Themed "cannot delete" feedback

- [x] 5.1 Extend `ConfirmDialog` with `showCancel` and `danger` props so it doubles as an informational alert (single OK button, primary styling)
- [x] 5.2 In `client/src/pages/Employees.tsx`, replace the delete-failure `alert()` with a `deleteError` state rendered as an alert-mode `ConfirmDialog`
- [x] 5.3 In `client/src/pages/WorkModes.tsx`, replace the delete-failure `alert()` with a `deleteError` state rendered as an alert-mode `ConfirmDialog`
- [x] 5.4 Re-run typecheck/build and verify no native `confirm()`/`alert()` remains in either page's delete flow
