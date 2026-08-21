import { useState } from "react";
import Modal from "./Modal.tsx";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel: () => void;
  showCancel?: boolean;
  danger?: boolean;
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  showCancel = true,
  danger = true,
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    if (pending || !onConfirm) return;
    setPending(true);
    try {
      await onConfirm();
    } finally {
      setPending(false);
    }
  };

  return (
    <Modal open={open} onClose={onCancel} title={title} className="confirm">
      <div className="modal-body">
        <p className="confirm-message">{message}</p>
      </div>
      <div className="modal-footer">
        {showCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={pending}>
            {cancelLabel}
          </button>
        )}
        <button
          type="button"
          className={`btn ${danger ? "btn-danger" : "btn-primary"}`}
          onClick={onConfirm ? handleConfirm : onCancel}
          disabled={pending}
        >
          {pending ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
