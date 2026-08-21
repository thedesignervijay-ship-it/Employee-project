## Purpose

Provides a themed confirmation dialog for destructive delete actions on the Employees and Work Modes pages, so every delete is deliberately confirmed inside the application's own visual theme instead of the browser's default popup.

## ADDED Requirements

### Requirement: Themed delete confirmation on Employees page
The system SHALL present an in-app themed confirmation dialog when the owner initiates deleting an employee from the Employees page, and SHALL NOT use the browser's native confirm popup.

#### Scenario: Confirming deletion from the row action
- **WHEN** the owner clicks the delete action on an employee row and then confirms in the themed dialog
- **THEN** the employee is deleted and the list refreshes without that employee

#### Scenario: Cancelling deletion from the row action
- **WHEN** the owner clicks the delete action on an employee row and then cancels the themed dialog
- **THEN** no delete request is made and the employee remains in the list

### Requirement: Themed delete confirmation from Employee Detail modal
The system SHALL present the same themed confirmation dialog when the owner initiates deleting an employee from the Delete button inside the Employee Detail modal.

#### Scenario: Confirming deletion from the detail modal
- **WHEN** the owner clicks Delete in the Employee Detail modal and confirms in the themed dialog
- **THEN** the employee is deleted, both dialogs close, and the list refreshes

#### Scenario: Confirmation dialog appears above the detail modal
- **WHEN** the themed confirmation dialog opens while the Employee Detail modal is open
- **THEN** the confirmation dialog is fully visible above the detail modal and can be answered

### Requirement: Themed delete confirmation on Work Modes page
The system SHALL present the same in-app themed confirmation dialog when the owner initiates deleting a work mode from the Work Modes page, and SHALL NOT use the browser's native confirm popup.

#### Scenario: Confirming work mode deletion
- **WHEN** the owner clicks the delete action on a work mode row and confirms in the themed dialog
- **THEN** the work mode is deleted and the list refreshes without it

#### Scenario: Cancelling work mode deletion
- **WHEN** the owner clicks the delete action on a work mode row and cancels the themed dialog
- **THEN** no delete request is made and the work mode remains in the list

### Requirement: Consistent theming of the confirmation dialog
The confirmation dialog SHALL follow the application's existing theme: overlay backdrop, card layout, title, message identifying what will be deleted, a danger-styled confirm button, and a cancel button, matching the styling of the app's other modals.

#### Scenario: Dialog identifies the target
- **WHEN** the themed confirmation dialog opens for a specific employee or work mode
- **THEN** the dialog message names the item that will be deleted

#### Scenario: Danger-styled confirm button
- **WHEN** the themed confirmation dialog is open
- **THEN** the confirm button uses the app's danger styling and the cancel button uses standard styling

### Requirement: Themed feedback when deletion is not possible
When the server rejects a deletion (for example, a work mode that still has assigned employees), the system SHALL show the reason in a themed dialog with a single OK button, and SHALL NOT use the browser's native alert popup.

#### Scenario: Deleting an in-use work mode
- **WHEN** the owner confirms deletion of a work mode that has assigned employees
- **THEN** a themed dialog appears stating the work mode cannot be deleted because employees are assigned to it

#### Scenario: Acknowledging the failure
- **WHEN** the owner acknowledges the cannot-delete dialog
- **THEN** the dialog closes, no delete request is retried, and the list is unchanged
