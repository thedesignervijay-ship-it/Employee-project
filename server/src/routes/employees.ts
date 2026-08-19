// Employee Routes
// Handles CRUD operations for employees assigned to work modes
// Employee salary is derived from the assigned work mode (not stored on employee)

import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validations/employee.js";

export const employeeRoutes = Router();

/* eslint-disable @typescript-eslint/no-explicit-any */

// GET /api/employees
// Returns all employees with their assigned work mode name and derived salary
// Uses Supabase join to fetch work_modes data in single query
employeeRoutes.get("/", async (_req, res, next) => {
  try {
    // Join employees with work_modes to get name and salary
    const { data, error } = await supabase
      .from("employees")
      .select("id, name, work_mode_id, created_at, work_modes(name, monthly_salary)")
      .order("name");

    if (error) throw error;

    // Flatten the joined data into a clean response shape
    const result = data.map((e: any) => ({
      id: e.id,
      name: e.name,
      work_mode_id: e.work_mode_id,
      work_mode_name: e.work_modes?.name,
      monthly_salary: e.work_modes?.monthly_salary,
      created_at: e.created_at,
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/employees
// Creates a new employee with name and work_mode_id
// Validates work_mode_id exists before inserting
employeeRoutes.post("/", async (req, res, next) => {
  try {
    const input = createEmployeeSchema.parse(req.body);

    // Verify work mode exists (foreign key validation)
    const { data: workMode, error: wmError } = await supabase
      .from("work_modes")
      .select("id")
      .eq("id", input.work_mode_id)
      .single();

    if (wmError || !workMode) {
      res.status(400).json({ error: "Invalid work mode" });
      return;
    }

    const { data, error } = await supabase
      .from("employees")
      .insert({ name: input.name, work_mode_id: input.work_mode_id })
      .select("id, name, work_mode_id, created_at")
      .single();

    if (error) throw error;

    // Fetch work mode details to include in response
    const { data: wm } = await supabase
      .from("work_modes")
      .select("name, monthly_salary")
      .eq("id", input.work_mode_id)
      .single();

    res.status(201).json({
      ...data,
      work_mode_name: wm?.name,
      monthly_salary: wm?.monthly_salary,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/employees/:id
// Returns a single employee with work mode details
// Returns 404 if not found
employeeRoutes.get("/:id", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select("id, name, work_mode_id, created_at, work_modes(name, monthly_salary)")
      .eq("id", req.params.id)
      .single();

    if (error || !data) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    // Flatten joined data
    const emp = data as any;
    res.json({
      id: emp.id,
      name: emp.name,
      work_mode_id: emp.work_mode_id,
      work_mode_name: emp.work_modes?.name,
      monthly_salary: emp.work_modes?.monthly_salary,
      created_at: emp.created_at,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/employees/:id
// Updates employee name and/or work mode assignment
// Returns 404 if not found, 400 if invalid work mode
employeeRoutes.put("/:id", async (req, res, next) => {
  try {
    const input = updateEmployeeSchema.parse(req.body);

    // Reject empty updates
    if (Object.keys(input).length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    // If updating work mode, verify it exists
    if (input.work_mode_id) {
      const { data: workMode, error: wmError } = await supabase
        .from("work_modes")
        .select("id")
        .eq("id", input.work_mode_id)
        .single();

      if (wmError || !workMode) {
        res.status(400).json({ error: "Invalid work mode" });
        return;
      }
    }

    const { data, error } = await supabase
      .from("employees")
      .update(input)
      .eq("id", req.params.id)
      .select("id, name, work_mode_id, created_at")
      .single();

    if (error) throw error;

    if (!data) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    // Fetch updated work mode details
    const { data: wm } = await supabase
      .from("work_modes")
      .select("name, monthly_salary")
      .eq("id", data.work_mode_id)
      .single();

    res.json({
      ...data,
      work_mode_name: wm?.name,
      monthly_salary: wm?.monthly_salary,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/employees/:id
// Deletes an employee
// Returns 404 if not found
employeeRoutes.delete("/:id", async (req, res, next) => {
  try {
    // Check if employee exists first
    const { data: existing, error: fetchError } = await supabase
      .from("employees")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (fetchError || !existing) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
