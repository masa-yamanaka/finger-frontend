"use client";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  title = "Operation Successful",
  message = "",
  buttonText = "OK",
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", py: 2 }}
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
        <Button variant="contained" onClick={onClose} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
