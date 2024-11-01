"use client";
import React, { useState } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProgramInformationAccordion = () => {
  const [uploadDate, setUploadDate] = useState(null);
  const [broadcastPeriod, setbroadcastPeriod] = useState(null);
  const [selectValue, setSelectValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleSearch = () => {
    // Add logic here for search button
    const searchParams = {
      tvStation: selectValue,
      broadcastPeriod: broadcastPeriod
        ? broadcastPeriod.format("YYYY-MM-DD")
        : null,
      uploadDate: uploadDate ? uploadDate.format("YYYY-MM-DD") : null,
      status: statusValue,
    };

    console.log("Search parameters:", searchParams);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>番組情報を選択してください​</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              {/* TV Station */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">放送局​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="tv-station-label">放送局を選択</InputLabel>
                    <Select
                      labelId="tv-station-label"
                      value={selectValue}
                      onChange={handleSelectChange}
                      label="放送局を選択"
                    >
                      <MenuItem value={10}>Option 1</MenuItem>
                      <MenuItem value={20}>Option 2</MenuItem>
                      <MenuItem value={30}>Option 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              {/* Broadcast Period */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">対象放送期間​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    format="YYYY/MM/DD"
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={broadcastPeriod}
                    onChange={(newValue) => setbroadcastPeriod(newValue)}
                    label="対象放送期間"
                  />
                </Box>
              </Stack>

              {/* Upload Date */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">アップロード日​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    format="YYYY/MM/DD"
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={uploadDate}
                    onChange={(newValue) => setUploadDate(newValue)}
                    label="アップロード日"
                  />
                </Box>
              </Stack>

              {/* Status */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">ステータス​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="status-label">ステータスを選択</InputLabel>
                    <Select
                      labelId="status-label"
                      value={statusValue}
                      onChange={handleStatusChange}
                      label="ステータスを選択"
                    >
                      <MenuItem value={10}>Option 1</MenuItem>
                      <MenuItem value={20}>Option 2</MenuItem>
                      <MenuItem value={30}>Option 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Stack>

            {/* Search Button */}
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                検索
              </Button>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
};

export default ProgramInformationAccordion;
