"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Switch from "@mui/material/Switch";
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
import { mockEmails, mockTvStations, mockTypes } from "@/constants/emails";
import ConfirmDialog from "@/components/modals/Confirm/ConfirmDialog";
import CustomSnackbar from "@/components/snackbar/Snackbar";
import { v4 as uuidv4 } from "uuid";
import DataGridToolbar from "@/components/dataGridToolbar/DataGridToolbar";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { InputBase, Stack, Typography } from "@mui/material";

const EmailSettingsPage = () => {
  const cellRef = React.useRef<HTMLInputElement>(null);
  const [rows, setRows] = React.useState<GridRowsProp>(mockEmails);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);
  const [editRowData, setEditRowData] = React.useState<{ [key: string]: any }>({}); // added to track custom toggle states
  const [selectedStation, setSelectedStation] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error" | "warning" | "info">("success");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteModalDescription, setDeleteModalDescription] = React.useState<React.ReactNode>("");

  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);
  const [saveRowId, setSaveRowId] = React.useState<GridRowId | null>(null);

  const closeSaveModal = () => {
    setSaveRowId(null);
    setIsSaveModalOpen(false);
  };

  const openDeleteModal = () => {
    const selectedEmails = rows.filter((row) => selectedRows.includes(row.id)).map((row) => row.email);

    setDeleteModalDescription(
      <Box>
        <Typography sx={{ mb: 2 }}>選択した行を削除してもよろしいですか？この操作は元に戻せません。</Typography>
        {selectedEmails.map((email, index) => (
          <Typography key={index} variant="body2">
            {email}
          </Typography>
        ))}
      </Box>
    );
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    // Add API here to delete
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Deleted row data:", selectedRowData);

    setRows((oldRows) => oldRows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    closeDeleteModal();
  };

  const handleAddClick = () => {
    // Using UUID for the new record
    const id = uuidv4();

    setRows((oldRows) => {
      const newRow = {
        id,
        type: "to",
        email: "",
        option1: false,
        option2: false,
        option3: false,
        tvStation: "",
        isNew: true,
      };

      // Add API here for adding
      console.log("Adding new row: ", newRow);

      return [...oldRows, newRow];
    });

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "email" },
    }));
  };

  // Filter rows based on selected station
  const filteredRows = rows.filter((row) => {
    // Always include new rows (row.isNew)
    if (row.isNew) return true;

    const matchesStation = selectedStation.length > 0 ? selectedStation.includes(row.tvStation) : true;

    const matchesSearch = row.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStation && matchesSearch;
  });

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    const row = rows.find((r) => r.id === id);
    setEditRowData({ ...editRowData, [id]: { ...row } });
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const confirmSave = () => {
    if (saveRowId === null) return;

    setRowModesModel((prevModel) => ({
      ...prevModel,
      [saveRowId]: { mode: GridRowModes.View },
    }));

    // Remove the edited row data from editRowData
    const newEditRowData = { ...editRowData };
    delete newEditRowData[saveRowId];
    setEditRowData(newEditRowData);

    const row = rows.find((r) => r.id === saveRowId);
    if (row) {
      // Add API here to update

      if (row.isNew) {
        // Snackbar for New row
        setSnackbarMessage("新規追加しました!");
      } else {
        // Snackbar for Edits
        setSnackbarMessage("更新しました!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
    closeSaveModal();
  };

  const handleSaveClick = (id: GridRowId) => {
    setSaveRowId(id);
    setIsSaveModalOpen(true);
  };

  const sendTestEmail = () => {
    const selectedData = rows.filter((row) => selectedRows.includes(row.id));

    // Add logic here to send test email
    console.log("Selected Rows:", selectedData);
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
    // Add API here to update
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // Log updated data
    console.log("Saved data: ", updatedRow);

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, params: any, field: string) => {
    event.stopPropagation();
    const newValue = !params.row[field];
    setRows(rows.map((row) => (row.id === params.row.id ? { ...row, [field]: newValue } : row)));
  };

  // Data Grid column definitions
  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "Type",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: mockTypes,
    },
    {
      field: "tvStation",
      headerName: "TV Station",
      width: 150,
      type: "singleSelect",
      valueOptions: mockTvStations,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
      renderEditCell: (params) => (
        <InputBase
          inputRef={cellRef}
          value={params.value || ""}
          onChange={(event) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: event.target.value,
            })
          }
          disabled={!params.row.isNew}
          fullWidth
          autoFocus={params.row.isNew} // Add autoFocus for new rows
          sx={{
            fontSize: "0.875rem",
            padding: "4px 10px",
          }}
        />
      ),
    },

    {
      field: "option1",
      // headerName: "Option 1",
      renderHeader: () => (
        <div>
          通知業務
          <br />
          Option 1
        </div>
      ),
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
      // headerName: "Option 2",
      renderHeader: () => (
        <div>
          通知業務
          <br />
          Option 2
        </div>
      ),
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
      // headerName: "Option 3",
      renderHeader: () => (
        <div>
          通知業務
          <br />
          Option 3
        </div>
      ),
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
              onClick={() => handleSaveClick(id)}
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
    <DefaultPageLayout title="メールアドレス設定画面">
      {/* Toolbar  */}
      <DataGridToolbar
        onAddClick={handleAddClick}
        selectedStation={selectedStation}
        onStationChange={setSelectedStation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Data Grid  */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
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

      {/* Buttons  */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={openDeleteModal}
            disabled={selectedRows.length === 0}
          >
            削除
          </Button>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={sendTestEmail}
            disabled={selectedRows.length === 0}
          >
            テスト通知
          </Button>
        </Stack>
      </Stack>

      {/* Save Modal  */}
      <ConfirmDialog
        open={isSaveModalOpen}
        title="保存の確認"
        description="保存しますか？"
        color="primary"
        onClose={closeSaveModal}
        onConfirm={confirmSave}
        confirmButtonText="OK"
        cancelButtonText="キャンセル"
      />

      {/* Delete Modal  */}
      <ConfirmDialog
        open={isDeleteModalOpen}
        title="削除の確認"
        description={deleteModalDescription}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        confirmButtonText="OK"
        cancelButtonText="キャンセル"
      />

      {/* Snackbar  */}
      <CustomSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </DefaultPageLayout>
  );
};

export default EmailSettingsPage;
