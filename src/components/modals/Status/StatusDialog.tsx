"use client";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface StatusDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  type?: "success" | "error";
}

const StatusDialog: React.FC<StatusDialogProps> = ({
  open,
  onClose,
  title = "",
  message = "",
  buttonText = "OK",
  type = "success",
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            py: 2,
            color: type === "error" ? "error.main" : "text.primary",
          }}
          gutterBottom
        >
          {title}
        </Typography>
        {message && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", py: 1 }}
            gutterBottom
          >
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 4 }}>
        <Button
          variant="contained"
          onClick={onClose}
          color={type === "error" ? "error" : "primary"}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusDialog;
