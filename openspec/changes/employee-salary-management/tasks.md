## 1. Project Setup

- [x] 1.1 Create repository structure: `client/` (Vite React + TypeScript) and `server/` (Node + TypeScript + Express) directories
- [x] 1.2 Scaffold server: `package.json`, TypeScript config, Express app entry, `npm run dev` script
- [x] 1.3 Scaffold client: Vite React + TypeScript app with `npm run dev` script
- [x] 1.4 Add `.env` handling for the server (Supabase URL + service role key) and `.env.example`
- [x] 1.5 Add Supabase JS client and a validation library (Zod) to the server
- [x] 1.6 Write README with setup, database, and run instructions

## 2. Database Schema

- [x] 2.1 Write SQL migration creating `work_modes` (id, name unique, monthly_salary numeric > 0, created_at)
- [x] 2.2 Write SQL migration creating `employees` (id, name, work_mode_id FK -> work_modes ON DELETE RESTRICT, created_at)
- [ ] 2.3 Apply migrations to the Supabase project
- [x] 2.4 Add optional seed script inserting the eight example work modes (Cutting, Bottom Hem Stitching, Label Printing, Neck Stitch, Attach Stitch, Sleeve Attach, Ironing, Packing)

## 3. Server: Work Mode API

- [x] 3.1 Implement `GET /api/work-modes` returning all work modes with name and monthly salary
- [x] 3.2 Implement `POST /api/work-modes` creating a work mode (name required, unique, salary positive)
- [x] 3.3 Implement `GET /api/work-modes/:id` returning one work mode, 404 if not found
- [x] 3.4 Implement `PUT /api/work-modes/:id` updating name and/or salary with validation, 409 on duplicate name, 404 if not found
- [x] 3.5 Implement `DELETE /api/work-modes/:id` returning 409 when employees are assigned, 404 if not found

## 4. Server: Employee API

- [x] 4.1 Implement `GET /api/employees` joining work_modes and returning name, assigned work mode, and derived monthly salary
- [x] 4.2 Implement `POST /api/employees` creating an employee (name required, work_mode_id required and must reference an existing work mode), returning derived salary
- [x] 4.3 Implement `GET /api/employees/:id` returning one employee with assigned work mode and derived salary, 404 if not found
- [x] 4.4 Implement `PUT /api/employees/:id` updating name and/or work mode with validation, 404 if not found
- [x] 4.5 Implement `DELETE /api/employees/:id`, 404 if not found
- [x] 4.6 Verify the derived salary reflects work mode salary updates and reassignment (join, no stored salary on employee)

## 5. Server: Validation and Error Handling

- [x] 5.1 Add shared validation schemas for work mode and employee request bodies (required fields, positive salary, valid work mode)
- [x] 5.2 Add a central error handler mapping validation/not-found/conflict errors to 400/404/409 responses
- [x] 5.3 Confirm DB constraint violations (duplicate name, FK restrict) surface as the correct HTTP codes

## 6. Client: Work Mode Pages

- [x] 6.1 Build work modes list view (name + monthly salary, delete button)
- [x] 6.2 Build create/edit work mode form with name and salary inputs and validation feedback
- [x] 6.3 Wire work mode CRUD to the API and refresh the list after changes

## 7. Client: Employee Pages

- [x] 7.1 Build employees list view (name, work mode name, derived monthly salary, delete button)
- [x] 7.2 Build employee create/edit form (name input, work mode dropdown from `GET /api/work-modes`) with validation feedback
- [x] 7.3 Build employee detail view showing assigned work mode and derived monthly salary
- [x] 7.4 Wire employee CRUD to the API and refresh the list after changes

## 8. Verification

- [ ] 8.1 Manually verify all work mode CRUD flows including validation, duplicate names, and delete-blocked-with-employees
- [ ] 8.2 Manually verify all employee CRUD flows including salary derivation and reassignment
- [x] 8.3 Run the TypeScript build/typecheck for both server and client
