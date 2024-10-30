"use client";
import * as React from "react";
import DataGridToolbar from "@/components/dataGridToolbar/DataGridToolbar";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
// import { v4 as uuidv4 } from "uuid";
import { mockAccounts } from "@/constants/accounts";
import { useRouter } from "next/navigation";
import { useAccountContext } from "@/context/AccountContext";
import ConfirmDialog from "@/components/modals/Confirm/ConfirmDialog";

const AccountManagement = () => {
  const [selectedStation, setSelectedStation] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const router = useRouter();
  const { setAccountData } = useAccountContext();
  const [rowToDelete, setRowToDelete] = React.useState<GridRowId | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  // Add API here to fetch data
  // Set to rows to empty [] and setRows with the fetched data
  const [rows, setRows] = React.useState(mockAccounts);

  const handleAddClick = () => {
    // Reset accountData context
    setAccountData({});
    router.push("/account-management/add");
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    //  Add API here for editing id
    console.log("Edit clicked for id: ", id);
    router.push(`/account-management/edit/`);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = () => {
    // Add API here to delete
    console.log("Deleted row id: ", rowToDelete);

    setRows(rows.filter((row) => row.id !== rowToDelete));
    setRowToDelete(null);
    closeDeleteModal();
  };

  const openDeleteModal = (id: GridRowId) => () => {
    setRowToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "businessName",
      headerName: "事業者名",
      width: 180,
      editable: false,
    },

    {
      field: "role",
      headerName: "権限",
      width: 180,
      editable: false,
    },
    {
      field: "loginId",
      headerName: "ログインID",
      width: 240,
      editable: false,
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
              sx={{
                color: "primary.main",
              }}
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
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={openDeleteModal(id)}
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
      <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
        アカウント管理画面
      </Typography>
      <DataGridToolbar
        onAddClick={handleAddClick}
        selectedStation={selectedStation}
        onStationChange={setSelectedStation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        disableAddButton={false}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
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
      <ConfirmDialog
        open={isDeleteModalOpen}
        title="削除の確認"
        description="選択した行を削除してもよろしいですか？この操作は元に戻せません。"
        onClose={closeDeleteModal}
        onConfirm={handleDeleteClick}
        confirmButtonText="OK"
        cancelButtonText="キャンセル"
      />
    </Box>
  );
};

export default AccountManagement;
