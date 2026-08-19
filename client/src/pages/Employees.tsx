// Employees Page Component
// Displays list of employees with their work mode and derived salary
// Supports create, edit, delete, and detail view operations
// Salary is derived from the assigned work mode (not stored on employee)

import { useState, useEffect, useCallback } from "react";
import {
  fetchEmployees,
  fetchWorkModes,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api.ts";
import type { Employee, WorkMode } from "../api.ts";

function Employees() {
  // State for employees and work modes lists
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [workModes, setWorkModes] = useState<WorkMode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form and selection state
  const [editing, setEditing] = useState<Employee | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formWorkModeId, setFormWorkModeId] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Load both employees and work modes in parallel
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [empData, wmData] = await Promise.all([fetchEmployees(), fetchWorkModes()]);
      setEmployees(empData);
      setWorkModes(wmData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on component mount
  useEffect(() => {
    load();
  }, [load]);

  // Handle form submission (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Client-side validation
    if (!formName.trim()) {
      setFormError("Name is required");
      return;
    }
    if (!formWorkModeId) {
      setFormError("Work mode is required");
      return;
    }

    try {
      // Call create or update API based on editing state
      if (editing) {
        await updateEmployee(editing.id, { name: formName.trim(), work_mode_id: formWorkModeId });
      } else {
        await createEmployee({ name: formName.trim(), work_mode_id: formWorkModeId });
      }
      // Reset form and reload list
      setFormName("");
      setFormWorkModeId("");
      setEditing(null);
      setShowForm(false);
      setSelectedEmployee(null);
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await deleteEmployee(id);
      setSelectedEmployee(null);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  // Start editing an existing employee
  const startEdit = (emp: Employee) => {
    setEditing(emp);
    setFormName(emp.name);
    setFormWorkModeId(emp.work_mode_id);
    setShowForm(true);
    setSelectedEmployee(null);
    setFormError(null);
  };

  // Start creating a new employee
  const startCreate = () => {
    setEditing(null);
    setFormName("");
    setFormWorkModeId("");
    setShowForm(true);
    setSelectedEmployee(null);
    setFormError(null);
  };

  // View employee detail
  const viewEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setShowForm(false);
    setEditing(null);
  };

  // Show loading or error state
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Calculate summary stats
  const totalEmployees = employees.length;
  const totalWorkModes = workModes.length;
  const totalSalary = employees.reduce((sum, emp) => sum + (emp.monthly_salary || 0), 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h2 className="page-title">Employees</h2>
        <button className="btn btn-primary" onClick={startCreate}>
          + New Employee
        </button>
      </div>

      {/* Summary Stats */}
      {employees.length > 0 && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalEmployees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalWorkModes}</div>
            <div className="stat-label">Work Modes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">₹{totalSalary.toLocaleString()}</div>
            <div className="stat-label">Total Payroll</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">₹{avgSalary.toLocaleString()}</div>
            <div className="stat-label">Avg Salary</div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); setEditing(null); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? "Edit Employee" : "New Employee"}</h3>
              <button className="btn-icon" onClick={() => { setShowForm(false); setEditing(null); }}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {formError && <div className="form-error mb-4">{formError}</div>}
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Work Mode</label>
                  <select
                    className="form-select"
                    value={formWorkModeId}
                    onChange={(e) => setFormWorkModeId(e.target.value)}
                  >
                    <option value="">Select work mode</option>
                    {workModes.map((wm) => (
                      <option key={wm.id} value={wm.id}>
                        {wm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="modal-overlay" onClick={() => setSelectedEmployee(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Employee Detail</h3>
              <button className="btn-icon" onClick={() => setSelectedEmployee(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Name</label>
                <div className="form-input" style={{ backgroundColor: 'var(--color-surface)' }}>
                  {selectedEmployee.name}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Work Mode</label>
                <div className="form-input" style={{ backgroundColor: 'var(--color-surface)' }}>
                  {selectedEmployee.work_mode_name}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Salary</label>
                <div className="form-input" style={{ backgroundColor: 'var(--color-surface)' }}>
                  ₹{selectedEmployee.monthly_salary?.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedEmployee(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => startEdit(selectedEmployee)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(selectedEmployee.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employees Table */}
      {employees.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-title">No employees yet</div>
          <div className="empty-state-text">Add your first employee to get started</div>
          <button className="btn btn-primary" onClick={startCreate}>
            + New Employee
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Work Mode</th>
                <th className="text-right">Monthly Salary</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <button
                      className="btn-link"
                      onClick={() => viewEmployee(emp)}
                    >
                      {emp.name}
                    </button>
                  </td>
                  <td>{emp.work_mode_name}</td>
                  <td className="text-right">₹{emp.monthly_salary?.toLocaleString()}</td>
                  <td className="text-center actions">
                    <button className="btn-icon edit" onClick={() => startEdit(emp)}>
                      Edit
                    </button>
                    <button className="btn-icon delete" onClick={() => handleDelete(emp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Employees;
