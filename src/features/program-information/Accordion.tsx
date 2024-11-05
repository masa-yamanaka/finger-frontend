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
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "dayjs/locale/ja";
import { mockStatus, mockTvStations } from "@/constants/program-information";

const ProgramInformationAccordion = () => {
  const [uploadDateStart, setUploadDateStart] = useState(null);
  const [uploadDateEnd, setUploadDateEnd] = useState(null);
  const [broadcastPeriodStart, setbroadcastPeriodStart] = useState(null);
  const [broadcastPeriodEnd, setbroadcastPeriodEnd] = useState(null);
  const [tvStation, setTvStation] = useState([]);
  const [statusValue, setStatusValue] = useState([]);

  const handleTvStationChange = (event) => {
    setTvStation(
      event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };

  const handleStatusChange = (event) => {
    setStatusValue(
      event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };

  const handleSearch = () => {
    // Add logic here for search button
    const searchParams = {
      tvStation: tvStation,
      broadcastPeriodStart: broadcastPeriodStart,
      broadcastPeriodEnd: broadcastPeriodEnd,
      uploadDateStart: uploadDateStart ? uploadDateStart : null,
      uploadDateEnd: uploadDateEnd ? uploadDateEnd : null,
      status: statusValue,
    };

    console.log("Search parameters:", searchParams);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
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
                      label="放送局を選択"
                      labelId="tv-station-label"
                      multiple
                      value={tvStation}
                      onChange={handleTvStationChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {mockTvStations.map((station) => (
                        <MenuItem key={station} value={station}>
                          <Checkbox checked={tvStation.includes(station)} />
                          <ListItemText primary={station} />
                        </MenuItem>
                      ))}
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
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={broadcastPeriodStart}
                    onChange={(newValue) => setbroadcastPeriodStart(newValue)}
                    label="対象放送期間start"
                  />
                </Box>
                <Typography>〜</Typography>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={broadcastPeriodEnd}
                    onChange={(newValue) => setbroadcastPeriodEnd(newValue)}
                    label="対象放送期間end"
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
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={uploadDateStart}
                    onChange={(newValue) => setUploadDateStart(newValue)}
                    label="アップロード日start"
                  />
                </Box>
                <Typography>〜</Typography>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={uploadDateEnd}
                    onChange={(newValue) => setUploadDateEnd(newValue)}
                    label="アップロード日end"
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
                      label="ステータスを選択"
                      labelId="status-label"
                      multiple
                      value={statusValue}
                      onChange={handleStatusChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {mockStatus.map((status) => (
                        <MenuItem key={status} value={status}>
                          <Checkbox checked={statusValue.includes(status)} />
                          <ListItemText primary={status} />
                        </MenuItem>
                      ))}
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
