// API Client Module
// Centralized HTTP client for all backend API calls
// Handles error responses and returns typed data

const API_BASE = "/api";

// TypeScript interfaces for API responses
export interface WorkMode {
  id: string;
  name: string;
  monthly_salary: number;
  created_at: string;
}

export interface Employee {
  id: string;
  name: string;
  work_mode_id: string;
  work_mode_name: string;
  monthly_salary: number;
  created_at: string;
}

// Work Mode API functions

// Fetch all work modes from the server
export async function fetchWorkModes(): Promise<WorkMode[]> {
  const res = await fetch(`${API_BASE}/work-modes`);
  if (!res.ok) throw new Error("Failed to fetch work modes");
  return res.json();
}

// Create a new work mode with name and salary
export async function createWorkMode(data: { name: string; monthly_salary: number }): Promise<WorkMode> {
  const res = await fetch(`${API_BASE}/work-modes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create work mode");
  }
  return res.json();
}

// Update an existing work mode's name and/or salary
export async function updateWorkMode(id: string, data: { name?: string; monthly_salary?: number }): Promise<WorkMode> {
  const res = await fetch(`${API_BASE}/work-modes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update work mode");
  }
  return res.json();
}

// Delete a work mode by ID
export async function deleteWorkMode(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/work-modes/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete work mode");
  }
}

// Employee API functions

// Fetch all employees with their work mode details
export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(`${API_BASE}/employees`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

// Create a new employee with name and work mode assignment
export async function createEmployee(data: { name: string; work_mode_id: string }): Promise<Employee> {
  const res = await fetch(`${API_BASE}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create employee");
  }
  return res.json();
}

// Update an employee's name and/or work mode assignment
export async function updateEmployee(id: string, data: { name?: string; work_mode_id?: string }): Promise<Employee> {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update employee");
  }
  return res.json();
}

// Delete an employee by ID
export async function deleteEmployee(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/employees/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete employee");
  }
}
