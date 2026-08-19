// Employee Validation Schemas
// Zod schemas for validating employee API requests
// Enforces: name required, work_mode_id must be valid UUID

import { z } from "zod";

// Schema for creating a new employee
// Both name and work_mode_id are required
export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  work_mode_id: z.string().uuid("Invalid work mode ID"),
});

// Schema for updating an existing employee
// All fields optional - only provided fields are updated
export const updateEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  work_mode_id: z.string().uuid("Invalid work mode ID").optional(),
});
