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
import { LocalizationProvider, DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ja";
import { mockProgramListStatus, mockProgramListTvStations } from "@/constants/program-list";
import { mockApiCall } from "@/utils/mockApiCall";
import UploadButton from "@/components/button/upload-button/UploadButton";

const ProgramListSearchAccordion = ({ onSearchComplete }) => {
  const [tvStation, setTvStation] = useState([]);
  const [broadcastPeriodStart, setbroadcastPeriodStart] = useState(null);
  const [broadcastPeriodEnd, setbroadcastPeriodEnd] = useState(null);
  const [statusValue, setStatusValue] = useState([]);
  const [publishDateTimeStart, setPublishDateTimeStart] = useState(null);
  const [publishDateTimeEnd, setPublishDateTimeEnd] = useState(null);
  const [creationDeadlineStart, setCreationDeadlineStart] = useState(null);
  const [creationDeadlineEnd, setCreationDeadlineEnd] = useState(null);
  const [lastUploadDateStart, setLastUploadDateStart] = useState(null);
  const [lastUploadDateEnd, setLastUploadDateEnd] = useState(null);
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
      status: statusValue,
      publishDateTimeStart: publishDateTimeStart,
      publishDateTimeEnd: publishDateTimeEnd,
      creationDeadlineStart: creationDeadlineStart,
      creationDeadlineEnd: creationDeadlineEnd,
      lastUploadDateStart: lastUploadDateStart,
      lastUploadDateEnd: lastUploadDateEnd,
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
                      {mockProgramListTvStations.map((station) => (
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
                      {mockProgramListStatus.map((status) => (
                        <MenuItem key={status} value={status}>
                          <Checkbox checked={statusValue.includes(status)} />
                          <ListItemText primary={status} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              {/* Publish DateTime */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">公開日時​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <DateTimePicker
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={publishDateTimeStart}
                    onChange={(newValue) => setPublishDateTimeStart(newValue)}
                    label="Start"
                  />
                </Box>
                <Typography>〜</Typography>
                <Box sx={{ width: "200px" }}>
                  <DateTimePicker
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={publishDateTimeEnd}
                    onChange={(newValue) => setPublishDateTimeEnd(newValue)}
                    label="End"
                  />
                </Box>
              </Stack>

              {/* Creation Deadline  */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">作成完了期限​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={creationDeadlineStart}
                    onChange={(newValue) => setCreationDeadlineStart(newValue)}
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
                    value={creationDeadlineEnd}
                    onChange={(newValue) => setCreationDeadlineEnd(newValue)}
                    label="End"
                  />
                </Box>
              </Stack>

              {/* Last Upload Date  */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">最終アップロード日時​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <DateTimePicker
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={lastUploadDateStart}
                    onChange={(newValue) => setLastUploadDateStart(newValue)}
                    label="Start"
                  />
                </Box>
                <Typography>〜</Typography>
                <Box sx={{ width: "200px" }}>
                  <DateTimePicker
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={lastUploadDateEnd}
                    onChange={(newValue) => setLastUploadDateEnd(newValue)}
                    label="End"
                  />
                </Box>
              </Stack>

              {/* Free Word Search */}
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
                <UploadButton onClick={handleSearch} buttonText="検索" loading={loading} disabled={loading} />
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
};

export default ProgramListSearchAccordion;
