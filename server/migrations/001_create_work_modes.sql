create table work_modes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  monthly_salary numeric(10,2) not null check (monthly_salary > 0),
  created_at timestamptz not null default now()
);
