import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ja";
import { mockDeliveryType, mockTvStations } from "@/constants/file-delivery";

const FileDeliveryUploadTable = ({ onTableDataChange }) => {
  const [formData, setFormData] = useState({
    tvStation: "",
    deliveryType: "",
    broadcastDate: null,
    publishDateTime: null,
    message: "",
  });

  const handleChange = (field, value) => {
    const newData = {
      ...formData,
      [field]: value,
    };
    setFormData(newData);
    onTableDataChange(newData);
  };

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "15%" }}>放送局​</TableCell>
            <TableCell sx={{ width: "15%" }}>納品種別</TableCell>
            <TableCell sx={{ width: "20%" }}>放送年月</TableCell>
            <TableCell sx={{ width: "20%" }}>公開日時</TableCell>
            <TableCell sx={{ width: "30%" }}>通信欄</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Select
                size="small"
                value={formData.tvStation}
                onChange={(e) => handleChange("tvStation", e.target.value)}
                displayEmpty
                fullWidth
              >
                {mockTvStations.map((station) => (
                  <MenuItem key={station} value={station}>
                    {station}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>

            <TableCell>
              <Select
                size="small"
                value={formData.deliveryType}
                onChange={(e) => handleChange("deliveryType", e.target.value)}
                displayEmpty
                fullWidth
              >
                {mockDeliveryType.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>

            <TableCell>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ja"
              >
                <DatePicker
                  slotProps={{
                    calendarHeader: { format: "YYYY年MM月" },
                    textField: { size: "small" },
                  }}
                  value={formData.broadcastDate}
                  onChange={(newValue) =>
                    handleChange("broadcastDate", newValue)
                  }
                />
              </LocalizationProvider>
            </TableCell>

            <TableCell>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ja"
              >
                <DateTimePicker
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  value={formData.publishDateTime}
                  onChange={(newValue) =>
                    handleChange("publishDateTime", newValue)
                  }
                />
              </LocalizationProvider>
            </TableCell>

            <TableCell>
              <TextField
                size="small"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                fullWidth
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileDeliveryUploadTable;
