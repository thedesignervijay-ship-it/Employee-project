## Purpose

Defines textile work modes (production stages such as Cutting, Ironing, and Packing) and the monthly salary configured for each, managed through CRUD operations.

## ADDED Requirements

### Requirement: Create work mode
The system SHALL allow the owner to create a work mode by providing a name and a monthly salary.

#### Scenario: Create a work mode successfully
- **WHEN** the owner submits a work mode with a name and a positive monthly salary
- **THEN** the system creates the work mode and returns its details including the monthly salary

#### Scenario: Reject a work mode without a name
- **WHEN** the owner submits a work mode without a name
- **THEN** the system rejects the request with a validation error (HTTP 400)

#### Scenario: Reject a work mode with an invalid monthly salary
- **WHEN** the owner submits a work mode whose monthly salary is missing, not a number, or not a positive amount
- **THEN** the system rejects the request with a validation error (HTTP 400)

#### Scenario: Reject a duplicate work mode name
- **WHEN** the owner submits a work mode with a name that already exists
- **THEN** the system rejects the request with a conflict error (HTTP 409)

### Requirement: View work modes
The system SHALL allow the owner to view the full list of work modes and the details of an individual work mode, each including its name and monthly salary.

#### Scenario: List all work modes
- **WHEN** the owner requests the list of work modes
- **THEN** the system returns all work modes with their names and monthly salaries

#### Scenario: View a single work mode
- **WHEN** the owner requests the details of an existing work mode
- **THEN** the system returns that work mode with its name and monthly salary

#### Scenario: View a non-existent work mode
- **WHEN** the owner requests the details of a work mode that does not exist
- **THEN** the system returns a not-found error (HTTP 404)

### Requirement: Update work mode
The system SHALL allow the owner to update the name and monthly salary of an existing work mode.

#### Scenario: Update a work mode successfully
- **WHEN** the owner submits a new name and/or a new positive monthly salary for an existing work mode
- **THEN** the system updates the work mode and returns its updated details

#### Scenario: Reject an update with invalid values
- **WHEN** the owner submits an update with an empty name or a monthly salary that is missing, not a number, or not positive
- **THEN** the system rejects the request with a validation error (HTTP 400)

#### Scenario: Reject an update to a duplicate name
- **WHEN** the owner submits an update that renames a work mode to a name already used by another work mode
- **THEN** the system rejects the request with a conflict error (HTTP 409)

#### Scenario: Update a non-existent work mode
- **WHEN** the owner submits an update for a work mode that does not exist
- **THEN** the system returns a not-found error (HTTP 404)

### Requirement: Delete work mode
The system SHALL allow the owner to delete a work mode that is not assigned to any employee. A work mode assigned to one or more employees SHALL NOT be deletable.

#### Scenario: Delete an unused work mode
- **WHEN** the owner deletes a work mode that has no employees assigned
- **THEN** the system removes the work mode and returns success

#### Scenario: Delete a work mode assigned to employees
- **WHEN** the owner deletes a work mode that is assigned to one or more employees
- **THEN** the system rejects the request (HTTP 409) and the work mode remains unchanged

#### Scenario: Delete a non-existent work mode
- **WHEN** the owner deletes a work mode that does not exist
- **THEN** the system returns a not-found error (HTTP 404)
