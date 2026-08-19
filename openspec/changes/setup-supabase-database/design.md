## Context

The application code is complete with Supabase client initialized in `server/src/lib/supabase.ts`, but no actual Supabase project exists yet. The database tables (`work_modes`, `employees`) need to be created via SQL migrations, and seed data needs to be inserted.

## Goals / Non-Goals

**Goals:**
- Create a Supabase project and obtain connection credentials
- Configure the server's `.env` file with Supabase URL and service role key
- Run SQL migrations to create the required database tables
- Seed the database with eight example work modes
- Verify the connection works by testing an API endpoint

**Non-Goals:**
- Modify the existing application code
- Add new database features or tables
- Set up authentication or row-level security
- Create a database management UI

## Decisions

**1. Use Supabase Dashboard for migrations**
- Run SQL directly in the Supabase SQL Editor
- Simpler than setting up a migration tool for this learning project
- Alternative: Use `supabase db push` CLI - adds tooling complexity

**2. Use service role key for server access**
- The server needs full database access for CRUD operations
- Service role key bypasses row-level security
- Alternative: Use anon key with RLS - more secure but adds complexity

**3. Seed via application code**
- Use the existing `server/src/seed.ts` script
- Alternative: Run INSERT statements in SQL Editor - duplicates logic

## Risks / Trade-offs

- [Service role key exposure] → Keep key in `.env`, never commit to git
- [Manual migrations] → No version control for schema changes - acceptable for learning project
- [No rollback strategy] → Can delete tables via Supabase dashboard if needed

## Migration Plan

1. Create Supabase project via dashboard
2. Copy URL and service role key to `.env`
3. Run SQL migrations in SQL Editor
4. Run seed script: `npx tsx src/seed.ts`
5. Test API: `curl http://localhost:3001/api/work-modes`

## Open Questions

None - this is a straightforward setup task.