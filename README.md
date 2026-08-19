# Employee Salary Management

A minimal full-stack CRUD application for managing work modes and employees in a textile organisation. Each employee is assigned to exactly one work mode, and their monthly salary is derived from the assigned work mode's configured salary.

## Tech Stack

- **Frontend**: React + TypeScript (Vite)
- **Backend**: Node.js + TypeScript (Express)
- **Database**: Supabase PostgreSQL

## Prerequisites

- Node.js 18+
- A Supabase project (free tier works)

## Setup

### 1. Database

Create the following tables in your Supabase SQL editor:

```sql
create table work_modes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  monthly_salary numeric(10,2) not null check (monthly_salary > 0),
  created_at timestamptz not null default now()
);

create table employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  work_mode_id uuid not null references work_modes(id) on delete restrict,
  created_at timestamptz not null default now()
);
```

Optional seed data:

```bash
cd server
npm run seed
```

### 2. Server

```bash
cd server
cp .env.example .env   # Fill in your Supabase URL and service role key
npm install
npm run dev
```

### 3. Client

```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and proxies API requests to the server on port 3001.

## API Endpoints

All endpoints are under `/api`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/work-modes` | List all work modes |
| POST | `/work-modes` | Create a work mode |
| GET | `/work-modes/:id` | Get a work mode |
| PUT | `/work-modes/:id` | Update a work mode |
| DELETE | `/work-modes/:id` | Delete a work mode |
| GET | `/employees` | List all employees |
| POST | `/employees` | Create an employee |
| GET | `/employees/:id` | Get an employee |
| PUT | `/employees/:id` | Update an employee |
| DELETE | `/employees/:id` | Delete an employee |

## Error Codes

- **400**: Validation error (missing/invalid fields)
- **404**: Resource not found
- **409**: Conflict (duplicate name, or deleting a work mode with assigned employees)
