"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Stack,
  Accordion,
  AccordionDetails,
  Typography,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ja";
import { mockStatus, mockTvStations } from "@/constants/program-information";
import LoadingButton from "@/components/button/loading-button/LoadingButton";
import { mockApiCall } from "@/utils/mockApiCall";

const ProgramInformationSearchAccordion = ({ onSearchComplete }) => {
  const [uploadDateStart, setUploadDateStart] = useState(null);
  const [uploadDateEnd, setUploadDateEnd] = useState(null);
  const [broadcastPeriodStart, setbroadcastPeriodStart] = useState(null);
  const [broadcastPeriodEnd, setbroadcastPeriodEnd] = useState(null);
  const [tvStation, setTvStation] = useState([]);
  const [statusValue, setStatusValue] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleTvStationChange = (event) => {
    setTvStation(event.target.value === "string" ? event.target.value.split(",") : event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value === "string" ? event.target.value.split(",") : event.target.value);
  };

  const handleSearch = async () => {
    // Add logic here for search button
    const searchParams = {
      tvStation: tvStation,
      broadcastPeriodStart: broadcastPeriodStart,
      broadcastPeriodEnd: broadcastPeriodEnd,
      uploadDateStart: uploadDateStart ? uploadDateStart : null,
      uploadDateEnd: uploadDateEnd ? uploadDateEnd : null,
      status: statusValue,
      searchQuery: searchQuery,
    };

    console.log("Search parameters:", searchParams);

    setLoading(true);
    try {
      const data = await mockApiCall();

      // Set the search results here
      onSearchComplete(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
  ))(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255, 255, 255, .05)",
    }),
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <Accordion defaultExpanded>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
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
                      input={<OutlinedInput label="放送局を選択" />}
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
                    label="Start"
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
                    label="End"
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
                    label="Start"
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
                    label="End"
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
                      input={<OutlinedInput label="ステータスを選択" />}
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
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">フリーワード検索​</Typography>
                </Box>
                <Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: "450px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>

              {/* Search Button */}
              <Stack direction="row" justifyContent="center">
                <LoadingButton onClick={handleSearch} buttonText="検索" loading={loading} disabled={loading} />
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
};

export default ProgramInformationSearchAccordion;
