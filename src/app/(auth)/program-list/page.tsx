"use client";
import React, { useState } from "react";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ProgramListSearchAccordion from "@/features/program-list/search-accordion/ProgramListSearchAccordion";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ReturnDialog from "@/components/modals/Return/ReturnDialog";
import ConfirmDialog from "@/components/modals/Confirm/ConfirmDialog";
import { mockProgramList, mockProgramListStatus } from "@/constants/program-list";
import dayjs from "dayjs";

const columns: GridColDef[] = [
  { field: "tvStation", headerName: "放送局" },
  {
    field: "broadcastPeriodStart",
    headerName: "対象放送期間(Start)",
    type: "date",
    width: 150,
  },
  {
    field: "broadcastPeriodEnd",
    headerName: "対象放送期間(End)",
    type: "date",
    width: 150,
  },
  {
    field: "status",
    headerName: "ステータス",
    type: "singleSelect",
    valueOptions: mockProgramListStatus,
  },
  {
    field: "publishDateTime",
    headerName: "公開日時",
    type: "dateTime",
    width: 150,
    renderCell: (params) => {
      return params.value ? dayjs(params.value).format("YYYY/MM/DD HH:mm") : "";
    },
  },
  { field: "creationDeadline", headerName: "作成完了期限日", type: "date", width: 150 },
  {
    field: "downloadUrl",
    headerName: "ダウンロード",
    renderCell: (params) => (
      <Link
        // href={params.value}
        href="/program-list/download"
        variant="body2"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", cursor: "pointer" },
        }}
      >
        ダウンロード
      </Link>
    ),
  },
  {
    field: "uploadUrl",
    headerName: "アップロード",
    renderCell: (params) => (
      <Link
        // href={params.value}
        href="/program-list/upload/edit"
        variant="body2"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", cursor: "pointer" },
        }}
      >
        アップロード
      </Link>
    ),
  },
  {
    field: "lastUploadDate",
    headerName: "最終アップロード日",
    type: "dateTime",
    width: 150,
    renderCell: (params) => {
      // Format the date to show only up to minutes (YYYY/MM/DD HH:mm)
      return params.value ? dayjs(params.value).format("YYYY/MM/DD HH:mm") : "";
    },
  },
  { field: "reason", headerName: "差戻し理由​", editable: true, flex: 1 },
];

const ProgramListPage = () => {
  const router = useRouter();
  const [rows, setRows] = useState(mockProgramList);
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

  const handleUpload = () => router.push(`/program-list/upload`);

  const handleDeleteSelected = () => {
    // Add API here to delete
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Deleted row data:", selectedRowData);

    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    closeDialog();
  };

  const processRowUpdate = (newRow: any) => {
    // Add API here to update
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // Log updated data
    console.log("Saved data: ", updatedRow);

    return updatedRow;
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

  const handleStatusCompleted = () => {
    // Add API here for 作成完了 status

    // Log the rows for the Completed Status change
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Rows updated: ", selectedRowData);

    const updatedRows = rows.map((row) => (selectedRows.includes(row.id) ? { ...row, status: "作成完了" } : row));
    setRows(updatedRows);
    closeDialog();
  };

  const handleStatusReturn = (comment: string) => {
    // Add API here for 差戻し status
    // Add logic here for email notification

    // Log the full data of the selected rows
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("差戻し対象行のデータ:", selectedRowData);

    // Log the comment
    console.log("差戻しコメント:", comment);

    const updatedRows = rows.map((row) => (selectedRows.includes(row.id) ? { ...row, status: "差戻し" } : row));
    setRows(updatedRows);

    closeReturnModal();
  };

  const openDialog = (action: "delete" | "confirm" | "completed") => {
    const dialogConfig =
      action === "delete"
        ? {
            title: "削除の確認",
            description: "選択した行を削除してもよろしいですか？この操作は元に戻せません。",
            color: "error",
            onConfirm: handleDeleteSelected,
          }
        : action === "confirm"
        ? {
            title: "確定の確認",
            description: "ステータスを確定に変更しますか？",
            color: "primary",
            onConfirm: handleStatusConfirm,
          }
        : {
            title: "作成完了の確認",
            description: "ステータスを作成完了に変更しますか？",
            color: "primary",
            onConfirm: handleStatusCompleted,
          };

    setDialogProps({ ...dialogConfig, open: true });
  };

  const closeDialog = () => setDialogProps((prev) => ({ ...prev, open: false }));

  const openReturnModal = () => setIsReturnModalOpen(true);
  const closeReturnModal = () => setIsReturnModalOpen(false);

  return (
    <DefaultPageLayout title="番組確認一覧連携">
      {/* Message Area  */}
      <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>

      {/* Upload Button  */}
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mb: 2 }}>
        アップロード
      </Button>

      {/* Search Accordion  */}
      <ProgramListSearchAccordion onSearchComplete={handleSearchComplete} />

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
      </Box>

      {/* Buttons  */}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => openDialog("delete")}
          disabled={!selectedRows.length}
        >
          削除
        </Button>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => openDialog("completed")} disabled={!selectedRows.length}>
            作成完了
          </Button>
          <Button variant="contained" onClick={() => openDialog("confirm")} disabled={!selectedRows.length}>
            確定
          </Button>
          <Button variant="contained" onClick={openReturnModal} disabled={!selectedRows.length}>
            差戻し
          </Button>
        </Stack>
      </Stack>

      {/* Dialog for 'Delete', 'Confirm Status' and 'Completed Status' */}
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
    </DefaultPageLayout>
  );
};

export default ProgramListPage;
