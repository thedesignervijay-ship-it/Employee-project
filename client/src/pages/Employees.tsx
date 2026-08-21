import { useState, useEffect, useCallback } from "react";
import {
  fetchEmployees,
  fetchWorkModes,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api.ts";
import type { Employee, WorkMode } from "../api.ts";
import Modal from "../components/Modal.tsx";
import ConfirmDialog from "../components/ConfirmDialog.tsx";
import PageHeader from "../components/PageHeader.tsx";
import DataTable from "../components/DataTable.tsx";

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [workModes, setWorkModes] = useState<WorkMode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formWorkModeId, setFormWorkModeId] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

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

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError("Name is required");
      return;
    }
    if (!formWorkModeId) {
      setFormError("Work mode is required");
      return;
    }

    try {
      if (editing) {
        await updateEmployee(editing.id, { name: formName.trim(), work_mode_id: formWorkModeId });
      } else {
        await createEmployee({ name: formName.trim(), work_mode_id: formWorkModeId });
      }
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

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      setSelectedEmployee(null);
      setDeleteTarget(null);
      load();
    } catch (err) {
      setDeleteTarget(null);
      setDeleteError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const startEdit = (emp: Employee) => {
    setEditing(emp);
    setFormName(emp.name);
    setFormWorkModeId(emp.work_mode_id);
    setShowForm(true);
    setSelectedEmployee(null);
    setFormError(null);
  };

  const startCreate = () => {
    setEditing(null);
    setFormName("");
    setFormWorkModeId("");
    setShowForm(true);
    setSelectedEmployee(null);
    setFormError(null);
  };

  const viewEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setShowForm(false);
    setEditing(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const columns = [
    {
      header: "Name",
      render: (emp: Employee) => (
        <button className="btn-link" onClick={() => viewEmployee(emp)}>
          {emp.name}
        </button>
      ),
    },
    { header: "Work Mode", render: (emp: Employee) => emp.work_mode_name },
    {
      header: "Monthly Salary",
      className: "text-right",
      render: (emp: Employee) => `₹${emp.monthly_salary?.toLocaleString()}`,
    },
    {
      header: "Actions",
      className: "text-center actions",
      render: (emp: Employee) => (
        <>
          <button className="btn-icon edit" onClick={() => startEdit(emp)}>
            Edit
          </button>
          <button className="btn-icon delete" onClick={() => setDeleteTarget(emp)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Employees"
        action={
          <button className="btn btn-primary" onClick={startCreate}>
            + New Employee
          </button>
        }
      />

      <Modal
        open={showForm}
        onClose={() => { setShowForm(false); setEditing(null); }}
        title={editing ? "Edit Employee" : "New Employee"}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" form="employee-form">
              {editing ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <form id="employee-form" onSubmit={handleSubmit}>
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
        </form>
      </Modal>

      <Modal
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title="Employee Detail"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setSelectedEmployee(null)}>
              Close
            </button>
            <button className="btn btn-primary" onClick={() => selectedEmployee && startEdit(selectedEmployee)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => selectedEmployee && setDeleteTarget(selectedEmployee)}>
              Delete
            </button>
          </>
        }
      >
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Name</label>
            <div className="form-input" style={{ backgroundColor: 'var(--color-surface)' }}>
              {selectedEmployee?.name}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Work Mode</label>
            <div className="form-input" style={{ backgroundColor: 'var(--color-surface)' }}>
              {selectedEmployee?.work_mode_name}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Salary</label>
            <div className="form-input" style={{ backgroundColor: 'var(--color-surface)' }}>
              ₹{selectedEmployee?.monthly_salary?.toLocaleString()}
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Employee"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteTarget) handleDelete(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={!!deleteError}
        title="Cannot Delete Employee"
        message={deleteError ?? ""}
        confirmLabel="OK"
        onCancel={() => setDeleteError(null)}
        showCancel={false}
        danger={false}
      />

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
        <DataTable columns={columns} data={employees} keyFn={(emp) => emp.id} />
      )}
    </div>
  );
}

export default Employees;
