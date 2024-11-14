import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { mockTVStations } from "@/constants/emails";

interface DataGridToolbarProps {
  onAddClick: () => void;
  selectedStation: string[];
  onStationChange: (stations: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  disableAddButton?: boolean;
}

export default function DataGridToolbar({
  onAddClick,
  selectedStation,
  onStationChange,
  searchQuery,
  onSearchChange,
  disableAddButton = false,
}: DataGridToolbarProps) {
  return (
    <Box>
      <FormControl fullWidth sx={{ width: 300, mb: 2 }}>
        <InputLabel id="station-select-label">放送局選択</InputLabel>
        <Select
          labelId="station-select-label"
          value={selectedStation}
          onChange={(e) => onStationChange(e.target.value)}
          label="放送局選択"
          multiple
          renderValue={(selected) => selected.join(", ")}
        >
          {mockTVStations.map((station) => (
            <MenuItem key={station.id} value={station.name}>
              <Checkbox checked={selectedStation.includes(station.name)} />
              <ListItemText primary={station.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <TextField
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          disabled={disableAddButton}
        >
          新規追加
        </Button>
      </Box>
    </Box>
  );
}
