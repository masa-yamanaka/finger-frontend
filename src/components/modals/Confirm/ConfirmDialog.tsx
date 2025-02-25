import React, { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string | ReactNode;
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  onClose: () => void;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  color = "error",
  onClose,
  onConfirm,
  confirmButtonText = "OK",
  cancelButtonText = "Cancel",
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="primary">
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirm} color={color} variant="contained">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
