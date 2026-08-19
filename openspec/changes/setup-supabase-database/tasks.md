## 1. Supabase Project Setup

- [ ] 1.1 Create a new Supabase project via dashboard (https://app.supabase.com)
- [ ] 1.2 Copy the Project URL from Settings > API
- [ ] 1.3 Copy the service role key from Settings > API

## 2. Environment Configuration

- [x] 2.1 Open `server/.env` file
- [x] 2.2 Set `SUPABASE_URL` to the Project URL
- [x] 2.3 Set `SUPABASE_SERVICE_ROLE_KEY` to the service role key
- [x] 2.4 Verify `.env.example` has the required variables documented

## 3. Database Migration

- [x] 3.1 Open Supabase SQL Editor (https://app.supabase.com > SQL Editor)
- [x] 3.2 Run SQL to create `work_modes` table
- [x] 3.3 Run SQL to create `employees` table with foreign key
- [x] 3.4 Verify tables exist in Table Editor

## 4. Seed Data

- [x] 4.1 Start the server: `cd server && npm run dev`
- [x] 4.2 Run seed script: `npx tsx src/seed.ts`
- [x] 4.3 Verify eight work modes were inserted

## 5. Verification

- [x] 5.1 Test GET /api/work-modes returns seeded data
- [x] 5.2 Test POST /api/work-modes creates a new work mode
- [x] 5.3 Test GET /api/employees returns empty array
- [x] 5.4 Test health check: GET /api/health returns `{"status":"ok"}`