create table employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  work_mode_id uuid not null references work_modes(id) on delete restrict,
  created_at timestamptz not null default now()
);
