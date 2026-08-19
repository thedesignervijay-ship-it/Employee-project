## Context

The Employee Salary Management application has 14 TypeScript files across server and client with no inline documentation. The codebase is a learning project for a textile organisation, and adding comments will help new developers understand the purpose of each file and code section.

## Goals / Non-Goals

**Goals:**
- Add clear, concise inline comments to all TypeScript files
- Explain the purpose of each file at the top
- Document key functions, routes, and data flows
- Maintain consistent commenting style across the codebase

**Non-Goals:**
- Modify any existing behavior or functionality
- Add new features or endpoints
- Change code structure or architecture
- Add external documentation files

## Decisions

**1. Comment Style: Inline throughout code**
- Use `//` comments for single-line explanations
- Use `/* */` blocks for file headers and multi-line descriptions
- Place comments above the code they describe
- Avoid obvious comments that restate the code

**2. File Header Format**
Each file gets a brief header explaining its purpose:
```typescript
// Work Mode Routes
// Handles CRUD operations for textile work modes (Cutting, Ironing, etc.)
// Each work mode has a name and monthly salary assigned to employees
```

**3. Function-Level Documentation**
Key functions get brief descriptions:
```typescript
// GET /api/work-modes
// Returns all work modes sorted by name
// Used by frontend to populate work mode dropdowns
workModeRoutes.get("/", async (_req, res, next) => {
```

**4. Inline Explanations for Complex Logic**
Add comments for non-obvious code:
```typescript
// Check for unique constraint violation (PostgreSQL error code 23505)
if (error.code === "23505") {
  res.status(409).json({ error: "Work mode name already exists" });
```

## Risks / Trade-offs

- [Comment drift] → Comments may become outdated if code changes without updating them. Mitigation: Keep comments high-level and focused on "why" not "how"
- [Over-commenting] → Too many obvious comments can clutter code. Mitigation: Follow the rule "don't comment what, comment why"

## Migration Plan

- Greenfield documentation change - no deployment steps needed
- Comments are added directly to source files
- No rollback needed - comments don't affect functionality

## Open Questions

None - this is a straightforward documentation task with clear scope.