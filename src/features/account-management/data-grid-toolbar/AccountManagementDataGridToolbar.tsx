import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, FormControl, InputLabel, Checkbox, ListItemText } from "@mui/material";
import { mockAccountBusinessNames } from "@/constants/accounts";

interface AccountManagementDataGridToolbarProps {
  onAddClick: () => void;
  selectedBusinessName: string[];
  onBusinessNameChange: (stations: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  disableAddButton?: boolean;
}

export default function AccountManagementDataGridToolbar({
  onAddClick,
  selectedBusinessName,
  onBusinessNameChange,
  searchQuery,
  onSearchChange,
}: AccountManagementDataGridToolbarProps) {
  return (
    <Box>
      <FormControl fullWidth sx={{ width: 300, mb: 2 }}>
        <InputLabel>事業者名</InputLabel>
        <Select
          value={selectedBusinessName}
          onChange={(e) => onBusinessNameChange(e.target.value)}
          label="事業者名"
          multiple
          renderValue={(selected) => selected.join(", ")}
        >
          {mockAccountBusinessNames.map((businessName) => (
            <MenuItem key={businessName} value={businessName}>
              <Checkbox checked={selectedBusinessName.includes(businessName)} />
              <ListItemText primary={businessName} />
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
        <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
          新規追加
        </Button>
      </Box>
    </Box>
  );
}
