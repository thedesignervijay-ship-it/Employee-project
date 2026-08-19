## Why

A small textile organisation needs a simple way to track its work modes (e.g. Cutting, Ironing, Packing), assign each employee to one work mode, and automatically determine each employee's monthly salary from the salary configured for that work mode. Currently there is no system at all. This is a learning project to build a minimal full-stack CRUD application.

## What Changes

- Introduce a new full-stack application (React + TypeScript frontend, Node.js + TypeScript REST API backend, Supabase PostgreSQL database).
- Add **Work Mode Management**: create, view, update, and delete work modes, each with a configured monthly salary.
- Add **Employee Management**: create, view, list, update, and delete employees, each assigned to exactly one work mode.
- Add **Salary Logic**: an employee's monthly salary is always derived from the monthly salary configured on the employee's assigned work mode.
- Add **Validation**: required fields, positive salary amounts, and valid work mode references are enforced on both the API and the database.
- Add **REST API** endpoints exposing CRUD for work modes and employees.
- No authentication, attendance, leave, overtime, bonuses, incentives, deductions, payroll history, salary payment tracking, or production quantity tracking. Employees have exactly one work mode.

## Capabilities

### New Capabilities
- `work-modes`: Work mode management — create, view, update, and delete work modes and their configured monthly salary.
- `employees`: Employee management — create, view, list, update, and delete employees, assign exactly one work mode, and expose each employee's monthly salary derived from the assigned work mode.

### Modified Capabilities
<!-- None - this is a greenfield project. -->

## Impact

- **New frontend**: React + TypeScript app with pages for work modes and employees (list + form views).
- **New backend**: Node.js + TypeScript REST API with routes, validation, and data access for work modes and employees.
- **New database**: Supabase PostgreSQL schema with `work_modes` and `employees` tables and a foreign key from `employees.work_mode_id` to `work_modes.id`.
- **New dependencies**: React, TypeScript, Node.js REST framework (e.g. Express), Supabase client, and validation library.
- No existing code is modified.
