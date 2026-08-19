## Context

Greenfield learning project for a textile organisation. No existing code or schema. Motivation is in proposal.md - Why. The system must manage work modes (with a configured monthly salary) and employees assigned to exactly one work mode, with the employee's monthly salary derived live from the assigned work mode. Stack is fixed by the request: React + TypeScript frontend, Node.js + TypeScript REST API, Supabase PostgreSQL.

## Goals / Non-Goals

**Goals:**
- Minimal, understandable architecture suitable for learning (client, server, database).
- Full CRUD over REST for work modes and employees.
- Salary is always derived from the assigned work mode — single source of truth, no denormalized salary on the employee.
- Validation enforced at the API boundary and the database layer.

**Non-Goals:**
- Authentication, attendance, leave, overtime, bonuses, incentives, deductions, payroll history, salary payment tracking, production quantity tracking.
- An employee having more than one work mode.
- Microservices, caching, or other operational complexity.

## Decisions

**1. Monorepo with `client/` and `server/` directories**
Two independent npm projects in one repository. Simple to understand, no workspace tooling required.
- Alternative considered: single npm workspace — adds learning overhead without benefit here.

**2. Express for the REST API**
Express 4/5 is the de facto Node REST framework, well-documented, minimal.
- Alternative considered: Fastify — faster and more structured, but Express is a better learning default.

**3. Supabase accessed from the Node server via the Supabase JS client**
The Node server is the only component that talks to Supabase. The frontend calls the Node REST API only (never the PostgREST endpoint directly), keeping all validation and salary logic in one place.
- Alternative considered: direct `pg` client — more raw SQL, but the Supabase JS client is the idiomatic choice for a Supabase-hosted Postgres.

**4. Database schema**
```sql
work_modes (
  id           uuid primary key default gen_random_uuid(),
  name         text not null unique,
  monthly_salary numeric(10,2) not null check (monthly_salary > 0),
  created_at   timestamptz not null default now()
)

employees (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  work_mode_id uuid not null references work_modes(id) on delete restrict,
  created_at   timestamptz not null default now()
)
```
- `work_modes.name` is unique — enforces the duplicate-name rejection.
- `monthly_salary > 0` check constraint — enforces positive salary at the DB level as a second line of defence behind API validation.
- `employees.work_mode_id` references `work_modes` with `ON DELETE RESTRICT` — a work mode in use cannot be deleted; the API maps this violation to HTTP 409.
- UUIDs chosen for learning value; an auto-increment `serial` integer would also work.

**5. Employee salary is derived, never stored**
Employee endpoints join `employees` with `work_modes` and return `monthly_salary` from the work mode row. Updating a work mode's salary automatically changes every employee's salary. This matches the "no payroll history" scope — there is intentionally no snapshot.

**6. API surface (all under `/api`)**
```
GET    /work-modes
POST   /work-modes
GET    /work-modes/:id
PUT    /work-modes/:id
DELETE /work-modes/:id

GET    /employees
POST   /employees
GET    /employees/:id
PUT    /employees/:id
DELETE /employees/:id
```
- Employee responses embed the derived `monthlySalary` and the assigned `workMode` (name).
- Error responses use conventional codes: 400 validation, 404 not found, 409 conflict (duplicate name, deleting an in-use work mode).

**7. Validation approach**
A validation library (e.g. Zod) validates request bodies in the server before any DB write: name required/non-empty, `monthly_salary` a positive number, `work_mode_id` required and must reference an existing work mode. DB constraints (unique, check, FK) are the backstop.

**8. Frontend structure**
React (Vite) + TypeScript, minimal pages:
- Work modes page: list, create/edit form, delete.
- Employees page: list (with derived salary + work mode name), create/edit form (work mode dropdown), delete, detail view.
- A small API client module wrapping `fetch` against the server.
- No routing library needed for two pages; a simple tab/navigation state is sufficient (learning scope).
- Alternative considered: React Router — unnecessary at this scale.

**9. Employee fields assumed minimal**
Employee has only `name` and `work_mode_id`. The request lists no other employee attributes, so this minimal set is the assumption; it is easy to extend later.

**10. Optional seed data**
The eight example work modes (Cutting, Bottom Hem Stitching, Label Printing, Neck Stitch, Attach Stitch, Sleeve Attach, Ironing, Packing) can be inserted by a seed script so the owner has a starting dataset. Purely additive; the UI still supports full CRUD.

## Risks / Trade-offs

- [Live-derived salary means changing a work mode salary retroactively changes all its employees' salaries] → Accepted: this is the intended, scope-limited behaviour ("no payroll history"). Any need for historical snapshots is out of scope.
- [Blocking deletion of in-use work modes may surprise the owner] → Intentional (FK integrity); the UI disables/deletes-with-warning and the API explains the 409 response.
- [Express + Supabase JS are thin wrappers, so raw SQL pitfalls fall to us] → Keep queries to simple CRUD plus a single join; document them in the server code.
- [Supabase is a hosted service; local dev needs connectivity] → Use the hosted free tier with a `.env` config; document setup in the README.

## Migration Plan

- Greenfield — no migration from existing data.
- Deployment: run SQL migration against a new Supabase project, then run the seed script (optional). Rollback is trivial: delete the Supabase project / drop the tables.

## Open Questions

None. Employee attribute set (name only) and the deletion-blocking rule are documented assumptions above; both are low-risk and easy to adjust without changing the specs.
