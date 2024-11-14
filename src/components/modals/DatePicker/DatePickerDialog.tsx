// DatePickerDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/ja";

interface DatePickerDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (date: Date | null) => void;
  type: "date" | "datetime";
  title: string;
}

const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
  open,
  onClose,
  onConfirm,
  type,
  title,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleConfirm = () => {
    onConfirm(selectedDateTime);
    onClose();
  };

  const handleClose = () => {
    setSelectedDateTime(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
          {type === "datetime" ? (
            <DateTimePicker
              format="YYYY-MM-DD HH:mm"
              value={selectedDateTime ? dayjs(selectedDateTime) : null}
              onChange={(date) =>
                setSelectedDateTime(date ? date.toDate() : null)
              }
            />
          ) : (
            <DatePicker
              value={selectedDateTime ? dayjs(selectedDateTime) : null}
              onChange={(date) =>
                setSelectedDateTime(date ? date.toDate() : null)
              }
            />
          )}
        </LocalizationProvider>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="primary">
          閉じる
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DatePickerDialog;
