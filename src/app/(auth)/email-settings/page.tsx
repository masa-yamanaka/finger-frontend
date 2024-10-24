"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import { mockEmails, mockTVStations } from "@/constants/emails";
import { TextField } from "@mui/material";

interface ToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  selectedStation: string;
  setSelectedStation: (station: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function Toolbar(props: ToolbarProps) {
  const {
    setRows,
    setRowModesModel,
    selectedStation,
    setSelectedStation,
    searchQuery,
    setSearchQuery,
  } = props;

  const handleAddClick = () => {
    const id = Math.floor(Math.random() * 1000);
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        type: "to",
        email: "",
        option1: false,
        option2: false,
        option3: false,
        tvStation: selectedStation,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "email" },
    }));
  };

  return (
    <Box>
      <Select
        value={selectedStation}
        onChange={(e) => setSelectedStation(e.target.value)}
        displayEmpty
        sx={{ width: 300, mb: 2 }}
      >
        <MenuItem value="">
          <em>Select a TV Station</em>
        </MenuItem>
        {mockTVStations.map((station) => (
          <MenuItem key={station.id} value={station.name}>
            {station.name}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <TextField
          label="Search Email"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 400 }}
        />
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          disabled={!selectedStation}
        >
          Add Email
        </Button>
      </Box>
    </Box>
  );
}

export default function EmailGrid() {
  const [rows, setRows] = React.useState<GridRowsProp>(mockEmails);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>(
    []
  );
  const [editRowData, setEditRowData] = React.useState<{ [key: string]: any }>(
    {}
  );
  const [selectedStation, setSelectedStation] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter rows based on selected station
  const filteredRows = rows.filter((row) => {
    const matchesStation = selectedStation
      ? row.tvStation === selectedStation
      : true;
    const matchesSearch = row.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return (
      (matchesStation && matchesSearch) ||
      (row.isNew && row.tvStation === selectedStation)
    );
  });

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    const row = rows.find((r) => r.id === id);
    setEditRowData({ ...editRowData, [id]: { ...row } });
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const newEditRowData = { ...editRowData };
    delete newEditRowData[id];
    setEditRowData(newEditRowData);
  };

  const handleDeleteClick = () => {
    setRows((oldRows) =>
      oldRows.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
  };

  const logSelectedRows = () => {
    const selectedData = rows.filter((row) => selectedRows.includes(row.id));

    // Add logic here to send test email
    console.log("Selected Rows:", selectedData); // logging the data to send
    console.log("All filtered row data: ", filteredRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    } else {
      const originalData = editRowData[id];
      if (originalData) {
        setRows(rows.map((row) => (row.id === id ? originalData : row)));
      }
    }

    const newEditRowData = { ...editRowData };
    delete newEditRowData[id];
    setEditRowData(newEditRowData);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    params: any,
    field: string
  ) => {
    event.stopPropagation();
    const newValue = !params.row[field];
    setRows(
      rows.map((row) =>
        row.id === params.row.id ? { ...row, [field]: newValue } : row
      )
    );
  };

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "Type",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["to", "cc", "bcc"],
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    // tvStation is enabled just for testing
    {
      field: "tvStation",
      headerName: "TV Station",
      width: 150,
      editable: false,
    },
    {
      field: "option1",
      headerName: "Option 1",
      width: 100,
      renderCell: (params) => (
        <Box onClick={(e) => e.stopPropagation()}>
          {rowModesModel[params.row.id]?.mode === GridRowModes.Edit ? (
            <Switch
              checked={params.row.option1}
              onChange={(e) => handleSwitchChange(e, params, "option1")}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Switch checked={params.row.option1} disabled />
          )}
        </Box>
      ),
    },
    {
      field: "option2",
      headerName: "Option 2",
      width: 100,
      renderCell: (params) => (
        <Box onClick={(e) => e.stopPropagation()}>
          {rowModesModel[params.row.id]?.mode === GridRowModes.Edit ? (
            <Switch
              checked={params.row.option2}
              onChange={(e) => handleSwitchChange(e, params, "option2")}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Switch checked={params.row.option2} disabled />
          )}
        </Box>
      ),
    },
    {
      field: "option3",
      headerName: "Option 3",
      width: 100,
      renderCell: (params) => (
        <Box onClick={(e) => e.stopPropagation()}>
          {rowModesModel[params.row.id]?.mode === GridRowModes.Edit ? (
            <Switch
              checked={params.row.option3}
              onChange={(e) => handleSwitchChange(e, params, "option3")}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Switch checked={params.row.option3} disabled />
          )}
        </Box>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <Toolbar
        setRows={setRows}
        setRowModesModel={setRowModesModel}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) =>
          setSelectedRows(newSelection)
        }
        rowSelectionModel={selectedRows}
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={logSelectedRows}
          disabled={selectedRows.length === 0}
        >
          Test Send
        </Button>
      </Box>
    </Box>
  );
}
