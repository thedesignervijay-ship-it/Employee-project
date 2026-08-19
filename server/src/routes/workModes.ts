// Work Mode Routes
// Handles CRUD operations for textile work modes (Cutting, Ironing, etc.)
// Each work mode has a name and monthly salary assigned to employees

import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import {
  createWorkModeSchema,
  updateWorkModeSchema,
} from "../validations/workMode.js";

export const workModeRoutes = Router();

// GET /api/work-modes
// Returns all work modes sorted by name
// Used by frontend to populate work mode dropdowns and lists
workModeRoutes.get("/", async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("work_modes")
      .select("id, name, monthly_salary, created_at")
      .order("name");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST /api/work-modes
// Creates a new work mode with name and salary
// Returns 409 if name already exists (unique constraint)
workModeRoutes.post("/", async (req, res, next) => {
  try {
    // Validate request body against Zod schema
    const input = createWorkModeSchema.parse(req.body);

    const { data, error } = await supabase
      .from("work_modes")
      .insert(input)
      .select("id, name, monthly_salary, created_at")
      .single();

    if (error) {
      // PostgreSQL unique constraint violation (error code 23505)
      if (error.code === "23505") {
        res.status(409).json({ error: "Work mode name already exists" });
        return;
      }
      throw error;
    }

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/work-modes/:id
// Returns a single work mode by ID
// Returns 404 if not found
workModeRoutes.get("/:id", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("work_modes")
      .select("id, name, monthly_salary, created_at")
      .eq("id", req.params.id)
      .single();

    if (error || !data) {
      res.status(404).json({ error: "Work mode not found" });
      return;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// PUT /api/work-modes/:id
// Updates an existing work mode's name and/or salary
// Returns 409 on duplicate name, 404 if not found
workModeRoutes.put("/:id", async (req, res, next) => {
  try {
    const input = updateWorkModeSchema.parse(req.body);

    // Reject empty updates
    if (Object.keys(input).length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    const { data, error } = await supabase
      .from("work_modes")
      .update(input)
      .eq("id", req.params.id)
      .select("id, name, monthly_salary, created_at")
      .single();

    if (error) {
      // Check for unique constraint violation
      if (error.code === "23505") {
        res.status(409).json({ error: "Work mode name already exists" });
        return;
      }
      throw error;
    }

    if (!data) {
      res.status(404).json({ error: "Work mode not found" });
      return;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/work-modes/:id
// Deletes a work mode if no employees are assigned
// Returns 409 if employees are assigned (FK restrict), 404 if not found
workModeRoutes.delete("/:id", async (req, res, next) => {
  try {
    // First check if work mode exists
    const { data: existing, error: fetchError } = await supabase
      .from("work_modes")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (fetchError || !existing) {
      res.status(404).json({ error: "Work mode not found" });
      return;
    }

    const { error } = await supabase
      .from("work_modes")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      // PostgreSQL foreign key violation (error code 23503)
      // Means employees are assigned to this work mode
      if (error.code === "23503") {
        res.status(409).json({
          error: "Cannot delete work mode with assigned employees",
        });
        return;
      }
      throw error;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
