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
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", py: 2 }}
          gutterBottom
        >
          パスワードの初期設定が完了しました
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 4 }}>
        <Button variant="contained" onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
