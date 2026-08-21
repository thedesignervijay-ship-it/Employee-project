import { useState, useEffect, useCallback } from "react";
import { fetchWorkModes, createWorkMode, updateWorkMode, deleteWorkMode } from "../api.ts";
import type { WorkMode } from "../api.ts";
import Modal from "../components/Modal.tsx";
import ConfirmDialog from "../components/ConfirmDialog.tsx";
import PageHeader from "../components/PageHeader.tsx";
import DataTable from "../components/DataTable.tsx";

function WorkModes() {
  const [workModes, setWorkModes] = useState<WorkMode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<WorkMode | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WorkMode | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formSalary, setFormSalary] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

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

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

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
      if (editing) {
        await updateWorkMode(editing.id, { name: formName.trim(), monthly_salary: salary });
      } else {
        await createWorkMode({ name: formName.trim(), monthly_salary: salary });
      }
      setFormName("");
      setFormSalary("");
      setEditing(null);
      setShowForm(false);
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkMode(id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      setDeleteTarget(null);
      setDeleteError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const startEdit = (wm: WorkMode) => {
    setEditing(wm);
    setFormName(wm.name);
    setFormSalary(String(wm.monthly_salary));
    setShowForm(true);
    setFormError(null);
  };

  const startCreate = () => {
    setEditing(null);
    setFormName("");
    setFormSalary("");
    setShowForm(true);
    setFormError(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const columns = [
    { header: "Name", render: (wm: WorkMode) => wm.name },
    {
      header: "Monthly Salary",
      className: "text-right",
      render: (wm: WorkMode) => `₹${wm.monthly_salary.toLocaleString()}`,
    },
    {
      header: "Actions",
      className: "text-center actions",
      render: (wm: WorkMode) => (
        <>
          <button className="btn-icon edit" onClick={() => startEdit(wm)}>
            Edit
          </button>
          <button className="btn-icon delete" onClick={() => setDeleteTarget(wm)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Work Modes"
        action={
          <button className="btn btn-primary" onClick={startCreate}>
            + New Work Mode
          </button>
        }
      />

      <Modal
        open={showForm}
        onClose={() => { setShowForm(false); setEditing(null); }}
        title={editing ? "Edit Work Mode" : "New Work Mode"}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" form="workmode-form">
              {editing ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <form id="workmode-form" onSubmit={handleSubmit}>
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
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Work Mode"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteTarget) handleDelete(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={!!deleteError}
        title="Cannot Delete Work Mode"
        message={deleteError ?? ""}
        confirmLabel="OK"
        onCancel={() => setDeleteError(null)}
        showCancel={false}
        danger={false}
      />

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
        <DataTable columns={columns} data={workModes} keyFn={(wm) => wm.id} />
      )}
    </div>
  );
}

export default WorkModes;
