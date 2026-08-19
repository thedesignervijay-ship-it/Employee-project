## Why

The application code is complete but the Supabase database is not yet connected. Without a live database, the application cannot function. This change sets up the Supabase project connection, runs the SQL migrations to create the required tables, and seeds initial data.

## What Changes

- Create a Supabase project (if not already done)
- Configure environment variables with Supabase credentials
- Run SQL migrations to create `work_modes` and `employees` tables
- Seed the database with eight example work modes
- Verify the connection works from the server

## Capabilities

### New Capabilities

None - this is a database setup/operational change, not a behavior change.

### Modified Capabilities

None - no spec-level behavior changes.

## Impact

- **New dependencies**: Requires a Supabase account and project
- **Configuration**: `.env` file must be updated with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- **Database**: Creates two tables (`work_modes`, `employees`) with constraints
- **Seed data**: Inserts eight example work modes for the textile organisation

## Notes

This change sets `skip_specs: true` because it's operational setup, not system behavior changes. The database schema was already defined in the original design.