import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

interface ReturnDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => void;
}

const ReturnDialog: React.FC<ReturnDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(comment);
    setComment("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>差し戻しを行います​</DialogTitle>
      <DialogContent>
        <TextField
          label="(差し戻し理由を入力)"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={handleCommentChange}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnDialog;
