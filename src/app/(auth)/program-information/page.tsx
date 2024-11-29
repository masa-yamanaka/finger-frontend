"use client";
import React, { useState } from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import ConfirmDialog from "@/components/modals/Confirm/ConfirmDialog";
import ReturnDialog from "@/components/modals/Return/ReturnDialog";
import ProgramInformationSearchAccordion from "@/features/program-information/search-accordion/ProgramInformationSearchAccordion";
import { mockProgramInfo } from "@/constants/program-information";
import dayjs from "dayjs";

const columns: GridColDef[] = [
  { field: "tvStation", headerName: "放送局", width: 180 },
  {
    field: "broadcastPeriodStart",
    headerName: "対象放送期間(Start)",
    type: "date",
    width: 150,
    editable: true,
  },
  {
    field: "broadcastPeriodEnd",
    headerName: "対象放送期間(End)",
    type: "date",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "ステータス",
    type: "singleSelect",
    valueOptions: ["作成完了", "確定", "差戻し"],
  },
  {
    field: "fileName",
    headerName: "ファイル名",
    renderCell: (params) => (
      <a href={params.row.fileUrl} download target="_blank">
        {params.value}
      </a>
    ),
  },
  {
    field: "uploadDate",
    headerName: "アップロード日時",
    type: "dateTime",
    width: 150,
    renderCell: (params) => {
      // Format the date to show only up to minutes (YYYY-MM-DD HH:mm)
      return params.value ? dayjs(params.value).format("YYYY/MM/DD HH:mm") : "";
    },
  },
  { field: "message", headerName: "通信欄", width: 300, editable: true },
  { field: "reason", headerName: "差戻し理由", width: 300, editable: true },
];

const ProgramInformation = () => {
  const router = useRouter();
  const [rows, setRows] = useState(mockProgramInfo);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [dialogProps, setDialogProps] = useState({
    open: false,
    title: "",
    description: "",
    color: "error",
    onConfirm: () => {},
  });
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const handleSearchComplete = (data) => {
    console.log("handleSearchComplete data: ", data);
    // Update the DataGrid rows when search is complete
    setRows(data);
  };

  const handleUpload = () => router.push(`/program-information/upload`);

  const processRowUpdate = (newRow: any) => {
    // Add API here to update
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // Log updated data
    console.log("Saved data: ", updatedRow);

    return updatedRow;
  };

  const handleDeleteSelected = () => {
    // Add API here to delete
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Deleted row data:", selectedRowData);

    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    closeDialog();
  };

  const handleDownloadSelected = () => {
    // Add logic here for handling Downloads

    // Log the full data of the selected rows
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Downloading files: ", selectedRowData);
  };

  const handleStatusConfirm = () => {
    // Add API here for 確定 status

    // Log the rows for the Confrim Status change
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Rows updated: ", selectedRowData);

    const updatedRows = rows.map((row) => (selectedRows.includes(row.id) ? { ...row, status: "確定" } : row));
    setRows(updatedRows);
    closeDialog();
  };

  const handleStatusReturn = (comment: string) => {
    // Add API here for 差戻し status
    // Add API here for email notification

    // Log the full data of the selected rows
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("差戻し対象行のデータ:", selectedRowData);

    // Log the comment
    console.log("差戻しコメント:", comment);

    const updatedRows = rows.map((row) => (selectedRows.includes(row.id) ? { ...row, status: "差戻し" } : row));
    setRows(updatedRows);

    closeReturnModal();
  };

  const openDialog = (action: "delete" | "confirm") => {
    const dialogConfig =
      action === "delete"
        ? {
            title: "削除の確認",
            description: "選択した行を削除してもよろしいですか？この操作は元に戻せません。",
            color: "error",
            onConfirm: handleDeleteSelected,
          }
        : {
            title: "確定の確認",
            description: "ステータスを確定に変更しますか？",
            color: "primary",
            onConfirm: handleStatusConfirm,
          };

    setDialogProps({ ...dialogConfig, open: true });
  };

  const closeDialog = () => setDialogProps((prev) => ({ ...prev, open: false }));
  const openReturnModal = () => setIsReturnModalOpen(true);
  const closeReturnModal = () => setIsReturnModalOpen(false);

  return (
    <DefaultPageLayout title="番組情報連携">
      {/* Message Area  */}
      <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>

      {/* Upload Button  */}
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mb: 2 }}>
        アップロード
      </Button>

      {/* Search Accordion  */}
      <ProgramInformationSearchAccordion onSearchComplete={handleSearchComplete} />

      {/* Data Grid  */}
      <Box sx={{ width: "100%", mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          sx={{
            height: 500,
            width: "100%",
            "& .actions": { color: "text.secondary" },
            "& .textPrimary": { color: "text.primary" },
          }}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />

        {/* Buttons  */}
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleDownloadSelected} disabled={selectedRows.length === 0}>
              ダウンロード
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => openDialog("delete")}
              disabled={!selectedRows.length}
            >
              削除
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => openDialog("confirm")} disabled={!selectedRows.length}>
              確定
            </Button>
            <Button variant="contained" onClick={openReturnModal} disabled={!selectedRows.length}>
              差戻し
            </Button>
          </Stack>
        </Stack>

        {/* Dialog for 'Delete' and 'Confirm Status' */}
        <ConfirmDialog
          open={dialogProps.open}
          title={dialogProps.title}
          description={dialogProps.description}
          color={dialogProps.color}
          onClose={closeDialog}
          onConfirm={dialogProps.onConfirm}
          confirmButtonText="OK"
          cancelButtonText="キャンセル"
        />

        {/* Return Dialog */}
        <ReturnDialog open={isReturnModalOpen} onClose={closeReturnModal} onConfirm={handleStatusReturn} />
      </Box>
    </DefaultPageLayout>
  );
};

export default ProgramInformation;
