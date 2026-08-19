// Work Modes Page Component
// Displays list of work modes with name and monthly salary
// Supports create, edit, and delete operations

import { useState, useEffect, useCallback } from "react";
import { fetchWorkModes, createWorkMode, updateWorkMode, deleteWorkMode } from "../api.ts";
import type { WorkMode } from "../api.ts";

function WorkModes() {
  // State for work modes list and UI
  const [workModes, setWorkModes] = useState<WorkMode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state for create/edit
  const [editing, setEditing] = useState<WorkMode | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formSalary, setFormSalary] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Load work modes from API
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchWorkModes();
      setWorkModes(data);
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
    const salary = parseFloat(formSalary);
    if (!formName.trim()) {
      setFormError("Name is required");
      return;
    }
    if (isNaN(salary) || salary <= 0) {
      setFormError("Monthly salary must be a positive number");
      return;
    }

    try {
      // Call create or update API based on editing state
      if (editing) {
        await updateWorkMode(editing.id, { name: formName.trim(), monthly_salary: salary });
      } else {
        await createWorkMode({ name: formName.trim(), monthly_salary: salary });
      }
      // Reset form and reload list
      setFormName("");
      setFormSalary("");
      setEditing(null);
      setShowForm(false);
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this work mode?")) return;
    try {
      await deleteWorkMode(id);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  // Start editing an existing work mode
  const startEdit = (wm: WorkMode) => {
    setEditing(wm);
    setFormName(wm.name);
    setFormSalary(String(wm.monthly_salary));
    setShowForm(true);
    setFormError(null);
  };

  // Start creating a new work mode
  const startCreate = () => {
    setEditing(null);
    setFormName("");
    setFormSalary("");
    setShowForm(true);
    setFormError(null);
  };

  // Show loading or error state
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h2 className="page-title">Work Modes</h2>
        <button className="btn btn-primary" onClick={startCreate}>
          + New Work Mode
        </button>
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); setEditing(null); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? "Edit Work Mode" : "New Work Mode"}</h3>
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
                    placeholder="e.g. Cutting"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Monthly Salary (₹)</label>
                  <input
                    className="form-input"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    placeholder="e.g. 15000"
                  />
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

      {/* Work Modes Table */}
      {workModes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">No work modes yet</div>
          <div className="empty-state-text">Create your first work mode to get started</div>
          <button className="btn btn-primary" onClick={startCreate}>
            + New Work Mode
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right">Monthly Salary</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workModes.map((wm) => (
                <tr key={wm.id}>
                  <td>{wm.name}</td>
                  <td className="text-right">₹{wm.monthly_salary.toLocaleString()}</td>
                  <td className="text-center actions">
                    <button className="btn-icon edit" onClick={() => startEdit(wm)}>
                      Edit
                    </button>
                    <button className="btn-icon delete" onClick={() => handleDelete(wm.id)}>
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

export default WorkModes;
