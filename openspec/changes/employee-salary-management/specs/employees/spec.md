## Purpose

Defines employees of the textile organisation, the single work mode assigned to each, and the monthly salary that is derived from the assigned work mode.

## ADDED Requirements

### Requirement: Create employee
The system SHALL allow the owner to create an employee by providing a name and assigning exactly one existing work mode.

#### Scenario: Create an employee successfully
- **WHEN** the owner submits an employee with a name and an existing work mode id
- **THEN** the system creates the employee and returns their details including the monthly salary derived from the assigned work mode

#### Scenario: Reject an employee without a name
- **WHEN** the owner submits an employee without a name
- **THEN** the system rejects the request with a validation error (HTTP 400)

#### Scenario: Reject an employee without a work mode
- **WHEN** the owner submits an employee without a work mode
- **THEN** the system rejects the request with a validation error (HTTP 400)

#### Scenario: Reject an employee assigned to a non-existent work mode
- **WHEN** the owner submits an employee whose work mode does not exist
- **THEN** the system rejects the request with a validation error (HTTP 400)

### Requirement: View employees
The system SHALL allow the owner to view the full list of employees and the details of an individual employee, each including the assigned work mode and the monthly salary derived from it.

#### Scenario: List all employees
- **WHEN** the owner requests the list of employees
- **THEN** the system returns all employees with their names, assigned work modes, and derived monthly salaries

#### Scenario: View a single employee
- **WHEN** the owner requests the details of an existing employee
- **THEN** the system returns that employee with their name, assigned work mode, and derived monthly salary

#### Scenario: View a non-existent employee
- **WHEN** the owner requests the details of an employee that does not exist
- **THEN** the system returns a not-found error (HTTP 404)

### Requirement: Update employee
The system SHALL allow the owner to update the name and the assigned work mode of an existing employee.

#### Scenario: Update an employee successfully
- **WHEN** the owner submits a new name and/or a new existing work mode id for an existing employee
- **THEN** the system updates the employee and returns their updated details including the updated derived monthly salary

#### Scenario: Reject an update with an invalid name
- **WHEN** the owner submits an update with an empty name
- **THEN** the system rejects the request with a validation error (HTTP 400)

#### Scenario: Reject an update assigning a non-existent work mode
- **WHEN** the owner submits an update assigning a work mode that does not exist
- **THEN** the system rejects the request with a validation error (HTTP 400)

#### Scenario: Update a non-existent employee
- **WHEN** the owner submits an update for an employee that does not exist
- **THEN** the system returns a not-found error (HTTP 404)

### Requirement: Delete employee
The system SHALL allow the owner to delete an employee.

#### Scenario: Delete an employee successfully
- **WHEN** the owner deletes an existing employee
- **THEN** the system removes the employee and returns success

#### Scenario: Delete a non-existent employee
- **WHEN** the owner deletes an employee that does not exist
- **THEN** the system returns a not-found error (HTTP 404)

### Requirement: Employee monthly salary derived from assigned work mode
The system SHALL derive an employee's monthly salary from the monthly salary configured on the employee's assigned work mode. The salary SHALL be read live from the work mode; it SHALL NOT be stored on the employee.

#### Scenario: Employee salary matches assigned work mode salary
- **WHEN** the owner views an employee whose assigned work mode has a monthly salary configured
- **THEN** the employee's displayed monthly salary equals the assigned work mode's monthly salary

#### Scenario: Salary reflects work mode salary update
- **WHEN** the owner updates the monthly salary of a work mode that is assigned to employees
- **THEN** viewing any of those employees afterwards shows the updated monthly salary

#### Scenario: Salary reflects work mode reassignment
- **WHEN** the owner reassigns an employee to a different work mode
- **THEN** the employee's displayed monthly salary equals the newly assigned work mode's monthly salary
