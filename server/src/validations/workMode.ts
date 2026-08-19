// Work Mode Validation Schemas
// Zod schemas for validating work mode API requests
// Enforces: name required, salary positive

import { z } from "zod";

// Schema for creating a new work mode
// Both name and salary are required
export const createWorkModeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  monthly_salary: z.number().positive("Monthly salary must be positive"),
});

// Schema for updating an existing work mode
// All fields optional - only provided fields are updated
export const updateWorkModeSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  monthly_salary: z.number().positive("Monthly salary must be positive").optional(),
});
