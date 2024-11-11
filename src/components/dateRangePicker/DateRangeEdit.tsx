// components/DateRangeEditComponent.tsx

import * as React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";

interface DateRangeEditComponentProps {
  value: { startDate: Dayjs | null; endDate: Dayjs | null };
  onChange: (newRange: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }) => void;
}

export default function DateRangeEditComponent({
  value,
  onChange,
}: DateRangeEditComponentProps) {
  const handleStartDateChange = (newStartDate: Dayjs | null) => {
    onChange({
      ...value,
      startDate: newStartDate,
    });
  };

  const handleEndDateChange = (newEndDate: Dayjs | null) => {
    onChange({
      ...value,
      endDate: newEndDate,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={1}>
        <DatePicker
          label="Start Date"
          value={value.startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
        <DatePicker
          label="End Date"
          value={value.endDate}
          onChange={handleEndDateChange}
          minDate={value.startDate || undefined} // Ensures end date can't be before start date
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </Box>
    </LocalizationProvider>
  );
}
