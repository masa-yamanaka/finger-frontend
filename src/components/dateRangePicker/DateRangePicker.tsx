// components/DateRangePicker.tsx

import * as React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";

interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (newRange: DateRange) => void;
}

export default function DateRangePicker({
  value,
  onChange,
}: DateRangePickerProps) {
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
      <Box display="flex" gap={2}>
        <DatePicker
          label="Start Date"
          value={value.startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={value.endDate}
          onChange={handleEndDateChange}
          minDate={value.startDate || undefined} // prevent end date before start date
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
