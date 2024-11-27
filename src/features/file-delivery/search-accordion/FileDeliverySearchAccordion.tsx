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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ja";
import { mockDeliveryType, mockFileDeliveryStatus, mockTvStations } from "@/constants/file-delivery";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { mockApiCall } from "@/utils/mockApiCall";
import LoadingButton from "@/components/button/loading-button/LoadingButton";

const FileDeliverySearchAccordion = ({ onSearchComplete }) => {
  const [publishDateStart, setPublishDateStart] = useState(null);
  const [publishDateEnd, setPublishDateEnd] = useState(null);
  const [broadcastDateStart, setBroadcastDateStart] = useState(null);
  const [broadcastDateEnd, setBroadcastDateEnd] = useState(null);
  const [tvStation, setTvStation] = useState([]);
  const [statusValue, setStatusValue] = useState([]);
  const [deliveryType, setDeliveryType] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleTvStationChange = (event) => {
    setTvStation(event.target.value === "string" ? event.target.value.split(",") : event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value === "string" ? event.target.value.split(",") : event.target.value);
  };

  const handleDeliveryTypeChange = (event) => {
    setDeliveryType(event.target.value === "string" ? event.target.value.split(",") : event.target.value);
  };

  const handleSearch = async () => {
    // Add logic here for search button
    const searchParams = {
      tvStation: tvStation,
      broadcastDateStart: broadcastDateStart,
      broadcastDateEnd: broadcastDateEnd,
      status: statusValue,
      deliveryType: deliveryType,
      publishDateStart: publishDateStart,
      publishDateEnd: publishDateEnd,
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
          <Typography>納品ファイル情報を選択してください​</Typography>
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

              {/* Broadcast Date */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">放送年月​</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={broadcastDateStart}
                    onChange={(newValue) => setBroadcastDateStart(newValue)}
                    label="Start"
                    format="YYYY/MM"
                    views={["year", "month"]}
                  />
                </Box>
                <Typography>〜</Typography>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={broadcastDateEnd}
                    onChange={(newValue) => setBroadcastDateEnd(newValue)}
                    label="End"
                    format="YYYY/MM"
                    views={["year", "month"]}
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
                      {mockFileDeliveryStatus.map((status) => (
                        <MenuItem key={status} value={status}>
                          <Checkbox checked={statusValue.includes(status)} />
                          <ListItemText primary={status} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              {/* Delivery Type */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">納品種別</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="status-label">納品種別を選択</InputLabel>
                    <Select
                      label="納品種別を選択"
                      labelId="status-label"
                      multiple
                      value={deliveryType}
                      onChange={handleDeliveryTypeChange}
                      input={<OutlinedInput label="ステータスを選択" />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {mockDeliveryType.map((type) => (
                        <MenuItem key={type} value={type}>
                          <Checkbox checked={deliveryType.includes(type)} />
                          <ListItemText primary={type} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              {/* Publish Date */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: "200px" }}>
                  <Typography variant="body1">公開日時</Typography>
                </Box>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    slotProps={{
                      calendarHeader: { format: "YYYY年MM月" },
                      textField: { size: "small" },
                    }}
                    value={publishDateStart}
                    onChange={(newValue) => setPublishDateStart(newValue)}
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
                    value={publishDateEnd}
                    onChange={(newValue) => setPublishDateEnd(newValue)}
                    label="End"
                  />
                </Box>
              </Stack>

              {/* Keyword Search */}
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

export default FileDeliverySearchAccordion;
