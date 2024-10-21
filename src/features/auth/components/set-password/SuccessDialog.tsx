"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Password Set</DialogTitle>
      <DialogContent>
        <Typography>Password set successfully!</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button variant="contained" onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
